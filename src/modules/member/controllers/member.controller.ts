import { Request, Response } from 'express';
import MemberService from '../services/member.service';

class MemberController {
  private memberService: MemberService;

  constructor() {
    this.memberService = new MemberService();
    this.createMember = this.createMember.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.getMemberById = this.getMemberById.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
  }

  // Create a new Member
  async createMember(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, password, birthday, phonenumber } = req.body;

      // Ensure required fields are provided
      if (!firstname || !lastname || !email || !password || !birthday || !phonenumber) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      // Call the service to create a new Member
      const newMember = await this.memberService.create({ firstname, lastname, email, password, birthday, phonenumber });
      res.status(201).json({ message: 'Member created successfully', Member: newMember });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating Member', error: error.message });
    }
  }

  // Get all Members
  async getMembers(req: Request, res: Response): Promise<void> {
    try {
      const members = await this.memberService.get();
      res.json(members);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching Members', error: error.message });
    }
  }

  // Get a single Member by ID
  async getMemberById(req: Request, res: Response): Promise<void> {
    try {
      const member = await this.memberService.get(req.params.id);
      if (!member) {
        res.status(404).json({ message: 'Member not found' });
        return;
      }
      res.json(member);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching Member', error: error.message });
    }
  }

  // Update Member by ID
  async updateMember(req: Request, res: Response): Promise<void> {
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

  // Delete Member by ID
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


