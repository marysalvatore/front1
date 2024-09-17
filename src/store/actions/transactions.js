import * as actionTypes from './actionsTypes';
import axios from '../../axios-url';
import Noty from 'noty';
// import { saveToken, saveUserData } from '../../utils/cache';
// import * as actions from './index';

const getTransactionsSuccess = (data) => {
    return {
        type: actionTypes.GET_TRANSACTIONS,
        transactions: data
    }
}

// const getTransactionsFailed = (err) => {
//     return {
//         type: actionTypes.GET_TRANSACTIONS_FAILED,
//         err: err
//     }
// }

const getTransactionSuccess = (data) => {
    return {
        type: actionTypes.GET_TRANSACTION,
        transaction: data
    }
}

// const getTransactionFailed = (err) => {
//     return {
//         type: actionTypes.GET_TRANSACTION_FAILED,
//         err: err
//     }
// }

const getAccountTypesSuccess = (data) => {
    return {
        type: actionTypes.GET_ACCOUNT_TYPES,
        account_types: data
    }
}

// const getAccountTypesFailed = (err) => {
//     return {
//         type: actionTypes.GET_ACCOUNT_TYPES_FAILED,
//         err: err
//     }
// }

const makeTransferSuccess = (data) => {
    return {
        type: actionTypes.MAKE_TRANSFER,
        transfered: data
    }
}

// const makeTransferFailed = (err) => {
//     return {
//         type: actionTypes.MAKE_TRANSFER_FAILED,
//         err: err
//     }
// }


export const getTransactions = (user_id) => {
    return dispatch => {
       console.log('id', user_id)
       axios.get('user/get-transactions',{
           params:{
               user_id
           }
       })
       .then(data => {
           console.log('data', data.data.data);
           dispatch(getTransactionsSuccess(data.data.data))
       })
       .catch(err => {
           console.log(err)
       })
    }
}

export const getTransaction = (user_id, transaction_id) => {
    return dispatch => {
        console.log('user_id & transaction_id', user_id, transaction_id);
        axios.get('user/get-transaction', {
            params: {
                user_id,
                transaction_id
            }
        })
        .then(data => {
            console.log('data', data.data)
            dispatch(getTransactionSuccess(data.data.data))
        })
        .catch(err=> {
            console.log(err)
        })
    }
}

export const getActionTypes = () => {
    return dispatch => {
        axios.get('user/get-account-types')
        .then(data => {
            console.log('action types', data.data.data)
            dispatch(getAccountTypesSuccess(data.data.data))
        })
        .catch(err => {
            console.log(err)
            
        })
    }
}

export const makeTransfer = (payload, history) => {
    return dispatch => {
        console.log('payload', payload);
        axios.post('user/make-transfer', payload)
        .then(data => {
            console.log(data.data.data);
            new Noty({  
                text: "Transfer Successful !!!",
                layout: "topRight",
                theme: "bootstrap-v4",
                type: "success",
                timeout:"3000"
            }).show();
            dispatch(makeTransferSuccess(data.data.data))
            history.push('/user-dashboard');
        })
        .catch(err => {
            console.log(err);
        })

    }
}