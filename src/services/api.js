//import axios
import axios from "axios";

// const Api = axios.create({
//   //set default endpoint API
//   baseURL: import.meta.env.VITE_API_URL,
// });

const Api = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      setContentType: "application/json",
    },
  });
};

export default Api;
