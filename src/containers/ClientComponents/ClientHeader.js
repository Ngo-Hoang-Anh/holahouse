import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSignOut } from "../../appRedux/actions";
import { Button } from "antd";

const ClientHeader = () => {
  let { pathname, menu } = useSelector(({ common }) => common);
  let { token, authUser, role } = useSelector(({ auth }) => auth);
  const [mobileVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const openMenu = () => {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("class", "popup-mobile-manu-visible");
  };
  useEffect(() => { }, [token]);
  return (
    <header className="ax-header haeder-default light-logo-version axil-header-sticky">
      <div className="header-wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 col-sm-6 col-8 header-left">
              <div className="logo">
                <a href="/">
                  <img style={{ height: "60px" }} src={require("../../assets/images/holahouselogo5.svg")} />

                </a>
              </div>
            </div>
            <div className="col-lg-9 col-md-6 col-sm-6 col-4 header-right">
              <div className="mainmenu-wrapepr">
                {/* Start Mainmanu Nav */}
                <nav className="mainmenu-nav d-none d-lg-block">
                  <ul className="mainmenu">
                    {menu.map((value, index) => {
                      return (
                        <li key={`client-menu-${index}`}>
                          <Link to={`${value.path}`}>{value.displayName}</Link>
                        </li>
                      );
                    })}
                    {token && (
                      <li>
                        <Link onClick={() => dispatch(userSignOut())}>
                          Đăng xuất
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
                {/* End Mainmanu Nav */}
                <div className="axil-header-extra d-flex align-items-center">
                  {/* Start Search Area */}
                  <div className="ax-search-area ml--40 ml_sm--10"></div>

                  {/* Start Menu Bar  */}
                  <div
                    onClick={openMenu}
                    className="ax-menubar popup-navigation-activation d-block d-lg-none ml_sm--20 ml_md--20"
                  >
                    <div>
                      <i />
                    </div>
                  </div>
                  {/* End Menu Bar  */}
                  {/* Start Search Area  */}
                  <div className="axil-search-area">
                    <form action="#" className="axil-searchbar w-100">
                      <div className="search-field">
                        <input type="text" placeholder="Search Here..." />
                      </div>
                      <a href="#" className="navbar-search-close">
                        <i className="fal fa-times" />
                      </a>
                    </form>
                  </div>
                  {/* End Search Area  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default ClientHeader;
