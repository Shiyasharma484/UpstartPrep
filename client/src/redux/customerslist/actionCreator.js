import actions from './actions';
import initialState from '../../demoData/customerslist.json';

const { filterCustomersListBegin, filterCustomersListSuccess, filterCustomersListErr } = actions;

const customerslistFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterCustomersListBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterCustomersListSuccess(data));
    } catch (err) {
      dispatch(filterCustomersListErr(err));
    }
  };
};

export { customerslistFilter };
