import actions from './actions';
import initialState from '../../demoData/variants.json';

const { filterVariantsListBegin, filterVariantsListSuccess, filterVariantsListErr } = actions;

const variantslistFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterVariantsListBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterVariantsListSuccess(data));
    } catch (err) {
      dispatch(filterVariantsListErr(err));
    }
  };
};

export { variantslistFilter };
