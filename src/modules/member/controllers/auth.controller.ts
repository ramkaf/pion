import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { ResponseHandler } from '../../../../common/utils/ResponseHandler';
import MemberService from '../services/member.service';


class AuthController {
  private authService: AuthService;
  private memberService:MemberService
  constructor() {
    this.authService = new AuthService();
    this.memberService = new MemberService();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Signup route handler
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const {email} = req.body
      const memebr = await this.memberService.findByEmail(email)
      if (memebr)
        return ResponseHandler.error(res, 'Email already in use', 409);
      const newMember = await this.authService.registerMember({...req.body});
      const token = this.authService.generateToken(newMember);
      return ResponseHandler.success(res, { user: newMember, token }, 'Signup successful');
    } catch (error: any) {
        return ResponseHandler.error(res, 'Error creating member', 500);
      }
    }

  // Login route handler
  async login(req: Request, res: Response): Promise<void> {
    try {
      const {email , password} = req.body
      const member = await this.authService.verifyLogin(email, password);
      if (!member) {
        return ResponseHandler.error(res, 'Invalid email or password', 401);
      }
      const token = this.authService.generateToken(member);
      return ResponseHandler.success(res, { user: member, token }, 'Login successful');
    } catch (error: any) {
      console.log(error);
      
      return ResponseHandler.error(res, 'Error during login', 500);
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    try {
      return ResponseHandler.success(res, null, 'Logout successful');
    } catch (error:any) {
      return ResponseHandler.error(res, 'Error during logout', 500);
    }
  }
}

export default AuthController;


