import React, { useEffect, useState } from "react";
import { Button, Card, Skeleton, Space, Table, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { POST_GET_LIST } from "../../../constants/ActionTypes";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  reqDeletePost,
  reqUpdateAvailablePost,
  reqReUpPost,
} from "../../../appRedux/services/post";
import { message } from "antd";
const PostList = () => {
  const { postList, listLoad, postPaginate } = useSelector(({ post }) => post);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isReUpModalVisible, setIsReUpModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const postGetList = (params = {}) => {
    dispatch({
      type: POST_GET_LIST,
      payload: {
        ...params,
      },
    });
  };
  useEffect(() => {
    postGetList();
  }, []);
  const deletePost = (id) => {
    setCurrentId(id);
    setIsDeleteModalVisible(true);
  };
  const confirmDeletePost = (id) => {
    try {
      reqDeletePost(id)
        .then((res) => {
          message.success(res.data.message);
          setIsDeleteModalVisible(false);
        })
        .then(() => postGetList());
    } catch (e) {
      message.error(e.message);
    }
  };
  const reUpPost = (id) => {
    setCurrentId(id);
    setIsReUpModalVisible(true);
  };
  const confirmReUpPost = (id) => {
    try {
      reqReUpPost(id)
        .then((res) => {
          message.success(res.data.message);
          setIsReUpModalVisible(false);
        })
        .then(() => postGetList());
    } catch (e) {
      message.error(e.message);
    }
  };
  const updateAvailable = (id) => {
    setCurrentId(id);
    setIsUpdateModalVisible(true);
  };
  const confirmUpdatePost = (id, number) => {
    try {
      reqUpdateAvailablePost(id, number)
        .then((res) => message.success(res.data.message))
        .then(setIsUpdateModalVisible(false));
    } catch (e) {
      message.error(e.message);
    }
  };
  return (
    <>
      <Card width="1000px" title={`Danh sách các bài đăng`}>
        {listLoad ? (
          <Skeleton active />
        ) : (
          <Table
            className={"custom-table"}
            size={`small`}
            onChange={({ current }) => postGetList({ page: current })}
            pagination={postPaginate}
            dataSource={postList}
            columns={[
              { title: "ID", dataIndex: "id", key: "id" },
              {
                title: "Tiêu đề",
                width: 200,
                dataIndex: "title",
                key: "title",
                render: (title) => {
                  return <label className={`line-number-5`}>{title}</label>;
                },
              },
              { title: "Hình thức", dataIndex: "postType", key: "postType" },
              { title: "Kiểu phòng", dataIndex: "roomType", key: "roomType" },
              {
                title: "Địa chỉ",
                dataIndex: "address",
                key: "address",
                width: 150,
                render: (address) => {
                  return <label className={`line-number-5`}>{address}</label>;
                },
              },
              {
                title: "Ngày tạo",
                dataIndex: "createdDate",
                key: "createdDate",
                render: (time) => {
                  return moment(time).format("DD/MM/YYYY");
                },
              },
              {
                title: "Trạng thái",
                dataIndex: "status",
                key: "status",
                render: (status) => {
                  if (status === "pending") {
                    return (
                      <label style={{ color: "blue" }}>Đang chờ duyệt</label>
                    );
                  } else if (status === "approved") {
                    return (
                      <label style={{ color: "green" }}>Đã được duyệt</label>
                    );
                  } else if (status === "disapproved") {
                    return <label style={{ color: "red" }}>Bị từ chối</label>;
                  } else if (status === "expired") {
                    return (
                      <label style={{ color: "red" }}>Bài đăng hết hạn</label>
                    );
                  }
                },
              },
              {
                title: "Hành động",
                key: "action",
                render: (raw) => {
                  return (
                    <Space wrap>
                      <Link to={`/post/${raw.id}`}>
                        <Button type={`primary`} size={`small`}>
                          Chi tiết
                        </Button>
                      </Link>
                      <Link to={`/post/update/${raw.id}`}>
                        <Button type={`primary`} size={`small`}>
                          Sửa
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deletePost(raw.id)}
                        danger
                        type={`dashed`}
                        size={`small`}
                      >
                        Xóa
                      </Button>
                      {raw.status === "approved" && (
                        <Button
                          type={`default`}
                          size={`small`}
                          onClick={() => updateAvailable(raw.id)}
                        >
                          Thay đổi số lượng phòng
                        </Button>
                      )}
                      {raw.status === "expired" && (
                        <Button
                          type={`default`}
                          size={`small`}
                          onClick={() => reUpPost(raw.id)}
                        >
                          Gia hạn bài đăng
                        </Button>
                      )}
                    </Space>
                  );
                },
              },
            ]}
          />
        )}
      </Card>
      <Modal
        title="Xoá bài đăng"
        visible={isDeleteModalVisible}
        onOk={() => confirmDeletePost(currentId)}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Xác nhận xoá bài đăng</p>
      </Modal>
      <Modal
        title="Gia hạn bài đăng"
        visible={isReUpModalVisible}
        onOk={() => confirmReUpPost(currentId)}
        onCancel={() => setIsReUpModalVisible(false)}
      >
        <p>
          Bài đăng sẽ được gia hạn thêm 1 tháng xuất hiện trên trang chủ của hệ
          thống. Sau 1 tháng bài đăng sẽ biến mât mong quý khách vui lòng vào hệ
          thống để gia hạn thêm
        </p>
      </Modal>
      <Modal
        title="Cập nhật số lượng phòng"
        visible={isUpdateModalVisible}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={(values) => {
            confirmUpdatePost(currentId, values.availableNumber);
          }}
        >
          <Form.Item
            label="Số lượng phòng trống"
            name="availableNumber"
            rules={[
              { required: true, message: "Hãy nhập số lượng phòng trống" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setIsUpdateModalVisible(false);
              }}
            >
              Huỷ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PostList;
