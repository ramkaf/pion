import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { ResponseHandler } from '../../../../common/utils/ResponseHandler';
import { AppError } from '../../../../common/errors/AppError';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    
    // Bind methods to ensure correct context
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Signup route handler
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { firstname, lastname, email, password, birthday, phonenumber } = req.body;

      // Validate input
      if (!firstname || !lastname || !email || !password || !birthday || !phonenumber) {
        return ResponseHandler.error(res, 'All fields are required', 400);
      }

      // Register the member
      const newMember = await this.authService.registerMember({
        firstname,
        lastname,
        email,
        password,
        birthday,
        phonenumber
      });

      // Generate JWT token
      const token = this.authService.generateToken(newMember);

      // Respond with success and token
      return ResponseHandler.success(res, { user: newMember, token }, 'Signup successful');
    } catch (error: any) {
      // Handle specific error cases
      if (error.message === 'Email already in use') {
        return ResponseHandler.error(res, 'Email already in use', 409);
      } else {
        return ResponseHandler.error(res, 'Error creating member', 500);
      }
    }
  }

  // Login route handler
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return ResponseHandler.error(res, 'Email and password are required', 400);
      }
      const member = await this.authService.verifyLogin(email, password);
      if (!member) {
        return ResponseHandler.error(res, 'Invalid email or password', 401);
      }
      const token = this.authService.generateToken(member);
      return ResponseHandler.success(res, { user: member, token }, 'Login successful');
    } catch (error: any) {
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


