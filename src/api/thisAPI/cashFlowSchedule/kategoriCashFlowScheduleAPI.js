import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class kategoriCashFlowScheduleAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`kategori-cashflowschedlue/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`kategori-cashflowschedlue/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('kategori-cashflowschedlue');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`kategori-cashflowschedlue/get/${id}`);
    }
})();
