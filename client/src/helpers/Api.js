import Axios from 'axios';
import { headers } from './variables';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const api_url = [];

/*+++++++++++++++MPI+++++++++++++++++++++++++STARTS */

/*Global Auth */
api_url['global_auth_url'] = '/global/auth/url';

/*UserList */
api_url['facebook'] = '/facebook/';
api_url['facebook_by_user'] = '/facebook/user/';
api_url['facebook_accesstoken'] = '/facebook/accesstoken';

api_url['linkedin'] = '/linkedin/';
api_url['linkedin_by_user'] = '/linkedin/user/';
api_url['linkedin_accesstoken'] = '/linkedin/accesstoken';

api_url['instagram'] = '/instagram/';
api_url['instagram_by_user'] = '/instagram/user/';
api_url['instagram_accesstoken'] = '/instagram/accesstoken';

api_url['twitter'] = '/twitter/';
api_url['twitter_by_user'] = '/twitter/user/';
api_url['twitter_accesstoken'] = '/twitter/accesstoken';

/*Post */
//api_url['create_post'] = '/post/';
api_url['create_post'] = '/post/';
api_url['get_all_posts'] = '/post/';
api_url['get_posts_byid'] = '/post/user/';
api_url['trash_posts_byid'] = '/post/trash/';

/*Customer */
api_url['create_user'] = '/user/';
api_url['get_all_users'] = '/user/';
api_url['trash_user'] = '/user/trash/';

/* UpdatePassword */
api_url['UpdatePassword'] = '/user/password/update/';

/* Images */

api_url['url'] = '/images/post';
api_url['verifyotp'] = '/user/verifyotp/';
api_url['forgot_password'] = '/user/password/forgot';
/*+++++++++++++++MPI+++++++++++++++++++++++++ENDS */

/*UserList */
api_url['user'] = '/user/admin/';
api_url['delete_user'] = '/user/';

const get_rolesby_store = id => {
  api_url['get_rolesby_store'] = `/store/${id}/role/`;
  return api_url['get_rolesby_store'];
};

/*Edit Category */
api_url['get_productcategory_single'] = '/productcategory/single/';

/*Store Modules */
api_url['get_modulesingle_byID'] = '/module/single/';
api_url['get_allmodules'] = '/module/all';
api_url['module_checkmodulealready'] = '/module/checkmodulealready';
api_url['update_module'] = '/module/';

/*Store Discount */
api_url['get_storesall'] = '/store/all';
api_url['discount_checkalready'] = '/discount/checkalready';
api_url['create_discount'] = '/discount/';

/*Store Discount */
api_url['customer_delete'] = '/customer/delete/';
//
/*Request Function Starts +++++*/
const get_api_request = (url, headers = null) => {
  // console.log(url);
  const promise1 = new Promise((resolve, reject) => {
    Axios.get(domainpath + url, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      //console.log(value);
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};
//--------------------------------------------------------
const post_api_request = (url, payload, headers = null) => {
  // Axios.post(domainpath + url, payload, { headers }).then(response => {
  //   return response;
  // });
  const promise1 = new Promise((resolve, reject) => {
    Axios.post(domainpath + url, payload, { headers })
      .then(response => {
        //console.log(response);
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};
//---------------------------------------------------------
const put_api_request = (url, payload, headers = null) => {
  // Axios.put(domainpath + url, payload, { headers }).then(response => {
  //   return response;
  // });
  const promise1 = new Promise((resolve, reject) => {
    Axios.put(domainpath + url, payload, { headers })
      .then(response => {
        //console.log(response);
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      var message = '';
      if (error?.message?.response?.data?.message) {
        message = error.message.response.data.message;
      } else {
        message = error;
      }
      const Error = {
        status: 'error',
        message: message,
      };
      return Error;
    });
  return response_promise;
};
//----------------------------------------------------------
const delete_api_request = (url, headers = null) => {
  // Axios.delete(domainpath + url, payload, { headers }).then(response => {
  //   return response;
  // });
  //console.log(url);
  const promise1 = new Promise((resolve, reject) => {
    Axios.delete(domainpath + url, { headers })
      .then(response => {
        //console.log(response);
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};

export { get_api_request, post_api_request, put_api_request, delete_api_request, get_rolesby_store, api_url };
