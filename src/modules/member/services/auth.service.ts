import jwt from 'jsonwebtoken';
import MemberService from './member.service';
import { IMember } from '../models/member.model';

class AuthService {
  private memberService: MemberService;

  constructor() {
    this.memberService = new MemberService();
  }

  // Generate JWT token
  generateToken(member: IMember): string {
    // Ensure you have a JWT_SECRET environment variable
    const secret = process.env.JWT_SECRET!;
    
    return jwt.sign(
      { 
        id: member._id, 
        email: member.email 
      }, 
      secret, 
      { 
        expiresIn: '1d' 
      }
    );
  }

  // Verify login credentials
  async verifyLogin(email: string, password: string): Promise<IMember | null> {
    // Find the member by email
    const member = await this.memberService.findByEmail(email);
    
    // If no member found, return null
    if (!member) return null;
    
    // Check if password is correct
    const isMatch = await member.comparePassword(password);
    
    // If password doesn't match, return null
    if (!isMatch) return null;
    
    // Return the member if credentials are correct
    return member;
  }

  async registerMember(memberData: Partial<IMember>): Promise<IMember> {
    const existingMember = await this.memberService.findByEmail(memberData.email || '');
    
    if (existingMember) {
      throw new Error('Email already in use');
    }
    return this.memberService.create(memberData);
  }
}

export default AuthService;

