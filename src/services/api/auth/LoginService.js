import axios from "axios";
import constants from "../constants";

const LoginService = {

    LoginUser: function (data) {
        return axios.post(constants.api_address + 'auth/login', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default LoginService;