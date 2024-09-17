import * as actionTypes from './actionsTypes';
import axios from '../../axios-url';
// import Noty from 'noty';
import { getToken } from '../../utils/cache';
import * as actions from './index';

const fetchOffshoreSuccess = (data) => {
    return {
        type: actionTypes.GET_OFFSHORE_ACCOUNT,
        offshore: data,
        savings: {}
    }
}
const fetchOffshoreFailed = (err) => {
    return {
        type: actionTypes.GET_OFFSHORE_ACCOUNT_FAILED,
        err: err
    }
}

const fetchSavingsSuccess = (data) => {
    return {
        type: actionTypes.GET_SAVINGS_ACCOUNT,
        savings: data,
        offshore: {}
    }
}

const fetchSavingsFailed = (err) => {
    return {
        type: actionTypes.GET_SAVINGS_ACCOUNT_FAILED,
        err: err
    }
}

export const fetchOffshoreAccount = (user_id, acc_id) => {
    return dispatch => {
        let payload = {user_id, acc_id};
        axios.get('user/get-offshore', {
            params: payload
        })
        .then(data => {
            dispatch(fetchOffshoreSuccess(data.data.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchOffshoreFailed(err));
        })
    }
}

export const fetchSavingsAccount = (user_id, acc_id) => {
    return dispatch => {
        const payload = {user_id, acc_id};
        axios.get('user/get-savings', {
            params: payload
        })
        .then(data => {
            dispatch(fetchSavingsSuccess(data.data.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchSavingsFailed(err));
        })
    }
}

export const uploadPicture = (user_id, file) => {
    return dispatch => {
        let formData = new FormData();
        formData.append('image',file);
        formData.append('user_id', user_id)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post("/upload",formData, config)
        .then(data => {
            const token = getToken()
            return actions.getDetails(token)

        })
        .catch((error) => {
            console.log('err', error);
        });
    }
}