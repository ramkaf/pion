import { Router } from "express";
import {} from "../../member/middlewares/passport-jwt";
import CourseController from "../controllers/course.controller";
import { isAuthenticated } from "../../member/middlewares/isAuthenticated.middleware";
import { courseCreateSchema } from "../validation/create-course.schema";
import { validator } from "../../../../common/middleware/validator";
import {
  courseGetOneByIdSchema,
  courseGetOneSchema,
} from "../validation/get-course.schema";
import { courseUpdateSchema } from "../validation/update-course.schema";
import isAdmin from "../../member/middlewares/isAdmin.middleware";
import { mongoIdSchema } from "../../../../common/validations/mongodb-id.validation";

const courseController = new CourseController();
const courseRouter = Router();
courseRouter.use(isAuthenticated);

courseRouter.post(
  "/",
  isAdmin,
  validator(courseCreateSchema, "body"),
  courseController.create,
);
courseRouter.get(
  "/:id?",
  validator(courseGetOneSchema, "params"),
  courseController.get,
);
courseRouter.patch(
  "/",
  isAdmin,
  validator(courseUpdateSchema, "body"),
  courseController.update,
);
courseRouter.delete(
  "/:id",
  isAdmin,
  validator(mongoIdSchema, "params"),
  courseController.delete,
);

export default courseRouter;
