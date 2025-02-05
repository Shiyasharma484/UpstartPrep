import actions from './actions';
import initialState from '../../demoData/categories.json';

const { filterCategoryBegin, filterCategorySuccess, filterCategoryErr } = actions;

const categoryFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterCategoryBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterCategorySuccess(data));
    } catch (err) {
      dispatch(filterCategoryErr(err));
    }
  };
};

export { categoryFilter };
