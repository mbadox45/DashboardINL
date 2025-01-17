import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class kategoriCashFlowMovementAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`kategori-cashflowmov/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`kategori-cashflowmov/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('kategori-cashflowmov');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`kategori-cashflowmov/get/${id}`);
    }
})();
