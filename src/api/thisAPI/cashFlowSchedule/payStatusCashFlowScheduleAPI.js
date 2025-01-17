import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class payStatusCashFlowScheduleAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`paystatus-cashflowschedlue/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`paystatus-cashflowschedlue/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('paystatus-cashflowschedlue');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`paystatus-cashflowschedlue/get/${id}`);
    }
})();
