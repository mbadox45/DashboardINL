import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class productMasterAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`produk/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`produk/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('produk');
    }
    getByJenis(jenis) {
        return httpCommonThisAPI.get(`produk/jenis/${jenis}`);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`produk/get/${id}`);
    }
})();
