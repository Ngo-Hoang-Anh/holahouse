import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../../appRedux/actions";

const ClientHeaderMobile = () => {
  let {  menu } = useSelector(({ common }) => common);
  let { token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const closeMenu = () => {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("popup-mobile-manu-visible");
  };
  return (
    <div className="popup-mobile-manu">
      <div className="inner">
        <div className="mobileheader">
          <div className="logo">
            <a href="/">
              <img src="/images/logo/keystoke.svg" alt="Logo images" />
            </a>
          </div>
          <a onClick={closeMenu} className="close-menu" href="#" />
        </div>
        <div className="menu-item">
          <ul className="mainmenu-item">
            {menu.map((value, index) => {
              return (
                <li onClick={closeMenu} key={`client-menu-${index}`}>
                  <Link to={`${value.path}`}>{value.displayName}</Link>
                </li>
              );
            })}
            {token && (
              <li onClick={closeMenu}>
                <Link onClick={() => dispatch(userSignOut())}>Đăng xuất</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ClientHeaderMobile;
