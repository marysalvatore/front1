import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';


const initialState = {
    savings: {},
    offshore: {},
    current: {},
    loading: false,
    err: null
}

const getSavingsSuccess = (state, action) => {
    return updateObject(state, {
        savings: action.savings,
        offshore: action.offshore
    })
}

const getSavingsFailure = (state, action) => {
    return updateObject(state, {
        loading: false,
        err: action.err,
        
    })
}

const getOffshoreSuccess = (state, action) => {
     return updateObject(state, {
         offshore: action.offshore,
         savings: action.savings
     })
}

const getOffshoreFailure = (state, action) => {
    return updateObject(state, {
        loading: false,
        err: action.err
    })
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_SAVINGS_ACCOUNT: return getSavingsSuccess(state, action);
        case actionTypes.GET_SAVINGS_ACCOUNT_FAILED: return getSavingsFailure(state, action);
        case actionTypes.GET_OFFSHORE_ACCOUNT: return getOffshoreSuccess(state, action);
        case actionTypes.GET_OFFSHORE_ACCOUNT_FAILED: return getOffshoreFailure(state, action);
        default: return state;
    }
}

export default reducer;