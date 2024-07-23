import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserRoute from './routes/UserRouter.js';
import BlogsRoute from './routes/BlogsRouter.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
// Load environment variables
config({ path: './.env' });

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Order of middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Handles form data
app.use(cookieParser());
app.use(express.static('public'));

// Routes
app.get('/', function (req, res) {
  res.status(200).json({
    msg: "Welcome to nodejs"
  })
})

app.use('/api', UserRoute);
app.use('/api', BlogsRoute);


// Error handling middleware
app.use(errorMiddleware);

export default app;
