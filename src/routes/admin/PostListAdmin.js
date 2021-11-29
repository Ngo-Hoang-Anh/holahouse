import React, { useEffect, useState } from "react";
import { Button, Card, Skeleton, Space, Table, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { POST_GET_LIST_ADMIN } from "../../constants/ActionTypes";
import moment from "moment";
import { Link } from "react-router-dom";
import ProvinceGroup from "./../../components/ProvinceGroup";
import {
  reqAdminDeletePost,
  reqDisapprovePost,
  reqApprovePost,
} from "../../appRedux/services/post";
import { message } from "antd";
const PostList = () => {
  const { postListAdmin, listLoad, postPaginate } = useSelector(
    ({ admin }) => admin
  );
  const [form] = Form.useForm();
  const [deleteForm] = Form.useForm();
  const [disapproveForm] = Form.useForm();
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDisapproveModalVisible, setIsDisapproveModalVisible] =
    useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const postGetList = (params = {}) => {
    dispatch({
      type: POST_GET_LIST_ADMIN,
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
  const confirmDeletePost = (id, content) => {
    try {
      reqAdminDeletePost(id, content)
        .then((res) => {
          message.success(res.data.message);
          setIsDeleteModalVisible(false);
        })
        .then(() => postGetList());
    } catch (e) {
      message.error(e.message);
    }
  };
  const approvePost = (id) => {
    setCurrentId(id);
    setIsApproveModalVisible(true);
  };
  const confirmApprovePost = (id) => {
    try {
      reqApprovePost(id)
        .then((res) => {
          message.success(res.data.message);
          setIsApproveModalVisible(false);
        })
        .then(() => postGetList());
    } catch (e) {
      message.error(e.message);
    }
  };
  const disapprove = (id) => {
    setCurrentId(id);
    setIsDisapproveModalVisible(true);
  };
  const confirmDisapprovePost = (id, content) => {
    try {
      reqDisapprovePost(id, content)
        .then((res) => {
          message.success(res.data.message);
          setIsDisapproveModalVisible(false);
        })
        .then(() => postGetList());
    } catch (e) {
      message.error(e.message);
    }
  };
  return (
    <>
      {/* <ProvinceGroup
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
      /> */}
      <Card width="1000px" title={`Danh sách các bài đăng`}>
        {listLoad ? (
          <Skeleton active />
        ) : (
          <Table
            className={"custom-table"}
            size={`small`}
            onChange={({ current }) => postGetList({ page: current })}
            pagination={postPaginate}
            dataSource={postListAdmin}
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
                  return <span className={`line-number-5`}>{address}</span>;
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
                      <Button
                        onClick={() => deletePost(raw.id)}
                        danger
                        type={`dashed`}
                        size={`small`}
                      >
                        Xóa
                      </Button>
                      {(raw.status === "disapproved" ||
                        raw.status === "pending") && (
                        <Button
                          type={`primary`}
                          size={`small`}
                          onClick={() => approvePost(raw.id)}
                        >
                          Duyệt
                        </Button>
                      )}
                      {(raw.status === "approved" ||
                        raw.status === "pending") && (
                        <Button
                          type={`dashed`}
                          size={`small`}
                          danger
                          onClick={() => {
                            disapprove(raw.id);
                          }}
                        >
                          Từ chối
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
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <Form
          form={deleteForm}
          onFinish={(values) => {
            confirmDeletePost(currentId, values.content);
          }}
          autoComplete="off"
        >
          <Form.Item
            name="content"
            label="Nguyên nhân xoá bài"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nêu rõ nguyên nhân xoá bài",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <Button
              onClick={() => {
                deleteForm.resetFields();
                setIsDeleteModalVisible(false);
              }}
            >
              Huỷ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Duyệt bài đăng"
        visible={isApproveModalVisible}
        onOk={() => confirmApprovePost(currentId)}
        onCancel={() => setIsApproveModalVisible(false)}
      >
        <p>Bài đăng này sẽ được xuất hiện trên trang chủ. Xác nhận?</p>
      </Modal>

      <Modal
        title="Từ chối bài đăng"
        visible={isDisapproveModalVisible}
        onCancel={() => setIsDisapproveModalVisible(false)}
        footer={null}
      >
        <Form
          form={disapproveForm}
          onFinish={(values) => {
            confirmDisapprovePost(currentId, values.content);
          }}
          autoComplete="off"
        >
          <Form.Item
            name="content"
            label="Nguyên nhân từ chối"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nêu rõ nguyên nhân từ chối bài",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <Button
              onClick={() => {
                disapproveForm.resetFields();
                setIsDisapproveModalVisible(false);
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
