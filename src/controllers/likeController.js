import { getLikesOnPost, toggleLike } from '../models/like.js';
import { AppError } from '../../utils/errorClass.js';

/**
 * Get all likes on a specific post
 */
export const getLikes = (req, res, next) => {
  try {
    const likes = getLikesOnPost(req.params.postId);
    res.json({
      success: true,
      likes,
      count: likes.length
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Toggle like on a post
 */
export const togglePostLike = (req, res, next) => {
  try {
    const result = toggleLike(req.user.id, req.params.postId);
    res.json({
      success: true,
      action: result.action
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
