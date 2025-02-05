import React, { useState, useEffect } from 'react';
import { Avatar, notification } from 'antd';
import { generatePath, Link, useHistory, NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import logo from '../../../static/img/flag/store1.png';
import Message from './message';
import Notification from './notification';
// import Settings from './settings';
import Support from './support';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';
import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';
import Axios from 'axios';
import { headers } from '../../../helpers/variables';
//import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../../helpers/Common.js';
//const cookies = new Cookies();
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { encrypttheid, decodetheid } = require('../../../helpers/encode-decode');
const { encrypt, decrypt } = require('../../../helpers/encryption-decryption');
var allStores = [
  {
    id: 52,
    name: 'Sanjay',
  },
  {
    id: 53,
    name: 'Bibiyan',
  },
];
// var userRole = {};
const AuthInfo = () => {
  // console.log(props);
  const history = useHistory();
  const [changeStoreDependencyVariable, setchangeStoreDependencyVariable] = useState(true);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    flag: 'english',
  });
  const { path } = useRouteMatch();
  const [storeUser, setStoreUser] = useState({
    user: [],
  });

  const [storeInfo, setStoreInfo] = useState();
  const { flag } = state;
  const { store } = state;
  const [userDetail, setUserDetail] = useState();
  const [ChildDetails, setChildDetails] = useState([]);
  const [SelectedChild, setSelectedChild] = useState();
  // //const [currentdS_ID, setCurrentdS_ID] = useState();
  // const [selectedStore, setSelectedStore] = useState();
  // const [selectedStoreByAdmin, setSelectedStoreByAdmin] = useState();
  // const [storeLength, setStoreLength] = useState();
  // // const [udatedID, setUpdatedID] = useState();
  var currentStoreName = [];
  // console.log(headers);
  const User_Details = Cookies.get('UserDetail');
  var parent_cookies = User_Details ? decrypt(User_Details) : '';
  var userRole = parent_cookies?.sessdata?.user?.[0]?.user_role;
  var encrypted_userID = parent_cookies?.sessdata?.users_id;
  var User_ID = encrypted_userID ? decodetheid(encrypted_userID) : '';

  // console.log(User_ID);
  // console.log(parent_cookies);
  useEffect(() => {
    const encrypted_child_detail = Cookies.get('ChildByParent');
    const child_details = encrypted_child_detail ? decrypt(encrypted_child_detail) : '';
    // console.log(child_details);
    async function GetChildByParent(id) {
      const url = api_url.getChild_byParent + id;
      // console.log(url);
      const response = await get_api_request(url, headers);
      // console.log(response);
      if (response?.status == 200 && userRole == 'parent') {
        const detail = response?.data?.responsedata;
        setChildDetails(detail);
        if (child_details) {
          setSelectedChild(child_details?.child_name);
        } else {
          setSelectedChild(detail?.[0]?.child_name);
          const enc_userdetial = await encrypt(detail?.[0]);
          Cookies.set('ChildByParent', enc_userdetial);
        }
      }
    }
    GetChildByParent(User_ID);

    //  setTimeout(() => {
    // Axios.get(domainpath + `/user/login/data`, { headers })
    //   .then(response => {

    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    //console.log(response);
    const userdata = response?.sessdata?.user?.[0];
    setUserDetail(userdata);
    // if (response?.login == true) {
    //   userRole = response?.store?.[0]?.user_role;
    //   const Store_detail = response?.store;
    //   const currentStoreID = response?.currentstore?.store_id;
    //   const userInfo = response?.store;
    //   const length = response?.store?.length;
    //   //console.log('++++++++++++++++++++++++++++++');
    //   //

    //   if (currentStoreID != null) {
    //     Store_detail?.map(item => {
    //       // console.log(item);
    //       if (currentStoreID == item.store_id) {
    //         return (currentStoreName = item.store);
    //       }
    //     });
    //     var S_ID = encrypttheid(currentStoreID);
    //     sessionStorage.setItem('storeID', S_ID); //create session to hold the Store_ID
    //     sessionStorage.setItem('storeName', currentStoreName); //create session to hold the Store_Name
    //     // const enc_name = await encrypt(currentStoreName);
    //     // Cookies.set('Store_Name', enc_name);
    //     // sessionStorage.setItem("UserDetail", JSON.stringify(userDetail));

    //     //
    //     setStoreLength(length);
    //     // setCurrentdS_ID(currentStoreID);
    //     //
    //     //var SelectedStoreName = sessionStorage.getItem('storeName'); //get Store from Session
    //     // console.log(currentStoreName);
    //     setSelectedStore(currentStoreName);
    //     // setUpdatedID(SelectedStoreName);
    //     //
    //     setStoreInfo(userInfo); //to get storeID
    //   }

    //   setStoreUser({ user: Store_detail?.[0] });
    // } else {
    //   console.log('nooooooooooooooooooooooooooooooooooooooooooooooo');
    // }

    // })
    // .catch(error => console.log(error));
    //}, 1000);
    // const postdata = { request: 'list' };
    // Axios.post(domainpath + `/store/allNamesAndIds`, postdata, { headers }).then(response => {
    //   // console.log(response);
    //   setSelectedStoreByAdmin('SUPER_ADMIN');
    //   allStores.push({ id: 0, name: 'SUPER_ADMIN' });
    //   const storedatainitial = response?.data?.responsedata?.stores;
    //   storedatainitial.map(item => {
    //     allStores.push(item);
    //   });
    //   //allStores = response?.data?.responsedata?.stores;
    // });
  }, [changeStoreDependencyVariable]);

  const SignOut = e => {
    // console.log('11111111111111111111111111');
    //console.log(headers);
    e.preventDefault();
    dispatch(logOut());
    history.push('/');
  };
  const HandleChildByParent = async item => {
    const enc_userdetial = await encrypt(item);
    Cookies.set('ChildByParent', enc_userdetial);
    setSelectedChild(item?.child_name);
    setTimeout(() => {
      window.location.reload();
    }, [500]);
  };
  // const onStoreHandle = async (value, name) => {
  //   var changeStoreBody = {};
  //   const enc_user_detail1 = Cookies.get('UserDetail');
  //   var response1 = decrypt(enc_user_detail1);
  //   const enc_id = await encrypt(value);
  //   const enc_name = await encrypt(name);
  //   const Store_detail = response1?.store;
  //   var new_store = {};
  //   Store_detail?.map(item => {
  //     if (item.store_id == value) {
  //       new_store['store_id'] = item.store_id;
  //       new_store['store_type_id'] = item.store_type_id;
  //       new_store['user_role_id'] = item.user_role_id;
  //     }
  //   });
  //   response1['currentstore'] = new_store;
  //   const updateddetail = await encrypt(response1);

  //   const id = response1?.users_id;
  //   changeStoreBody['current_store'] = value;
  //   //updated current store
  //   Axios.put(domainpath + `/user/${id}`, changeStoreBody, { headers })
  //     .then(response => {
  //       console.log(response);
  //       if (response.status == 200) {
  //         setSelectedStore(name);
  //         Cookies.set('UserDetail', updateddetail);
  //         window.location.reload(false);
  //       } else
  //         notification.error({
  //           message: 'Server Error',
  //         });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       notification.error({
  //         message: error.response.data.message,
  //       });
  //     });
  // };

  // for store first==========
  const ShowChild =
    userRole == 'parent' ? (
      <NavAuth>
        {ChildDetails?.map(item => (
          // console.log(item.name),
          <Link key={item.id} onClick={() => HandleChildByParent(item)} to="#">
            {item?.child_name == SelectedChild ? (
              <span style={{ color: 'blue' }}>{item?.child_name?.toUpperCase()}</span>
            ) : (
              <span>{item?.child_name?.toUpperCase()}</span>
            )}
          </Link>
        ))}
      </NavAuth>
    ) : (
      ''
      // <NavAuth>
      //   {storeInfo?.map(item => (
      //     <Link onClick={() => onStoreHandle(item.store_id, item.store)} to="#">
      //       {/* <img src={require('../../../static/img/flag/store2.jpg')} alt="" /> */}
      //       {selectedStore == item.store ? <span className="sID">{item.store}</span> : <span>{item.store}</span>}
      //     </Link>
      //   ))}
      // </NavAuth>
    );

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        {/* {storeUser?.user?.map((item, i) => { */}
        {/* console.log(item); */}
        <figure
          // key={i}
          className="user-dropdwon__info"
        >
          {/* <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" /> */}
          <figcaption>
            <Heading as="h5">
              {userDetail?.first_Name} {userDetail?.last_Name}
            </Heading>
            {/* <p>UI Expert</p> */}
          </figcaption>
        </figure>
        {/* })} */}

        {/* <figure className="user-dropdwon__info">
          <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" />
          <figcaption>
            <Heading as="h5">Abdullah Bin Talha</Heading>
            <p>UI Expert</p>
          </figcaption>
        </figure> */}
        <ul className="user-dropdwon__links">
          {/* for store==========++++++++++===== */}
          {/* <li className="hoverMYdiv">
            <Link to="#">
              <FeatherIcon icon="home" /> Store
            </Link>

            <div id="myDIV" style={{ display: "none" }}>
              {storeInfo?.map((item) => (
                <Link onClick={() => onStoreHandle(item.store_id, item.store)} to="#">
                  {currentdS_ID == item.store_id ?
                    <span className='sID'>{item.store}</span>
                    :
                    <span>{item.store}</span>
                  }
                </Link>
              ))}
            </div>

          </li> */}
          {/* for store end======++++++++++++====== */}
          <li>
            <NavLink to={`${path}/Settings/profile`}>
              <FeatherIcon icon="user" size={14} />
              Profile
            </NavLink>
          </li>
          {/* <li>
            <Link to="/dashboard/settings">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="dollar-sign" /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li> */}
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  const onFlagChangeHandle = value => {
    setState({
      ...state,
      flag: value,
    });
  };

  //====language
  // const country = (
  //   <NavAuth>
  //     <Link onClick={() => onFlagChangeHandle('english')} to="#">
  //       <img src={require('../../../static/img/flag/english.png')} alt="" />
  //       <span>English</span>
  //     </Link>
  //     <Link onClick={() => onFlagChangeHandle('germany')} to="#">
  //       <img src={require('../../../static/img/flag/germany.png')} alt="" />
  //       <span>Germany</span>
  //     </Link>
  //     <Link onClick={() => onFlagChangeHandle('spain')} to="#">
  //       <img src={require('../../../static/img/flag/spain.png')} alt="" />
  //       <span>Spain</span>
  //     </Link>
  //     <Link onClick={() => onFlagChangeHandle('turky')} to="#">
  //       <img src={require('../../../static/img/flag/turky.png')} alt="" />
  //       <span>Turkey</span>
  //     </Link>
  //   </NavAuth>
  // );
  console.log(userRole);
  return (
    <InfoWraper>
      {/* //for store first */}
      {userRole == 'parent' ? (
        <div className="nav-author store_change">
          <Dropdown
            placement="bottomRight"
            content={ShowChild}
            // trigger="click"
            action="click"
          >
            <Link to="#" className="head-example" style={{ color: 'white' }}>
              {/* {userRole == 'parent' ? 'selectedStoreByAdmin' : 'selectedStore'} */}
              {SelectedChild ? SelectedChild.toUpperCase() : ''}
              &nbsp;<i className="fa fa-chevron-down" aria-hidden="true"></i>
            </Link>
          </Dropdown>
        </div>
      ) : (
        ''
      )}
      {/* <Message /> */}
      {/* <Notification /> */}

      {/* <Settings /> */}
      {/* <Support /> */}

      {/* <div className="nav-author">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="head-example">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div> */}

      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
