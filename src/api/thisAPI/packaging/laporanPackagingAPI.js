import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class laporanPackagingAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`laporan-packaging/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`laporan-packaging/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.post('laporan-packaging');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('laporan-packaging/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`laporan-packaging/get/${id}`);
    }
})();
