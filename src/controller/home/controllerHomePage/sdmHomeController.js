import { formatCurrency } from '@/controller/dummyController';
import dataSdmController from '@/controller/getApiFromThisApp/sdm/dataSdmController';

export default new (class sdmHomeController {
    sdm = async (form) => {
        try {
            let result = {
                karyawanPria: 0,
                karyawanWanita: 0,
                karyawanTetap: 0,
                karyawanTidakTetap: 0,
                karyawanTotal: 0,
                safeManhours: 0
            };
            const response = await dataSdmController.getByPeriod(form);
            if (response != null) {
                const pria = response.find((item) => item.uraian_id == 1);
                const wanita = response.find((item) => item.uraian_id == 2);
                const tetap = response.find((item) => item.uraian_id == 3);
                const tidakTetap = response.find((item) => item.uraian_id == 4);
                const safe = response.find((item) => item.uraian_id == 5);
                const total = response.find((item) => item.uraian_id == 6);
                result = {
                    karyawanPria: formatCurrency(Number(pria.nilai).toFixed(0)),
                    karyawanWanita: formatCurrency(Number(wanita.nilai).toFixed(0)),
                    karyawanTetap: formatCurrency(Number(tetap.nilai).toFixed(0)),
                    karyawanTidakTetap: formatCurrency(Number(tidakTetap.nilai).toFixed(0)),
                    karyawanTotal: formatCurrency(Number(total.nilai).toFixed(0)),
                    safeManhours: formatCurrency(Number(safe.nilai).toFixed(0))
                };
            }
            return result;
        } catch (error) {
            let result = {
                karyawanPria: 0,
                karyawanWanita: 0,
                karyawanTetap: 0,
                karyawanTidakTetap: 0,
                karyawanTotal: 0,
                safeManhours: 0
            };
            return result;
        }
    };
})();
