import cashFlowMovementAPI from '@/api/thisAPI/cashFlowMovement/cashFlowMovementAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import { bulanKalendar } from '@/controller/getApiFromThisApp/dummy/variableDummy';
import moment from 'moment';

export default new (class cashFlowMovementController {
    addPost = async (form) => {
        try {
            const response = await cashFlowMovementAPI.addPost(form);
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
            const response = await cashFlowMovementAPI.updatePost(id, form);
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
            const response = await cashFlowMovementAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await cashFlowMovementAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await cashFlowMovementAPI.getByPeriod(form);
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
                // Last Year
                const bulan = bulanKalendar;
                const lastYear = response.lastYear;
                const thisYear = response.thisYear;

                list.push({ name: 'Last Year', items: lastYear.data }, { name: 'This Year', items: thisYear.data });
                console.log(list);
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
})();
