import actions from './actions';
import initialState from '../../demoData/moduleslist.json';

const { filterCustomersListBegin, filterCustomersListSuccess, filterCustomersListErr } = actions;

const moduleslistFilter = (column, value) => {
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

export { moduleslistFilter };
