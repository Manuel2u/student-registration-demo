// importing packages and modules
import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import DBCONNECT from "./config/dbConnect";
import customError from "./middlewares/customError";
const PORT = process.env.PORT || 5000;

//import routes
import userRoutes from "./routes/user";
import studentRoutes from "./routes/student";

//use cors
app.use(cors());

//use express json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use global middlewares
app.use(customError);

//routes
app.use("/auth", userRoutes);

app.use("/api/v1", studentRoutes);

//connect db and listen on port
app.listen(PORT, async () => {
  try {
    await DBCONNECT();
    console.log(`server listening on Port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
