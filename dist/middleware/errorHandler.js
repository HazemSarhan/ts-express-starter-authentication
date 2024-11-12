"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong. Try again later.',
    };
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ');
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue).join(', ')} field, please choose another value.`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
