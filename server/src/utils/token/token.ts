import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const GENERATE_TOKEN = (user: any) => {
  //   Create access token
  const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "Dodoo123#", {
    expiresIn: "1d", // 1 day
  });
  //   Create refresh token
  const refresh_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "Dodoo123#", {
    expiresIn: "30d", // 30 days
  });

  return { access_token, refresh_token };
};

export default GENERATE_TOKEN;