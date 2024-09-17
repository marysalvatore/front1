import axios from 'axios' ;

// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL:  'https://backend.anselbank.online/api/',
    headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': 'https://backend.anselbank.online'
    }


});

// http://localhost:3999/api/
//

export default instance;
