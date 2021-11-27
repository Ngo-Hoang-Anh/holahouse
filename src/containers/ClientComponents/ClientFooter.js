import React from "react";


const ClientFooter = () => {
  return (
    <footer className="axil-footer footer-default theme-gradient-2">
      <div className="copyright copyright-default">
        <div className="container">
          <div className="row row--0 ptb--20 axil-basic-thine-line">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="inner text-center text-md-left">
                <p>© 2020. All rights reserved by Your Company.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="quick-contact">
                <ul className="link-hover d-flex justify-content-center justify-content-md-end liststyle">
                  <li><a data-hover="Privacy Policy" href="privacy-policy.html">Privacy Policy</a></li>
                  <li><a href="#">Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}
export default ClientFooter
