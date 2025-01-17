import bebanProdCpoOlahAPI from '@/api/thisAPI/cpoOlah/bebanProdCpoOlahAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class bebanProdCpoOlahController {
    addPost = async (form) => {
        try {
            const response = await bebanProdCpoOlahAPI.addPost(form);
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
            const response = await bebanProdCpoOlahAPI.updatePost(id, form);
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
            const response = await bebanProdCpoOlahAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await bebanProdCpoOlahAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await bebanProdCpoOlahAPI.getByPeriod(form);
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
            if (response != null) {
                const data = response.detail;
                return {
                    cpoOlah: response.cpoOlah,
                    totalCost: response.totalCost,
                    totalHargaSatuan: response.totalHargaSatuan,
                    data: data
                };
            } else {
                return {
                    cpoOlah: 0,
                    totalCost: 0,
                    totalHargaSatuan: 0,
                    data: []
                };
            }
        } catch (error) {
            return {
                cpoOlah: 0,
                totalCost: 0,
                totalHargaSatuan: 0,
                data: []
            };
        }
    };
})();
