import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../common/common";
// services list post

export const axiosAuth = (headers = {}) => {
  const { REACT_APP_API_URL } = REACT_APP_API_BASE_URL;
  const opts = {
    baseURL: REACT_APP_API_URL + "/api",
    headers: {
      ...{
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      ...headers,
    },
  };
  return axios.create(opts);
};

export default axios.create({
  baseURL: REACT_APP_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
