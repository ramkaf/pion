import * as dotenv from "dotenv";
dotenv.config();
import App from "./app"; // Import the App class

const app = new App(); // Create an instance of the App class
app.start(); // Start the server
