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
}

export default MemberService;
