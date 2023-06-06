import axios from 'axios';
import constants from '../../constants'

const LicensesService = {

    getAllLicenses: function () {
        return axios.post(constants.api_address + 'admin/f1/license/get-all', {}, {
            headers: {
                'Content-Type': 'application/json',
                'api_token': '1ZdD9Ob9VcpaaAEyCrj5rCE01o2zrG9QXiUQSCoUU77PoAbPgjJXKn1L1TbTZfNSPSSFeg2N6SDoGusT'
            }
        });
    }
}

export default LicensesService;