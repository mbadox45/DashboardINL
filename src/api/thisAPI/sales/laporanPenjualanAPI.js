import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class laporanPenjualanAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`laporan-penjualan/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`laporan-penjualan/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('laporan-penjualan');
    }
    // getByJenis(jenis) {
    //     return httpCommonThisAPI.get(`target-penjualan/jenis/${jenis}`);
    // }
    getByPeriod(date) {
        return httpCommonThisAPI.post('laporan-penjualan/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`laporan-penjualan/get/${id}`);
    }
})();
