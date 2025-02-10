import { lineChartApex } from '@/controller/chartStyle/chartDummy';
import { formatCurrency } from '@/controller/dummyController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import saldoPeScmController from '@/controller/getApiFromThisApp/supplyChain/saldoPeScmController';
import retailStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/retailStockScmController';
import moment from 'moment';

export default new (class scmDetailController {
    saldoPe = async (form) => {
        try {
            const label = [];
            const series = [];
            const table = [];
            let result = {
                series: [],
                chartOptions: null,
                table: null
            };
            const response = await saldoPeScmController.getAll();
            if (response != null) {
                const saldo = response.filter((item) => {
                    const itemDate = new Date(item.tanggal); // Ubah ke tipe Date
                    return itemDate >= new Date(form.tanggalAwal) && itemDate <= new Date(form.tanggalAkhir);
                });
                if (saldo.length > 0) {
                    for (let i = 0; i < saldo.length; i++) {
                        label.push(saldo[i].tanggal);
                        series.push(saldo[i].saldo_tersedia);
                        // table.push({
                        //     tanggal: moment(saldo[i].tanggal).format('DD MMMM YYYY'),
                        //     saldo_awal: formatCurrency(Number(saldo[i].saldo_awal).toFixed(2)),
                        //     saldo_pakai: formatCurrency(Number(saldo[i].saldo_pakai).toFixed(2)),
                        //     saldo_tersedia: formatCurrency(Number(saldo[i].saldo_tersedia).toFixed(2))
                        // });
                    }
                    result.table = {
                        tanggal: moment(saldo[0].tanggal).format('DD MMMM YYYY'),
                        saldo_awal: formatCurrency(Number(saldo[0].saldo_awal).toFixed(2)),
                        saldo_pakai: formatCurrency(Number(saldo[0].saldo_pakai).toFixed(2)),
                        saldo_tersedia: formatCurrency(Number(saldo[0].saldo_tersedia).toFixed(2))
                    };
                }
                result.series.push({
                    name: 'Saldo Tersedia',
                    data: series
                });
                result.chartOptions = lineChartApex(label);
            }
            return result;
        } catch (error) {
            return null;
        }
    };
    stockRitel = async (form) => {
        try {
            const listQtyProduct = [];
            const response = await retailStockScmController.getByPeriod(form);
            const produk = await productMasterController.getAll();
            const ritel = produk.filter((item) => item.jenis == 'ritel');

            if (response != null) {
                const warehouse = response.warehouse;
                for (let i = 0; i < warehouse.length; i++) {
                    const detail = warehouse[i].detail;
                    for (let j = 0; j < detail.length; j++) {
                        listQtyProduct.push({
                            idRitel: detail[j].id_ritel,
                            product: detail[j].product.name,
                            qty: Number(detail[j].qty),
                            tanggal: detail[j].tanggal
                        });
                    }
                }
            }
            // 🔥 Grouping data berdasarkan idRitel dan tanggal
            const groupedData = listQtyProduct.reduce((acc, item) => {
                const key = `${item.idRitel}-${item.tanggal}`; // Buat kunci unik
                if (!acc[key]) {
                    acc[key] = { ...item }; // Simpan item pertama kali
                } else {
                    acc[key].qty += item.qty; // Tambahkan qty jika sudah ada
                }
                return acc;
            }, {});

            // 🔹 Konversi kembali ke array
            const finalList = Object.values(groupedData);

            // Masuk ke Data Produk
            const listLabel = [];
            if (ritel != null) {
                for (let i = 0; i < ritel.length; i++) {
                    const dataRitel = finalList.filter((item) => item.idRitel);
                }
            }
            return finalList; // Mengembalikan hasil
        } catch (error) {
            console.error(error);
            return null;
        }
    };
})();
