import { axiosCatch } from "../../util/Helper";
import axios from "axios";

export const getWardList = async (district) => {
  return await axios
    .get(`/hanh-chinh/xa-phuong/${district}.json`)
    .catch(axiosCatch);
};

export const getCityList = async () => {
  return await axios.get("/hanh-chinh/tinh_tp.json").catch(axiosCatch);
};

export const getDistrictList = async (city) => {
  return await axios
    .get(`/hanh-chinh/quan-huyen/${city}.json`)
    .catch(axiosCatch);
};

export const handleUploadMedia = (
  file,
  successCallback,
  errorCallBack,
  onUploadProgress
) => {
  let formData = new FormData();
  formData.append("imageFile", file);
  formData.append("fileType", "image");
  axios
    .create({
      baseURL: "/uploadurl",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => onUploadProgress(event),
    })
    .post("uploadpath", formData)
    .then((res) => {
      if (successCallback) {
        successCallback(res.data);
      }
    })
    .catch((e) => {
      if (errorCallBack) {
        errorCallBack(e);
      }
    });
};

export const callGetMenu = async (role) => {
  switch (role) {
    case "ROLE_ADMIN":
      return [
        {
          key: "home",
          path: "home",
          component: import("../../routes/cms/Dashboard/index"),
          icon: "icon-data-display",
          displayName: "Tổng quan",
          isMenu: true,
        },
        {
          key: "manage-post",
          path: "/manage-post",
          component: import("../../routes/admin/PostListAdmin"),
          displayName: "Quản lý bài đăng",
          isMenu: true,
        },
        {
          key: "post-detail",
          path: "/post/:id",
          exact: true,
          isMenu: false,
          component: import("../../routes/client/post-detail"),
          displayName: "",
        },
        //always put default route last
        {
          key: "admin-home-default",
          path: "/",
          isMenu: false,
          component: import("../../routes/cms/Dashboard/index"),
        },
      ];
    case "ROLE_USER":
      return [
        {
          key: "client-home",
          path: "/",
          exact: true,
          isMenu: true,
          component: import("../../routes/client/Home"),
          displayName: "Trang chủ",
        },
        {
          key: "post",
          path: "/post",
          isMenu: true,
          exact: true,
          component: import("../../routes/client/post-create"),
          displayName: "Đăng bài",
        },
        {
          key: "profile",
          path: "/profile",
          exact: true,
          isMenu: true,
          component: import("../../routes/client/Profile"),
          displayName: localStorage.getItem("username"),
        },
        {
          key: "post-detail",
          path: "/post/:id",
          exact: true,
          isMenu: false,
          component: import("../../routes/client/post-detail"),
          displayName: "",
        },
        {
          key: "post-update",
          path: "/post/update/:id",
          isMenu: false,
          component: import("../../routes/client/post-update"),
          displayName: "",
        },
        //always put default route last
        {
          key: "client-home-default",
          path: "/",
          isMenu: false,
          component: import("../../routes/client/Home"),
        },
      ];
    default:
      return [
        {
          key: "client-home",
          path: "/",
          exact: true,
          isMenu: true,
          component: import("../../routes/client/Home"),
          displayName: "Trang chủ",
        },
        {
          key: "login",
          path: "/login",
          isMenu: true,
          displayName: "Đăng nhập",
          component: import("../../routes/client/login"),
        },
        {
          key: "register",
          path: "/register",
          isMenu: true,
          displayName: "Đăng ký",
          component: import("../../routes/client/register"),
        },
        {
          key: "post-detail",
          path: "/post/:id",
          exact: true,
          isMenu: false,
          component: import("../../routes/client/post-detail"),
          displayName: "",
        },
        //always put default route last
        {
          key: "guest-default",
          path: "/",
          isMenu: false,
          component: import("../../routes/client/login"),
        },
      ];
  }
};
