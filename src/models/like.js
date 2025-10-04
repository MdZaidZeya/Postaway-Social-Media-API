import { v4 as uuidv4 } from 'uuid';

// In-memory storage
let likes = [];

/**
 * Add a like
 */
export const addLike = (userId, postId) => {
  // Check if already liked
  const existingLike = likes.find(like => like.userId === userId && like.postId === postId);
  if (existingLike) {
    throw new Error('Already liked');
  }

  const newLike = {
    id: uuidv4(),
    userId,
    postId
  };

  likes.push(newLike);
  return newLike;
};

/**
 * Remove a like
 */
export const removeLike = (userId, postId) => {
  const index = likes.findIndex(like => like.userId === userId && like.postId === postId);
  if (index === -1) {
    throw new Error('Like not found');
  }

  likes.splice(index, 1);
  return true;
};

/**
 * Get all likes on a specific post
 */
export const getLikesOnPost = (postId) => {
  return likes.filter(like => like.postId === postId);
};

/**
 * Toggle like (add if not exists, remove if exists)
 */
export const toggleLike = (userId, postId) => {
  const existingLike = likes.find(like => like.userId === userId && like.postId === postId);
  if (existingLike) {
    removeLike(userId, postId);
    return { action: 'removed' };
  } else {
    addLike(userId, postId);
    return { action: 'added' };
  }
};
