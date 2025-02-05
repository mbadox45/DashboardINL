import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class hargaSpotSalesAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`harga-spot/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`harga-spot/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('harga-spot');
    }
    getByJenis(jenis) {
        return httpCommonThisAPI.get(`harga-spot/jenis/${jenis}`);
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('harga-spot/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`harga-spot/get/${id}`);
    }
})();
