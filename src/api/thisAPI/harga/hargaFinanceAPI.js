import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class hargaFinanceAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`harga/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`harga/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('harga');
    }
    getByJenis(jenis) {
        return httpCommonThisAPI.get(`harga/jenis/${jenis}`);
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('harga/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`harga/get/${id}`);
    }
})();
