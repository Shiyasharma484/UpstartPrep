import actions from './actions';
// import staticData from '../../demoData/userslist.json';

const initialState = {
  // data: staticData,
  data: [],
  dataFormR: [],
  loading: false,
  error: null,
  message: null,
  status: null,
};

const {
  FILTER_USERSLIST_BEGIN,
  FILTER_USERSLIST_SUCCESS,
  FILTER_USERSLIST_ERR,
  USERSLIST_BEGIN,
  USERSLIST_SUCCESS,
  USERSLIST_ERR,

  FORM_BEGIN,
  CHECKEMAILPOHONE_BEGIN,
  CHECKEMAILPOHONE_SUCCESS,

  ADDUSER_BEGIN,
  ADDUSER_SUCCESS,
  ADDUSER_ERR,
} = actions;

const userReducer = (state = initialState, action) => {
  const { type, data, err, message, status, dataFormR } = action;
  switch (type) {
    //FORM begins and validation for form1
    case FORM_BEGIN:
      return {
        ...initialState,
        loading: true,
        //dataFormR: null,
        //error: null,
        //message: null,
        //status: null,
      };
    case CHECKEMAILPOHONE_BEGIN:
      // console.log('in reducer page');
      return {
        ...initialState,
        loading: true,
      };
    case CHECKEMAILPOHONE_SUCCESS:
      console.log('in reducer page');
      return {
        ...initialState,
        loading: false,
        status,
        dataFormR,
      };
    //submit form 2 to db
    case ADDUSER_BEGIN:
      return {
        ...initialState,
        loading: true,
        message: null,
        status: null,
        dataFormR: null,
      };
    case ADDUSER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        message,
        status,
        dataFormR,
      };
    case ADDUSER_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    //all users
    case USERSLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case USERSLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case USERSLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    // filter users
    case FILTER_USERSLIST_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_USERSLIST_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_USERSLIST_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    //default
    default:
      return state;
  }
};

export { userReducer };
