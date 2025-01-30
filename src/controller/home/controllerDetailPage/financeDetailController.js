import profitabilityController from '@/controller/getApiFromThisApp/profitability/profitabilityController';

export default new (class financeDetailController {
    revenue = async (form) => {
        try {
            let result = {
                chart: {
                    dataNow: [],
                    dataLast: [],
                    dataTarget: []
                },
                tabel: {
                    dataNow: [],
                    dataLast: []
                }
            };
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                const monthsThisYear = response.thisYear;
                const monthsLasttMonth = response.lastYear;
            }
            return result;
        } catch (error) {
            let result = {
                chart: {
                    dataNow: [],
                    dataLast: [],
                    dataTarget: []
                },
                tabel: {
                    dataNow: [],
                    dataLast: []
                }
            };
            return result;
        }
    };
})();
