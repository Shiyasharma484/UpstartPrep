import actions from './actions';
import staticData from '../../demoData/subcategories.json';

const initialState = {
    data: staticData,
    loading: false,
    error: null,
};

const { FILTER_SUBCATEGORY_BEGIN, FILTER_SUBCATEGORY_SUCCESS, FILTER_SUBCATEGORY_ERR } = actions;

const subcategoryReducer = (state = initialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case FILTER_SUBCATEGORY_BEGIN:
            return {
                ...initialState,
                loading: true,
            };
        case FILTER_SUBCATEGORY_SUCCESS:
            return {
                ...initialState,
                data,
                loading: false,
            };
        case FILTER_SUBCATEGORY_ERR:
            return {
                ...initialState,
                error: err,
                loading: false,
            };
        default:
            return state;
    }
};

export default subcategoryReducer;
