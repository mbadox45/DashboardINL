import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class levyRoutersPenjualanAPI {
    getByPeriod(date) {
        return httpCommonThisAPI.post('levy-reuters/period', date);
    }
})();
