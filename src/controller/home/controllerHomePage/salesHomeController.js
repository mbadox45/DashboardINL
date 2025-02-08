import { pieChartApex } from '@/controller/chartStyle/radialBarDummy';
import targetPenjualanController from '@/controller/getApiFromThisApp/sales/targetPenjualanController';
import moment from 'moment';

export default new (class salesHomeController {
    laporanPenjualanBulk = async (form) => {
        try {
            let data = {
                rkap: 0,
                real: 0,
                persen: 0,
                tanggal: 0,
                listChart: []
            };
            const response = await targetPenjualanController.getByPeriod(form);
            if (response != null) {
                const listData = [];
                const listLabel = [];
                const ritel = response.bulk;
                if (ritel != null) {
                    const rkap = Number(ritel.totalQtyTargetKategori) / 1000;
                    data.rkap = rkap;
                    const real = Number(ritel.totalQtyKategori) / 1000;
                    data.real = real;
                    const persen = ritel.percentageQtyToTargetKategori;
                    data.persen = persen;
                    const tanggal = moment(form.tanggalAkhir).format('DD MMMM YYYY');
                    data.tanggal = tanggal;
                    const product = ritel.products;
                    if (product.length > 0) {
                        for (let i = 0; i < product.length; i++) {
                            listData.push(Number(product[i].totalQty) / 1000);
                            listLabel.push(product[i].name);
                        }
                    }
                    data.listChart.push({
                        series: listData,
                        options: pieChartApex(listLabel, listData)
                    });
                }
            }
            return data;
        } catch (error) {
            const data = {
                rkap: 0,
                real: 0,
                persen: 0,
                tanggal: '-',
                listChart: []
            };
            return data;
        }
    };
    laporanPenjualanRitel = async (form) => {
        try {
            let data = {
                rkap: 0,
                real: 0,
                persen: 0,
                tanggal: 0,
                listChart: []
            };
            const response = await targetPenjualanController.getByPeriod(form);
            if (response != null) {
                const listData = [];
                const listLabel = [];
                const ritel = response.ritel;
                if (ritel != null) {
                    const rkap = ritel.totalQtyTargetKategori;
                    data.rkap = rkap;
                    const real = ritel.totalQtyKategori;
                    data.real = real;
                    const persen = ritel.percentageQtyToTargetKategori;
                    data.persen = persen;
                    const tanggal = moment(form.tanggalAkhir).format('DD MMMM YYYY');
                    data.tanggal = tanggal;
                    const product = ritel.products;
                    if (product.length > 0) {
                        for (let i = 0; i < product.length; i++) {
                            listData.push(product[i].totalQty);
                            listLabel.push(product[i].name);
                        }
                    }
                    data.listChart.push({
                        series: listData,
                        options: pieChartApex(listLabel, listData)
                    });
                }
            }
            return data;
        } catch (error) {
            const data = {
                rkap: 0,
                real: 0,
                persen: 0,
                tanggal: '-',
                listChart: []
            };
            return data;
        }
    };
})();
