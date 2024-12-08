import { Request, Response } from 'express';
import { Course } from '../models/course.model';  // Assuming this path is correct
import { ResponseHandler } from '../../../../common/utils/ResponseHandler';
import CourseService from '../services/course.service';

class CourseController {
  private courseService:CourseService;
  constructor(){

    this.courseService = new CourseService()
    this.createCourse = this.createCourse.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const course = await this.courseService.create({...req.body})
      return ResponseHandler.success(res,course,'course created successfully')
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res,error,'error in createCourse controller')
    }
  }

  // Get all Courses
  async getCourse(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params
      const courses = await this.courseService.get(id);
      return ResponseHandler.success(res,courses)
    } catch (error: any) {
      console.log(error);
      
      return ResponseHandler.error(res,'error in getCourse controller',error)
    }
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const {id , ...rest} = req.body
      const course = await this.courseService.update(id , rest)
      return ResponseHandler.success(res,course)
    } catch (error: any) {
      return ResponseHandler.error(res,'error in updateCourse controller',error)
    }
  }

  // Delete Course by ID
  async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params
      const course = await this.courseService.delete(id)
      return ResponseHandler.success(res,course)
    } catch (error: any) {
      return ResponseHandler.error(res,'error in deleteCourse controller',error)
    }
  }
}

export default CourseController;


