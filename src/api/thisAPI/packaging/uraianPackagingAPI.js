import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class uraianPackagingAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`uraian-target-packaging/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`uraian-target-packaging/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('uraian-target-packaging');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`uraian-target-packaging/get/${id}`);
    }
})();
