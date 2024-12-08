"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const member_model_1 = require("../models/member.model");
// Configure Local Strategy for login
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the member by email
        const member = yield member_model_1.Member.findOne({ email });
        // If no member found
        if (!member) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        // Check password
        const isMatch = yield member.comparePassword(password);
        // If password is incorrect
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        // If credentials are correct, return the member object
        return done(null, member);
    }
    catch (error) {
        return done(error);
    }
})));
// Serialize member for the session
passport_1.default.serializeUser((member, done) => {
    done(null, member.id);
});
// Deserialize member from the session
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield member_model_1.Member.findById(id);
        done(null, member);
    }
    catch (error) {
        done(error);
    }
}));
exports.default = passport_1.default;
