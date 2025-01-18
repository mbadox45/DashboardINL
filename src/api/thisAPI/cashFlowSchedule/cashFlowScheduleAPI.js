import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class cashFlowScheduleAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`cashflowschedlue/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`cashflowschedlue/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('cashflowschedlue');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('cashflowschedlue/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`cashflowschedlue/get/${id}`);
    }
})();
