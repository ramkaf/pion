import BaseService from "../../base/base.service";
import { Course, ICourse } from "../models/course.model";

class CourseService extends BaseService<ICourse> {
  constructor() {
    super(Course);
  }

  // You can add additional methods specific to Course if needed
  async findByEmail(email: string): Promise<ICourse | null> {
    return this.model.findOne({ email }).exec();
  }
}

export default CourseService;
