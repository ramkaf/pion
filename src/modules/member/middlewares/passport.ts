import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IMember, Member } from "../models/member.model";
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const member = await Member.findOne({ email });
        if (!member) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = await member.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, member);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((member: any, done) => {
  done(null, member.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const member = await Member.findById(id);
    done(null, member);
  } catch (error) {
    done(error);
  }
});

export default passport;
