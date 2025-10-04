import {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  archivePost,
  bookmarkPost,
  unbookmarkPost
} from '../models/post.js';
import { AppError } from '../../utils/errorClass.js';

/**
 * Get all posts with optional filtering, sorting, pagination
 */
export const getPosts = (req, res, next) => {
  try {
    const { filter, sortBy, page, limit } = req.query;
    const result = getAllPosts(filter, sortBy, parseInt(page) || 1, parseInt(limit) || 10);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Get a specific post by ID
 */
export const getPost = (req, res, next) => {
  try {
    const post = getPostById(req.params.id);
    if (!post) {
      return next(new AppError('Post not found', 404));
    }
    res.json({
      success: true,
      post
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Create a new post
 */
export const createNewPost = (req, res, next) => {
  try {
    const { caption, isDraft } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const post = createPost(req.user.id, caption, imageUrl, isDraft);
    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Update a post
 */
export const updateExistingPost = (req, res, next) => {
  try {
    const updates = req.body;
    const post = updatePost(req.params.id, req.user.id, updates);
    res.json({
      success: true,
      post
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

/**
 * Delete a post
 */
export const deleteExistingPost = (req, res, next) => {
  try {
    deletePost(req.params.id, req.user.id);
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

/**
 * Get posts by user
 */
export const getPostsByUser = (req, res, next) => {
  try {
    const posts = getUserPosts(req.user.id);
    res.json({
      success: true,
      posts
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/**
 * Archive a post
 */
export const archiveExistingPost = (req, res, next) => {
  try {
    const post = archivePost(req.params.id, req.user.id);
    res.json({
      success: true,
      post
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

/**
 * Bookmark a post
 */
export const bookmarkExistingPost = (req, res, next) => {
  try {
    const post = bookmarkPost(req.params.id, req.user.id);
    res.json({
      success: true,
      post
    });
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};

/**
 * Unbookmark a post
 */
export const unbookmarkExistingPost = (req, res, next) => {
  try {
    const post = unbookmarkPost(req.params.id, req.user.id);
    res.json({
      success: true,
      post
    });
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};
