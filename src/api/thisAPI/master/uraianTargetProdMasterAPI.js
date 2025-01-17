import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class uraianTargetProdMasterAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`uraian-target-prod/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`uraian-target-prod/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('uraian-target-prod');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`uraian-target-prod/get/${id}`);
    }
})();
