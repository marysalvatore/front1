import * as actionTypes from './actionsTypes';
import axios from '../../axios-url';
import Noty from 'noty';
import { saveToken, saveUserData } from '../../utils/cache';

// function httpAction(action) {
//     const httpActionTemplate = {
//       type: "",
//       payload: null,
//       headers: []
//     };
    
//     return {
//       HTTP_ACTION: Object.assign({}, httpActionTemplate, action)
//     };
//   }

export const sendOtpSuccess = (data) => {
   return {
       type: actionTypes.GET_QUESTION,
       question: data
   }
}

export const sendOtpFailure = ( error ) => {
    return {
        type: actionTypes.GET_QUESTION_FAIL,
        error: error
    };
}

export const sendAnswerSuccess = (token) => {
    return {
        type: actionTypes.GET_TOKEN,
        token: token
    }
 }

 export const loginSuccess = (data) => {
    return {
        type: actionTypes.GET_OTP_SUCCESS,
        otp: data
    }
 }

 export const loginFailed = (err) => {
     return {
         type: actionTypes.GET_OTP_FAILED,
         err: err
     }
 }

 export const sendAnswerFailure = (error) => {
    return {
        type: actionTypes.GET_TOKEN_FAIL,
        question: error
    }
 }

 export const sendTokenSuccess = (data) => {
     return {
         type: actionTypes.GET_USER,
         user: data
     }
 }

 export const sendTokenFail = (err) => {
    return {
        type: actionTypes.GET_USER_FAIL,
        user: err
    }
}

export const setAuthSuccess = (val) => {
    return {
        type: actionTypes.IS_AUTH,
        isAuth: val.isAuth
    }
}

export const setAuthFailure = (val) => {
    return {
        type: actionTypes.IS_AUTH_FAIL,
        isAuth: val.isAuth
    }
}

export const saveFirstStep = (data) => {
    return {
        type: actionTypes.SAVE_FIRST_STEP,
        registerFirstStep: data
    }
}


export const saveSecondStep = (data) => {
    return {
        type: actionTypes.SAVE_SECOND_STEP,
        registerSecondStep: data
    }
}


export const saveQuestions = (data) => {
    return {
        type: actionTypes.GET_ALL_QUESTIONS,
        questions: data
    }
}


export const saveUserAccounts = (data) => {
    return {
        type: actionTypes.GET_USER_ACCOUNTS,
        user_accounts: data
    }
}




export const saveStepOne = (data, history) => {
    return dispatch => {
        dispatch(saveFirstStep(data));
        history.push('/auth/details')
    }
}

export const saveStepTwo = (data, history) => {
    return dispatch => {
        dispatch(saveSecondStep(data));
        history.push('/auth/answer')
    }
}

export const getAllQuestions = () => {
    return dispatch => {
        axios.get('auth/get-questions')
        .then(data => {
            console.log('Questions', data.data)
            dispatch(saveQuestions(data.data.data))
        })
    }
}

export const RegisterUser = (payload, history) => {
    return dispatch => {
        console.log('register', payload)
       axios.post('auth/register', payload)
        .then(data => {
            new Noty({  
                text: "You have registered successfully please try to login after 24 hrs!!!",
                layout: "bottomLeft",
                theme: "bootstrap-v4",
                type: "success",
                timeout:"3000"
            }).show();
            history.push('/auth/register')
        })
        .catch(err => {
            console.log('err', err)
            new Noty({  
                text: "You don't match",
                layout: "bottomLeft",
                theme: "bootstrap-v4",
                type: "error",
                timeout:"3000"
            }).show();
            history.push('/auth/register')
        })
    }
}

export const loginHandler = (payload, history, loading) => {
    console.log('load', loading)
    return dispatch => {
        axios.post('auth/login', payload)
        .then(data => {
            console.log('question', data.data.data.access_question);
            
            new Noty({  
                text: "Success!!!",
                layout: "bottomLeft",
                theme: "bootstrap-v4",
                type: "success",
                timeout:"3000"
            }).show();
            dispatch(loginSuccess(data.data.data))
            history.push('/auth/otp');
            
        })
        .catch(err => {
            console.log('errr', err);
            new Noty({  
                text: "Incorrect Username Or Password!!!",
                layout: "bottomLeft",
                theme: "bootstrap-v4",
                type: "error",
                timeout:"3000"
            }).show();
            history.push('/auth/login');
        })
    }
}

export const sendOTP = (access_code, history) => {
    
   return  dispatch => {
       let payload = {access_code: access_code}
        axios.post('auth/check-access-code', payload)
        .then(data => {
            // console.log('return', data.data)
            let question = data.data.data
            new Noty({  
                text: "Success!!!",
                layout: "bottomLeft",
                theme: "bootstrap-v4",
                type: "success",
                timeout:"3000"
            }).show();

            
            dispatch(sendOtpSuccess(question));
             history.push('/auth/question-answer');
        })
        .catch( err => {
            console.log(err);
            new Noty({  
                text: 'Incorrect OTP access code',
                layout: "bottomLeft",
                theme: "bootstrap-v4",
                type: "error",
                timeout:"3000"
            }).show();
            dispatch(sendOtpFailure(err));
            history.push('/auth/login')
        })
   }
}

export const sendAnswer = (id, answer, history) => {
    return dispatch => {
        const payload = {question_id: id, answer: answer};
        // console.log('payload', payload);
        axios.post('auth/check-answer', payload)
        .then(data => {
            // console.log(data.data)
            let token = data.data.token
            dispatch(sendAnswerSuccess(token));
            dispatch(getDetails(token, history));
        })
        .catch(err => {
            console.log(err);
            new Noty({  
                text: 'Invalid Answer',
                layout: "bottomLeft",
                theme: "bootstrap-v4",
                type: "error",
                timeout:"3000"
            }).show();
            dispatch(sendAnswerFailure(err));
            history.push('/auth/login');
        })
    }


}

export const logoutHandler = () => {
    return dispatch => {
        
    }
}

export const getDetails = (token, history) => {
    
    return dispatch => {
    let auth = {};
   
    axios.get('auth/profile',
    {
        headers: {
          'Authorization' : 'Bearer ' + token,
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept' : 'application/json'
        }
      })
    .then( data => {
        let user = data.data.user;
        console.log('user', user)

        
        if(user.verified) {

            new Noty({  
                text: 'Welcome Back ' + user.first_name + ' ' + user.last_name,
                layout: "topRight",
                theme: "bootstrap-v4",
                type: "success",
                timeout:"3000"
            }).show();
            auth = {isAuth: true}
            saveUserData(user);
            saveToken(token);
            
            dispatch(sendTokenSuccess(data.data.user));
            dispatch(saveUserAccounts(data.data.user.accounts.account_types))
            dispatch(setAuthSuccess(auth))

            if(user.role == 'admin'){
                history.push('/admin-dashboard');
            } else {
                history.push('/user-dashboard');
            }
            

         
        } else {
            // user = null;
            new Noty({  
                text: 'Account has been blocked! Please contact customer care for more information!!!',
                layout: "topCenter",
                theme: "bootstrap-v4",
                type: "error",
                timeout:"3000"
            }).show();
            history.push('/auth/login');
         
        }

        
    })
    .catch(err => {
        console.log(err);
        auth = {isAuth: false}
        dispatch(setAuthFailure(auth))
        dispatch(sendTokenFail(err))
        history.push('/auth/login');
    })
    }
    
}