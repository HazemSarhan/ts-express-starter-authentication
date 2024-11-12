[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/HazemSarhan/ts-express-starter-authentication"></a>

<h3 align="center">[Express Server With TS & Authentication]</h3>

  <p align="center">
    A robust authentication and authorization system built with TypeScript, providing secure user registration, email verification, role-based access control, and password management. The project utilizes industry-standard security practices, including password hashing, email verification with code-based activation, and user role management
    <br />
    <a href="http://localhost:5000/api-docs/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://documenter.getpostman.com/view/36229537/2sAY547KSf">Postman Docs</a>
    ·
    <a href="https://github.com/HazemSarhan/ts-express-starter-authentication/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/HazemSarhan/ts-express-starter-authentication/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Features](#features)
- [Getting Started & Installation](#getting-started)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Usage](#usage)

## Features

Built with:

- Typescript
- Node.JS
- Express.JS
- Prisma ORM (PostgreSQL)
- JWT (JSON Web Tokens)
- Cloudinary [For Image Uploading]
- Mailsender [For Receiving Order Confirmation Messages]

## Getting Started

```sh
git clone https://github.com/HazemSarhan/ts-express-starter-authentication.git
npm install
npx prisma init
npx prisma migrate dev --name init
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT = 5000
JWT_SECRET = your-jwt-secret-key
JWT_LIFETIME = 1d
DATABASE_URL = your-db-connection-url
CLOUD_NAME = your-cloudinary-api-cloud-name
CLOUD_API_KEY = your-cloudinary-api-cloud-key
CLOUD_API_SECRET = your-cloudinary-api-cloud-secret-key
EMAIL_HOST= your-smtp-host
EMAIL_PORT= your-smtp-port
EMAIL_USER= your-smtp-email
EMAIL_PASSWORD= your smtp password
```

## Routes

> [!NOTE]
> Check the docs for all routes & data [API Documentation](https://documenter.getpostman.com/view/36229537/2sAY547KSf).

- [ ] Authentication:

```sh
POST `/api/v1/auth/register`- Register a new user
POST `/api/v1/auth/verify`- Verifying the new user
POST `/api/v1/auth/login`- Login a user
POST `/api/v1/auth/logout` - Logout a user
```

- [ ] Users:

```sh
GET `/api/v1/users` - Get all users
GET `/api/v1/users/:id` - Get User By ID
PATCH `/api/v1/users/:id` - Update user data
PATCH `/api/v1/users/:id/updatePassword` - Update user password
PATCH `/api/v1/users/:id/updateRole` - Update user role

```

## Usage

After creating .env with all [Environment Variables](#environment-variables) :

1. Run the server using:

```sh
npm run dev
```

2. Register a new user.
   > [!TIP]
   > Use your real email, you'll need it for confirmation code
   > First registered account role will automatically set to => admin

[contributors-shield]: https://img.shields.io/github/contributors/HazemSarhan/ts-express-starter-authentication?style=for-the-badge
[contributors-url]: https://github.com/HazemSarhan/ts-express-starter-authentication/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/HazemSarhan/ts-express-starter-authentication.svg?style=for-the-badge
[forks-url]: https://github.com/HazemSarhan/ts-express-starter-authentication/network/members
[stars-shield]: https://img.shields.io/github/stars/HazemSarhan/ts-express-starter-authentication.svg?style=for-the-badge
[stars-url]: https://github.com/HazemSarhan/ts-express-starter-authentication/stargazers
[issues-shield]: https://img.shields.io/github/issues/HazemSarhan/ts-express-starter-authentication.svg?style=for-the-badge
[issues-url]: https://github.com/HazemSarhan/ts-express-starter-authentication/issues
[license-shield]: https://img.shields.io/github/license/HazemSarhan/ts-express-starter-authentication.svg?style=for-the-badge
[license-url]: https://github.com/HazemSarhan/ts-express-starter-authentication/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hazemmegahed/
[product-screenshot]: images/screenshot.png
[node-js]: https://svgur.com/i/19bZ.svg
[express-js]: https://svgur.com/i/19a1.svg
[mongo-db]: https://svgur.com/i/19b4.svg
[jwt]: https://svgshare.com/i/19bi.svg
[db]: https://i.imgur.com/0CzwXXA.png
