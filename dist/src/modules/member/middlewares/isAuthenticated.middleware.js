"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const passport_jwt_1 = require("./passport-jwt");
exports.isAuthenticated = passport_jwt_1.passport.authenticate("jwt", {
  session: false,
});
