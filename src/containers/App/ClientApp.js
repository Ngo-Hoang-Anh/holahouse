import React, {useEffect} from "react";
import ClientHeader from "../ClientComponents/ClientHeader";
import ClientFooter from "../ClientComponents/ClientFooter";
import ClientHeaderMobile from "../ClientComponents/ClientHeaderMobile";
import ClientMain from "../../routes/client";
import {useRouteMatch} from "react-router-dom";

const ClientApp = () => {
  const match = useRouteMatch();

  return (
    <div className={`main-content`}>
      <ClientHeader/>
      <ClientHeaderMobile/>
      <div className={`page-wrappper mb-5`}>
        <div className={`axil-pricing-table-area pricing-shape-position bg-color-lightest`}>
          <div className={`container`}>
            <ClientMain match={match}/>
          </div>
        </div>
      </div>
      <ClientFooter/>
    </div>
  )
}
export default ClientApp;
