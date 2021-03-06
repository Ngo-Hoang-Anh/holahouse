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
      <Card width="1000px" title={`Danh s??ch c??c b??i ????ng`}>
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
                title: "Ti??u ?????",
                width: 200,
                dataIndex: "title",
                key: "title",
                render: (title) => {
                  return <label className={`line-number-5`}>{title}</label>;
                },
              },
              { title: "H??nh th???c", dataIndex: "postType", key: "postType" },
              { title: "Ki???u ph??ng", dataIndex: "roomType", key: "roomType" },
              {
                title: "?????a ch???",
                dataIndex: "address",
                key: "address",
                width: 150,
                render: (address) => {
                  return <label className={`line-number-5`}>{address}</label>;
                },
              },
              {
                title: "Ng??y t???o",
                dataIndex: "createdDate",
                key: "createdDate",
                render: (time) => {
                  return moment(time).format("DD/MM/YYYY");
                },
              },
              {
                title: "Tr???ng th??i",
                dataIndex: "status",
                key: "status",
                render: (status) => {
                  if (status === "pending") {
                    return (
                      <label style={{ color: "blue" }}>??ang ch??? duy???t</label>
                    );
                  } else if (status === "approved") {
                    return (
                      <label style={{ color: "green" }}>???? ???????c duy???t</label>
                    );
                  } else if (status === "disapproved") {
                    return <label style={{ color: "red" }}>B??? t??? ch???i</label>;
                  } else if (status === "expired") {
                    return (
                      <label style={{ color: "red" }}>B??i ????ng h???t h???n</label>
                    );
                  }
                },
              },
              {
                title: "H??nh ?????ng",
                key: "action",
                render: (raw) => {
                  return (
                    <Space wrap>
                      <Link to={`/post/${raw.id}`}>
                        <Button type={`primary`} size={`small`}>
                          Chi ti???t
                        </Button>
                      </Link>
                      <Link to={`/post/update/${raw.id}`}>
                        <Button type={`primary`} size={`small`}>
                          S???a
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deletePost(raw.id)}
                        danger
                        type={`dashed`}
                        size={`small`}
                      >
                        X??a
                      </Button>
                      {raw.status === "approved" && (
                        <Button
                          type={`default`}
                          size={`small`}
                          onClick={() => updateAvailable(raw.id)}
                        >
                          Thay ?????i s??? l?????ng ph??ng
                        </Button>
                      )}
                      {raw.status === "expired" && (
                        <Button
                          type={`default`}
                          size={`small`}
                          onClick={() => reUpPost(raw.id)}
                        >
                          Gia h???n b??i ????ng
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
        title="Xo?? b??i ????ng"
        visible={isDeleteModalVisible}
        onOk={() => confirmDeletePost(currentId)}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>X??c nh???n xo?? b??i ????ng</p>
      </Modal>
      <Modal
        title="Gia h???n b??i ????ng"
        visible={isReUpModalVisible}
        onOk={() => confirmReUpPost(currentId)}
        onCancel={() => setIsReUpModalVisible(false)}
      >
        <p>
          B??i ????ng s??? ???????c gia h???n th??m 1 th??ng xu???t hi???n tr??n trang ch??? c???a h???
          th???ng. Sau 1 th??ng b??i ????ng s??? bi???n m??t mong qu?? kh??ch vui l??ng v??o h???
          th???ng ????? gia h???n th??m
        </p>
      </Modal>
      <Modal
        title="C???p nh???t s??? l?????ng ph??ng"
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
            label="S??? l?????ng ph??ng tr???ng"
            name="availableNumber"
            rules={[
              { required: true, message: "H??y nh???p s??? l?????ng ph??ng tr???ng" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              X??c nh???n
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setIsUpdateModalVisible(false);
              }}
            >
              Hu???
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PostList;
