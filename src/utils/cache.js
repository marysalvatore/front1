// import ENV from '../env';
import CryptoJS from 'crypto-js';



/*to get user token*/
export const getToken = () => {

    return window.localStorage.getItem('my-secret-token');
  };
  /*to register the token*/
  export const saveToken = token => {
    window.localStorage.setItem('my-secret-token', token);
  };

  /*save user data*/
export const saveUserData = (userData) => {
    userData = JSON.stringify(userData);
    /*re-encrypt the user information in KMUS with KMUS application key*/
    const encryptedUserData = CryptoJS.AES.encrypt(userData, 'my-secret-token');
    window.localStorage.setItem('user-data', encryptedUserData);
};


export const getUserData = () => {
    const userData = window.localStorage.getItem('user-data');
    if(userData) {
      const bytes = CryptoJS.AES.decrypt(userData.toString(), 'my-secret-token');
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  };

  export const logoutUser = () => {
    window.localStorage.removeItem('user-data');
    destroyToken();
  };
  /*destroying the token function*/
  export const destroyToken = () => {
    window.localStorage.removeItem('my-secret-token');
  };
