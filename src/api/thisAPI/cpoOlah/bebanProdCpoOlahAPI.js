import { httpAuthThisAPI, httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class bebanProdCpoOlahAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`beban-prod/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`beban-prod/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.post('beban-prod');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('beban-prod/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`beban-prod/get/${id}`);
    }
})();
