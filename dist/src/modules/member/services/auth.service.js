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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const member_service_1 = __importDefault(require("./member.service"));
class AuthService {
    constructor() {
        this.memberService = new member_service_1.default();
    }
    // Generate JWT token
    generateToken(member) {
        // Ensure you have a JWT_SECRET environment variable
        const secret = process.env.JWT_SECRET;
        return jsonwebtoken_1.default.sign({
            id: member._id,
            email: member.email
        }, secret, {
            expiresIn: '1d'
        });
    }
    // Verify login credentials
    verifyLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the member by email
            const member = yield this.memberService.findByEmail(email);
            // If no member found, return null
            if (!member)
                return null;
            // Check if password is correct
            const isMatch = yield member.comparePassword(password);
            // If password doesn't match, return null
            if (!isMatch)
                return null;
            // Return the member if credentials are correct
            return member;
        });
    }
    registerMember(memberData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMember = yield this.memberService.findByEmail(memberData.email || '');
            if (existingMember) {
                throw new Error('Email already in use');
            }
            return this.memberService.create(memberData);
        });
    }
}
exports.default = AuthService;
