import React from "react";
import { Form, InputNumber } from "antd";

const StepPricing = ({ visible, form }) => {
  return (
    <div className={`${visible !== 1 && "d-none"}`}>
      <h4 className={`step-title`}>Chi phí</h4>
      <Form.Item
        rules={[{ required: true, message: "Nhập giá cho thuê!" }]}
        name={`cost`}
        label={`Giá cho thuê`}
      >
        <InputNumber
          min={0} max={999999999999}
          style={{ width: 150 }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Nhập tiền đặt cọc!" }]}
        name={`downpayment`}
        label={`Tiền đặt cọc (VNĐ)`}
      >
        <InputNumber min={0} max={999999999999}
          style={{ width: 150 }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Nhập giá điện!" }]}
        name={`electricCost`}
        label={`Giá điện (VNĐ/số)`}
      >
        <InputNumber min={0} max={999999999999}
          style={{ width: 150 }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Nhập giá nước!" }]}
        name={`waterCost`}
        label={`Giá nước (VNĐ/khối)`}
      >
        <InputNumber min={0} max={999999999999}
          style={{ width: 150 }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Nhập giá internet!" }]}
        name={`internetCost`}
        label={`Giá internet (VNĐ/tháng)`}
      >
        <InputNumber min={0} max={999999999999}
          style={{ width: 150 }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')} />
      </Form.Item>
    </div>
  );
};
export default StepPricing;
