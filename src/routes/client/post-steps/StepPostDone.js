import React, { useState, useEffect } from "react";
import { Form, Input, Select, TimePicker } from "antd";
import moment from "moment";

const StepPostDone = ({ visible, form }) => {
  const [freeTime, setFreeTime] = useState(1);
  const format = "HH:mm";
  useEffect(() => {
    let curfew = form.getFieldValue("curfew");
    if (curfew == 2) {
      setFreeTime(false);
    }
  }, [form.getFieldValue("curfew")]);
  return (
    <div className={`${visible !== 3 && "d-none"}`}>
      <h4 className={`step-title`}>Xác nhận</h4>
      <Form.Item
        label={`Tên chủ nhà`}
        name={`owner`}
        rules={[
          { required: true, message: "Hãy nhập tên chủ nhà" },
          { max: 50, message: "Không được nhập quá 50 kí tự" },
          {
            pattern:
              /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$$/,
            message: "Tên chủ trọ chỉ được chứa chữ và số",
          },
        ]}
      >
        <Input placeholder={`Tên chủ nhà`} />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Hãy nhập số điện thoại" },
          { pattern: /^\d{10}$/, message: "Số điện thoại không hợp lệ!" },
        ]}
        label={`Số điện thoại`}
        name={`phonenumber`}
      >
        <Input placeholder={`Số điện thoại`} />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Hãy nhập tiêu đề bài đăng" },
          { max: 100, message: "Không được nhập quá 100 kí tự" },
        ]}
        label={`Tiêu đề bài đăng`}
        name={`title`}
      >
        <Input placeholder={`Tiêu đề bài đăng`} />
      </Form.Item>
      <Form.Item
        rules={[
          { max: 255, message: "Không được nhập quá 255 kí tự" },
        ]}
        label={`Link facebook`} name={`facebook`}>
        <Input placeholder={`Link facebook`} />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Hãy nhập nội dung mô tả" },
          { max: 800, message: "Không được nhập quá 800 kí tự" },
        ]}
        label={`Nội dung mô tả`}
        name={`description`}
      >
        <Input.TextArea rows={8} placeholder={`Nội dung mô tả`} />
      </Form.Item>
      <Form.Item label={`Thời gian mở cổng`} name={`curfew`}>
        <Select
          onChange={(value) => setFreeTime(value === 1)}
          style={{ width: "200px" }}
          defaultValue={1}
        >
          <Select.Option value={1}>Tự do thời gian</Select.Option>
          <Select.Option value={2}>Thời gian giới hạn</Select.Option>
        </Select>
      </Form.Item>
      {!freeTime && (
        <Form.Item label="Thời gian giới hạn" style={{ marginBottom: 0 }}>
          <Form.Item
            label="Giờ mở cổng"
            name="from"
            rules={[{ required: true, message: "Hãy nhập thời gian mở cổng" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <TimePicker format={format} />
          </Form.Item>
          <Form.Item
            label="Giờ đóng cổng"
            name="to"
            dependencies={["from"]}
            hasFeedback
            rules={[
              { required: true, message: "Hãy nhập thời gian đóng cổng" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.isAfter(moment(getFieldValue("from")))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Giờ đóng cổng phải muộn hơn giờ mở cổng")
                  );
                },
              }),
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <TimePicker format={format} />
          </Form.Item>
        </Form.Item>
      )}
    </div>
  );
};
export default StepPostDone;
