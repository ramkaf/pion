import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

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
        res.status(400).json({ message: 'All fields are required' });
        return;
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
      res.status(201).json({ 
        message: 'Member created successfully', 
        token,
        member: {
          id: newMember._id,
          firstname: newMember.firstname,
          lastname: newMember.lastname,
          email: newMember.email
        }
      });
    } catch (error: any) {
      // Handle specific error cases
      if (error.message === 'Email already in use') {
        res.status(409).json({ message: 'Email already in use' });
      } else {
        res.status(500).json({ message: 'Error creating member', error: error.message });
      }
    }
  }

  // Login route handler
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      // Verify login credentials
      const member = await this.authService.verifyLogin(email, password);

      // If login fails
      if (!member) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      // Generate JWT token
      const token = this.authService.generateToken(member);

      // Respond with success and token
      res.json({ 
        message: 'Login successful', 
        token,
        member: {
          id: member._id,
          firstname: member.firstname,
          lastname: member.lastname,
          email: member.email
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  }

  // Logout route handler (mostly client-side, but we'll provide a server-side logout)
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // In a JWT-based auth system, logout typically means clearing the client-side token
      // We can add token blacklisting if needed in the future
      res.json({ message: 'Logout successful' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error during logout', error: error.message });
    }
  }
}

export default AuthController;