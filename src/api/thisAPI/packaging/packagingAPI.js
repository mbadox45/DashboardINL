import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class packagingAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`packaging/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`packaging/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('packaging');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`packaging/get/${id}`);
    }
})();
