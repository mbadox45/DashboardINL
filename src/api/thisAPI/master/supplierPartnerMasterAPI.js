import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class supplierPartnerMasterAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`supplier/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`supplier/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('supplier');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`supplier/get/${id}`);
    }
})();
