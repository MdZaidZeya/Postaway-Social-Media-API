import { v4 as uuidv4 } from 'uuid';

// In-memory storage
let comments = [];

/**
 * Create a new comment
 */
export const createComment = (userId, postId, content) => {
  const newComment = {
    id: uuidv4(),
    userId,
    postId,
    content,
    createdAt: new Date()
  };

  comments.push(newComment);
  return newComment;
};

/**
 * Get all comments on a specific post
 */
export const getCommentsOnPost = (postId, page = 1, limit = 10) => {
  const postComments = comments.filter(comment => comment.postId === postId);

  // Sort by date descending
  postComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedComments = postComments.slice(startIndex, endIndex);

  return {
    comments: paginatedComments,
    total: postComments.length,
    page,
    pages: Math.ceil(postComments.length / limit)
  };
};

/**
 * Update a comment
 */
export const updateComment = (id, userId, content) => {
  const comment = comments.find(c => c.id === id);
  if (!comment || comment.userId !== userId) {
    throw new Error('Comment not found or unauthorized');
  }

  comment.content = content;
  return comment;
};

/**
 * Delete a comment
 */
export const deleteComment = (id, userId) => {
  const index = comments.findIndex(c => c.id === id && c.userId === userId);
  if (index === -1) {
    throw new Error('Comment not found or unauthorized');
  }

  comments.splice(index, 1);
  return true;
};
