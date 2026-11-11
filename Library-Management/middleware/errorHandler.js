module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON body"
    });
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};
