//import axios
import axios from "axios";

const Api = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      setContentType: "application/json",
    },
  });
};

export default Api;
