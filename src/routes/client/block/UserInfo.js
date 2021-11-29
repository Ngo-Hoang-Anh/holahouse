import React from "react";
import {  Card, Form, Input } from "antd";

const UserInfo = () => {
  return (
    <Card title={`Thông tin tài khoản`}>
      <Form {...{ labelCol: { sm: 8 }, labelAlign: "left" }}>
        <Form.Item label={`Tên tài khoản`}>
          <Input disabled defaultValue={localStorage.getItem("username")} />
        </Form.Item>
        <Form.Item label={`Email`}>
          <Input defaultValue={localStorage.getItem("email")} />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserInfo;
