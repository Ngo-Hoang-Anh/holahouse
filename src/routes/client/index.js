import React from "react";
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const ClientMain = ({match}) => {
  const {menu} = useSelector((state) => state.common);

  return (
    <div>
      <Switch>
        {menu.map((value, index) => {
          return (
            !value.items ?
              <Route
                exact={value.exact ? true : false}
                key={`ridx_${index}`}
                path={`${value.path}`}
                component={asyncComponent(() => value.component)}
              />
              : value.items.map((item, key) => {
                return (
                  <Route
                    exact={item.exact ? true : false}
                    key={`ridx_${index}_${key}`}
                    path={`${match.url}${item.path}`}
                    component={asyncComponent(() => item.component)}
                  />
                )
              })
          )
        })}
      </Switch>
    </div>
  )
}
export default ClientMain;
