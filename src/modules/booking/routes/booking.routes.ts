import { Router } from "express";
import {} from "../../member/middlewares/passport-jwt";
import { isAuthenticated } from "../../member/middlewares/isAuthenticated.middleware";
import { validator } from "../../../../common/middleware/validator";
import isAdmin from "../../member/middlewares/isAdmin.middleware";
import BookingController from "../controllers/booking.controller";
import { createBookingSchema } from "../validation/create-booking.schema";
import {
  bookingGetOneByIdSchema,
  bookingGetOneSchema,
} from "../validation/get-booking.schema";
import { updateBookingSchema } from "../validation/update-booking.schema";
import { authorizeUserOrAdmin } from "../../../modules/member/middlewares/authorize.middleware";

const bookingController = new BookingController();
const bookingRouter = Router();
bookingRouter.use(isAuthenticated);

bookingRouter.post(
  "/",
  validator(createBookingSchema, "body"),
  authorizeUserOrAdmin('member','body'),
  bookingController.create,
);
bookingRouter.delete(
  "/:id",
  validator(bookingGetOneByIdSchema, "params"),
  bookingController.delete,
);

export default bookingRouter;
