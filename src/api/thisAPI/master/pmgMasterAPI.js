import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class pmgMasterAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`pmg/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`pmg/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('pmg');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`pmg/get/${id}`);
    }
})();
