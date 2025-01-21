import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class customerPartnerMasterAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`customer/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`customer/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('customer');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`customer/get/${id}`);
    }
})();
