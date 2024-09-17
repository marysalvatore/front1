import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';


const initialState = {
    transactions: [],
    account_types: [],
    transfered: {},
    transaction: {}
}

const getTransactionsSuccess = (state, action) => {
    return updateObject(state, {
        transactions: action.transactions
    })
}

const getTransactionsFailure = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const getTransactionSuccess = (state, action) => {
    return updateObject(state, {
        transaction: action.transaction
    })
}

// const getTransactionFailure = (state, action) => {
//     return updateObject(state, {
//         loading: false
//     })
// }

const getAccountTypesSuccess = (state, action) => {
    return updateObject(state, {
        account_types: action.account_types
    })
}

const getAccountTypesFailure = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const makeTransferSuccess = (state, action) => {
    return updateObject(state, {
        transfered: action.transfered
    })
}

const makeTransferFailure = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        // case actionTypes.GET_OFFSHORE_ACCOUNT: return getSavingsSuccess(state, action);
        case actionTypes.GET_TRANSACTIONS: return getTransactionsSuccess(state, action);
        case actionTypes.GET_TRANSACTIONS_FAILED: return getTransactionsFailure(state, action);
        case actionTypes.GET_TRANSACTION : return getTransactionSuccess(state, action);
        case actionTypes.GET_TRANSACTION_FAILED : return actionTypes.GET_TRANSACTION_FAILED(state, action)
        case actionTypes.GET_ACCOUNT_TYPES: return getAccountTypesSuccess(state, action);
        case actionTypes.GET_ACCOUNT_TYPES_FAILED: return getAccountTypesFailure(state, action);
        case actionTypes.MAKE_TRANSFER: return makeTransferSuccess(state, action);
        case actionTypes.MAKE_TRANSFER_FAILED: return makeTransferFailure(state, action)
        default: return state;
    }
}

export default reducer;