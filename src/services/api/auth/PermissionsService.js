import axios from "axios";
import constants from "../constants"

const PermissionsService = {

    getPermissions: function () {
        let permissions = axios.post(constants.api_address + 'auth/get-permissions', {}, {
            headers: {
                'Content-Type': 'application/json',
                'api_token': localStorage.getItem('api_token')
            }
        });
    }
}

export default PermissionsService;