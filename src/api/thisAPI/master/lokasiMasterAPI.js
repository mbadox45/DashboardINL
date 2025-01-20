import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class lokasiMasterAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`lokasi/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`lokasi/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('lokasi');
    }
    getByJenis(jenis) {
        return httpCommonThisAPI.get(`lokasi/jenis/${jenis}`);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`lokasi/get/${id}`);
    }
})();
