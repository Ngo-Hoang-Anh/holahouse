import { axiosAuth } from "../../util/Api";
import { axiosCatch } from "../../util/Helper";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// services list post
export const reqRoomTypeGetList = async (params = {}) => {
  return await axiosAuth()
    .get(`${API_URL}/roomtype/all`, { params })
    .catch(axiosCatch);
};
