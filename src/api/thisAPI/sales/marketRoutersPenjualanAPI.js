import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class marketRoutersPenjualanAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`market-reuters/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`market-reuters/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('market-reuters');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`market-reuters/get/${id}`);
    }
})();
