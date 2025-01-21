import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class jenisLaporanPackagingAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`jenis-laporan-packaging/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`jenis-laporan-packaging/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('jenis-laporan-packaging');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`jenis-laporan-packaging/get/${id}`);
    }
})();
