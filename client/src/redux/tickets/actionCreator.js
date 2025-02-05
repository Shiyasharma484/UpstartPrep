import actions from './actions';
import initialState from '../../demoData/tickets.json';

const { filterTicketsBegin, filterTicketsSuccess, filterTicketsErr } = actions;

const ticketsFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterTicketsBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterTicketsSuccess(data));
    } catch (err) {
      dispatch(filterTicketsErr(err));
    }
  };
};

export { ticketsFilter };
