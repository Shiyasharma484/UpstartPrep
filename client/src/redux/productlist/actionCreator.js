import actions from './actions';
import initialState from '../../demoData/productlist.json';

const { filterProductListBegin, filterProductListSuccess, filterProductListErr } = actions;

const productlistFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterProductListBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterProductListSuccess(data));
    } catch (err) {
      dispatch(filterProductListErr(err));
    }
  };
};

export { productlistFilter };
