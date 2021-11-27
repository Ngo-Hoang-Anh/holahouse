import React from "react";
import { Button, Card, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { CHANGE_PASSWORD } from "../../../constants/ActionTypes";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const onFinish = (data) => {
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    });
  };
  return (
    <Card title={`Đổi mật khẩu`}>
      <Form
        {...{ labelCol: { sm: 8 }, labelAlign: "left" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="oldpassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              pattern: /^.{6,30}$/,
              message: "Mật khẩu dài từ 6-30 ký tự",
            },
            {
              pattern: /^(?=\S+$).*$/,
              message: "Mật khẩu không được chứa khoảng trắng",
            },
          ]}
          label={`Mật khẩu cũ`}
        >
          <Input.Password visibilityToggle />
        </Form.Item>
        <Form.Item
          name="newpassword"
          label={`Mật khẩu mới`}
          dependencies={["oldpassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu mới",
            },
            {
              pattern: /^.{6,30}$/,
              message: "Mật khẩu dài từ 6-30 ký tự",
            },
            {
              pattern: /^(?=\S+$).*$/,
              message: "Mật khẩu không được chứa khoảng trắng",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("oldpassword") == value) {
                  return Promise.reject(
                    new Error("Mật khẩu mới không được giống mật khẩu cũ")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password visibilityToggle />
        </Form.Item>
        <Button htmlType={`submit`} type={`primary`}>
          Cập nhật
        </Button>
      </Form>
    </Card>
  );
};
export default ChangePassword;
