import cashFlowScheduleController from '@/controller/getApiFromThisApp/cashFlowSchedule/cashFlowScheduleController';
import moment from 'moment';
export default new (class payScheduleFinanceController {
    cardBagian = async (form) => {
        try {
            const response = await cashFlowScheduleController.getByPeriod(form);
            const cff = response.kategori.find((item) => item.name.toLowerCase().includes('funding'));
            const cfi = response.kategori.find((item) => item.name.toLowerCase().includes('investment'));
            const last = cff.period[cff.period.length - 1];

            const result = {
                cff: cff.total,
                cfi: cfi.total,
                period: moment(last.month > 9 ? `${last.year.toString()}-${last.month.toString()}-01` : `${last.year.toString()}-0${last.month.toString()}-01`).format('MMMM YYYY')
            };
            return result;
        } catch (error) {
            return {
                cff: 0,
                cfi: 0,
                period: null
            };
        }
    };
})();
