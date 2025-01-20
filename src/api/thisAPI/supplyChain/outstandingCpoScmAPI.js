import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class outstandingCpoScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`outstanding-cpo/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`outstanding-cpo/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('outstanding-cpo');
    }
    getByPeriod() {
        return httpCommonThisAPI.get('outstanding-cpo/period');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`outstanding-cpo/get/${id}`);
    }
})();
