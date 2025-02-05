import actions from './actions';
import initialState from '../../demoData/stores.json';

const { filterStoreBegin, filterStoreSuccess, filterStoreErr } = actions;

const storeFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterStoreBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterStoreSuccess(data));
    } catch (err) {
      dispatch(filterStoreErr(err));
    }
  };
};

export { storeFilter };
