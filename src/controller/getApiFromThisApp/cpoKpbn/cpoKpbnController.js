import cpoKpbnAPI from '@/api/thisAPI/cpoKpbn/cpoKpbnAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class cpoKpbnController {
    addPost = async (form) => {
        try {
            const response = await cpoKpbnAPI.addPost(form);
            const load = response.data;
            if (load.success == true) {
                return msg_success;
            } else {
                return msg_warning;
            }
        } catch (error) {
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
            const response = await cpoKpbnAPI.updatePost(id, form);
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
            const response = await cpoKpbnAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await cpoKpbnAPI.getByID(id);
            const load = response.data;
            const data = load.pmg;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await cpoKpbnAPI.getByPeriod(form);
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
            const years = moment(form.tanggalAwal).format('YYYY');
            const data = response.years;
            if (data != null) {
                const list = data;
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
    loadToExportTable = async (form) => {
        try {
            const list = [];
            const response = await this.getByPeriod(form);
            if (response != null) {
                const data = response.years;
                if (data != null) {
                    for (let i = 0; i < data.length; i++) {
                        const months = data[i].months;
                        for (let j = 0; j < months.length; j++) {
                            const detail = months[j].detail;
                            for (let k = 0; k < detail.length; k++) {
                                list.push({
                                    kurs: detail[k].kurs,
                                    tanggal: detail[k].tanggal,
                                    value: detail[k].value,
                                    valueAsing: detail[k].valueAsing
                                });
                            }
                        }
                    }
                }
            }
            return list;
        } catch (error) {
            return [];
        }
    };
})();
