import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class cpoKpbnAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`cpo-kpbn/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`cpo-kpbn/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('cpo-kpbn');
    }
    getLatest() {
        return httpCommonThisAPI.get('cpo-kpbn/latest');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('cpo-kpbn/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`cpo-kpbn/get/${id}`);
    }
})();
