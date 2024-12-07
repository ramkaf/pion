import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Member, IMember } from '../models/member.model';

// Instantiate the controller
const authController = new AuthController();

// Create router
const authRouter = Router();

// JWT Strategy Configuration
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
};

// Configure Passport JWT Strategy
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    // Find the member by the id in the JWT
    const member = await Member.findById(jwt_payload.id);
    
    if (member) {
      // If member found, pass it to the route handler
      return done(null, member);
    } else {
      // If member not found
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

// Middleware to protect routes
const requireAuth = passport.authenticate('jwt', { session: false });

// Authentication Routes
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', requireAuth, authController.logout);

// Example of a protected route
authRouter.get('/profile', requireAuth, (req, res) => {
  // @ts-ignore
  const member = req.user as IMember;
  
  res.json({
    id: member._id,
    firstname: member.firstname,
    lastname: member.lastname,
    email: member.email
  });
});

export default authRouter;