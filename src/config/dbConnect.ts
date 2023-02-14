import mongoose from "mongoose";
require("dotenv").config();

//fix depracation warning
mongoose.set("strictQuery", false);

const MONGO_URI = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.DEV_MONGO_URI;
  } else if (process.env.NODE_ENV === "production") {
    return process.env.PROD_MONGO_URI;
  }
};

const DBCONNECT = async () => {
  const MONGODB_URI = MONGO_URI() as string;
  try {
    await mongoose.connect(MONGODB_URI, { autoIndex: true });
    console.log("db connected Succesfully");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

export default DBCONNECT;
