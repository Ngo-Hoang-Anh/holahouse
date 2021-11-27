import React from "react";
import { Image, Space } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  ArrowsAltOutlined,
  CompassOutlined,
  DollarOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import { defaultImage, renderNumberFormat } from "../../../util/Helper";
import { Link } from "react-router-dom";

const PostBlock = (props) => {
  const { item } = props;
  return (
    <div className="axil-pricing-table prcing-style-2 mt_sm--0">
      <Space direction={`horizontal`}>
        <Image
          width={200}
          height={200}
          fallback={defaultImage()}
          src={item.image}
        />
        <Space direction={`vertical`}>
          <Link className={`post-title`} to={`/post/${item.id}`}>
            <b>{item.title}</b>
          </Link>
          <table className={`table table-borderless none-padding`}>
            <tbody>
              <tr className="table-row-icon-and-text">
                <td>
                  <GroupOutlined className={"custom-antd-icon"} />
                  <p className={`post-label`}>{item.postType}</p>

                </td>
                <td style={{ paddingLeft: "10px" }}>
                  <HomeOutlined className={"custom-antd-icon"} />
                  <p className={`post-label`}>{item.roomType}</p>
                </td>
              </tr>
              <tr className="table-row-icon-and-text">
                <td>
                  <TeamOutlined className={"custom-antd-icon"} />
                  <p className={`post-label`}> {item.gender}</p>
                </td>
                <td style={{ paddingLeft: "10px" }}>
                  <ArrowsAltOutlined className={"custom-antd-icon"} />
                  <p className={`post-label`}>{item.area} m²</p>
                </td>
              </tr>
              <tr className="table-row-icon-and-text">
                <td colSpan={2}>
                  <CompassOutlined className={"custom-antd-icon"} />
                  <p className={`post-label`}> {item.address}</p>
                </td>
              </tr>
              <tr className="table-row-icon-and-text">
                <td colSpan={2}>
                  <DollarOutlined className={"custom-antd-icon"} />
                  <p className={`post-label-price`}>{renderNumberFormat(item.cost)} VNĐ/người</p>
                </td>
              </tr>
            </tbody>
          </table>
        </Space>
      </Space>
      <hr style={{ borderTop: "1px solid #eee" }} />
    </div>
  );
};
export default PostBlock;
