import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Member } from '../models/member.model';

// Configure Local Strategy for login
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find the member by email
      const member = await Member.findOne({ email });
      
      // If no member found
      if (!member) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      
      // Check password
      const isMatch = await member.comparePassword(password);
      
      // If password is incorrect
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      // If credentials are correct, return the member object
      return done(null, member);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize member for the session
passport.serializeUser((member: any, done) => {
  done(null, member.id);
});

// Deserialize member from the session
passport.deserializeUser(async (id, done) => {
  try {
    const member = await Member.findById(id);
    done(null, member);
  } catch (error) {
    done(error);
  }
});

export default passport;

