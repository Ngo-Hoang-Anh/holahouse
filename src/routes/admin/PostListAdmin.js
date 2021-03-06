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
      <Card width="1000px" title={`Danh s??ch c??c b??i ????ng`}>
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
                  return <span className={`line-number-5`}>{address}</span>;
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
                      <Button
                        onClick={() => deletePost(raw.id)}
                        danger
                        type={`dashed`}
                        size={`small`}
                      >
                        X??a
                      </Button>
                      {(raw.status === "disapproved" ||
                        raw.status === "pending") && (
                        <Button
                          type={`primary`}
                          size={`small`}
                          onClick={() => approvePost(raw.id)}
                        >
                          Duy???t
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
                          T??? ch???i
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
            label="Nguy??n nh??n xo?? b??i"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            rules={[
              {
                required: true,
                message: "Vui l??ng n??u r?? nguy??n nh??n xo?? b??i",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              X??c nh???n
            </Button>
            <Button
              onClick={() => {
                deleteForm.resetFields();
                setIsDeleteModalVisible(false);
              }}
            >
              Hu???
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Duy???t b??i ????ng"
        visible={isApproveModalVisible}
        onOk={() => confirmApprovePost(currentId)}
        onCancel={() => setIsApproveModalVisible(false)}
      >
        <p>B??i ????ng n??y s??? ???????c xu???t hi???n tr??n trang ch???. X??c nh???n?</p>
      </Modal>

      <Modal
        title="T??? ch???i b??i ????ng"
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
            label="Nguy??n nh??n t??? ch???i"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            rules={[
              {
                required: true,
                message: "Vui l??ng n??u r?? nguy??n nh??n t??? ch???i b??i",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              X??c nh???n
            </Button>
            <Button
              onClick={() => {
                disapproveForm.resetFields();
                setIsDisapproveModalVisible(false);
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
