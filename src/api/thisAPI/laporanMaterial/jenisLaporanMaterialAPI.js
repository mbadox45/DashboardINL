import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class jenisLaporanMaterialAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`jenis-laporan-material/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`jenis-laporan-material/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('jenis-laporan-material');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`jenis-laporan-material/get/${id}`);
    }
})();
