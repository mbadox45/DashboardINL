import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class productStorageScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`produk-storage/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`produk-storage/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('produk-storage');
    }
    getByJenis(jenis) {
        return httpCommonThisAPI.get(`produk-storage/jenis/${jenis}`);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`produk-storage/get/${id}`);
    }
})();
