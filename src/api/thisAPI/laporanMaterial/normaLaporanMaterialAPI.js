import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class normaLaporanMaterialAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`norma-material/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`norma-material/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('norma-material');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.get('norma-material/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`norma-material/get/${id}`);
    }
})();
