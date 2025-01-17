import targetProdCpoOlahAPI from '@/api/thisAPI/cpoOlah/targetProdCpoOlahAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class targetProdCpoOlahController {
    addPost = async (form) => {
        try {
            const response = await targetProdCpoOlahAPI.addPost(form);
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
                    msg: `Data sudah tersedia untuk periode ${moment(form.tanggal).format('MMMM YYYY')}.`
                };
            } else {
                return msg_error;
            }
        }
    };
    updatePost = async (id, form) => {
        try {
            const response = await targetProdCpoOlahAPI.updatePost(id, form);
            const load = response.data;
            console.log(load);
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
            const response = await targetProdCpoOlahAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await targetProdCpoOlahAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await targetProdCpoOlahAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            const data = response.detail;
            if (data != null) {
                return {
                    cpoOlah: response.cpoOlah,
                    summary: response.summary,
                    data: data
                };
            } else {
                return {
                    cpoOlah: 0,
                    summary: [],
                    data: []
                };
            }
        } catch (error) {
            return {
                cpoOlah: 0,
                summary: [],
                data: []
            };
        }
    };
})();
