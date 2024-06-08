export const catchAsyncErrors = (theFunction) => {
  // returns another arrow func
  return (req, res, next) => {
    // A Promise can have three states:
    // Pending: The initial state, meaning the operation hasn't finished yet.
    // Fulfilled: The operation completed successfully, and the Promise holds the resulting value.
    // Rejected: The operation encountered an error, and the Promise holds the error object.

    // Promise makes the func inside it asynchronous

    // then handles what to do with successful execution
    // catch handles what to do with error

    // Promise.resolve() returns a resolved promise
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
