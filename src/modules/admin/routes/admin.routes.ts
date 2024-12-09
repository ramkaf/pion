import { Router } from "express";
import { isAuthenticated } from "../../member/middlewares/isAuthenticated.middleware";
import isAdmin from "../../member/middlewares/isAdmin.middleware";
import AdminController from "../controllers/admin.controller";
import { validator } from "../../../../common/middleware/validator";
import { mongoIdSchema } from "../../../../common/validations/mongodb-id.validation";
import { memberRegisterschema } from "../../../../src/modules/member/validation/register.schema";
import { memberUpdateschema } from "../../../../src/modules/member/validation/update.schema";
import { createBookingSchema } from "../../../../src/modules/booking/validation/create-booking.schema";

const adminRouter = Router();
const adminController = new AdminController();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management routes
 */

/**
 * @swagger
 * /api/admin/courses/all:
 *   get:
 *     summary: Get all courses with their members
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses with their members
 *       403:
 *         description: Forbidden, Only admins can access this
 *       401:
 *         description: Unauthorized
 */
adminRouter.get("/courses/all", isAuthenticated, isAdmin, adminController.getAllCourseWithTheirMembers);

/**
 * @swagger
 * /api/admin/members/all:
 *   get:
 *     summary: Get all members with their courses
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of members with their courses
 *       403:
 *         description: Forbidden, Only admins can access this
 *       401:
 *         description: Unauthorized
 */
adminRouter.get("/members/all", isAuthenticated, isAdmin, adminController.getAllMembersWithTheirCourses);

/**
 * @swagger
 * /api/admin/members/get/{id}:
 *   get:
 *     summary: Get a member with their courses by member ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The member ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Member details with their courses
 *       403:
 *         description: Forbidden, Only admins can access this
 *       401:
 *         description: Unauthorized
 */
adminRouter.get(
  "/members/get/:id",
  validator(mongoIdSchema, "params"),
  isAuthenticated,
  isAdmin,
  adminController.getAllMembersWithTheirCourses
);

/**
 * @swagger
 * /api/admin/members:
 *   post:
 *     summary: Create a new member
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               phonenumber:
 *                 type: string
 *                 example: "+989123456789"
 *                 description: "Iranian phone number starting with +98, followed by 10 digits."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Successfully created member
 *       403:
 *         description: Forbidden, Only admins can create members
 *       401:
 *         description: Unauthorized
 */
adminRouter.post(
  "/members",
  validator(memberRegisterschema, "body"),
  isAuthenticated,
  isAdmin,
  adminController.createMember
);

/**
 * @swagger
 * /api/admin/members:
 *   put:
 *     summary: Update member details
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "Jane"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "newSecurePassword456"
 *               birthday:
 *                 type: string
 *                 example: "1992-05-15"
 *               phonenumber:
 *                 type: string
 *                 example: "+989876543210"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated member
 *       403:
 *         description: Forbidden, Only admins can update members
 *       401:
 *         description: Unauthorized
 */
adminRouter.put(
  "/members",
  validator(memberUpdateschema, "body"),
  isAuthenticated,
  isAdmin,
  adminController.updateMember
);

/**
 * @swagger
 * /api/admin/members/upgrade/{id}:
 *   patch:
 *     summary: Upgrade a member (e.g., to admin role)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The member ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Member upgraded successfully
 *       403:
 *         description: Forbidden, Only admins can upgrade members
 *       401:
 *         description: Unauthorized
 */
adminRouter.patch(
  "/members/upgrade/:id",
  validator(mongoIdSchema, "params"),
  isAuthenticated,
  isAdmin,
  adminController.upgradeMember
);

/**
 * @swagger
 * /api/admin/members/{id}:
 *   delete:
 *     summary: Remove a member
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The member ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       403:
 *         description: Forbidden, Only admins can remove members
 *       401:
 *         description: Unauthorized
 */
adminRouter.delete(
  "/members/:id",
  validator(mongoIdSchema, "params"),
  isAuthenticated,
  isAdmin,
  adminController.removeMember
);

/**
 * @swagger
 * /api/admin/booking:
 *   post:
 *     summary: Admin creates a new booking
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member:
 *                 type: string
 *                 example: "60f7c7f5b3c6c041d864f1f4"  # Example of valid member ObjectId
 *               course:
 *                 type: string
 *                 example: "60f7c7f5b3c6c041d864f1f5"  # Example of valid course ObjectId
 *     security:
 *       - bearerAuth: []  # Use bearer authentication for API access
 *     responses:
 *       200:
 *         description: Booking created successfully
 *       403:
 *         description: Forbidden, Only admins can create bookings
 *       401:
 *         description: Unauthorized
 */
adminRouter.post(
  "/booking",
  validator(createBookingSchema, "body"),
  isAuthenticated,
  isAdmin,
  adminController.booking
);

/**
 * @swagger
 * /api/admin/booking/{id}:
 *   delete:
 *     summary: Admin cancels a booking
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The booking ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking canceled successfully
 *       403:
 *         description: Forbidden, Only admins can cancel bookings
 *       401:
 *         description: Unauthorized
 */
adminRouter.delete(
  "/booking/:id",
  validator(mongoIdSchema, "params"),
  isAuthenticated,
  isAdmin,
  adminController.unBooking
);

export default adminRouter;
