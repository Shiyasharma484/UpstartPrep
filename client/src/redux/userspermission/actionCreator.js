import actions from './actions';
import initialState from '../../demoData/userspermission.json';

const { filterUsersPermissionBegin, filterUsersPermissionSuccess, filterUsersPermissionErr } = actions;

const userspermissionFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterUsersPermissionBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });

      dispatch(filterUsersPermissionSuccess(data));
    } catch (err) {
      dispatch(filterUsersPermissionErr(err));
    }
  };
};

export { userspermissionFilter };
