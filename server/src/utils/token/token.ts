import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const GENERATE_TOKEN = (user: any) => {
  //   Create access token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "",
    {
      expiresIn: "20s", // 1 day
    }
  );
  

  return { token };
};

export default GENERATE_TOKEN;
