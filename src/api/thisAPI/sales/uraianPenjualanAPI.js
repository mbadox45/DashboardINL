import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class uraianPenjualanAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`uraian-target-penjualan/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`uraian-target-penjualan/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('uraian-target-penjualan');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`uraian-target-penjualan/get/${id}`);
    }
})();
