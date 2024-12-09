"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const ResponseHandler_1 = require("../../../../common/utils/ResponseHandler");
class AuthController {
  constructor() {
    this.authService = new auth_service_1.default();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  // Signup route handler
  signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { firstname, lastname, email, password, birthday, phonenumber } =
          req.body;
        // Register the member
        const newMember = yield this.authService.registerMember({
          firstname,
          lastname,
          email,
          password,
          birthday,
          phonenumber,
        });
        // Generate JWT token
        const token = this.authService.generateToken(newMember);
        // Respond with success and token
        return ResponseHandler_1.ResponseHandler.success(
          res,
          { user: newMember, token },
          "Signup successful",
        );
      } catch (error) {
        // Handle specific error cases
        if (error.message === "Email already in use") {
          return ResponseHandler_1.ResponseHandler.error(
            res,
            "Email already in use",
            409,
          );
        } else {
          return ResponseHandler_1.ResponseHandler.error(
            res,
            "Error creating member",
            500,
          );
        }
      }
    });
  }
  // Login route handler
  login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
          return ResponseHandler_1.ResponseHandler.error(
            res,
            "Email and password are required",
            400,
          );
        }
        const member = yield this.authService.verifyLogin(email, password);
        if (!member) {
          return ResponseHandler_1.ResponseHandler.error(
            res,
            "Invalid email or password",
            401,
          );
        }
        const token = this.authService.generateToken(member);
        return ResponseHandler_1.ResponseHandler.success(
          res,
          { user: member, token },
          "Login successful",
        );
      } catch (error) {
        return ResponseHandler_1.ResponseHandler.error(
          res,
          "Error during login",
          500,
        );
      }
    });
  }
  logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return ResponseHandler_1.ResponseHandler.success(
          res,
          null,
          "Logout successful",
        );
      } catch (error) {
        return ResponseHandler_1.ResponseHandler.error(
          res,
          "Error during logout",
          500,
        );
      }
    });
  }
}
exports.default = AuthController;
