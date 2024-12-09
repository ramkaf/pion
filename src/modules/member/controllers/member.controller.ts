import { Request, Response } from "express";
import MemberService from "../services/member.service";
import { ResponseHandler } from "../../../../common/utils/ResponseHandler";

class MemberController {
  private memberService: MemberService;

  constructor() {
    this.memberService = new MemberService();
  }

  // Profile route handler
  profile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { _id } = req.user!;
      const member = await this.memberService.findWithCourses(_id.toHexString());
      return ResponseHandler.success(res, member);
    } catch (error: any) {
      return ResponseHandler.error(res, "Error fetching profile", error);
    }
  };

  // Update member route handler
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedMember = await this.memberService.update(req.params.id, req.body);
      if (!updatedMember) {
        return ResponseHandler.error(res, "Member not found", 404);
      }
      return ResponseHandler.success(res, updatedMember, "Member updated successfully");
    } catch (error: any) {
      return ResponseHandler.error(res, "Error updating member", error);
    }
  };

  // Delete member route handler
  deleteMember = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedMember = await this.memberService.delete(req.params.id);
      if (!deletedMember) {
        return ResponseHandler.error(res, "Member not found", 404);
      }
      return ResponseHandler.success(res, null, "Member deleted successfully");
    } catch (error: any) {
      return ResponseHandler.error(res, "Error deleting member", error);
    }
  };
}

export default MemberController;
