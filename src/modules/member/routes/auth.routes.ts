import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { memberRegisterschema } from "../validation/register.schema";
import { memberLoginSchema } from "../validation/login.schema";
import { validator } from "../../../../common/middleware/validator";

const authController = new AuthController();
const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes for members
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Member signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - birthday
 *               - phonenumber
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: First name of the member
 *               lastname:
 *                 type: string
 *                 description: Last name of the member
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Member's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password (must contain uppercase, lowercase, number, and special character)
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Member's birth date
 *               phonenumber:
 *                 type: string
 *                 description: Member's phone number (e.g., 09183251795 or +989183251795)
 *             example:
 *               firstname: "John"
 *               lastname: "Doe"
 *               email: "ram@example.com"
 *               password: "ramkaf321165@Ram"
 *               birthday: "2024-12-09"
 *               phonenumber: "+989183251795"
 *     responses:
 *       200:
 *         description: Successfully signed up
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
authRouter.post(
  "/signup",
  validator(memberRegisterschema, "body"),
  authController.signup,
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Member login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Member's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Member's password
 *             example:
 *               email: "ram@example.com"
 *               password: "ramkaf321165@Ram"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.post(
  "/login",
  validator(memberLoginSchema, "body"),
  authController.login,
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Member logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: [] # Assuming you're using Bearer token authentication
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
authRouter.post("/logout", isAuthenticated, authController.logout);

export default authRouter;
