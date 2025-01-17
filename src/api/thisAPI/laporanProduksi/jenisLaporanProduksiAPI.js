import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class jenisLaporanProduksiAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`jenis-laporan-prod/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`jenis-laporan-prod/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('jenis-laporan-prod');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`jenis-laporan-prod/get/${id}`);
    }
})();
