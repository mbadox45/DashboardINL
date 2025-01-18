import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class mataUangKursAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`matauang/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`matauang/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('matauang');
    }
    getByID(id) {
        return httpCommonThisAPI.get(`matauang/get/${id}`);
    }
})();
