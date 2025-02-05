import actions from './actions';
import initialState from '../../demoData/productinventory.json';

const { filterProductInventoryBegin, filterProductInventorySuccess, filterProductInventoryErr } = actions;

const productinventoryFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterProductInventoryBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterProductInventorySuccess(data));
    } catch (err) {
      dispatch(filterProductInventoryErr(err));
    }
  };
};

export { productinventoryFilter };
