import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class profitabilityAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`profitability/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`profitability/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('profitability');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('profitability/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`profitability/get/${id}`);
    }
})();
