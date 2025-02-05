import actions from './actions';
import initialState from '../../demoData/usersrole.json';

const { filterUsersRoleBegin, filterUsersRoleSuccess, filterUsersRoleErr } = actions;

const usersroleFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterUsersRoleBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterUsersRoleSuccess(data));
    } catch (err) {
      dispatch(filterUsersRoleErr(err));
    }
  };
};

export { usersroleFilter };
