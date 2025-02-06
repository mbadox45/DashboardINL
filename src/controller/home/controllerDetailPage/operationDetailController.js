import { pieChartApex } from '@/controller/chartStyle/radialBarDummy';
import bebanProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/bebanProdCpoOlahController';
import targetProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/targetProdCpoOlahController';

export default new (class hargaDetailController {
    cpoOlahVsRkap = async (form) => {
        try {
            const list = [];
            let total = { cpoOlah: 0, totalCost: 0, totalHargaSatuan: 0 };
            const listChart = [];
            const bebanProd = await bebanProdCpoOlahController.getByPeriod(form);
            if (bebanProd != null) {
                const detail = bebanProd.detail;
                total.cpoOlah = bebanProd.cpoOlah;
                total.totalCost = bebanProd.totalCost;
                total.totalHargaSatuan = bebanProd.totalHargaSatuan;
                if (detail.length > 0) {
                    for (let i = 0; i < detail.length; i++) {
                        list.push({
                            uraian: detail[i].uraian,
                            bebanProduksi: detail[i].totalValue,
                            rpKg: detail[i].hargaSatuan,
                            pmg: detail[i].pmg
                        });
                    }
                }
            }
            const targetProd = await targetProdCpoOlahController.getByPeriod(form);
            if (targetProd != null) {
                const summary = targetProd.summary;
                const dataCPO = summary.find((item) => item.nama.toLowerCase().includes('cpo'));
                const cpo = dataCPO.value == null ? 0 : Number(dataCPO.value);
                const dataRKAP = summary.find((item) => item.nama.toLowerCase().includes('rkap'));
                const rkap = dataRKAP.value == null ? 0 : Number(dataRKAP.value);
                const persenRkap = dataRKAP.percentage == null ? 0 : Number(dataRKAP.percentage);
                const dataUtility = summary.find((item) => item.nama.toLowerCase().includes('utility'));
                const utility = dataUtility.value == null ? 0 : Number(dataUtility.value);
                const persenUtility = dataUtility.percentage == null ? 0 : Number(dataUtility.percentage);

                // Go to Chart
                listChart.push(
                    {
                        qty: [cpo, rkap],
                        label: ['CPO Olah', 'RKAP'],
                        name: 'RKAP',
                        persen: persenRkap,
                        chartData: pieChartApex([cpo, rkap], ['CPO Olah', 'RKAP'])
                    },
                    {
                        qty: [cpo, utility],
                        label: ['CPO Olah', 'Kapasitas Utility'],
                        name: 'Kapasitas Utility',
                        persen: persenUtility,
                        chartData: pieChartApex([cpo, utility], ['CPO Olah', 'Kapasitas Utility'])
                    }
                );
            }
            return {
                dataTable: list,
                total: total,
                dataChart: listChart
            };
        } catch (error) {
            const list = [];
            const total = { cpoOlah: 0, totalCost: 0, totalHargaSatuan: 0 };
            const listChart = [];
            return {
                dataTable: list,
                total: total,
                dataChart: listChart
            };
        }
    };
})();
