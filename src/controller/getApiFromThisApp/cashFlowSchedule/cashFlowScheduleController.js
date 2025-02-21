import cashFlowScheduleAPI from '@/api/thisAPI/cashFlowSchedule/cashFlowScheduleAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import { bulanKalendar } from '@/controller/getApiFromThisApp/dummy/variableDummy';
import moment from 'moment';

export default new (class cashFlowScheduleController {
    addPost = async (form) => {
        try {
            const response = await cashFlowScheduleAPI.addPost(form);
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
                    msg: `Data sudah tersedia untuk periode ${moment(form.tanggal).format('MMMM YYYY')}.`
                };
            } else {
                return msg_error;
            }
        }
    };
    updatePost = async (id, form) => {
        try {
            const response = await cashFlowScheduleAPI.updatePost(id, form);
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
            const response = await cashFlowScheduleAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await cashFlowScheduleAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await cashFlowScheduleAPI.getByPeriod(form);
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
            if (response != null) {
                const list = [];
                const kategori = response.kategori;
                const bulan = bulanKalendar;
                for (let i = 0; i < bulan.length; i++) {
                    const items = [];
                    for (let j = 0; j < kategori.length; j++) {
                        const period = kategori[j].period;
                        if (period.length > 0) {
                            const data = period.find((item) => item.month == bulan[i].id);
                            items.push({
                                name: kategori[j].name,
                                data: data == null ? [] : data.data,
                                year: data == null ? years : data.year,
                                total: data == null ? 0 : data.total
                            });
                        }
                    }
                    list.push({
                        month: bulan[i].name,
                        items: items
                    });
                }
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
})();
