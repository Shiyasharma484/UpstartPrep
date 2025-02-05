import actions from './actions';
import staticData from '../../demoData/partnerlist.json';

const initialState = {
    data: staticData,
    loading: false,
    error: null,
};

const { FILTER_PARTNERLIST_BEGIN, FILTER_PARTNERLIST_SUCCESS, FILTER_PARTNERLIST_ERR } = actions;

const partnerlistReducer = (state = initialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case FILTER_PARTNERLIST_BEGIN:
            return {
                ...initialState,
                loading: true,
            };
        case FILTER_PARTNERLIST_SUCCESS:
            return {
                ...initialState,
                data,
                loading: false,
            };
        case FILTER_PARTNERLIST_ERR:
            return {
                ...initialState,
                error: err,
                loading: false,
            };
        default:
            return state;
    }
};

export default partnerlistReducer;
