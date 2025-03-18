import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class utilisasiRspAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`sical-rsp-utilisasi/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`sical-rsp-utilisasi/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('sical-rsp-utilisasi');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`sical-rsp-utilisasi/get/${id}`);
    }
})();
