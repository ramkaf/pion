import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Member } from '../models/member.model';

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
  const isAuthenticated = passport.authenticate('jwt', { session: false });
export default isAuthenticated