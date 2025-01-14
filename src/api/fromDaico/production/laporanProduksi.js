import { httpCommonFromDaico } from '@/api/http/httpCommon';

export default new (class laporanProduksiAPI {
    getByDateRekap(date) {
        return httpCommonFromDaico.post('laporan-produksi/recap', date);
    }
    getByID(id) {
        return httpCommonFromDaico.get(`laporan-produksi/get/${id}`);
    }
    getByDate(date) {
        return httpCommonFromDaico.post(`laporan-produksi/date`, date);
    }
})();
