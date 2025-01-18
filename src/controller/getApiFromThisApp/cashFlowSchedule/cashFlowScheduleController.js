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
            const response = await cashFlowScheduleAPI.updatePost(id, form);
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
                // console.log(response);
                const kategori = response.kategori;
                const bulan = bulanKalendar;
                const cff = kategori.find((item) => item.name.toLowerCase().includes('funding'));
                const cfi = kategori.find((item) => item.name.toLowerCase().includes('investment'));
                if (cff != null && cfi != null) {
                    for (let i = 0; i < bulan.length; i++) {
                        const dataCFF = cff.period.find((item) => item.month == bulan[i].id) == null ? null : cff.period.find((item) => item.month == bulan[i].id);
                        const dataCFI = cfi.period.find((item) => item.month == bulan[i].id) == null ? null : cfi.period.find((item) => item.month == bulan[i].id);
                        list.push({
                            month: bulan[i].name,
                            items: [
                                { name: cff.name, data: dataCFF == null ? [] : dataCFF.data, year: dataCFF == null ? years : dataCFF.year, total: dataCFF == null ? 0 : dataCFF.total },
                                { name: cfi.name, data: dataCFI == null ? [] : dataCFI.data, year: dataCFI == null ? years : dataCFI.year, total: dataCFI == null ? 0 : dataCFI.total }
                            ]
                        });
                    }
                } else if (cff == null && cfi != null) {
                    for (let i = 0; i < bulan.length; i++) {
                        const dataCFI = cfi.period.find((item) => item.month == bulan[i].id) == null ? null : cfi.period.find((item) => item.month == bulan[i].id);
                        list.push({
                            month: bulan[i].name,
                            items: [{ name: cfi.name, data: dataCFI == null ? [] : dataCFI.data, year: dataCFI == null ? years : dataCFI.year, total: dataCFI == null ? 0 : dataCFI.total }]
                        });
                    }
                } else if (cff != null && cfi == null) {
                    for (let i = 0; i < bulan.length; i++) {
                        const dataCFF = cff.period.find((item) => item.month == bulan[i].id) == null ? null : cff.period.find((item) => item.month == bulan[i].id);
                        list.push({
                            month: bulan[i].name,
                            items: [{ name: cff.name, data: dataCFF == null ? [] : dataCFF.data, year: dataCFF == null ? years : dataCFF.year, total: dataCFF == null ? 0 : dataCFF.total }]
                        });
                    }
                } else {
                    for (let i = 0; i < bulan.length; i++) {
                        list.push({
                            month: bulan[i].name,
                            items: []
                        });
                    }
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
