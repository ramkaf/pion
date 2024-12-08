import BaseService from "../../base/base.service";
import { IMember, Member } from "../models/member.model";

class MemberService extends BaseService<IMember> {
  constructor() {
    super(Member);
  }

  // You can add additional methods specific to Member if needed
  async findByEmail(email: string): Promise<IMember | null> {
    return this.model.findOne({ email }).exec();
  }

  async findWithCourses(id:string) :Promise<IMember |IMember[] | null>{

    const result = id? await Member.findById(id)
    .populate({
      path: 'courses', // The field in the Member model referencing Course
      select: 'name description duration', // Adjust fields to include as needed
    })
    .exec() : await Member.find()
    .populate({
      path: 'courses', // The field in the Member model referencing Course
      select: 'name description duration', // Adjust fields to include as needed
    })
    .exec();

    return result
  }
}

export default MemberService;


