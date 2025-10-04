import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/errorClass.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Authentication middleware to verify JWT token
 */
export const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new AppError('No token, authorization denied', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    next(new AppError('Token is not valid', 401));
  }
};
