import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { ResponseHandler } from "../../../../common/utils/ResponseHandler";
import MemberService from "../services/member.service";

class AuthController {
  private authService: AuthService;
  private memberService: MemberService;

  constructor() {
    this.authService = new AuthService();
    this.memberService = new MemberService();
  }

  // Signup route handler
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const member = await this.memberService.findByEmail(email);
      if (member)
        return ResponseHandler.error(res, "Email already in use", 409);

      const newMember = await this.authService.registerMember({ ...req.body });
      const token = this.authService.generateToken(newMember);

      return ResponseHandler.success(
        res,
        { user: newMember, token },
        "Signup successful"
      );
    } catch (error: any) {
      return ResponseHandler.error(res, "Error creating member", 500);
    }
  };

  // Login route handler
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const member = await this.authService.verifyLogin(email, password);
      if (!member) {
        return ResponseHandler.error(res, "Invalid email or password", 401);
      }

      const token = this.authService.generateToken(member);
      return ResponseHandler.success(
        res,
        { user: member, token },
        "Login successful"
      );
    } catch (error: any) {
      console.log(error);
      return ResponseHandler.error(res, "Error during login", 500);
    }
  };

  // Logout route handler
  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      return ResponseHandler.success(res, null, "Logout successful");
    } catch (error: any) {
      return ResponseHandler.error(res, "Error during logout", 500);
    }
  };
}

export default AuthController;
