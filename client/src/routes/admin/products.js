import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AddProduct = lazy(() => import('../../container/pages/AddPost'));

const EditProduct = lazy(() => import('../../container/pages/EditPost'));
const ViewProduct = lazy(() => import('../../container/pages/ViewPost'));
const ProductGrid = lazy(() => import('../../container/pages/ProductGrid'));

const ProductsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* <Route path={`${path}/add-product`} component={AddProduct} /> */}

      {/* <Route path={`${path}/edit-product/:id`} component={EditProduct} />
      <Route path={`${path}/view-product/:id`} component={ViewProduct} /> */}
      <Route path={`${path}/product-grid`} component={ProductGrid} />
    </Switch>
  );
};

export default ProductsRoute;
