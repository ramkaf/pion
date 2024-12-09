import { NotFoundError } from "../../../../common/errors/AppError";
import BaseService from "../../base/base.service";
import { IMember, Member, Role } from "../models/member.model";

class MemberService extends BaseService<IMember> {
  constructor() {
    super(Member);
  }
  async getAllMembersWithTheirCourse(): Promise<any[]> {
    return this.model.find().populate({
      path: "bookedCourses", // Populate the bookings (associated courses)
      populate: {
        path: "course", // Populate the course details from the course model
        select: "name description", // Select specific course fields
      },
    });
  }

  async findByEmail(email: string): Promise<IMember | null> {
    return this.model.findOne({ email }).exec();
  }

  async findWithCourses(id: string): Promise<IMember | null> {
      const member = await Member.findById(id)
        .populate({
          path: 'bookedCourses',
          populate: {
            path: 'course',
            model: 'Course',
            select: 'title description capacity' // Select specific course fields
          }
        });
        if (!member)
          throw new NotFoundError('no memebr found with that id')
      return member;
  }

  async updateRoleToAdmin(id: string): Promise<IMember | null> {
      const member = await Member.findByIdAndUpdate(id, { role: Role.ADMIN } , {new : true});
      if (!member)
        throw new NotFoundError('no memebr found with that id')
      return member;
  }
}

export default MemberService;
