import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AddCustomer = lazy(() => import('../../container/pages/AddCustomer'));

const EditCustomer = lazy(() => import('../../container/pages/EditCustomer'));
const ViewCustomer = lazy(() => import('../../container/pages/ViewCustomer'));
// const ProductGrid = lazy(() => import('../../container/pages/ProductGrid'));

const ProductsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/add-customer`} component={AddCustomer} />

      <Route path={`${path}/edit-Customer /:id`} component={EditCustomer} />
      <Route path={`${path}/view-Customer /:id`} component={ViewCustomer} />
      <Route path={`${path}/product-grid`} component={ProductGrid} />
    </Switch>
  );
};

export default ProductsRoute;
