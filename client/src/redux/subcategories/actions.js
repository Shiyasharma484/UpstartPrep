const actions = {
    FILTER_SUBCATEGORY_BEGIN: 'FILTER_SUBCATEGORY_BEGIN',
    FILTER_SUBCATEGORY_SUCCESS: 'FILTER_SUBCATEGORY_SUCCESS',
    FILTER_SUBCATEGORY_ERR: 'FILTER_SUBCATEGORY_ERR',

    filterSubCategoryBegin: () => {
        return {
            type: actions.FILTER_SUBCATEGORY_BEGIN,
        };
    },

    filterSubCategorySuccess: data => {
        return {
            type: actions.FILTER_SUBCATEGORY_SUCCESS,
            data,
        };
    },

    filterSubCategoryErr: err => {
        return {
            type: actions.FILTER_SUBCATEGORY_ERR,
            err,
        };
    },
};

export default actions;
