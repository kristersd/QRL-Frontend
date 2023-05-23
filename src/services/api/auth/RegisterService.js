import axios from 'axios';
import constants from '../constants';

const RegisterService = {

    RegisterUser: function(data) {
        return axios.post(constants.api_address + 'auth/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default RegisterService;