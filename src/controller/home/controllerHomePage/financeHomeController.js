import profitabilityController from '@/controller/getApiFromThisApp/profitability/profitabilityController';

export default new (class financeHomeController {
    revenue = async (form) => {
        try {
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                return [];
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
})();
