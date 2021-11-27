import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../appRedux/actions";
import { message } from "antd";
import {
  reqForgotPassword,
  reqChangePassword,
} from "../../appRedux/services/auth";
const Login = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector(({ auth }) => auth.token);
  const [forgetPasswordForm] = Form.useForm();
  const [currentEmail, setCurrentEmail] = useState(null);
  const [currentStep, setStep] = useState(0);
  const onFinish = (values) => {
    dispatch(userSignIn(values));
  };

  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }
  }, [token, props.history]);
  const onNextStep = () => {
    let fieldsStep;
    switch (currentStep) {
      case 0:
        fieldsStep = ["email"];
        break;
      case 1:
        fieldsStep = ["otp", "newPassword"];
        break;
    }
    forgetPasswordForm.validateFields(fieldsStep).then((values) => {
      if (!values.errorFields) {
        switch (currentStep) {
          case 0:
            try {
              reqForgotPassword({ email: values.email }).then((res) => {
                setCurrentEmail(values.email);
                message.success(
                  "OTP đã được gửi đến email, vui lòng kiểm tra và xác nhận"
                );
                setStep(currentStep + 1);
              });
            } catch (e) {
              message.error(
                "Không tìm thấy email này trong hệ thống, vui lòng kiểm tra lại"
              );
            }
            break;
          case 1:
            try {
              console.log(values);
              reqChangePassword({
                email: currentEmail,
                otp: values.otp,
                newpassword: values.newPassword,
              }).then((res) => {
                message.success("Mật khẩu đổi thành công");
              });
            } catch (e) {
              message.error("Có lỗi xảy ra, vui lòng thử lại");
            }
            break;
        }
      }
    });
  };

  return (
    <div className={`full-content`}>
      <div className="row row--25">
        <div className={`col-md-6 offset-md-3`}>
          <div className="contact-form-wrapper">
            <div className="axil-contact-form contact-form-style-1">
              <h3 className="title">ĐĂNG NHẬP</h3>
              <Form onFinish={onFinish} layout={`vertical`} form={form}>
                <Form.Item
                  label={`Tên đăng nhập`}
                  name={`username`}
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
                >
                  <Input placeholder={`Tên đăng nhập`} />
                </Form.Item>
                <Form.Item
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
                  label={`Mật khẩu`}
                  name={`password`}
                >
                  <Input.Password visibilityToggle placeholder={`Mật khẩu`} />
                </Form.Item>
                <div className="form-group">
                  <Button
                    htmlType={`submit`}
                    type={`primary`}
                    className="axil-button btn-large w-100"
                  >
                    <span className="button-text">ĐĂNG NHẬP</span>
                    <span className="button-icon" />
                  </Button>
                  <Button type={`link`} onClick={() => setShowModal(true)}>
                    Quên mật khẩu?
                  </Button>
                </div>
              </Form>
              <div className="callto-action-wrapper text-center">
                <span className="text">Hoặc</span>
                <span>
                  <i className="fal fa-signup" />{" "}
                  <Link to="/register">ĐĂNG KÍ NGAY</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          setStep(0);
        }}
        title={`Yêu cầu mật khẩu`}
        footer={[]}
        width={350}
      >
        <Form
          form={forgetPasswordForm}
          className={`text-center`}
          layout={`vertical`}
        >
          <div className={`${currentStep !== 0 && "d-none"}`}>
            <Form.Item
              label={`Email`}
              name={`email`}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Email",
                },
                {
                  pattern:
                    /^[a-z][a-z0-9_\.]{0,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                  message: "Vui lòng nhập Email hợpl lệ",
                },
              ]}
            >
              <Input placeholder={`Nhập email của bạn`} />
            </Form.Item>
            <Button onClick={onNextStep} type={`primary`}>
              Tiếp theo
              <i className={`far fa-arrow-right ml-1`} />
            </Button>
          </div>
          <div className={`${currentStep !== 1 && "d-none"}`}>
            <Form.Item label={`OTP`} name={`otp`}>
              <Input placeholder={`Nhập OTP`} />
            </Form.Item>
            <Form.Item
              label={`Mật khẩu mới`}
              name={`newPassword`}
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
            >
              <Input.Password
                visibilityToggle
                placeholder={`Nhập mật khẩu mới`}
              />
            </Form.Item>
            <Button onClick={onNextStep} type={`primary`}>
              Đổi mật khẩu
              <i className={`far fa-arrow-right ml-1`} />
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default Login;
