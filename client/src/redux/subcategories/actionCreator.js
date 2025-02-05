import actions from './actions';
import initialState from '../../demoData/subcategories.json';

const { filterSubCategoryBegin, filterSubCategorySuccess, filterSubCategoryErr } = actions;

const subcategoryFilter = (column, value) => {
    return async dispatch => {
        try {
            dispatch(filterSubCategoryBegin());

            const data = initialState.filter(item => {
                if (value !== '') {
                    return item[column] === value;
                }
                return item;
            });

            dispatch(filterSubCategorySuccess(data));
        } catch (err) {
            dispatch(filterSubCategoryErr(err));
        }
    };
};

export { subcategoryFilter };
