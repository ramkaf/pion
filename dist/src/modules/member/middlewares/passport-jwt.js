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
exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_jwt_1 = require("passport-jwt");
const member_model_1 = require("../models/member.model");
// import * as dotenv from 'dotenv'
// dotenv.config()
const opts = {
  jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
// Configure Passport JWT Strategy
passport_1.default.use(
  new passport_jwt_1.Strategy(opts, (jwt_payload, done) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        // Find the member by the id in the JWT
        const member = yield member_model_1.Member.findById(jwt_payload.id);
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
    }),
  ),
);
