const actions = {
    FILTER_PARTNERLIST_BEGIN: 'FILTER_PARTNERLIST_BEGIN',
    FILTER_PARTNERLIST_SUCCESS: 'FILTER_PARTNERLIST_SUCCESS',
    FILTER_PARTNERLIST_ERR: 'FILTER_PARTNERLIST_ERR',

    filterPartnerListBegin: () => {
        return {
            type: actions.FILTER_PARTNERLIST_BEGIN,
        };
    },

    filterPartnerListSuccess: data => {
        return {
            type: actions.FILTER_PARTNERLIST_SUCCESS,
            data,
        };
    },

    filterPartnerListErr: err => {
        return {
            type: actions.FILTER_PARTNERLIST_ERR,
            err,
        };
    },
};

export default actions;
