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
const base_service_1 = __importDefault(require("../../base/base.service"));
const course_model_1 = require("../models/course.model");
class CourseService extends base_service_1.default {
    constructor() {
        super(course_model_1.Course);
    }
    // You can add additional methods specific to Course if needed
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOne({ email }).exec();
        });
    }
}
exports.default = CourseService;
