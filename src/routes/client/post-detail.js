import React, { useEffect, useState } from "react";
import { reqPostGetDetail } from "../../appRedux/services/post";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Empty,
  Image,
  message,
  Row,
  Space,
} from "antd";
import moment from "moment";
import { defaultImage, renderNumberFormat } from "../../util/Helper";
import { PostServices } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { UTILITY_GET_LIST } from "../../constants/ActionTypes";

const PostDetail = (props) => {
  let { id } = useParams();
  const [post, setPost] = useState(null);
  const { utilList, utilPaginate } = useSelector(({ utility }) => utility);
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useDispatch();
  const savePost = () => {
    let favourite = JSON.parse(localStorage.getItem("favourite"));
    if (favourite == null) {
      favourite = [];
    }
    if (favourite.includes(post.id)) {
      favourite = favourite.filter((item) => item !== post.id);
      setIsFavourite(false);
    } else {
      favourite = [...favourite, post.id];
      setIsFavourite(true);
    }
    localStorage.setItem("favourite", JSON.stringify(favourite));
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await reqPostGetDetail(id);
        setPost(response.data);
      } catch (e) {
        message.error(e.message);
      }
    })();
    dispatch({
      type: UTILITY_GET_LIST,
      payload: {},
    });
  }, [id]);
  useEffect(() => {
    if (post) {
      try {
        setIsFavourite(
          JSON.parse(localStorage.getItem("favourite")).includes(post.id)
        );
      } catch {
        setIsFavourite(false);
      }
    }
  }, [post]);
  return (
    <>
      <div className={`row row--25`}>
        <div className={`col-12`}>
          {!post ? (
            <Empty />
          ) : (
            <>
              <div className={`row row--25`}>
                <div className={`col-md-12 `}>
                  <Card title={``} className={`mb-5`}>
                    <h3 className={"post-title"}>{post.title}</h3>
                    <p >
                      Ngày đăng bài:{" "}
                      {moment(post.createdDate).format("DD/MM/YYYY")}
                    </p>
                    <Space className={`mt-2`}>
                      <Button type={`dashed`}>Chia sẻ</Button>
                      {isFavourite ? (
                        <Button onClick={savePost} type={`dashed`}>
                          Xoá khỏi danh sách yêu thích
                        </Button>
                      ) : (
                        <Button onClick={savePost} type={`primary`}>
                          Lưu vào yêu thích
                        </Button>
                      )}
                    </Space>
                    <Divider />
                    <h5>Thông tin phòng</h5>
                    <Descriptions
                      bordered
                    >
                      <Descriptions.Item label="Giá phòng" ><p className={`post-label-black`}>{renderNumberFormat(post.cost)} VNĐ</p></Descriptions.Item>
                      <Descriptions.Item label="Hình thức" span={2}><p className={`post-label-black`}>{post.postType.name} - {post.roomType.name}</p></Descriptions.Item>
                      <Descriptions.Item label="Đặt cọc"><p className={`post-label-black`}>{renderNumberFormat(post.downpayment)} VNĐ</p></Descriptions.Item>
                      <Descriptions.Item label="Sức chứa" span={2}><p className={`post-label-black`}>{post.capacity} người</p></Descriptions.Item>
                      <Descriptions.Item label="Diện tích"><p className={`post-label-black`}>{post.area} m2</p></Descriptions.Item>
                      <Descriptions.Item label="Số phòng trống" span={2}><p className={`post-label-black`}>{post.availableRoom} phòng</p></Descriptions.Item>
                      <Descriptions.Item label="Tiền điện"><p className={`post-label-black`}>{renderNumberFormat(post.electricCost)} VNĐ/số</p></Descriptions.Item>
                      <Descriptions.Item label="Tiền mạng"><p className={`post-label-black`}>{renderNumberFormat(post.internetCost)} VNĐ/tháng</p></Descriptions.Item>
                      <Descriptions.Item label="Tiền nước"><p className={`post-label-black`}>{renderNumberFormat(post.waterCost)} VNĐ/m3</p></Descriptions.Item>
                      <Descriptions.Item label="Địa chỉ" span={3}><p className={`post-label-black`}>{post.address}</p></Descriptions.Item>
                    </Descriptions>

                    <br></br>
                    <div>
                      <h5>Mô tả</h5>
                      <p
                        className={`post-label-black`}
                        style={{ whiteSpace: "pre-line" }}>
                        {post.description}
                      </p>
                    </div>
                    <br></br>
                    <Divider />
                    <h5>Tiện ích</h5>
                    <Row>
                      {utilList &&
                        utilList.map((s, i) => {
                          const utilChecked = post.utilities.map(
                            (item) => item.id
                          );
                          return (
                            <Col key={i} span={12}>
                              <Checkbox
                                checked={utilChecked.includes(s.id)}
                                value={s.id}
                              >
                                <p className={`post-label-black`}>{s.name}</p>
                              </Checkbox>
                            </Col>
                          );
                        })}
                    </Row>
                    <Divider />
                    <h5>Hình ảnh</h5>
                    <Row gutter={[8, 8]}>
                      {post.images &&
                        post.images.map((image) => {
                          return (
                            <Col sm={3}>
                              <Image
                                fallback={defaultImage()}
                                width={`100%`}
                                src={image.path}
                              />
                            </Col>
                          );
                        })}
                    </Row>

                    <Divider />
                    <h5>Thông tin liên hệ</h5>
                    <Descriptions bordered>
                      <Descriptions.Item label={`Tên chủ phòng`}>
                        <p className={`post-label-black`}>{post.owner}</p>
                      </Descriptions.Item>
                      <Descriptions.Item label={`Số điện thoại`} span={2}>
                        <p className={`post-label-black`}>{post.phonenumber}</p>
                      </Descriptions.Item>
                      <Descriptions.Item label={`Facebook`}>
                        <a href={`${post.facebook}`} ><p className={`post-label-black`}>{post.facebook}</p></a>
                      </Descriptions.Item>
                      <Descriptions.Item label={`Email`} span={2}>
                        <a href={`mailto:{post.email}`}><p className={`post-label-black`}>{post.email}</p></a>
                      </Descriptions.Item>
                    </Descriptions>
                    {/* <h5>Lưu ý</h5>

                    <Row>
                      <Col sm={24}>
                        <Checkbox>Chung chủ</Checkbox>
                      </Col>
                      <Col sm={24}>
                        <Checkbox>Giờ giấc</Checkbox>
                      </Col>
                    </Row> */}
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default PostDetail;
