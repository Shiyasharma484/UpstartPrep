const actions = {
    FILTER_ADDUSERSROLE_BEGIN: 'FILTER_ADDUSERSROLE_BEGIN',
    FILTER_ADDUSERSROLE_SUCCESS: 'FILTER_ADDUSERSROLE_SUCCESS',
    FILTER_ADDUSERSROLE_ERR: 'FILTER_ADDUSERSROLE_ERR',

    filterAddUsersRoleBegin: () => {
        return {
            type: actions.FILTER_ADDUSERSROLE_BEGIN,
        };
    },

    filterAddUsersRoleSuccess: data => {
        return {
            type: actions.FILTER_ADDUSERSROLE_SUCCESS,
            data,
        };
    },

    filterAddUsersRoleErr: err => {
        return {
            type: actions.FILTER_ADDUSERSROLE_ERR,
            err,
        };
    },
};

export default actions;
