import {
  createComment,
  getCommentsOnPost,
  updateComment,
  deleteComment
} from '../models/comment.js';
import { AppError } from '../../utils/errorClass.js';

/**
 * Get all comments on a specific post
 */
export const getComments = (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = getCommentsOnPost(req.params.id, parseInt(page) || 1, parseInt(limit) || 10);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Create a new comment
 */
export const createNewComment = (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return next(new AppError('Content is required', 400));
    }
    const comment = createComment(req.user.id, req.params.id, content);
    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Update a comment
 */
export const updateExistingComment = (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return next(new AppError('Content is required', 400));
    }
    const comment = updateComment(req.params.id, req.user.id, content);
    res.json({
      success: true,
      comment
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

/**
 * Delete a comment
 */
export const deleteExistingComment = (req, res, next) => {
  try {
    deleteComment(req.params.id, req.user.id);
    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
