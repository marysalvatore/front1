// import { update } from '../../../../bank-backend/models/user';
import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    user: {},
    isAuth: false,
    question: {},
    loading: false,
    token: '',
    registerFirstStep: {},
    registerSecondStep: {},
    questions: [],
    otp: {},
    user_accounts: []
};


const saveUserAccounts = (state, action) => {
    return updateObject(state, {
        user_accounts: action.user_accounts
    })
}

//Register steps

const saveFirstStep = (state, action) => {
    return updateObject(state, {
        registerFirstStep: action.registerFirstStep
    })
}

const saveSecondStep = (state, action) => {
    return updateObject(state, {
        registerSecondStep: action.registerSecondStep
    })
}

const sendOtpSuccess = (state, action) => {
   return updateObject(state, {
       question : action.question
   })
}
 
const sendOtpFailure = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}

const sendAnswerSuccess = (state, action) => {
     return updateObject(state, {
        token : action.token
     })
}

const sendAnswerFailure = (state, action) => {
    return updateObject(state, {
       laoding: false
    })
}

const sendTokenSuccess = (state, action) => {
    return updateObject(state, {
       user: action.user
    })
}

const sendTokenFailure = (state, action) => {
    return updateObject(state, {
       loading: false
    })
}

const setAuthSuccess = (state, action) => {
    return updateObject(state, {
        isAuth: action.isAuth
    })
}

const setAuthFailure = (state, action) => {
    return updateObject(state, {
        isAuth: action.isAuth
    })
}

const setOtpSuccess = (state, action) => {
    return updateObject(state, {
        otp: action.otp
    })
}

const saveQuestions = (state, action) => {
    return updateObject(state, {
        questions: action.questions
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_QUESTION : return sendOtpSuccess(state, action);
        case actionTypes.GET_QUESTION_FAIL : return sendOtpFailure(state, action);
        case actionTypes.GET_TOKEN : return sendAnswerSuccess(state, action);
        case actionTypes.GET_TOKEN_FAIL : return sendAnswerFailure(state, action);
        case actionTypes.GET_USER: return sendTokenSuccess(state, action);  
        case actionTypes.GET_USER_FAIL: return sendTokenFailure(state, action);
        case actionTypes.IS_AUTH: return setAuthSuccess(state, action);
        case actionTypes.IS_AUTH_FAIL: return setAuthFailure(state, action);
        case actionTypes.SAVE_FIRST_STEP: return saveFirstStep(state, action);
        case actionTypes.SAVE_SECOND_STEP: return saveSecondStep(state, action);
        case actionTypes.GET_ALL_QUESTIONS:  return saveQuestions(state, action);
        case actionTypes.GET_OTP_SUCCESS: return setOtpSuccess(state, action);
        case actionTypes.GET_USER_ACCOUNTS: return saveUserAccounts(state, action);
        default: return state;
    }
}

export default reducer;