import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class uraianSdmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`uraian-sdm/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`uraian-sdm/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('uraian-sdm');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`uraian-sdm/get/${id}`);
    }
})();
