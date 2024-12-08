import { Request, Response } from 'express';
import { Course } from '../models/course.model';  // Assuming this path is correct

class CourseController {
  // Create a new Course
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, capacity } = req.body;
      if (!title || !description || !capacity) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }
      const newCourse = new Course({ title, description, capacity });
      await newCourse.save();

      res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating course', error: error.message });
    }
  }

  // Get all Courses
  async getCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
  }

  // Get a single Course by ID
  async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
  }

  // Update Course by ID
  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCourse) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }
      res.json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating course', error: error.message });
    }
  }

  // Delete Course by ID
  async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }
      res.json({ message: 'Course deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
  }
}

export default CourseController;


