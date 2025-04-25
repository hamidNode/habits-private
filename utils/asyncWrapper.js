//

export default function asyncWrapper(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next); // Call the wrapped function
    } catch (error) {
      next(error); // Pass errors to the next middleware
    }
  };
}
