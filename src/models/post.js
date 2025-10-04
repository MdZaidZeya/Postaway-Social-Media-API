import { v4 as uuidv4 } from 'uuid';

// In-memory storage
let posts = [];

/**
 * Create a new post
 */
export const createPost = (userId, caption, imageUrl, isDraft = false) => {
  const newPost = {
    id: uuidv4(),
    userId,
    caption,
    imageUrl,
    createdAt: new Date(),
    isDraft,
    isArchived: false,
    bookmarks: []
  };

  posts.push(newPost);
  return newPost;
};

/**
 * Get all posts (non-draft, non-archived)
 */
export const getAllPosts = (filter = '', sortBy = 'date', page = 1, limit = 10) => {
  let filteredPosts = posts.filter(post => !post.isDraft && !post.isArchived);

  // Filter by caption
  if (filter) {
    filteredPosts = filteredPosts.filter(post =>
      post.caption.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Sort
  if (sortBy === 'date') {
    filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === 'engagement') {
    // Assuming we have likes and comments count, but for now, sort by date
    filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    page,
    pages: Math.ceil(filteredPosts.length / limit)
  };
};

/**
 * Get posts by user
 */
export const getUserPosts = (userId) => {
  return posts.filter(post => post.userId === userId && !post.isArchived);
};

/**
 * Get post by ID
 */
export const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

/**
 * Update a post
 */
export const updatePost = (id, userId, updates) => {
  const post = posts.find(p => p.id === id);
  if (!post || post.userId !== userId) {
    throw new Error('Post not found or unauthorized');
  }

  Object.assign(post, updates);
  return post;
};

/**
 * Delete a post
 */
export const deletePost = (id, userId) => {
  const index = posts.findIndex(p => p.id === id && p.userId === userId);
  if (index === -1) {
    throw new Error('Post not found or unauthorized');
  }

  posts.splice(index, 1);
  return true;
};

/**
 * Archive a post
 */
export const archivePost = (id, userId) => {
  const post = posts.find(p => p.id === id);
  if (!post || post.userId !== userId) {
    throw new Error('Post not found or unauthorized');
  }

  post.isArchived = true;
  return post;
};

/**
 * Bookmark a post
 */
export const bookmarkPost = (id, userId) => {
  const post = posts.find(p => p.id === id);
  if (!post) {
    throw new Error('Post not found');
  }

  if (!post.bookmarks.includes(userId)) {
    post.bookmarks.push(userId);
  }
  return post;
};

/**
 * Unbookmark a post
 */
export const unbookmarkPost = (id, userId) => {
  const post = posts.find(p => p.id === id);
  if (!post) {
    throw new Error('Post not found');
  }

  post.bookmarks = post.bookmarks.filter(uid => uid !== userId);
  return post;
};
