import incomingCpoScmAPI from '@/api/thisAPI/supplyChain/incomingCpoScmAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class incomingCpoScmController {
    addPost = async (form) => {
        try {
            const response = await incomingCpoScmAPI.addPost(form);
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
            const response = await incomingCpoScmAPI.updatePost(id, form);
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
            const response = await incomingCpoScmAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await incomingCpoScmAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await incomingCpoScmAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadToExportTable = async (form) => {
        try {
            const list = [];
            const response = await this.getByPeriod(form);
            if (response != null) {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    const detail = data[i].detail;
                    for (let j = 0; j < detail.length; j++) {
                        list.push({
                            tanggal: detail[j].tanggal,
                            qty: Number(detail[j].qty),
                            harga: Number(detail[j].harga),
                            value: Number(detail[j].value),
                            source: detail[j].source.name
                        });
                    }
                    list.push({
                        tanggal: '',
                        qty: Number(data[i].monthQty),
                        harga: '',
                        value: Number(data[i].monthValue),
                        source: 'Total'
                    });
                    list.push({
                        tanggal: '',
                        qty: '',
                        harga: '',
                        value: Number(data[i].target),
                        source: `Target ${moment(data[i].month + ' ' + data[i].year, 'M YYYY').format('MMMM YYYY')}`
                    });
                }
            }
            return list;
        } catch (error) {
            return [];
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            const years = moment(form.tanggalAwal).format('YYYY');
            const data = response.data;
            if (data != null) {
                const list = [];
                for (let i = 0; i < data.length; i++) {
                    list.push({
                        period: `${data[i].month} ${data[i].year}`,
                        month: data[i].month,
                        year: data[i].year,
                        detail: data[i].detail,
                        monthQty: data[i].monthQty,
                        monthValue: data[i].monthValue,
                        remaining: data[i].remaining,
                        target: data[i].target
                    });
                }
                // console.log(list);
                return {
                    data: list,
                    totalQty: response.totalQty,
                    totalValue: response.totalValue
                };
            } else {
                return {
                    data: [],
                    totalQty: 0,
                    totalValue: 0
                };
            }
        } catch (error) {
            return {
                data: [],
                totalQty: 0,
                totalValue: 0
            };
        }
    };
})();
