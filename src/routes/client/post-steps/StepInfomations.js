import React, { useEffect } from "react";
import { Form, InputNumber, Radio, Space } from "antd";
import { Gender } from "../../../constants/constant";
import { useSelector, useDispatch } from "react-redux";
import {
  ROOM_TYPE_GET_LIST,
  POST_TYPE_GET_LIST,
} from "../../../constants/ActionTypes";
const StepInfomations = ({ visible, form }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: POST_TYPE_GET_LIST,
    });
    dispatch({
      type: ROOM_TYPE_GET_LIST,
    });
  }, []);
  const PostTypes = useSelector((postTypes) => postTypes.postTypes.postTypes);
  const RoomTypes = useSelector((roomTypes) => roomTypes.roomTypes.roomTypes);
  return (
    <div className={`${visible !== 0 && "d-none"}`}>
      <h4 className={`step-title`}>Thông tin chung</h4>

      <Form.Item
        label={`Loại hình`}
        name={`postType`}
        rules={[{ required: true, message: "Hãy chọn loại hình cho thuê!" }]}
      >
        <Radio.Group>
          <Space direction="horizontal">
            {PostTypes &&
              PostTypes.map((type, index) => (
                <Radio key={index} value={type.id}>
                  {type.name}
                </Radio>
              ))}
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Hãy chọn loại phòng!" }]}
        label={`Loại phòng`}
        name={`roomType`}
      >
        <Radio.Group>
          <Space direction="horizontal">
            {RoomTypes &&
              RoomTypes.map((type, index) => (
                <Radio key={index} value={type.id}>
                  {type.name}
                </Radio>
              ))}
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Hãy chọn đối tượng!" }]}
        label={`Đối tượng`}
        name={`gender`}
      >
        <Radio.Group>
          <Space direction="horizontal">
            {Gender &&
              Gender.map((type, index) => (
                <Radio key={index} value={type.title}>
                  {type.title}
                </Radio>
              ))}
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Hãy nhập số lượng phòng" },
          { pattern: /^([0-9]+)$/, message: "Số lượng phòng không hợp lệ" },
        ]}
        name={`availableRoom`}
        label={`Số lượng phòng`}
      >
        <InputNumber min={1} max={9999} />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Hãy nhập số người mỗi phòng" },
          { pattern: /^([0-9]+)$/, message: "Số người không hợp lệ" },
        ]}
        name={`capacity`}
        label={`Số người ở`}
      >
        <InputNumber min={1} max={9999} />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Hãy nhập diện tích phòng" },
          { pattern: /^(\d*\.)?\d+$/, message: "Diện tích không hợp lệ" },
        ]}
        name={`area`}
        label={`Diện tích`}
      >
        <InputNumber min={1} max={9999} />
      </Form.Item>
    </div>
  );
};
export default StepInfomations;
