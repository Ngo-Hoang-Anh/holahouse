import React, { useEffect, useState } from "react";
import { Button, Card, Form, message, Steps } from "antd";
import StepInfomations from "./post-steps/StepInfomations";
import StepPricing from "./post-steps/StepPricing";
import StepService from "./post-steps/StepService";
import StepPostDone from "./post-steps/StepPostDone";
import { formWrap } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { POST_UPDATE } from "../../constants/ActionTypes";
import { useParams } from "react-router-dom";
import { reqPostGetDetail } from "../../appRedux/services/post";
import moment from "moment";
import StepServiceUpdate from "./post-steps/StepServiceUpdate";

const { Step } = Steps;
const PostUpdate = () => {
  const format = "HH:mm";
  let { id } = useParams();
  const { actionLoad } = useSelector(({ post }) => post);
  const [form] = Form.useForm();
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const [defaultList, setDefaultList] = useState([]);
  const onFinish = (data) => {
    form
      .validateFields([
        "owner",
        "phonenumber",
        "title",
        "description",
        "curfew",
        "postType",
        "roomType",
        "gender",
        "availableRoom",
        "capacity",
        "area",
        "files",
        "cityCode",
        "districtCode",
        "wardCode",
        "address",
        "utility",
        "cost",
        "downpayment",
        "electricCost",
        "waterCost",
        "internetCost",
      ])
      .then((values) => {
        if (!values.errorFields) {
          dispatch({
            type: POST_UPDATE,
            payload: { id, data },
          });
        }
      });
  };
  useEffect(() => {
    (async () => {
      try {
        const post = await reqPostGetDetail(id);
        let postData = post.data;
        setPost(postData);

        let cfw = postData.curfew;
        if (typeof cfw === "string") {
          const timer = cfw.split(" - ");
          form.setFieldsValue({
            ...postData,
            from: moment(timer[0], "H:m"),
            to: moment(timer[1], "H:m"),
            curfew: 2,
          });
          console.log(timer);
        } else {
          form.setFieldsValue({
            ...postData,
            curfew: 1,
          });
        }
        form.setFieldsValue({
          ...form.getFieldsValue(),
          postType: postData.postType.id,
          roomType: postData.roomType.id,
          utilities: postData.utilities.map((item) => item.id),
        });

        const images = postData.images;
        if (images?.length > 0) {
          const fileList = images.map((img, index) => {
            return {
              uid: `img_${index}`,
              name: `img_${index}.png`,
              status: "done",
              url: img.path,
            };
          });
          setDefaultList(fileList);
        }
      } catch (e) {
        message.error(e.message);
      }
    })();
  }, []);
  return (
    <div className={`row row--25`}>
      <div className={`col-md-8 offset-md-2`}>
        <Card>
          <div className={`mt-4`}>
            <Form onFinish={onFinish} {...formWrap} form={form}>
              <StepInfomations form={form} visible={0} />
              <StepPricing form={form} visible={1} />
              <StepServiceUpdate
                defaultList={defaultList}
                form={form}
                visible={2}
              />
              <StepPostDone form={form} visible={3} />
              <div className={`d-flex justify-content-between`}>
                <Button
                  htmlType={`submit`}
                  loading={actionLoad}
                  type={`primary`}
                >
                  Xác nhận
                  <i className={`far fa-check ml-1`} />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default PostUpdate;
