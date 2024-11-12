import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors';
import { attachCookiesToResponse, createTokenUser } from '../utils';
import cloudinary from '../configs/cloudinary.config';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '../utils/mailer';

interface UserData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profile_picture?: string;
  role?: string;
}

const generateVerificationCode = (): string => {
  return crypto.randomBytes(3).toString('hex'); // Generates a 6-character hex code
};

export const register = async (
  req: Request<{}, {}, UserData>,
  res: Response,
) => {
  const { name, email, password, bio } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all required fields');
  }
  // Check if the email is already registered
  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isEmailExist) {
    throw new BadRequestError('Email is already registered!');
  }

  // Set the first registered user as an admin
  const isFirstAccount = await prisma.user.count();
  const role = isFirstAccount === 0 ? 'ADMIN' : 'USER';

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate a verification code and send it via email
  const verificationCode = generateVerificationCode();

  // Uploading image to Cloudinary
  let profile_picture = '/upload/default_profile.jpg';
  if (req.files && req.files.profile_picture) {
    const profilePicture = req.files.profile_picture as UploadedFile & {
      tempFilePath: string;
    };
    const result = await cloudinary.uploader.upload(
      profilePicture.tempFilePath,
      {
        use_filename: true,
        folder: 'lms-images',
      },
    );
    fs.unlinkSync(profilePicture.tempFilePath);
    profile_picture = result.secure_url;
  }

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      bio: bio ?? null,
      role: role,
      profile_picture: profile_picture,
      status: 'PENDING',
      verificationCode,
    },
  });

  // Send verification email
  await sendEmail(
    email,
    'Verify Your Account',
    `<p>Your verification code is <strong>${verificationCode}</strong>. Please use this code to activate your account.</p>`,
  );
  res.status(StatusCodes.CREATED).json({
    message:
      'Verification code sent to your email. Please verify your account.',
  });

  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  // res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  // Check if the user exists and if the code matches
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || user.verificationCode !== code) {
    throw new BadRequestError('Invalid verification code or email');
  }

  // Update user status to "ACTIVE" and remove the verification code
  await prisma.user.update({
    where: { email },
    data: {
      status: 'ACTIVE',
      verificationCode: null,
    },
  });

  res.status(StatusCodes.OK).json({ message: 'Account verified successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide valid email & password');
  }

  // Check if the email is available
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credintials');
  }

  // Comparing Passwords
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credintials');
  }

  // Generate Token
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 1000),
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: `User has been logged out successfully!` });
};
