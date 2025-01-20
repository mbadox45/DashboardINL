import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class retailStockScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`stock-retail/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`stock-retail/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('stock-retail');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('stock-retail/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`stock-retail/get/${id}`);
    }
})();
