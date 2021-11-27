import { axiosAuth } from "../../util/Api";
import { axiosCatch } from "../../util/Helper";
import { REACT_APP_API_BASE_URL } from "../../common/common";
// services list post
const API_URL = REACT_APP_API_BASE_URL;
export const reqAdminPostGetAll = async (params = {}) => {
  if (params.page) {
    return await axiosAuth()
      .get(`${API_URL}/post/manage-post-admin?page=` + params.page, params)
      .catch(axiosCatch);
  }
  return await axiosAuth()
    .get(`${API_URL}/post/manage-post-admin`, params)
    .catch(axiosCatch);
};
