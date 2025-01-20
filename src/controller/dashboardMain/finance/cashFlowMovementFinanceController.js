import { formatCurrency } from '@/controller/dummyController';
import cashFlowMovementController from '@/controller/getApiFromThisApp/cashFlowMovement/cashFlowMovementController';
import moment from 'moment';
export default new (class cashFlowMovementFinanceController {
    cardBagianCashBalance = async (form) => {
        try {
            const response = await cashFlowMovementController.getByPeriod(form);

            const result = response.latestCashBalance;
            const thisYear = response.thisYear;
            const date = thisYear.data[thisYear.data.length - 1];
            return {
                cash: formatCurrency((Number(result.value) / 1000000000).toFixed(0)),
                status: result.status,
                period: moment(`${thisYear.year}-${date.month > 9 ? date.month.toString() : '0' + date.month.toString()}-01`).format('MMMM YYYY')
            };
        } catch (error) {
            return {
                cash: 0,
                status: 'up',
                period: null
            };
        }
    };
    // cardBagianCashBalance = async (form) => {
    //     try {
    //         const response = await cashFlowMovementController.getByPeriod(form);

    //         const result = response.latestCashBalance;
    //         const thisYear = response.thisYear;
    //         const date = thisYear.data[thisYear.data.length - 1];
    //         return {
    //             cash: formatCurrency((Number(result.value) / 1000000000).toFixed(0)),
    //             status: result.status,
    //             period: moment(`${thisYear.year}-${date.month > 9 ? date.month.toString() : '0' + date.month.toString()}-01`).format('MMMM YYYY')
    //         };
    //     } catch (error) {
    //         return {
    //             cash: 0,
    //             status: 'up',
    //             period: null
    //         };
    //     }
    // };
})();
