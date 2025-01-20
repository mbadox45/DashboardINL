import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class cpoStockScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`stock-cpo/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`stock-cpo/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('stock-cpo');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('stock-cpo/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`stock-cpo/get/${id}`);
    }
})();
