import outstandingCpoScmAPI from '@/api/thisAPI/supplyChain/outstandingCpoScmAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';

export default new (class outstandingCpoScmController {
    addPost = async (form) => {
        try {
            const response = await outstandingCpoScmAPI.addPost(form);
            const load = response.data;
            if (load.success == true) {
                return msg_success;
            } else {
                return msg_warning;
            }
        } catch (error) {
            console.log(error);
            if (error.status == 400) {
                return {
                    status: false,
                    code: 400,
                    msg: `Data sudah tersedia.`
                };
            } else {
                return msg_error;
            }
        }
    };
    updatePost = async (id, form) => {
        try {
            const response = await outstandingCpoScmAPI.updatePost(id, form);
            const load = response.data;
            if (load.success == true) {
                return msg_success;
            } else {
                return msg_warning;
            }
        } catch (error) {
            return msg_error;
        }
    };
    getAll = async () => {
        try {
            const response = await outstandingCpoScmAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await outstandingCpoScmAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async () => {
        try {
            const response = await outstandingCpoScmAPI.getByPeriod();
            const load = response.data;
            const data = load;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadTable = async (form) => {
        try {
            let list;
            if (form == 'getAll') {
                const response = await this.getAll();
                let totalQty = 0;
                let totalValue = 0;
                for (let i = 0; i < response.length; i++) {
                    totalQty += Number(response[i].qty);
                    totalValue += Number(response[i].value);
                }
                list = {
                    data: response,
                    totalQty: totalQty,
                    totalValue: totalValue
                };
            } else {
                const response = await this.getByPeriod();
                list = {
                    data: response.data,
                    totalQty: response.totalQty,
                    totalValue: response.totalValue
                };
            }
            return list;
        } catch (error) {
            return {
                data: [],
                totalQty: 0,
                totalValue: 0
            };
        }
    };
})();
