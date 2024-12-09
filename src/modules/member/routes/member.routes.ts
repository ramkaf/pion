import { Router } from "express";
import MemberController from "../controllers/member.controller";
import { IMember } from "../models/member.model";
import isAdmin from "../middlewares/isAdmin.middleware";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const memberController = new MemberController();
const memberRouter = Router();

memberRouter.use(isAuthenticated);

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Member related routes
 */

/**
 * @swagger
 * /api/members/profile:
 *   get:
 *     summary: Get member profile
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Successfully retrieved the profile
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
memberRouter.get("/profile", memberController.profile);

/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Update member information
 *     tags: [Member]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Member ID
 *         required: true
 *         schema:
 *           type: string
 *           example: "640b8a3c6a7c7b5f6c557e65" # Example MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Member's birth date
 *               phonenumber:
 *                 type: string
 *                 description: Member's phone number (e.g., +989183251795)
 *             example:
 *               firstname: "Jane"
 *               lastname: "Smith"
 *               email: "jane.smith@example.com"
 *               birthday: "1990-05-15"
 *               phonenumber: "+989183251795"
 *     responses:
 *       200:
 *         description: Successfully updated member information
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
memberRouter.put("/:id", memberController.update);

/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     summary: Delete member by ID
 *     tags: [Member]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Member ID
 *         required: true
 *         schema:
 *           type: string
 *           example: "640b8a3c6a7c7b5f6c557e65" # Example MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Successfully deleted member
 *       400:
 *         description: Validation error
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 */
memberRouter.delete("/:id", memberController.deleteMember);

export default memberRouter;
