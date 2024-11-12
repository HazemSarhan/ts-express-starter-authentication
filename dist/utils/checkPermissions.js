"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const errors_1 = require("../errors");
const checkPermission = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin')
        return;
    if (requestUser.userId === resourceUserId.toString())
        return;
    throw new errors_1.UnauthorizedError('Not authorized to access this route');
};
exports.checkPermission = checkPermission;
