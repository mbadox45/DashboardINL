import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class laporanProduksiAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`laporan-prod/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`laporan-prod/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.post('laporan-prod');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('laporan-prod/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`laporan-prod/get/${id}`);
    }
})();
