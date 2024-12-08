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
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = require("../models/course.model"); // Assuming this path is correct
class CourseController {
    // Create a new Course
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, capacity } = req.body;
                if (!title || !description || !capacity) {
                    res.status(400).json({ message: 'All fields are required' });
                    return;
                }
                const newCourse = new course_model_1.Course({ title, description, capacity });
                yield newCourse.save();
                res.status(201).json({ message: 'Course created successfully', course: newCourse });
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating course', error: error.message });
            }
        });
    }
    // Get all Courses
    getCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.Course.find();
                res.json(courses);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching courses', error: error.message });
            }
        });
    }
    // Get a single Course by ID
    getCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.Course.findById(req.params.id);
                if (!course) {
                    res.status(404).json({ message: 'Course not found' });
                    return;
                }
                res.json(course);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching course', error: error.message });
            }
        });
    }
    // Update Course by ID
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCourse = yield course_model_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedCourse) {
                    res.status(404).json({ message: 'Course not found' });
                    return;
                }
                res.json({ message: 'Course updated successfully', course: updatedCourse });
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating course', error: error.message });
            }
        });
    }
    // Delete Course by ID
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCourse = yield course_model_1.Course.findByIdAndDelete(req.params.id);
                if (!deletedCourse) {
                    res.status(404).json({ message: 'Course not found' });
                    return;
                }
                res.json({ message: 'Course deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting course', error: error.message });
            }
        });
    }
}
exports.default = CourseController;
