import actions from './actions';
import staticData from '../../demoData/addusersrole.json';

const initialState = {
    data: staticData,
    loading: false,
    error: null,
};

const { FILTER_ADDUSERSROLE_BEGIN, FILTER_ADDUSERSROLE_SUCCESS, FILTER_ADDUSERSROLE_ERR } = actions;

const addusersroleReducer = (state = initialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case FILTER_ADDUSERSROLE_BEGIN:
            return {
                ...initialState,
                loading: true,
            };
        case FILTER_ADDUSERSROLE_SUCCESS:
            return {
                ...initialState,
                data,
                loading: false,
            };
        case FILTER_ADDUSERSROLE_ERR:
            return {
                ...initialState,
                error: err,
                loading: false,
            };
        default:
            return state;
    }
};

export default addusersroleReducer;
