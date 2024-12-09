import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../../../../common/utils/ResponseHandler"; // Adjust path as necessary
import MemberService from "../../../modules/member/services/member.service";
import CourseService from "../../../modules/course/services/course.service";
import { NotFoundError } from "../../../../common/errors/AppError";
import BookingService from "../../../modules/booking/services/booking.service";

class AdminController {
  private memberService: MemberService;
  private courseService: CourseService;
  private bookingService: BookingService;
  constructor() {
    this.memberService = new MemberService();
    this.courseService = new CourseService();
    this.bookingService = new BookingService();
    this.createMember = this.createMember.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.upgradeMember = this.upgradeMember.bind(this);
    this.getMemberWithTheirCourse = this.getMemberWithTheirCourse.bind(this);
    this.getAllMembersWithTheirCourses =
    this.getAllMembersWithTheirCourses.bind(this);
    this.getAllCourseWithTheirMembers =
    this.getAllCourseWithTheirMembers.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.booking = this.booking.bind(this);
  }
  async createMember(req: Request, res: Response): Promise<void> {
    try {
      const members = await this.memberService.create({ ...req.body });
      return ResponseHandler.success(
        res,
        members,
        "Member updated successfully",
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error in admin update Member controller");
    }
  }
  async updateMember(req: Request, res: Response): Promise<void> {
    try {
      const { _id, rest } = req.body;
      const members = await this.memberService.update(_id, rest);
      return ResponseHandler.success(
        res,
        members,
        "Member updated successfully",
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error in admin update Member controller");
    }
  }
  async upgradeMember(req: Request, res: Response , next:NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const members = await this.memberService.updateRoleToAdmin(id);
  
      return ResponseHandler.success(
        res,
        members,
        "Members with their courses retrieved successfully",
      );
    } catch (error:any) {
       next(error)
    }
  }
  async getMemberWithTheirCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const members = await this.memberService.findWithCourses(id);
      return ResponseHandler.success(
        res,
        members,
        "Members with their courses retrieved successfully",
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error while fetching users with courses");
    }
  }
  async getAllMembersWithTheirCourses(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const members = await this.memberService.getAllMembersWithTheirCourse();
      return ResponseHandler.success(
        res,
        members,
        "Members with their courses retrieved successfully",
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error while fetching users with courses");
    }
  }
  async getAllCourseWithTheirMembers(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const courses =
        await this.courseService.getAllCoursesWithRemainingCapacity();
      return ResponseHandler.success(
        res,
        courses,
        "Courses with remaining capacity and related users retrieved successfully",
      );
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(
        res,
        "Error in getAllCourseWithTheirMembers controller",
        error,
      );
    }
  }

  async removeMember(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const member = await this.memberService.delete(id);
      return ResponseHandler.success(
        res,
        member,
        "member deleted successfully",
      );
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(
        res,
        "Error in admin removeMember controller",
        error,
      );
    }
  }
  async booking(req: Request, res: Response): Promise<void> {
    try {
      const member = await this.bookingService.create({...req.body});
      return ResponseHandler.success(
        res,
        member,
        "member deleted successfully",
      );
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(
        res,
        "Error in admin removeMember controller",
        error,
      );
    }
  }
  async unBooking(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params
      const book = await this.bookingService.delete(id);
      return ResponseHandler.success(
        res,
        book,
        "member deleted successfully",
      );
    } catch (error: any) {
      console.error(error);
      return ResponseHandler.error(
        res,
        "Error in admin removeMember controller",
        error,
      );
    }
  }
}

export default AdminController;
