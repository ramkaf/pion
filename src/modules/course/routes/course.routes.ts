import { Router } from "express";
import CourseController from "../controllers/course.controller";
import { isAuthenticated } from "../../member/middlewares/isAuthenticated.middleware";
import { courseCreateSchema } from "../validation/create-course.schema";
import { validator } from "../../../../common/middleware/validator";
import { courseUpdateSchema } from "../validation/update-course.schema";
import isAdmin from "../../member/middlewares/isAdmin.middleware";
import { mongoIdSchema, mongoIdSchemaOptional } from "../../../../common/validations/mongodb-id.validation";

const courseController = new CourseController();
const courseRouter = Router();
courseRouter.use(isAuthenticated);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management routes
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Authentication required via Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *                 example: "Introduction to Programming"
 *               description:
 *                 type: string
 *                 description: A brief description of the course
 *                 example: "Learn the basics of programming using Python."
 *               capacity:
 *                 type: integer
 *                 description: The maximum number of students allowed in the course
 *                 example: 30
 *     responses:
 *       200:
 *         description: Course created successfully
 *       400:
 *         description: Bad Request, validation failed
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *       403:
 *         description: Forbidden, insufficient permissions to create a course
 *       500:
 *         description: Internal server error
 */
courseRouter.post(
  "/",
  isAdmin,  // Ensure only admin can create courses
  validator(courseCreateSchema, "body"),
  courseController.create
);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Authentication required via Bearer token
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the course
 *         required: true
 *         schema:
 *           type: string
 *           example: 63b8b8e97a3e8f2d99b6aaf1
 *     responses:
 *       200:
 *         description: Successfully retrieved the course
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *       403:
 *         description: Forbidden, insufficient permissions to view the course
 *       500:
 *         description: Internal server error
 */
courseRouter.get(
  "/:id?",
  validator(mongoIdSchemaOptional, "params"),
  courseController.get
);

/**
 * @swagger
 * /api/courses:
 *   patch:
 *     summary: Update a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Authentication required via Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Advanced Programming"
 *               description:
 *                 type: string
 *                 example: "In-depth programming concepts with real-world applications."
 *               capacity:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: Successfully updated the course
 *       400:
 *         description: Bad Request, validation failed
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *       403:
 *         description: Forbidden, insufficient permissions to update the course
 *       500:
 *         description: Internal server error
 */
courseRouter.patch(
  "/",
  isAdmin,  // Ensure only admin can update courses
  validator(courseUpdateSchema, "body"),
  courseController.update
);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Authentication required via Bearer token
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the course to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: 63b8b8e97a3e8f2d99b6aaf1
 *     responses:
 *       200:
 *         description: Course successfully deleted
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized, missing or invalid JWT token
 *       403:
 *         description: Forbidden, insufficient permissions to delete the course
 *       500:
 *         description: Internal server error
 */
courseRouter.delete(
  "/:id",
  isAdmin,  // Ensure only admin can delete courses
  validator(mongoIdSchema, "params"),
  courseController.delete
);

export default courseRouter;
