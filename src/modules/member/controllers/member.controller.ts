import { Request, Response } from 'express';
import MemberService from '../services/member.service';
import { ResponseHandler } from '../../../../common/utils/ResponseHandler';

class MemberController {
  private memberService: MemberService;

  constructor() {
    this.memberService = new MemberService();
    this.update = this.update.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
  }

  async profile(req: Request, res: Response): Promise<void> {
    try {
      const {_id} = req.user!
      const member = await this.memberService.findWithCourses(_id.toHexString())
      return ResponseHandler.success(res,member)
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating Member', error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedMember = await this.memberService.update(req.params.id, req.body);
      if (!updatedMember) {
        res.status(404).json({ message: 'Member not found' });
        return;
      }
      res.json({ message: 'Member updated successfully', Member: updatedMember });
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating Member', error: error.message });
    }
  }

  async deleteMember(req: Request, res: Response): Promise<void> {
    try {
      const deletedMember = await this.memberService.delete(req.params.id);
      if (!deletedMember) {
        res.status(404).json({ message: 'Member not found' });
        return;
      }
      res.json({ message: 'Member deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting Member', error: error.message });
    }
  }
}

export default MemberController;


