import React, {useEffect, useState} from "react";
import {Input, Form, Checkbox, Space, Col, Row, Upload, message} from "antd";
import ProvinceGroup from "../../../components/ProvinceGroup";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {UTILITY_GET_LIST} from "../../../constants/ActionTypes";

const StepServiceUpdate = ({visible, form, defaultList}) => {
  const [fileLists, setFileLists] = useState([]);
  const [fileEncode, setFileEncode] = useState([]);
  const [isRemoved, setRemoved] = useState(false);
  const [loading, setLoading] = useState(false);
  const {utilList, utilPaginate} = useSelector(({utility}) => utility);
  const dispatch = useDispatch();
  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );
  const handleChange = async ({file, fileList}) => {

    if (file.size > 10485760) {
      message.error('Dung lượng ảnh tối đa 10MB!');
      return;
    }

    setLoading(true);

    if (file.status === "removed") {
      setRemoved(true)
      const newFileList = fileList.filter(f => f.uid !== file.uid);
      const files = fileEncode.filter((f) => f.uid !== file.uid);
      setFileEncode(files);
      setFileLists(newFileList);
    } else {
      setFileLists(fileList);
      setRemoved(false)
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!isRemoved) {
      setFileLists([
        ...fileLists,
        ...defaultList
      ])
    }
    dispatch({
      type: UTILITY_GET_LIST,
      payload: {},
    });
  }, [fileEncode, defaultList]);
  return (
    <div className={`${visible !== 2 && "d-none"}`}>
      <h4 className={`step-title mb-5`}>Hình ảnh & Tiện ích</h4>
      <Form.Item
        name={`images`}
        rules={[{required: true, message: "Hãy tải lên ít nhất 1 hình ảnh"}]}
        label={`Hình ảnh`}
      >
        <Upload
          multiple
          //previewFile={false}
          beforeUpload={() => false}
          action={() => false}
          onRemove={file => {
            console.log("File remove:", file);
          }}
          accept={`image/*`}
          defaultFileList={fileLists}
          listType="picture-card"
          fileList={fileLists}
          onChange={handleChange}
        >
          {fileLists.length >= 8 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <ProvinceGroup
        form={form}
        districtName={`district`}
        cityName={`city`}
        wardName={`ward`}
        wardCode={`wardCode`}
        districtCode={`districtCode`}
        cityCode={`cityCode`}
        rules={{
          city: [{required: true, message: "Hãy chọn thành phố"}],
          district: [{required: true, message: "Hãy chọn Quận/Huyện"}],
          ward: [{required: true, message: "Hãy chọn Phường/Xã"}],
        }}
      />
      <Form.Item
        rules={[{max: 255, message: "Không được nhập quá 255 kí tự"}]}
        name={`address`}
        label={`Địa chỉ`}
      >
        <Input style={{width: "50%"}} placeholder={`Địa chỉ`}/>
      </Form.Item>
      <Form.Item label={`Tiện ích`} name={`utilities`}>
        <Checkbox.Group style={{width: "100%"}}>
          <Row>
            {utilList &&
            utilList.map((s, i) => {
              return (
                <Col key={i} sm={6}>
                  <Checkbox value={s.id}>{s.name}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};
export default StepServiceUpdate;
