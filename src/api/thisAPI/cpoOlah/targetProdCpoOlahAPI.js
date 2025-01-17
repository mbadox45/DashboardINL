import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class targetProdCpoOlahAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`target-prod/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`target-prod/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('target-prod');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('target-prod/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`target-prod/get/${id}`);
    }
})();
