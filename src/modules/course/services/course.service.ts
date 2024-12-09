import BaseService from "../../base/base.service";
import { Course, ICourse } from "../models/course.model";

class CourseService extends BaseService<ICourse> {
  constructor() {
    super(Course);
  }

  async getAllCoursesWithRemainingCapacity(): Promise<any[]> {
    return Course.aggregate([
      // Lookup the bookings for each course to get the total number of bookings and user details
      {
        $lookup: {
          from: "bookings", // The name of the Booking collection
          localField: "_id",
          foreignField: "course",
          as: "bookings",
        },
      },
      // Lookup the users (members) who are associated with the bookings for each course
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "bookings.member",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $addFields: {
          totalBookings: { $size: "$bookings" }, // Count how many bookings exist for this course
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          capacity: 1,
          totalBookings: 1,
          users: 1, // Include related users in the result
          remainingCapacity: { $subtract: ["$capacity", "$totalBookings"] }, // Calculate remaining capacity
        },
      },
    ]);
  }

  async findByEmail(email: string): Promise<ICourse | null> {
    return this.model.findOne({ email }).exec();
  }
}

export default CourseService;
