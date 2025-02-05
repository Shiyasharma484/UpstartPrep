import actions from './actions';
import initialState from '../../demoData/storeslist.json';

const { filterStoresListBegin, filterStoresListSuccess, filterStoresListErr } = actions;

const storeslistFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterStoresListBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterStoresListSuccess(data));
    } catch (err) {
      dispatch(filterStoresListErr(err));
    }
  };
};

export { storeslistFilter };
