# Postaway Social Media API

A scalable Express.js API for a social networking platform built with Node.js, featuring user authentication, posts with media uploads, likes, comments, and additional features like filtering, pagination, drafts, and bookmarks.

## Features

- **User Authentication**: Registration and login with JWT tokens
- **Posts Management**: Create, read, update, delete posts with image uploads
- **Comments**: Add, view, update, delete comments on posts
- **Likes**: Like/unlike posts
- **Additional Features**:
  - Post filtering by caption
  - Draft and archive posts
  - Sorting by date or engagement
  - Bookmark posts
  - Pagination for posts and comments

## Technologies Used

- **Node.js** with ES6 Modules
- **Express.js** for API framework
- **JWT** for authentication
- **bcryptjs** for password hashing
- **multer** for file uploads
- **uuid** for unique IDs
- **cors** for cross-origin requests

## Project Structure

```
postaway-api/
├── controllers/          # Request handlers
│   ├── userController.js
│   ├── postController.js
│   ├── commentController.js
│   └── likeController.js
├── middlewares/          # Custom middlewares
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── upload.js
├── models/               # Data models (in-memory)
│   ├── user.js
│   ├── post.js
│   ├── comment.js
│   └── like.js
├── routes/               # API routes
│   ├── userRoutes.js
│   ├── postRoutes.js
│   ├── commentRoutes.js
│   └── likeRoutes.js
├── utils/                # Utilities
│   └── errorClass.js
├── uploads/              # Uploaded images
├── server.js             # Main server file
├── package.json          # Dependencies
└── README.md             # Documentation
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

The server will run on `http://localhost:3000`

## API Endpoints

### User Routes
- `POST /api/signup` - Register a new user
- `POST /api/signin` - Login user

### Post Routes
- `GET /api/posts/all` - Get all posts (with filtering, sorting, pagination)
- `GET /api/posts` - Get posts by authenticated user
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post (with image upload)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `PUT /api/posts/:id/archive` - Archive post
- `POST /api/posts/:id/bookmark` - Bookmark post
- `DELETE /api/posts/:id/bookmark` - Unbookmark post

### Comment Routes
- `GET /api/comments/:postId` - Get comments on a post
- `POST /api/comments/:postId` - Add comment to post
- `PUT /api/comments/:commentId` - Update comment
- `DELETE /api/comments/:commentId` - Delete comment

### Like Routes
- `GET /api/likes/:postId` - Get likes on a post
- `GET /api/likes/toggle/:postId` - Toggle like on post

## Authentication

All routes except user registration and login require authentication. Include the JWT token in the Authorization header: `Bearer <token>`

## Data Structures

- **User**: id, name, email, password
- **Post**: id, userId, caption, imageUrl, createdAt, isDraft, isArchived, bookmarks
- **Comment**: id, userId, postId, content, createdAt
- **Like**: id, userId, postId

## Error Handling

Custom error class with status codes and messages. Errors are logged and returned in JSON format.

## Logging

Request URL and body are logged for all non-user routes.

## File Uploads

Images are uploaded to the `uploads/` directory and served statically.

## Additional Notes

- All data is stored in-memory (resets on server restart)
- Passwords are hashed using bcryptjs
- Images are filtered to allow only image files
- Pagination and filtering are supported on posts and comments
