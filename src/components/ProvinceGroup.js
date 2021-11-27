import React, { useState } from "react";
import { Form, Select, Row, Col, Input } from "antd";
import { getDistrictsData, getWardData } from "../util/Helper";
import { useSelector } from "react-redux";

const ProvinceGroup = ({ ...props }) => {
  const {
    horizontal,
    columns,
    label,
    form,
    districtName,
    cityName,
    wardName,
    districtCode,
    cityCode,
    wardCode,
    emptyName,
    rules,
  } = props;
  const { cities } = useSelector(({ common }) => common);
  const [state, setState] = useState({
    district: [],
    loadingDistrict: false,
    ward: [],
    loadingWard: false,
  });
  const setName = (name, value) => {
    form.setFieldsValue({
      [name]: value,
    });
  };
  const selectCity = (val, evt) => {
    form.resetFields([districtName ? districtName : "districtName"]);
    form.resetFields([wardName ? wardName : "wardName"]);
    setName(cityCode, evt.code);
    onGetDistrict(evt.code);
  };

  const selectDistrict = (val, evt) => {
    form.resetFields([wardName ? wardName : "wardName"]);
    setName(districtCode, evt.code);
    onGetWard(evt.code);
  };
  const onGetDistrict = (cityKey) => {
    setState({
      ...state,
      ...{ loadingDistrict: true },
    });
    getDistrictsData(cityKey, (districts) => {
      setState({
        ...state,
        district: districts,
        loadingDistrict: false,
      });
    });
  };
  const onGetWard = (districtKey) => {
    setState({
      ...state,
      loadingWard: true,
    });
    getWardData(districtKey, (wards) => {
      setState({
        ...state,
        ward: wards,
        loadingWard: false,
      });
    });
  };

  return (
    <Row>
      <Col sm={24}>
        <Form.Item name={wardCode ? wardCode : "wardCode"} hidden>
          <Input />
        </Form.Item>
        <Form.Item name={cityCode ? cityCode : "cityCode"} hidden>
          <Input />
        </Form.Item>
        <Form.Item name={districtCode ? districtCode : "districtCode"} hidden>
          <Input />
        </Form.Item>
        <Form.Item
          colon={false}
          name={cityName ? cityName : "cityName"}
          rules={rules.city}
          label={
            <div style={{ minWidth: "120px", textAlign: "left" }}>
              <h6>Tỉnh/Thành Phố</h6>
            </div>
          }
        >
          <Select
            style={{ width: "50%", minWidth: "210px" }}
            optionFilterProp="children"
            onChange={selectCity}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            showSearch
            placeholder={`Chọn Tỉnh/Thành phố`}
          >
            {cities
              ? cities.map((item, index) => {
                  return (
                    <Select.Option
                      code={item.code}
                      key={index}
                      value={item.name}
                    >
                      {item.name}
                    </Select.Option>
                  );
                })
              : null}
          </Select>
        </Form.Item>
      </Col>
      <Col sm={24}>
        <Form.Item
          colon={false}
          name={districtName ? districtName : `districtName`}
          label={
            <div style={{ minWidth: "120px", textAlign: "left" }}>
              <h6>Quận/Huyện</h6>
            </div>
          }
          rules={rules.district}
        >
          <Select
            style={{ width: "50%", minWidth: "210px" }}
            className="gx-mr-3"
            showSearch
            disabled={state.loadingDistrict}
            onChange={selectDistrict}
            placeholder={`Chọn quận/Huyện`}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {state.district.map((item, index) => {
              return (
                <Select.Option key={index} code={item.code} value={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col sm={24}>
        <Form.Item
          colon={false}
          name={wardName ? wardName : `wardName`}
          label={
            <div style={{ minWidth: "120px", textAlign: "left" }}>
              <h6>Phường/Xã</h6>
            </div>
          }
          rules={rules.ward}
        >
          <Select
            className="gx-mr-3"
            showSearch
            style={{ width: "50%", minWidth: "210px" }}
            disabled={state.loadingWard}
            onChange={(val, evt) => setName(wardCode, evt.code)}
            placeholder={`Chọn phường/xã`}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {state.ward.map((item, index) => {
              return (
                <Select.Option key={index} value={item.name} code={item.code}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};
export default ProvinceGroup;
