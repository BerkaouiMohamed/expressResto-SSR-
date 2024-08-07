function asyncHandler(fn) {
  return async (res, req, next) => {
    try {
      await fn(res, req, next);
    } catch (error) {
      console.log("hsdsdffsdf");
      next(error);
    }
  };
}

module.exports = asyncHandler;
