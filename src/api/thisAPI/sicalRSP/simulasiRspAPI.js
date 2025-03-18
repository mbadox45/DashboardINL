import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class simulasiRspAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`sical-rsp-simulation/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`sical-rsp-simulation/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('sical-rsp-simulation');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`sical-rsp-simulation/get/${id}`);
    }
    getCalculate(data) {
        return httpCommonThisAPI.post('sical-rsp-simulation/calculate', data);
    }
})();
