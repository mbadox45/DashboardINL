import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class sourceCpoScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`source-cpo/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`source-cpo/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('source-cpo');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`source-cpo/get/${id}`);
    }
})();
