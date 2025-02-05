import actions from './actions';
import initialState from '../../demoData/addusersrole.json';

const { filterAddUsersRoleBegin, filterAddUsersRoleSuccess, filterAddUsersRoleErr } = actions;

const addusersroleFilter = (column, value) => {
    return async dispatch => {
        try {
            dispatch(filterAddUsersRoleBegin());

            const data = initialState.filter(item => {
                if (value !== '') {
                    return item[column] === value;
                }
                return item;
            });

            dispatch(filterAddUsersRoleSuccess(data));
        } catch (err) {
            dispatch(filterAddUsersRoleErr(err));
        }
    };
};

export { addusersroleFilter };
