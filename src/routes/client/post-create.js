import React, { useState } from "react";
import { Button, Card, Form, Steps } from "antd";
import StepInfomations from "./post-steps/StepInfomations";
import StepPricing from "./post-steps/StepPricing";
import StepService from "./post-steps/StepService";
import StepPostDone from "./post-steps/StepPostDone";
import { formWrap } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { POST_CREATE } from "../../constants/ActionTypes";

const { Step } = Steps;
const PostCreate = () => {
  const [form] = Form.useForm();
  const [currentStep, setStep] = useState(0);
  const { actionLoad } = useSelector(({ post }) => post);
  const dispatch = useDispatch();
  const onNextStep = () => {
    let fieldsStep;
    switch (currentStep) {
      case 1:
        fieldsStep = [
          "cost",
          "downpayment",
          "electricCost",
          "waterCost",
          "internetCost",
        ];
        break;
      case 2:
        fieldsStep = [
          "files",
          "cityCode",
          "districtCode",
          "wardCode",
          "address",
          "utility",
        ];
        break;
      // case 3:
      //   fieldsStep = ['owner', 'phonenumber', 'title', 'description', 'curfew'];
      //   break;
      default:
        fieldsStep = [
          "postType",
          "roomType",
          "gender",
          "availableRoom",
          "capacity",
          "area",
        ];
        break;
    }
    form.validateFields(fieldsStep).then((values) => {
      if (!values.errorFields) {
        setStep(currentStep + 1);
      }
    });
  };
  const onFinish = (data) => {
    form
      .validateFields([
        "owner",
        "phonenumber",
        "title",
        "description",
        "curfew",
      ])
      .then((values) => {
        if (!values.errorFields) {
          dispatch({
            type: POST_CREATE,
            payload: data,
          });
        }
        // console.log(data);
      });
  };
  const onPreviousStep = () => {
    setStep(currentStep - 1);
  };
  return (
    <div className={`row row--25`}>
      <div className={`col-md-8 offset-md-2`}>
        <Card>
          <Steps size="small" current={currentStep}>
            <Step title="Thông tin phòng" />
            <Step title="Chi phí" />
            <Step title="Tiện ích" />
            <Step title="Hoàn thành đăng bài" />
          </Steps>
          <div className={`mt-4`}>
            <Form onFinish={onFinish} {...formWrap} form={form}>
              <StepInfomations form={form} visible={currentStep} />
              <StepPricing form={form} visible={currentStep} />
              <StepService form={form} visible={currentStep} />
              <StepPostDone form={form} visible={currentStep} />

              <div className={`d-flex justify-content-between`}>
                {currentStep > 0 && (
                  <Button onClick={onPreviousStep} type={`dashed`}>
                    <i className={`far fa-arrow-left mr-1`} /> Quay lại
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button
                    htmlType={`submit`}
                    loading={actionLoad}
                    type={`primary`}
                  >
                    Xác nhận
                    <i className={`far fa-check ml-1`} />
                  </Button>
                )}
                {currentStep < 3 && (
                  <Button onClick={onNextStep} type={`primary`}>
                    Tiếp theo
                    <i className={`far fa-arrow-right ml-1`} />
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default PostCreate;
