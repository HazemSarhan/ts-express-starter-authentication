import dotenv from 'dotenv';
import 'express-async-errors';
import express, { Request, Response } from 'express';
dotenv.config();
const app = express();

// Rest of packages
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

// Security Packages
import helmet from 'helmet';
import cors from 'cors';

// SwaggerUI
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Middlewares
import notFoundMiddleware from './middleware/notFound';
import errorHandlerMiddleware from './middleware/errorHandler';

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
  }),
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
  res.send('Authentication & Authorization With Typescript');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
