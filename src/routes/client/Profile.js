import React, { useState } from "react";
import { Button, Card, Form, Input, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./block/UserInfo";
import { userSignOut } from "../../appRedux/actions";
import ChangePassword from "./block/ChangePassword";
import PostList from "./block/PostList";

const Profile = () => {
  const dispatch = useDispatch();
  let { token, authUser, role } = useSelector(({ auth }) => auth);
  const [blockShow, setBlockShow] = useState("info");
  const getBlock = () => {
    switch (blockShow) {
      case "postList":
        return <PostList />;
      case "changePassword":
        return <ChangePassword />;
      default:
        return <UserInfo />;
    }
  };
  return (
    <div className={`pb-5`} style={{ minWidth: "900px" }}>
      <div className="row row--25">
        <div className={`col-md-3`}>
          <Menu>
            <Menu.Item onClick={() => setBlockShow("info")}>
              Thông tin chung
            </Menu.Item>
            <Menu.Item onClick={() => setBlockShow("changePassword")}>
              Đổi mật khẩu
            </Menu.Item>
            <Menu.Item onClick={() => setBlockShow("postList")}>
              Bài đăng
            </Menu.Item>
            <Menu.Item onClick={() => dispatch(userSignOut())}>
              Đăng xuất
            </Menu.Item>
          </Menu>
        </div>
        <div className={`col-md-9`}>{getBlock()}</div>
      </div>
    </div >
  );
};
export default Profile;
