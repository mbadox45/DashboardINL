import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class dmoRspAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`sical-rsp-dmo/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`sical-rsp-dmo/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('sical-rsp-dmo');
    }
    getLatest() {
        return httpCommonThisAPI.get('sical-rsp-dmo/latest');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`sical-rsp-dmo/get/${id}`);
    }
})();
