import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';

// const Product = lazy(() => import('../../container/ecommerce/product/Products'));

// const AddPost = lazy(() => import('../../container/pages/AddPost'));
// const PostList = lazy(() => import('../../container/ecommerce/PostList'));
// const EditPost = lazy(() => import('../../container/pages/EditPost'));
// const ViewPost = lazy(() => import('../../container/pages/ViewPost'));

// const CustomerList = lazy(() => import('../../container/pages/CustomerList'));
const CustomerAdd = lazy(() => import('../../container/pages/AddCustomer'));
const ViewCustomer = lazy(() => import('../../container/pages/ViewCustomer'));

const ProductAdd = lazy(() => import('../../container/ecommerce/product/AddProduct'));
const ProductInventory = lazy(() => import('../../container/ecommerce/ProductInventory'));
const ProductEdit = lazy(() => import('../../container/ecommerce/product/EditProduct'));
const ProductDetails = lazy(() => import('../../container/ecommerce/product/ProductDetails'));
// const Instagram = lazy(() => import('../../container/ecommerce/Instagram'));
// const Facebook = lazy(() => import('../../container/ecommerce/Facebook'));
// const Twitter = lazy(() => import('../../container/ecommerce/Twitter'));
// const LinkedIn = lazy(() => import('../../container/ecommerce/LinkedIn'));

// const SocialAccounts = lazy(() => import('../../container/ecommerce/SocialAccounts'));

const EcommerceRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* <Route path={`${path}/products`} component={Product} /> */}
      {/* <Route path={`${path}/add-post`} component={AddPost} />
      <Route path={`${path}/post-list`} component={PostList} /> */}
      {/* <Route path={`${path}/edit-post/:id`} component={EditPost} />
      <Route path={`${path}/view-post/:id`} component={ViewPost} /> */}

      {/* <Route path={`${path}/instagram`} component={Instagram} /> */}
      {/* <Route path={`${path}/facebook`} component={Facebook} />
      <Route path={`${path}/twitter`} component={Twitter} />
      <Route path={`${path}/linkedin`} component={LinkedIn} /> */}

      {/* <Route path={`${path}/customer-list`} component={CustomerList} /> */}
      {/* <Route exact path={`${path}/add-customer`} component={CustomerAdd} />
      <Route exact path={`${path}/view-customer`} component={ViewCustomer} /> */}

      {/* <Route exact path={`${path}/add-product`} component={ProductAdd} /> */}

      <Route exact path={`${path}/product-inventory`} component={ProductInventory} />
      <Route exact path={`${path}/edit-product`} component={ProductEdit} />
      <Route exact path={`${path}/productDetails/:id`} component={ProductDetails} />

      {/* <Route exact path={`${path}/social_accounts`} component={SocialAccounts} /> */}
    </Switch>
  );
};

export default EcommerceRoute;
