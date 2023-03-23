import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//fix depracation warning
mongoose.set("strictQuery", false);

// const MONGO_URI = () => {
//   if (process.env.NODE_ENV === "development") {
//     return process.env.DEV_MONGO_URI;
//   } else if (process.env.NODE_ENV === "production") {
//     return process.env.PROD_MONGO_URI;
//   }
// };

const DBCONNECT = async () => {
  const MONGODB_URI = "mongodb+srv://manuel:dodoo123@cluster0.2jcmsfo.mongodb.net/?retryWrites=true&w=majority"
  try {
    await mongoose.connect(MONGODB_URI, { autoIndex: true });

    console.log("db connected Succesfully");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

export default DBCONNECT;
