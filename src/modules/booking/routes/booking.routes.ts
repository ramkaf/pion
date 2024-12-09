import { Router } from "express";
import { isAuthenticated } from "../../member/middlewares/isAuthenticated.middleware";
import { validator } from "../../../../common/middleware/validator";
import { authorizeUserOrAdmin } from "../../../modules/member/middlewares/authorize.middleware";
import BookingController from "../controllers/booking.controller";
import { createBookingSchema } from "../validation/create-booking.schema";
import { mongoIdSchema } from "../../../../common/validations/mongodb-id.validation";

const bookingController = new BookingController();
const bookingRouter = Router();
bookingRouter.use(isAuthenticated);

/**
 * @swagger
 * tags:
 *   - name: Booking
 *     description: API to manage bookings
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member:
 *                 type: string
 *                 description: The member's MongoDB ObjectId who is making the booking
 *                 example: "60f7c7f5b3c6c041d864f1f4"
 *               course:
 *                 type: string
 *                 description: The course's MongoDB ObjectId to be booked
 *                 example: "60f7c7f5b3c6c041d864f1f5"
 *     responses:
 *       201:
 *         description: Booking successfully created
 *       400:
 *         description: Bad request (Validation error)
 *       401:
 *         description: Unauthorized (Authentication error)
 *       403:
 *         description: Forbidden (User not authorized)
 */
bookingRouter.post(
  "/",
  validator(createBookingSchema, "body"),
  authorizeUserOrAdmin('member', 'body'),
  bookingController.create,
);

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *         description: The booking ID to delete
 *     responses:
 *       200:
 *         description: Booking successfully deleted
 *       400:
 *         description: Invalid booking ID format
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized (Authentication error)
 *       403:
 *         description: Forbidden (User not authorized)
 */
bookingRouter.delete(
  "/:id",
  validator(mongoIdSchema, "params"),
  bookingController.delete,
);

export default bookingRouter;
