import { Request, Response } from "express";
import { ResponseHandler } from "../../../../common/utils/ResponseHandler"; // Adjust path as necessary
import CourseService from "../services/course.service"; // Adjust path as necessary

class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  // Create a new course
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const course = await this.courseService.create({ ...req.body });
      return ResponseHandler.success(res, course, "Course created successfully");
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res, "Error in createCourse controller", error);
    }
  };

  // Get a course by ID
  get = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const course = await this.courseService.get(id);
      return ResponseHandler.success(res, course, "Course retrieved successfully");
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res, "Error in getCourse controller", error);
    }
  };

  // Update course by ID
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, ...rest } = req.body;
      const course = await this.courseService.update(id, rest);
      return ResponseHandler.success(res, course, "Course updated successfully");
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res, "Error in updateCourse controller", error);
    }
  };

  // Delete course by ID
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const course = await this.courseService.delete(id);
      return ResponseHandler.success(res, course, "Course deleted successfully");
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res, "Error in deleteCourse controller", error);
    }
  };
}

export default CourseController;
