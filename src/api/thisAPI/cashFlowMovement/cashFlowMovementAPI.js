import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class cashFlowMovementAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`cashflowmov/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`cashflowmov/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('cashflowmov');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('cashflowmov/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`cashflowmov/get/${id}`);
    }
})();
