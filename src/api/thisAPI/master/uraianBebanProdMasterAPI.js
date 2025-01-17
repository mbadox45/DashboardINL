import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class uraianBebanProdMasterAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`uraian-beban-prod/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`uraian-beban-prod/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('uraian-beban-prod');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`uraian-beban-prod/get/${id}`);
    }
})();
