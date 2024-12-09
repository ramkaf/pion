"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(
  require("../controllers/auth.controller"),
);
const isAuthenticated_middleware_1 = require("../middlewares/isAuthenticated.middleware");
const body_validator_1 = require("../../../../common/validation/body.validator");
const register_schema_1 = require("../validation/register.schema");
const authController = new auth_controller_1.default();
const authRouter = (0, express_1.Router)();
authRouter.post(
  "/signup",
  (0, body_validator_1.validateBodySchema)(
    register_schema_1.memberRegisterschema,
  ),
  authController.signup,
);
authRouter.post("/login", authController.login);
authRouter.post(
  "/logout",
  isAuthenticated_middleware_1.isAuthenticated,
  authController.logout,
);
exports.default = authRouter;
