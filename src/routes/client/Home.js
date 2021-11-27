import React, { useEffect, useState } from "react";
import {
  Card,
  Slider,
  Skeleton,
  Col,
  Row,
  Space,
  Image,
  List,
  Button,
  Form,
  Input,
  Checkbox,
  Radio,
} from "antd";
import { defaultImage, renderNumberFormat } from "../../util/Helper";
import ProvinceGroup from "./../../components/ProvinceGroup";
import PostBlock from "./block/PostBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  POST_GET_ALL,
  POST_TYPE_GET_LIST,
  UTILITY_GET_LIST,
  ROOM_TYPE_GET_LIST,
  POST_COST_MIN_MAX,
} from "../../constants/ActionTypes";
import { Gender } from "./../../constants/constant";
import SliderHome from "./SliderHome";

const Home = () => {
  const { minCost, maxCost, publicPostList, listLoad, postPaginate } =
    useSelector(({ post }) => post);
  const PostTypes = useSelector((postTypes) => postTypes.postTypes.postTypes);
  const PostServices = useSelector((utility) => utility.utility.utilList);
  const RoomTypes = useSelector((roomTypes) => roomTypes.roomTypes.roomTypes);
  const [costRange, setCostRange] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const postGetList = (params = {}) => {
    dispatch({
      type: POST_GET_ALL,
      payload: {
        ...params,
      },
    });
  };

  useEffect(() => {
    postGetList();
    dispatch({
      type: POST_TYPE_GET_LIST,
    });
    dispatch({
      type: UTILITY_GET_LIST,
    });
    dispatch({
      type: ROOM_TYPE_GET_LIST,
    });
    dispatch({
      type: POST_COST_MIN_MAX,
    });
  }, []);
  const onFinish = (values) => {
    let data = form.getFieldsValue();
    data.costFrom = costRange[0];
    data.costTo = costRange[1];
    postGetList(data);
  };
  return (
    <>
      <SliderHome />
      <br />
      <div className="row row--25">
        <div className={`col-md-4`}>
          <div className="axil-blog-sidebar" style={{ minWidth: "250px" }}>
            <Form
              form={form}
              name="basic"
              autoComplete="off"
              onFinish={onFinish}
            >
              <Card
                title={
                  <h5 style={{ paddingTop: "15px", color: "#4db8ff" }}>
                    Bộ lọc
                  </h5>
                }
                extra={
                  <Button htmlType="submit" type={`primary`}>
                    Áp dụng
                  </Button>
                }
              >
                <ProvinceGroup
                  form={form}
                  districtName={`district`}
                  cityName={`city`}
                  wardName={`ward`}
                  wardCode={`wardCode`}
                  districtCode={`districtCode`}
                  cityCode={`cityCode`}
                  rules={{
                    city: [],
                    district: [],
                    ward: [],
                  }}
                />
              </Card>
              <Card>
                <Form.Item
                  label={<h6>Hình thức</h6>}
                  name={`postType`}
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {PostTypes &&
                      PostTypes.map((s, i) => {
                        return (
                          <Col key={i}>
                            <Checkbox value={s.id}>
                              <p className={`post-label-black`}>{s.name}</p>
                            </Checkbox>
                          </Col>
                        );
                      })}
                  </Checkbox.Group>
                </Form.Item>
              </Card>
              <Card>
                <Form.Item
                  label={<h6>Loại phòng</h6>}
                  name={`roomType`}
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {RoomTypes &&
                      RoomTypes.map((s, i) => {
                        return (
                          <Col key={i}>
                            <Checkbox value={s.id}>
                              <p className={`post-label-black`}>{s.name}</p>
                            </Checkbox>
                          </Col>
                        );
                      })}
                  </Checkbox.Group>
                </Form.Item>
              </Card>
              <Card>
                <Form.Item
                  label={
                    <h6>
                      Giá: {costRange[0] ? renderNumberFormat(costRange[0]) : 0}{" "}
                      vnđ -{" "}
                      {costRange[1]
                        ? renderNumberFormat(costRange[1])
                        : maxCost}{" "}
                      vnđ
                    </h6>
                  }
                  labelCol={{ span: 24 }}
                  name="cost"
                >
                  <Slider
                    style={{ display: "block" }}
                    range
                    step={100000}
                    min={minCost}
                    max={maxCost}
                    defaultValue={[minCost, maxCost]}
                    onChange={(values) => {
                      setCostRange(values);
                    }}
                  />
                </Form.Item>
              </Card>

              <Card>
                <Form.Item
                  label={<h6>Tiện ích</h6>}
                  name={`utilities`}
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group style={{ width: "100%" }}>
                    {PostServices &&
                      PostServices.map((s, i) => {
                        return (
                          <Col key={i}>
                            <Checkbox value={s.id}>
                              <p className={`post-label-black`}>{s.name}</p>
                            </Checkbox>
                          </Col>
                        );
                      })}
                  </Checkbox.Group>
                </Form.Item>
              </Card>
              <Card>
                <Form.Item
                  label={<h6>Giới tính</h6>}
                  name={`gender`}
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group>
                    <Space direction="vertical">
                      {Gender &&
                        Gender.map((type, index) => (
                          <Checkbox key={index} value={type.title}>
                            <p className={`post-label-black`}>{type.title}</p>
                          </Checkbox>
                        ))}
                    </Space>
                  </Checkbox.Group>
                </Form.Item>
              </Card>
            </Form>
            <Card style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button htmlType="submit" type={`primary`} onClick={onFinish}>
                Áp dụng
              </Button>
            </Card>
          </div>
        </div>
        <div className="col-md-8">
          <Card>
            {listLoad ? (
              <Skeleton />
            ) : (
              <List
                size={`large`}
                pagination={{
                  onChange: (page) => postGetList({ page: page }),
                  ...postPaginate,
                }}
                dataSource={publicPostList}
                renderItem={(item) => <PostBlock item={item} />}
              />
            )}
          </Card>
        </div>
      </div>
    </>
  );
};
export default Home;
