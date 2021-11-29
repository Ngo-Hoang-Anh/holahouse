import { axiosAuth } from "../../util/Api";
import { axiosCatch, b64toBlob } from "../../util/Helper";
import moment from "moment";
import { REACT_APP_API_BASE_URL } from "../../common/common";
// services list post
const API_URL = REACT_APP_API_BASE_URL;
export const reqPostGetList = async (params = {}) => {
  return await axiosAuth()
    .get(`${API_URL}/post/manage-post-user`, { params })
    .catch(axiosCatch);
};

export const reqPostGetAll = async (params = {}) => {
  if (params.page) {
    return await axiosAuth()
      .post(
        `${API_URL}/homepage/public-posts?page=` + params.page,
        params
      )
      .catch(axiosCatch);
  }
  return await axiosAuth()
    .post(`${API_URL}/homepage/public-posts`, params)
    .catch(axiosCatch);
};

export const reqPostGetDetail = async (postId) => {
  return await axiosAuth().get(`${API_URL}/post/${postId}`).catch(axiosCatch);
};
export const reqApprovePost = async (postId) => {
  return await axiosAuth()
    .put(`${API_URL}/post/update-status/${postId}`, {
      status: "approved",
      content: null,
    })
    .catch(axiosCatch);
};
export const reqPostCreate = async (payload) => {
  const files = payload.images.fileList;
  const formData = new FormData();
  if (files.length > 0) {
    for (const i in files) {
      if (files[i].thumbUrl) {
        formData.append("images", b64toBlob(files[i].thumbUrl, files[i].size));
      }
    }
  }
  let postData = {
    postType: payload.postType,
    roomType: payload.roomType,
    availableRoom: payload.availableRoom,
    capacity: payload.capacity,
    gender: payload.gender,
    area: payload.area,
    cost: payload.cost,
    downpayment: payload.downpayment,
    electricCost: payload.electricCost,
    waterCost: payload.waterCost,
    internetCost: payload.internetCost,
    city: payload.city,
    district: payload.district,
    ward: payload.ward,
    address: payload.address,
    phonenumber: payload.phonenumber,
    title: payload.title,
    owner: payload.owner,
    utilities: payload.utilities,
    curfew: payload.curfew,
    facebook: payload.facebook,
    description: payload.description,
    districtCode: payload.districtCode,
    wardCode: payload.wardCode,
    cityCode: payload.cityCode,
  };
  if (payload.curfew === 1) {
    payload.curfew = null;
  } else if (payload.curfew === 2) {
    let strCurfew =
      moment(payload.from).format("HH:mm") +
      " - " +
      moment(payload.to).format("HH:mm");
    postData.curfew = strCurfew;
  }
  formData.append("post", JSON.stringify(postData));
  return await axiosAuth()
    .post(`${API_URL}/post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch(axiosCatch);
};
export const reqPostUpdate = async ({ id, payload }) => {
  const formData = new FormData();
  const files = payload.images;
  if (typeof files.fileList !== "undefined") {
    if (files.fileList.length > 0) {
      for (const i in files) {
        if (files[i].thumbUrl) {
          formData.append(
            "images",
            b64toBlob(files[i].thumbUrl, files[i].size)
          );
        }
      }
    }
  }

  let postData = {
    postType: payload.postType,
    roomType: payload.roomType,
    availableRoom: payload.availableRoom,
    capacity: payload.capacity,
    gender: payload.gender,
    area: payload.area,
    cost: payload.cost,
    downpayment: payload.downpayment,
    electricCost: payload.electricCost,
    waterCost: payload.waterCost,
    internetCost: payload.internetCost,
    city: payload.city,
    district: payload.district,
    ward: payload.ward,
    address: payload.address,
    phonenumber: payload.phonenumber,
    title: payload.title,
    owner: payload.owner,
    utilities: payload.utilities,
    curfew: payload.curfew,
    facebook: payload.facebook,
    description: payload.description,
    districtCode: payload.districtCode,
    wardCode: payload.wardCode,
    cityCode: payload.cityCode,
  };
  if (payload.curfew === 1) {
    payload.curfew = null;
  } else if (payload.curfew === 2) {
    let strCurfew =
      moment(payload.from).format("HH:mm") +
      " - " +
      moment(payload.to).format("HH:mm");
    postData.curfew = strCurfew;
  }
  formData.append("post", JSON.stringify(postData));
  return await axiosAuth()
    .post(`${API_URL}/post/update/` + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch(axiosCatch);
};
export const reqDeletePost = async (id) => {
  return await axiosAuth()
    .delete(`${API_URL}/post/delete/` + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch(axiosCatch);
};
export const reqAdminDeletePost = async (id, content) => {
  return await axiosAuth()
    .delete(`${API_URL}/post/delete/` + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        content: content,
      },
    })
    .catch(axiosCatch);
};

export const reqDisapprovePost = async (postId, content) => {
  return await axiosAuth()
    .put(`${API_URL}/post/update-status/${postId}`, {
      status: "disapproved",
      content: content,
    })
    .catch(axiosCatch);
};
export const reqUpdateAvailablePost = async (id, number) => {
  return await axiosAuth()
    .put(
      `${API_URL}/post/update-room-quantity/` + id,
      { quantity: number },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch(axiosCatch);
};
export const reqReUpPost = async (id) => {
  return await axiosAuth()
    .put(`${API_URL}/post/extend-post/` + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch(axiosCatch);
};

export const reqCostMinMax = async () => {
  return await axiosAuth()
    .get(`${API_URL}/post/cost-min-max`)
    .catch(axiosCatch);
};
