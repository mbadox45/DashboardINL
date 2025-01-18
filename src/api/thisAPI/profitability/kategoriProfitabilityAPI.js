import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class kategoriProfitabilityAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`kategori-profitability/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`kategori-profitability/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('kategori-profitability');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`kategori-profitability/get/${id}`);
    }
})();
