import { formatCurrency } from '@/controller/dummyController';
import bebanProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/bebanProdCpoOlahController';
import targetProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/targetProdCpoOlahController';
import jenisLaporanProduksiController from '@/controller/getApiFromThisApp/laporanProduksi/jenisLaporanProduksiController';
import laporanProduksiController from '@/controller/getApiFromThisApp/laporanProduksi/laporanProduksiController';

export default new (class operationHomeController {
    laporanProduksi = async (form) => {
        try {
            const result = [];

            const response = await laporanProduksiController.getByPeriod(form);
            const jenis = await jenisLaporanProduksiController.getAll();
            const list = []
            if (response != null && jenis != null) {
                for (let i = 0; i < jenis.length; i++) {
                    const laporan = response.find((item) => item.jenis_laporan == jenis[i].name);
                    const losses = laporan.losses; //untuk refinery
                    const lossesPercentage = laporan.lossesPercentage; //untuk refinery
                    // Kategori Bahan Olah
                    const kategori = laporan.kategori_data.find((item) => item.kategori.toLowerCase().includes('bahan_olah'));
                    const bahanKategori = kategori.items;
                    const bahanOlah = []; // untuk bahan olah
                    for (let j = 0; j < bahanKategori.length; j++) {
                        bahanOlah.push({
                            name: bahanKategori[j].name,
                            totalQty: formatCurrency(Number(bahanKategori[j].totalQty).toFixed(2))
                        });
                    }
                    // Kategori Hasil Produksi
                    const kategoriHasil = laporan.kategori_data.find((item) => item.kategori.toLowerCase().includes('produk_hasil'));
                    const itemsHasil = kategoriHasil.items
                    const produkHasil = [];
                    for (let j = 0; j < itemsHasil.length; j++) {
                        produkHasil.push({
                            name: itemsHasil[j].name,
                            totalQty: formatCurrency(Number(itemsHasil[j].totalQty).toFixed(2)),
                            yieldPercentage: formatCurrency(Number(itemsHasil[j].yieldPercentage).toFixed(2))
                        });
                    }
                    result.push({
                        jenisProduksi: jenis[i].name,
                        losses: losses,
                        lossesPercentage: lossesPercentage,
                        bahanOlah: bahanOlah,
                        items: produkHasil
                    });
                }
                console.log(result);
            } else {
                result.push(
                    {
                        jenisProduksi: '',
                        losses: 0,
                        lossesPercentage: 0,
                        bahanOlah: [],
                        items: []
                    }
                );
            }
            console.log(result);
            return result;
        } catch (error) {
            const result = [
                {
                    jenisProduksi: '',
                    losses: 0,
                    lossesPercentage: 0,
                    bahanOlah: [],
                    items: []
                }
            ];
            return result;
        }
    };
    cpoOlah = async (form) => {
        try {
            const beban = await bebanProdCpoOlahController.getByPeriod(form);
            const target = await targetProdCpoOlahController.getByPeriod(form);

            let result = {
                totalCost: 0,
                totalHargaSatuan: 0,
                cpoOlah: 0,
                rkap: 0,
                rkapPercentage: 0,
                kapasitasUtility: 0,
                kapasitasUtilityPercentage: 0
            };

            if (beban != null) {
                const totalCost = beban.totalCost;
                const totalHargaSatuan = beban.totalHargaSatuan;
                const cpoOlah = beban.cpoOlah;
                result.totalCost = formatCurrency(Number(totalCost).toFixed(2));
                result.totalHargaSatuan = formatCurrency(Number(totalHargaSatuan).toFixed(2));
                result.cpoOlah = formatCurrency(Number(cpoOlah).toFixed(2));
            }

            if (target != null) {
                const summary = target.summary;
                if (summary.length > 0) {
                    const rkap = summary.find((item) => item.nama.toLowerCase().includes('rkap'));
                    const utility = summary.find((item) => item.nama.toLowerCase().includes('utility'));
                    result.kapasitasUtility = formatCurrency(Number(utility.value).toFixed(2));
                    result.kapasitasUtilityPercentage = formatCurrency(Number(utility.percentage).toFixed(2));
                    result.rkap = formatCurrency(Number(rkap.value).toFixed(2));
                    result.rkapPercentage = formatCurrency(Number(rkap.percentage).toFixed(2));
                }
            }

            return result;
        } catch (error) {
            const result = {
                totalCost: 0,
                totalHargaSatuan: 0,
                cpoOlah: 0,
                rkap: 0,
                rkapPercentage: 0,
                kapasitasUtility: 0,
                kapasitasUtilityPercentage: 0
            };
            return result;
        }
    };
})();
