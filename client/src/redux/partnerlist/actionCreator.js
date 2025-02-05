import actions from './actions';
import initialState from '../../demoData/partnerlist.json';

const { filterPartnerListBegin, filterPartnerListSuccess, filterPartnerListErr } = actions;

const partnerlistFilter = (column, value) => {
    return async dispatch => {
        try {
            dispatch(filterPartnerListBegin());

            const data = initialState.filter(item => {
                if (value !== '') {
                    return item[column] === value;
                }
                return item;
            });

            dispatch(filterPartnerListSuccess(data));
        } catch (err) {
            dispatch(filterPartnerListErr(err));
        }
    };
};

export { partnerlistFilter };
