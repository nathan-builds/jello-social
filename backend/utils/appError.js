class AppError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        // this.constructor, avoids this creation in the stack trace to not pollute it
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
