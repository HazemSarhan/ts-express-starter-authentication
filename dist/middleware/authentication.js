"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticatedUser = void 0;
const utils_1 = require("../utils");
const errors_1 = require("../errors");
const authenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        throw new errors_1.UnauthenticatedError('Authentication Invalid');
    }
    try {
        const { name, userId, role } = (0, utils_1.isTokenValid)({ token });
        req.user = { name, userId, role };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError('Authentication Invalid');
    }
});
exports.authenticatedUser = authenticatedUser;
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new errors_1.UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
