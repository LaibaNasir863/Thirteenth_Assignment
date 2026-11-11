
const errorHandler = (err, req, res, next) => {

    console.error(err.stack);

    // Handle invalid JSON
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format"
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

module.exports = errorHandler;
