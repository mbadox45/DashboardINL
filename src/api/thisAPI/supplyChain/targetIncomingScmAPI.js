import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class targetIncomingScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`target-income-cpo/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`target-income-cpo/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('target-income-cpo');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`target-income-cpo/get/${id}`);
    }
})();
