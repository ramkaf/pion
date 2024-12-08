import { Request, Response } from 'express';
import { ResponseHandler } from '../../../../common/utils/ResponseHandler';
import CourseService from '../../course/services/course.service';
import MemberService from '../../member/services/member.service'


class AdminController {

  private courseService:CourseService;
  private memberService:MemberService
  constructor(){
    this.courseService = new CourseService()
    this.memberService = new MemberService()
    this.createMember = this.createMember.bind(this);
  }


  async createMember(req: Request, res: Response): Promise<void> {
    try {
      const course = await this.memberService.create({...req.body})
      return ResponseHandler.success(res,course,'course created successfully')
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res,error,'error in createCourse controller')
    }
  }
  async getMember(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params
      const member = await this.memberService.findWithCourses(id)
      return ResponseHandler.success(res,member,'course created successfully')
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res,error,'error in createCourse controller')
    }
  }
  
}

export default AdminController;


