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
exports.authorizeRoles = exports.authenticateUser = void 0;
const errors_1 = require("../errors");
const jwt_1 = require("../utils/jwt");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }
    else if (req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        throw new errors_1.UnauthenticatedError('Authentication invalid');
    }
    try {
        const payload = (0, jwt_1.isTokenValid)({ token });
        req.user = {
            userId: payload.user.userId,
            role: payload.user.role,
        };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError('Authentication invalid');
    }
});
exports.authenticateUser = authenticateUser;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new errors_1.UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
