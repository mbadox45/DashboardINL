import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class masterCostRspAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`sical-rsp-master-costs/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`sical-rsp-master-costs/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('sical-rsp-master-costs');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`sical-rsp-master-costs/get/${id}`);
    }
})();
