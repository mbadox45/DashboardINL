import { formatCurrency } from '@/controller/dummyController';
import bebanProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/bebanProdCpoOlahController';
import targetProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/targetProdCpoOlahController';
// Laporan Material
import jenisLaporanMaterialController from '@/controller/getApiFromThisApp/laporanMaterial/jenisLaporanMaterialController';
import laporanMaterialController from '@/controller/getApiFromThisApp/laporanMaterial/laporanMaterialController';
// Laporan Produksi
import jenisLaporanProduksiController from '@/controller/getApiFromThisApp/laporanProduksi/jenisLaporanProduksiController';
import laporanProduksiController from '@/controller/getApiFromThisApp/laporanProduksi/laporanProduksiController';
// Packaging
import targetPackagingController from '@/controller/getApiFromThisApp/packaging/targetPackagingController';

export default new (class operationHomeController {
    laporanPackaging = async (form) => {
        try {
            const result = [];
            const target = await targetPackagingController.getByPeriod(form);
            const targetSummary = target.summary;
            if (target != null) {
                for (let i = 0; i < targetSummary.length; i++) {
                    const items = [{ name: 'Realisasi', value: formatCurrency(Number(targetSummary[i].finalValueProdukHasil).toFixed(2)), percentage: null }];
                    const summary = targetSummary[i].summary;
                    for (let j = 0; j < summary.length; j++) {
                        items.push({
                            name: summary[j].nama,
                            value: formatCurrency(Number(summary[j].value).toFixed(2)),
                            percentage: Number(summary[j].percentage).toFixed(2)
                        });
                    }
                    result.push({
                        name: targetSummary[i].name,
                        items: items
                    });
                }
            } else {
                result.push({
                    name: '',
                    items: []
                });
            }
            return result;
        } catch (error) {
            const result = [
                {
                    name: '',
                    items: []
                }
            ];
            return result;
        }
    };
    laporanMaterial = async (form) => {
        try {
            let result = [
                {
                    jenisMaterial: '',
                    outgoing: [],
                    incoming: [],
                    totalPemakaian: 0,
                    selisih: 0
                }
            ];
            const jenis = await jenisLaporanMaterialController.getAll();
            const response = await laporanMaterialController.getByPeriod(form);
            const norma = response.norma;
            const laporan = response.laporan_material;
            // console.log(jenis, response, norma, laporan);
            if (norma != null && laporan != null) {
                const list = [];
                const nilaiNorma = [];
                for (let i = 0; i < norma.length; i++) {
                    const material = norma[i].materials;
                    for (let j = 0; j < material.length; j++) {
                        nilaiNorma.push({
                            jenisLaporan: norma[i].jenis_laporan,
                            materialsName: material[j].name,
                            kategori: material[j].kategori,
                            value: material[j].totalQty,
                            totalPemakaian: null,
                            selisih: null
                        });
                    }
                }
                const nilaiLaporan = [];
                for (let i = 0; i < laporan.length; i++) {
                    const kategori = laporan[i].kategori_data;
                    for (let j = 0; j < kategori.length; j++) {
                        const material = kategori[j].materials;
                        for (let k = 0; k < material.length; k++) {
                            nilaiLaporan.push({
                                jenisLaporan: laporan[i].jenis_laporan,
                                materialsName: material[k].name,
                                kategori: kategori[j].kategori,
                                value: material[k].totalQty,
                                usage: material[k].usage,
                                color: material[k].color,
                                totalPemakaian: formatCurrency(Number(laporan[i].totalPemakaian).toFixed(2)),
                                selisih: formatCurrency(Number(laporan[i].selisih).toFixed(2))
                            });
                        }
                    }
                }

                // console.log(nilaiNorma, nilaiLaporan);

                for (let i = 0; i < jenis.length; i++) {
                    const laporanNilai = nilaiLaporan.filter((item) => item.jenisLaporan.toLowerCase().includes(jenis[i].name.toLowerCase()));
                    const normaNilai = nilaiNorma.filter((item) => item.jenisLaporan.toLowerCase().includes(jenis[i].name.toLowerCase()));
                    const outgoing = [];
                    for (let j = 0; j < normaNilai.length; j++) {
                        const material = laporanNilai.find((item) => item.materialsName.toLowerCase().includes(normaNilai[j].materialsName.toLowerCase()));
                        // console.log(material);
                        if (material != null) {
                            outgoing.push({
                                name: normaNilai[j].materialsName,
                                value: formatCurrency(Number(material.value).toFixed(2)),
                                norma: formatCurrency(Number(normaNilai[j].value).toFixed(2)),
                                usage: formatCurrency(Number(material.usage).toFixed(2)),
                                color: material.color
                            });
                        } else {
                            outgoing.push({
                                name: normaNilai[j].materialsName,
                                value: 0,
                                norma: formatCurrency(Number(normaNilai[j].value).toFixed(2)),
                                usage: 0,
                                color: ''
                            });
                        }
                    }
                    const listIncoming = [];
                    if (laporanNilai.filter((item) => item.kategori.toLowerCase().includes('incoming')).length > 0) {
                        const incoming = laporanNilai.filter((item) => item.kategori.toLowerCase().includes('incoming'));
                        // console.log(incoming);
                        for (let j = 0; j < incoming.length; j++) {
                            listIncoming.push({
                                name: incoming[j].materialsName,
                                value: formatCurrency(Number(incoming[j].value).toFixed(2))
                            });
                        }
                    }
                    list.push({
                        jenisMaterial: jenis[i].name,
                        outgoing: outgoing,
                        incoming: listIncoming,
                        totalPemakaian: laporanNilai[0].totalPemakaian,
                        selisih: laporanNilai[0].selisih
                    });
                }
                // console.log(list);
                result = list;
            }
            return result;
        } catch (error) {
            const result = [
                {
                    jenisMaterial: '',
                    outgoing: [],
                    incoming: [],
                    totalPemakaian: 0,
                    selisih: 0
                }
            ];
            return result;
        }
    };
    laporanProduksi = async (form) => {
        try {
            const response = await laporanProduksiController.getByPeriod(form);
            // console.log(response);
            const jenis = await jenisLaporanProduksiController.getAll();
            const list = [];
            if (response != null && jenis != null) {
                for (let i = 0; i < jenis.length; i++) {
                    const laporan = response.find((item) => item.jenis_laporan == jenis[i].name);
                    if (laporan == null) {
                        continue;
                    } else {
                        const losses = formatCurrency(Number(laporan.losses).toFixed(2)); //untuk refinery
                        const lossesPercentage = formatCurrency(Number(laporan.lossesPercentage).toFixed(2)); //untuk refinery
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
                        const itemsHasil = kategoriHasil.items;
                        const produkHasil = [];
                        for (let j = 0; j < itemsHasil.length; j++) {
                            produkHasil.push({
                                name: itemsHasil[j].name,
                                totalQty: formatCurrency(Number(itemsHasil[j].totalQty).toFixed(2)),
                                yieldPercentage: formatCurrency(Number(itemsHasil[j].yieldPercentage).toFixed(2))
                            });
                        }
                        list.push({
                            jenisProduksi: jenis[i].name,
                            losses: losses,
                            lossesPercentage: lossesPercentage,
                            bahanOlah: bahanOlah,
                            items: produkHasil
                        });
                    }
                }
                // console.log(list);
                return list;
            } else {
                list.push({
                    jenisProduksi: '',
                    losses: 0,
                    lossesPercentage: 0,
                    bahanOlah: [],
                    items: []
                });
                return list;
            }
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
