"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const member_model_1 = require("../models/member.model");
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = req.user;
    if (user.role === member_model_1.Role.Admin) {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
};
exports.default = isAdmin;
