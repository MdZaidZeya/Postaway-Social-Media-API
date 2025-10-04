/**
 * Logger middleware to log request URL and body
 */
export const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Body:`, JSON.stringify(req.body));
  next();
};
