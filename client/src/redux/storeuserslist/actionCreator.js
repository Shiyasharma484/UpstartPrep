import actions from './actions';
import initialState from '../../demoData/storeuserslist.json';

const { filterStoreUsersListBegin, filterStoreUsersListSuccess, filterStoreUsersListErr } = actions;

const storeuserslistFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterStoreUsersListBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterStoreUsersListSuccess(data));
    } catch (err) {
      dispatch(filterStoreUsersListErr(err));
    }
  };
};

export { storeuserslistFilter };
