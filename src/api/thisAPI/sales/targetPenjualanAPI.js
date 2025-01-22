import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class targetPenjualanAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`target-penjualan/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`target-penjualan/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('target-penjualan');
    }
    // getByJenis(jenis) {
    //     return httpCommonThisAPI.get(`target-penjualan/jenis/${jenis}`);
    // }
    getByPeriod(date) {
        return httpCommonThisAPI.post('target-penjualan/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`target-penjualan/get/${id}`);
    }
})();
