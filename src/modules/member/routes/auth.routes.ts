import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { memberRegisterschema } from "../validation/register.schema";
import { memberLoginSchema } from "../validation/login.schema";
import { validator } from "../../../../common/middleware/validator";
const authController = new AuthController();
const authRouter = Router();

authRouter.post(
  "/signup",
  validator(memberRegisterschema, "body"),
  authController.signup,
);
authRouter.post(
  "/login",
  validator(memberLoginSchema, "body"),
  authController.login,
);
authRouter.post("/logout", isAuthenticated, authController.logout);

export default authRouter;
