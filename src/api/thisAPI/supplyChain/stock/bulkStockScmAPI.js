import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class bulkStockScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`stock-bulk/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`stock-bulk/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('stock-bulk');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('stock-bulk/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`stock-bulk/get/${id}`);
    }
})();
