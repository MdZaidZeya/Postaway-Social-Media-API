import jwt from 'jsonwebtoken';
import { addUser, confirmLogin } from '../models/user.js';
import { AppError } from '../../utils/errorClass.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('Please provide name, email, and password', 400));
    }

    const user = await addUser(name, email, password);
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await confirmLogin(email, password);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(new AppError(error.message, 401));
  }
};
