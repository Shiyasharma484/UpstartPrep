import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';




const BannersRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>


    </Switch>
  );
};

export default BannersRoute;
