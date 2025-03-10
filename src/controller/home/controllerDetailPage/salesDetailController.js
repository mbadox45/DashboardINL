import { halfRadialChartApex } from '@/controller/chartStyle/radialBarDummy';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import laporanPenjualanController from '@/controller/getApiFromThisApp/sales/laporanPenjualanController';
import targetPenjualanController from '@/controller/getApiFromThisApp/sales/targetPenjualanController';

export default new (class salesDetailController {
    penjualanRitel = async (form) => {
        try {
            const listAll = [];

            let total = {
                totalQtyKategori: 0,
                totalValueKategori: 0,
                totalQtyTargetKategori: 0,
                percentageQtyToTargetKategori: 0
            };

            // Laporan
            const laporan = await laporanPenjualanController.getByPeriod(form);
            const bulkLaporan = laporan == null ? null : laporan.ritel;
            const produkLaporan = bulkLaporan == null ? null : bulkLaporan.products;
            total.totalQtyKategori = bulkLaporan == null ? 0 : Number(bulkLaporan.totalQtyKategori);
            total.totalValueKategori = bulkLaporan == null ? 0 : Number(bulkLaporan.totalValueKategori);

            // Target
            const target = await targetPenjualanController.getByPeriod(form);
            const bulkTarget = target == null ? null : target.ritel;
            total.totalQtyTargetKategori = bulkTarget == null ? 0 : Number(bulkTarget.totalQtyTargetKategori);
            total.percentageQtyToTargetKategori = bulkTarget == null ? 0 : bulkTarget.percentageQtyToTargetKategori;

            const produkTarget = bulkTarget == null ? null : bulkTarget.products;
            const product = await productMasterController.getAll();

            const ritel = product.filter((item) => item.jenis == 'ritel');

            // Laporan by Location
            const listLokasi = [];
            const laporanLokasi = await laporanPenjualanController.getByLocation(form);
            if (laporanLokasi != null) {
                const ritelLokasi = laporanLokasi.ritel;
                for (let i = 0; i < ritelLokasi.length; i++) {
                    let totalQty = 0;
                    let totalValue = 0;
                    const provinsi = ritelLokasi[i].provinsi;
                    if (provinsi.length > 0) {
                        for (let j = 0; j < provinsi.length; j++) {
                            totalQty += Number(provinsi[i].qty);
                            totalValue += Number(provinsi[i].value);
                        }
                    }
                    listLokasi.push({
                        code: ritelLokasi[i].code,
                        negara: ritelLokasi[i].negara,
                        qty: totalQty,
                        value: totalValue,
                        provinsi: ritelLokasi[i].provinsi
                    });
                }
            }
            // console.log(laporanLokasi);

            // For List
            if (ritel != null) {
                for (let i = 0; i < ritel.length; i++) {
                    let percentageQtyToTarget = 0;
                    let totalQtyTarget = 0;
                    let totalQty = 0;
                    let totalValue = 0;
                    let totalHargaSatuan = 0;
                    if (produkTarget != null) {
                        const detail = produkTarget.find((item) => item.idProduct == ritel[i].id);
                        if (detail != null) {
                            const detailTarget = detail.target[0];
                            percentageQtyToTarget = detailTarget == null ? 0 : detailTarget.percentageQtyToTarget;
                            totalQtyTarget = detailTarget == null ? 0 : Number(detailTarget.totalQtyTarget);
                        }
                    }
                    if (produkLaporan != null) {
                        const detail = produkLaporan.find((item) => item.idProduct == ritel[i].id);
                        if (detail != null) {
                            totalQty = Number(detail.totalQty);
                            totalValue = Number(detail.totalValue);
                            totalHargaSatuan = detail.totalHargaSatuan;
                        }
                    }
                    listAll.push({
                        name: ritel[i].name,
                        rkap: totalQtyTarget,
                        rkapPercent: percentageQtyToTarget,
                        qty: totalQty,
                        total: totalValue,
                        series: [Number(Number(percentageQtyToTarget).toFixed(1))],
                        chartData: halfRadialChartApex(['RKAP']),
                        hargaSatuan: totalHargaSatuan
                    });
                }
            }

            return {
                total: total,
                data: listAll,
                lokasi: listLokasi
            };
        } catch (error) {
            return null;
        }
    };
    penjualanBulk = async (form) => {
        try {
            const listAll = [];

            let total = {
                totalQtyKategori: 0,
                totalValueKategori: 0,
                totalQtyTargetKategori: 0,
                percentageQtyToTargetKategori: 0
            };

            // Laporan
            const laporan = await laporanPenjualanController.getByPeriod(form);
            const bulkLaporan = laporan == null ? null : laporan.bulk;
            const produkLaporan = bulkLaporan == null ? null : bulkLaporan.products;
            total.totalQtyKategori = bulkLaporan == null ? 0 : Number(bulkLaporan.totalQtyKategori) / 1000;
            total.totalValueKategori = bulkLaporan == null ? 0 : bulkLaporan.totalValueKategori;

            // Target
            const target = await targetPenjualanController.getByPeriod(form);
            const bulkTarget = target == null ? null : target.bulk;
            total.totalQtyTargetKategori = bulkTarget == null ? 0 : Number(bulkTarget.totalQtyTargetKategori) / 1000;
            total.percentageQtyToTargetKategori = bulkTarget == null ? 0 : bulkTarget.percentageQtyToTargetKategori;

            const produkTarget = bulkTarget == null ? null : bulkTarget.products;
            const product = await productMasterController.getAll();

            const bulk = product.filter((item) => item.jenis == 'bulk');

            // Laporan by Location
            const listLokasi = [];
            const laporanLokasi = await laporanPenjualanController.getByLocation(form);
            if (laporanLokasi != null) {
                const bulkLokasi = laporanLokasi.bulk;
                for (let i = 0; i < bulkLokasi.length; i++) {
                    listLokasi.push({
                        code: bulkLokasi[i].code,
                        negara: bulkLokasi[i].negara,
                        qty: Number((Number(bulkLokasi[i].qty) / 1000).toFixed(2)),
                        value: bulkLokasi[i].value
                    });
                }
            }

            // For List
            if (bulk != null) {
                for (let i = 0; i < bulk.length; i++) {
                    let percentageQtyToTarget = 0;
                    let totalQtyTarget = 0;
                    let totalQty = 0;
                    let totalValue = 0;
                    let totalHargaSatuan = 0;
                    if (produkTarget != null) {
                        const detail = produkTarget.find((item) => item.idProduct == bulk[i].id);
                        if (detail != null) {
                            const detailTarget = detail.target[0];
                            percentageQtyToTarget = detailTarget == null ? 0 : detailTarget.percentageQtyToTarget;
                            totalQtyTarget = detailTarget == null ? 0 : Number(detailTarget.totalQtyTarget) / 1000;
                        }
                    }
                    if (produkLaporan != null) {
                        const detail = produkLaporan.find((item) => item.idProduct == bulk[i].id);
                        if (detail != null) {
                            totalQty = Number(detail.totalQty) / 1000;
                            totalValue = Number(detail.totalValue);
                            totalHargaSatuan = detail.totalHargaSatuan;
                        }
                    }
                    listAll.push({
                        name: bulk[i].name,
                        rkap: totalQtyTarget,
                        rkapPercent: percentageQtyToTarget,
                        qty: totalQty,
                        total: totalValue,
                        series: [Number(Number(percentageQtyToTarget).toFixed(1))],
                        chartData: halfRadialChartApex(['RKAP']),
                        hargaSatuan: totalHargaSatuan
                    });
                }
            }

            return {
                total: total,
                data: listAll,
                lokasi: listLokasi
            };
        } catch (error) {
            return null;
        }
    };
})();
