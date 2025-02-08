import { pieChartApex, radialChartApex } from '@/controller/chartStyle/radialBarDummy';
import { formatCurrency } from '@/controller/dummyController';
import bebanProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/bebanProdCpoOlahController';
import targetProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/targetProdCpoOlahController';
import laporanProduksiController from '@/controller/getApiFromThisApp/laporanProduksi/laporanProduksiController';
import jenisLaporanPackagingController from '@/controller/getApiFromThisApp/packaging/jenisLaporanPackagingController';
import laporanPackagingController from '@/controller/getApiFromThisApp/packaging/laporanPackagingController';
import targetPackagingController from '@/controller/getApiFromThisApp/packaging/targetPackagingController';

export default new (class hargaDetailController {
    laporanPackaging = async (form) => {
        try {
            const list = [];
            const response = await laporanPackagingController.getByPeriod(form);
            const target = await targetPackagingController.getByPeriod(form);
            const jenis = await jenisLaporanPackagingController.getAll();
            for (let i = 0; i < jenis.length; i++) {
                const listKategori = [];
                const listChart = [];
                if (response != null) {
                    const summaryLaporan =
                        response.summary == null
                            ? null
                            : response.summary.find((item) => item.jenis_laporan.toLowerCase().includes(jenis[i].name.toLowerCase())) == null
                              ? null
                              : response.summary.find((item) => item.jenis_laporan.toLowerCase().includes(jenis[i].name.toLowerCase()));
                    // Laporan
                    if (summaryLaporan != null) {
                        const kategoriData = summaryLaporan.kategori_data;
                        if (kategoriData.length > 0) {
                            const bahanOlah = kategoriData.find((item) => item.kategori.toLowerCase().includes('bahan_olah'));
                            if (bahanOlah != null) {
                                const items = bahanOlah.items;
                                for (let j = 0; j < items.length; j++) {
                                    listKategori.push({
                                        name: items[j].name,
                                        totalQty: items[j].totalQty
                                    });
                                }
                                // console.log(listKategori);
                            }
                            const produkHasil = kategoriData.find((item) => item.kategori.toLowerCase().includes('produk_hasil'));
                            if (produkHasil != null) {
                                const items = produkHasil.items;
                                for (let j = 0; j < items.length; j++) {
                                    listKategori.push({
                                        name: items[j].name,
                                        totalQty: items[j].totalQty
                                    });
                                }
                            }
                            const others = kategoriData.find((item) => item.kategori.toLowerCase().includes('others'));
                            if (others != null) {
                                const items = others.items;
                                for (let j = 0; j < items.length; j++) {
                                    listKategori.push({
                                        name: items[j].name,
                                        totalQty: items[j].totalQty
                                    });
                                }
                            }
                        }
                    }

                    // Target
                    const summaryTarget =
                        target.summary == null
                            ? null
                            : target.summary.find((item) => item.name.toLowerCase().includes(jenis[i].name.toLowerCase())) == null
                              ? null
                              : target.summary.find((item) => item.name.toLowerCase().includes(jenis[i].name.toLowerCase()));
                    if (summaryTarget != null) {
                        const real = summaryTarget.finalValueProdukHasil;
                        const summary = summaryTarget.summary;
                        const rkapData = summary == null ? null : summary.find((item) => item.nama.toLowerCase().includes('rkap'));
                        const rkap = rkapData == null ? [0] : [Number(Number(rkapData.percentage).toFixed(2))];
                        const rkapQty = rkapData == null ? 0 : formatCurrency(Number(rkapData.value).toFixed(2));
                        const utilityData = summary == null ? null : summary.find((item) => item.nama.toLowerCase().includes('utility'));
                        const utility = utilityData == null ? [0] : [Number(Number(utilityData.percentage).toFixed(2))];
                        const utilityQty = utilityData == null ? 0 : formatCurrency(Number(utilityData.value).toFixed(2));
                        const planData = summary == null ? null : summary.find((item) => item.nama.toLowerCase().includes('sales'));
                        const plan = planData == null ? [0] : [Number(Number(planData.percentage).toFixed(2))];
                        const planQty = planData == null ? 0 : formatCurrency(Number(planData.value).toFixed(2));
                        listChart.push(
                            { real: formatCurrency(Number(real).toFixed(2)), qty: rkapQty, series: rkap, chartData: radialChartApex(['RKAP'], ['rgba(6, 130, 212, 0.6)'], rkap[0]) },
                            { real: formatCurrency(Number(real).toFixed(2)), qty: utilityQty, series: utility, chartData: radialChartApex(['Utility'], ['rgba(34, 197, 94, 0.6)'], utility[0]) },
                            { real: formatCurrency(Number(real).toFixed(2)), qty: planQty, series: plan, chartData: radialChartApex(['Sales Plan'], ['rgba(228, 40, 124, 0.6)'], plan[0]) }
                        );
                    }
                }
                list.push({
                    name: jenis[i].name,
                    data: listKategori,
                    chart: listChart
                });
            }
            console.log(list);
            return list;
        } catch (error) {
            return null;
        }
    };
    laporanProduksi = async (form) => {
        try {
            const list = [];
            const response = await laporanProduksiController.getByPeriod(form);
            if (response != null) {
                for (let i = 0; i < response.length; i++) {
                    const listKategori = [];
                    const kategoriData = response[i].kategori_data;
                    const others = kategoriData.find((item) => item.kategori.toLowerCase().includes('others'));
                    const bahan_olah = kategoriData.find((item) => item.kategori.toLowerCase().includes('bahan_olah'));
                    const produk_hasil = kategoriData.find((item) => item.kategori.toLowerCase().includes('produk_hasil'));
                    if (bahan_olah != null) {
                        const items = bahan_olah.items;
                        for (let j = 0; j < items.length; j++) {
                            listKategori.push({
                                name: items[j].name + '(Olah)',
                                totalQty: items[j].totalQty
                            });
                        }
                    }
                    if (produk_hasil != null) {
                        const items = produk_hasil.items;
                        for (let j = 0; j < items.length; j++) {
                            listKategori.push({
                                name: items[j].name + '(Produksi)',
                                totalQty: items[j].totalQty
                            });
                        }
                    }
                    if (others != null) {
                        const items = others.items;
                        for (let j = 0; j < items.length; j++) {
                            listKategori.push({
                                name: items[j].name,
                                totalQty: items[j].totalQty
                            });
                        }
                    }
                    list.push({
                        name: response[i].jenis_laporan,
                        data: listKategori
                    });
                }
            }
            return list;
        } catch (error) {
            const list = null;
            return list;
        }
    };
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
