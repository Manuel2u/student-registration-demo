import axios from "axios";
import { logout } from "../../utils/auth";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://student-reg-demo.azurewebsites.net/";

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    try {
      if (error.response.data.err === "Token expired") {
        // Show toast message
        toast.error("Session expired. Please log in again");

        // Delay redirect to the login page
        setTimeout(() => {
          logout();
          window.location.href = "/login";
        }, 1600); // Redirect after 1.3 seconds (adjust the delay as needed)
      }
    } catch (err) {
      throw err;
    }

    throw error;
  }
);

export default axios;
