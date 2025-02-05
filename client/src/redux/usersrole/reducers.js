import actions from './actions';
import staticData from '../../demoData/usersrole.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_USERSROLE_BEGIN, FILTER_USERSROLE_SUCCESS, FILTER_USERSROLE_ERR } = actions;

const usersroleReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_USERSROLE_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_USERSROLE_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_USERSROLE_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersroleReducer;
