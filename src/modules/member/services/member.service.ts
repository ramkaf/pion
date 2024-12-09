import BaseService from "../../base/base.service";
import { IMember, Member, Role } from "../models/member.model";

class MemberService extends BaseService<IMember> {
  constructor() {
    super(Member);
  }
  async getAllMembersWithTheirCourse(): Promise<any[]> {
    return this.model.find().populate({
      path: 'bookings', // Populate the bookings (associated courses)
      populate: {
        path: 'course', // Populate the course details from the course model
        select: 'name description' // Select specific course fields
      }
    });;
  }

  async findByEmail(email: string): Promise<IMember | null> {
    return this.model.findOne({ email }).exec();
  }

  async findWithCourses(id:string) :Promise<IMember | null>{
    try {
      const result = await Member.findById(id)
    .populate({
      path: 'courses', // The field in the Member model referencing Course
      select: 'name description duration', // Adjust fields to include as needed
    })
    .exec()
    return result
    } catch (error) {
      throw error
    }
  }

  async updateRoleToAdmin(id:string): Promise<IMember | null> {
    try {
      const member = await Member.findByIdAndUpdate(id , {role : Role.ADMIN});
      if (!member) 
        throw new Error('Member not found');
      return member;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}

export default MemberService;


