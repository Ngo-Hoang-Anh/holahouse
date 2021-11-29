import React, {useEffect, useState} from "react";
import {Input, Form, Checkbox, Col, Row, Upload, message} from "antd";
import ProvinceGroup from "../../../components/ProvinceGroup";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {UTILITY_GET_LIST} from "../../../constants/ActionTypes";

const StepService = ({visible, form}) => {
  const [fileLists, setFileLists] = useState([]);
  const [fileEncode, setFileEncode] = useState([]);
  const {utilList} = useSelector(({utility}) => utility);
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
    if (file.status === "removed") {
      const files = fileEncode.filter((f) => f.uid !== file.uid);
      setFileEncode(files);
    } else {
      await fileList.map((fileIndex) => {

        //const fileString = await getBase64(fileIndex.originFileObj);
        setFileEncode([
          ...fileEncode,
          ...[
            {
              uid: fileIndex.uid,
              //string: fileString,
              file: fileIndex,
            },
          ],
        ]);
      });
    }
    setFileLists(fileList);
  };
  useEffect(() => {
    dispatch({
      type: UTILITY_GET_LIST,
      payload: {},
    });
  }, [fileEncode]);
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
          accept={`image/*`}
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
        rules={[
          {required: true, message: "Hãy nhập địa chỉ chi tiết"},
          {max: 255, message: "Không được nhập quá 255 kí tự"},
        ]}
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
export default StepService;
