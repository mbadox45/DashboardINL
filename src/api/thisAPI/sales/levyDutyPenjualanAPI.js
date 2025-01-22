import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class levyDutyPenjualanAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`levyduty/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`levyduty/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('levyduty');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`levyduty/get/${id}`);
    }
})();
