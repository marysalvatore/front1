export {
    sendOTP,
    sendAnswer,
    setAuthSuccess,
    setAuthFailure,
    sendTokenSuccess,
    sendTokenFail,
    getDetails,
    saveStepOne,
    saveStepTwo,
    getAllQuestions,
    RegisterUser,
    loginHandler,
    saveUserAccounts
} from './auth';


export {
    fetchOffshoreAccount,
    fetchSavingsAccount,
    uploadPicture
} from './user';

export {
    getTransactions,
    getTransaction,
    getActionTypes,
    makeTransfer
} from './transactions'