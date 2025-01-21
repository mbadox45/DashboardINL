import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class targetPackagingAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`target-packaging/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`target-packaging/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.post('target-packaging');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('target-packaging/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`target-packaging/get/${id}`);
    }
})();
