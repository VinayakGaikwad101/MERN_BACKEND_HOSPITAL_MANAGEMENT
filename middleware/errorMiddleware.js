// ErrorHandler class will inherit methods/properties of Error

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // super passes message to Error, which is then inherited by ErrorHandler
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  //   500 indicates non generic internal server error
  err.statusCode = err.statusCode || 500;

  //   throws error 11000 for duplicates in mongodb (if 2 users put same email)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;

    // 400 is bad req
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const name = "Json Web Token is expired, try again";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //   extracting only the error message
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((err) => err.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
