import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class pengaliRspAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`sical-rsp-pengali/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`sical-rsp-pengali/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('sical-rsp-pengali');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`sical-rsp-pengali/get/${id}`);
    }
})();
