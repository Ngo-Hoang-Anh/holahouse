import { axiosCatch } from "../../util/Helper";
import { axiosAuth } from "../../util/Api";
import { REACT_APP_API_BASE_URL } from "../../common/common";
// services list post
const API_URL = REACT_APP_API_BASE_URL;
export const reqAuth = async (params) => {
  return await axiosAuth()
    .post(`${API_URL}/auth/signin`, params)
    .catch(axiosCatch);
};

export const reqAuthRegister = async (params) => {
  return await axiosAuth()
    .post(`${API_URL}/auth/signup`, params)
    .catch(axiosCatch);
};

export const reqForgotPassword = async (params) => {
  return await axiosAuth()
    .post(`${API_URL}/auth/forgot-password`, params)
    .catch(axiosCatch);
};

export const reqChangePassword = async (params) => {
  return await axiosAuth()
    .post(`${API_URL}/auth/change-password`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch(axiosCatch);
};
