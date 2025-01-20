import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class laporanMaterialAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`laporan-material/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`laporan-material/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.post('laporan-material');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('laporan-material/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`laporan-material/get/${id}`);
    }
})();
