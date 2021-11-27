import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import { useSelector } from "react-redux";

const App = ({ match }) => {
  const { menu } = useSelector((state) => state.common);
  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        {menu.map((value, index) => {
          return !value.items ? (
            <Route
              exact={value.exact ? true : false}
              key={`ridx_${index}`}
              path={`${match.url}${value.path}`}
              component={asyncComponent(() => value.component)}
            />
          ) : (
            value.items.map((item, key) => {
              return (
                <Route
                  exact={item.exact ? true : false}
                  key={`ridx_${index}_${key}`}
                  path={`${match.url}${item.path}`}
                  component={asyncComponent(() => item.component)}
                />
              );
            })
          );
        })}
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
