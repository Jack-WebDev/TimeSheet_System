const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const handleErrors = (err, req, res, next) => {
  let statusCode = statusCode === 200 ? 500 : statusCode;
  let message = err.message;

  res.status(statusCode).json({ message: message, stack: err.stack });
};

export { notFound, handleErrors };
