import React from "react";
import { Button, Card, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGNUP_USER } from "../../constants/ActionTypes";

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (data) => {
    dispatch({
      type: SIGNUP_USER,
      payload: data,
    });
  };
  return (
    <div className={`full-content`}>
      <div className="row row--25">
        <div className={`col-md-6 offset-md-3`}>
          <div className="contact-form-wrapper">
            <div className="axil-contact-form contact-form-style-1">
              <h3 className="title">ĐĂNG KÝ TÀI KHOẢN</h3>
              <Form onFinish={onFinish} layout={`vertical`} form={form}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên đăng nhập",
                    },
                    {
                      pattern: /^.{0,16}$/,
                      message: "Tên đăng nhập không dài quá 16 kí tự",
                    },
                    {
                      pattern: /^[A-Za-z0-9]+$/,
                      message: "Tên đăng nhập chỉ được chứa chữ và số",
                    },
                  ]}
                  label={`Tên đăng nhập`}
                  name={`username`}
                >
                  <Input placeholder={`Tên đăng nhập`} />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Email",
                    },
                    {
                      pattern:
                        /^[a-z][a-z0-9_\.]{0,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                      message: "Vui lòng nhập Email hợp lệ",
                    },
                  ]}
                  label={`Email`}
                  name={`email`}
                >
                  <Input placeholder={`Email`} />
                </Form.Item>
                <Form.Item
                  label={`Mật khẩu`}
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
                  name={`password`}
                >
                  <Input.Password visibilityToggle placeholder={`Mật khẩu`} />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Xác nhận mật khẩu"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Hãy xác nhận mật khẩu",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("2 mật khẩu không khớp")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    visibilityToggle
                    placeholder="Xác nhận mật khẩu"
                  />
                </Form.Item>
                <div className="form-group">
                  <Button
                    htmlType={`submit`}
                    type={`primary`}
                    className="axil-button btn-large w-100"
                  >
                    <span className="button-text">ĐĂNG KÝ</span>
                    <span className="button-icon" />
                  </Button>
                </div>
              </Form>
              <div className="callto-action-wrapper text-center">
                <span className="text">Hoặc</span>
                <span>
                  <i className="fal fa-signup" />{" "}
                  <Link to="/login">ĐĂNG NHẬP</Link>
                </span>
                <span> nếu đã có tài khoản</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
