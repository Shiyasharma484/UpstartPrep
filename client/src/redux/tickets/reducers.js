import actions from './actions';
import staticData from '../../demoData/tickets.json';

const initialState = {
  data: staticData,
  loading: false,
  error: null,
};

const { FILTER_TICKETS_BEGIN, FILTER_TICKETS_SUCCESS, FILTER_TICKETS_ERR } = actions;

const ticketsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_TICKETS_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_TICKETS_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case FILTER_TICKETS_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
