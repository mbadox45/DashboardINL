import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class dataSdmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`sdm/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`sdm/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('sdm');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('sdm/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`sdm/get/${id}`);
    }
})();
