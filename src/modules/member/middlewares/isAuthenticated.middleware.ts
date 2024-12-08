import {passport} from './passport-jwt'
export const isAuthenticated = passport.authenticate('jwt', { session: false });

