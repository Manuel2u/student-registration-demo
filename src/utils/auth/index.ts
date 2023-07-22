import Axios from "axios";
import auth from "../../services/cookie-config";

const getUser = async (cb: any) => {
  console.log({ token: Axios.defaults.headers.common });
  try {
    const response = await Axios.get(`auth/user`);
    const { user } = response.data;
    cb(user);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

// Login function
const login = async (userData: any, callback: any) => {
  try {
    const response = await Axios.post(`auth/signin`, userData);
    const { user } = response.data;
    const { token } = user;

    auth.setCipher(token);

    callback(response.data.user);
  } catch (error: any) {
    throw error;
  }
};

// Logout function
const logout = async () => {
  try {
    auth.clearCipher();
  } catch (err: any) {
    throw err;
  }
};

export { getUser, logout, login };
