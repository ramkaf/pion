"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const member_routes_1 = __importDefault(
  require("./modules/member/routes/member.routes"),
);
const auth_routes_1 = __importDefault(
  require("./modules/member/routes/auth.routes"),
);
const course_routes_1 = __importDefault(
  require("./modules/course/routes/course.routes"),
);
const booking_routes_1 = __importDefault(
  require("./modules/booking/routes/booking.routes"),
); // Assuming the booking router is created
const database_1 = __importDefault(require("./config/database"));
const errorMiddleware_1 = require("../common/middleware/errorMiddleware"); // Updated to use correct error middleware
class App {
  constructor() {
    this.app = (0, express_1.default)();
    this.database = new database_1.default();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandlers();
  }
  setupMiddleware() {
    this.app.use(express_1.default.json());
    this.database.connect();
    this.app.use(passport_1.default.initialize());
  }
  setupRoutes() {
    this.app.use("/api/auth", auth_routes_1.default);
    this.app.use("/api/members", member_routes_1.default);
    this.app.use("/api/courses", course_routes_1.default);
    this.app.use("/api/bookings", booking_routes_1.default); // Booking routes
  }
  setupErrorHandlers() {
    this.app.use(errorMiddleware_1.notFoundHandler); // 404 error handler
    this.app.use(errorMiddleware_1.errorHandler); // Global error handler
  }
  start() {
    const port = process.env.PORT || 5000; // Use 5000 as default port if PORT is not set in .env
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
exports.default = App;
