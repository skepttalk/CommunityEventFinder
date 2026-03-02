import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db";
import app from "../src/app";


connectDB();  


app.listen(5000, () => {
  console.log("Server running on port 5000");
});