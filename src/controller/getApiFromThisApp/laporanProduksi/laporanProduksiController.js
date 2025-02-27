import laporanProduksiAPI from '@/api/thisAPI/laporanProduksi/laporanProduksiAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class laporanProduksiController {
    addPost = async (form) => {
        try {
            const response = await laporanProduksiAPI.addPost(form);
            const load = response.data;
            if (load.success == true) {
                return msg_success;
            } else {
                return msg_warning;
            }
        } catch (error) {
            console.log(error);
            if (error.status == 400) {
                return {
                    status: false,
                    code: 400,
                    msg: `Data sudah tersedia untuk periode ${moment(form.tanggal).format('MMMM YYYY')}.`
                };
            } else {
                return msg_error;
            }
        }
    };
    updatePost = async (id, form) => {
        try {
            const response = await laporanProduksiAPI.updatePost(id, form);
            const load = response.data;
            console.log(load);
            if (load.success == true) {
                return msg_success;
            } else {
                return msg_warning;
            }
        } catch (error) {
            return msg_error;
        }
    };
    getAll = async () => {
        try {
            const response = await laporanProduksiAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await laporanProduksiAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await laporanProduksiAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadToExportTable = async (form) => {
        try {
            const list = [];
            const response = await this.getByPeriod(form);
            if (response != null) {
                for (let i = 0; i < response.length; i++) {
                    const kategori = response[i].kategori_data;
                    const bahan_olah = kategori.find((item) => item.kategori == 'bahan_olah');
                    const produk_hasil = kategori.find((item) => item.kategori == 'produk_hasil');
                    const others = kategori.find((item) => item.kategori == 'others');

                    // Bahan Baku
                    if (bahan_olah != null) {
                        const items = bahan_olah.items;
                        for (let j = 0; j < items.length; j++) {
                            const detail = items[j].detail;
                            for (let k = 0; k < detail.length; k++) {
                                list.push({
                                    tanggal: detail[k].tanggal,
                                    qty: Number(detail[k].qty),
                                    item: `${items[j].name} (Olah)`,
                                    kategori: bahan_olah.kategori,
                                    pmg: detail[k].pmg.nama,
                                    jenis: response[i].jenis_laporan
                                });
                            }
                            list.push({
                                tanggal: '',
                                qty: Number(items[j].totalQty),
                                item: `Total ${items[j].name} (Olah)`,
                                kategori: bahan_olah.kategori,
                                pmg: '',
                                jenis: response[i].jenis_laporan
                            });
                        }
                    }
                    // Produk Hasil
                    if (produk_hasil != null) {
                        const items = produk_hasil.items;
                        for (let j = 0; j < items.length; j++) {
                            const detail = items[j].detail;
                            for (let k = 0; k < detail.length; k++) {
                                list.push({
                                    tanggal: detail[k].tanggal,
                                    qty: Number(detail[k].qty),
                                    item: `${items[j].name} (Produksi)`,
                                    kategori: produk_hasil.kategori,
                                    pmg: detail[k].pmg.nama,
                                    jenis: response[i].jenis_laporan
                                });
                            }
                            list.push({
                                tanggal: '',
                                qty: Number(items[j].totalQty),
                                item: `Total ${items[j].name} (Produksi)`,
                                kategori: produk_hasil.kategori,
                                pmg: '',
                                jenis: response[i].jenis_laporan
                            });
                            list.push({
                                tanggal: '',
                                qty: Number(items[j].yieldPercentage),
                                item: `${items[j].name} (Yield Percentage %)`,
                                kategori: produk_hasil.kategori,
                                pmg: '',
                                jenis: response[i].jenis_laporan
                            });
                        }
                    }
                    // Others
                    if (others != null) {
                        const items = others.items;
                        for (let j = 0; j < items.length; j++) {
                            const detail = items[j].detail;
                            for (let k = 0; k < detail.length; k++) {
                                list.push({
                                    tanggal: detail[k].tanggal,
                                    qty: Number(detail[k].qty),
                                    item: `${items[j].name}`,
                                    kategori: others.kategori,
                                    pmg: detail[k].pmg.nama,
                                    jenis: response[i].jenis_laporan
                                });
                            }
                            list.push({
                                tanggal: '',
                                qty: Number(items[j].totalQty),
                                item: `Total ${items[j].name}`,
                                kategori: others.kategori,
                                pmg: '',
                                jenis: response[i].jenis_laporan
                            });
                        }
                    }
                    list.push({
                        tanggal: '',
                        qty: Number(response[i].losses),
                        item: `Losses (Kg)`,
                        kategori: '',
                        pmg: '',
                        jenis: response[i].jenis_laporan
                    });
                    list.push({
                        tanggal: '',
                        qty: Number(response[i].lossesPercentage),
                        item: `Losses (Yield Percentage %)`,
                        kategori: '',
                        pmg: '',
                        jenis: response[i].jenis_laporan
                    });
                }
            }
            return list;
        } catch (error) {
            return [];
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            if (response != null) {
                const list = [];
                // console.log(response);
                for (let i = 0; i < response.length; i++) {
                    const listItems = [];
                    const kategori = response[i].kategori_data;
                    const bahan_olah = kategori.find((item) => item.kategori == 'bahan_olah');
                    const produk_hasil = kategori.find((item) => item.kategori == 'produk_hasil');
                    const others = kategori.find((item) => item.kategori == 'others');

                    // Bahan Baku
                    if (bahan_olah.items != null) {
                        for (let j = 0; j < bahan_olah.items.length; j++) {
                            listItems.push({
                                id: `${response[i].jenis_laporan} ${bahan_olah.items[j].name}`,
                                name: `${bahan_olah.items[j].name} (Olah)`,
                                totalQty: bahan_olah.items[j].totalQty,
                                detail: bahan_olah.items[j].detail
                            });
                        }
                    }
                    // Produk Hasil
                    if (produk_hasil.items != null) {
                        for (let j = 0; j < produk_hasil.items.length; j++) {
                            listItems.push({
                                id: `${response[i].jenis_laporan} ${produk_hasil.items[j].name}`,
                                name: `${produk_hasil.items[j].name} (Produksi)`,
                                totalQty: produk_hasil.items[j].totalQty,
                                detail: produk_hasil.items[j].detail
                            });
                            listItems.push({
                                id: `${response[i].jenis_laporan} ${produk_hasil.items[j].name} (Yield Percentage %)`,
                                name: `${produk_hasil.items[j].name} (Yield Percentage %)`,
                                totalQty: produk_hasil.items[j].yieldPercentage,
                                detail: []
                            });
                        }
                    }
                    // Others
                    if (others.items != null) {
                        for (let j = 0; j < others.items.length; j++) {
                            listItems.push({
                                id: `${response[i].jenis_laporan} ${others.items[j].name}`,
                                name: `${others.items[j].name}`,
                                totalQty: others.items[j].totalQty,
                                detail: others.items[j].detail
                            });
                        }
                    }
                    listItems.push({
                        id: `${response[i].jenis_laporan} Losses (Kg)`,
                        name: `Losses (Kg)`,
                        totalQty: response[i].losses,
                        detail: []
                    });
                    listItems.push({
                        id: `${response[i].jenis_laporan} Losses (Yield Percentage %)`,
                        name: `Losses (Yield Percentage %)`,
                        totalQty: response[i].lossesPercentage,
                        detail: []
                    });
                    list.push({
                        jenis_laporan: response[i].jenis_laporan,
                        losses: response[i].losses,
                        lossesPercentage: response[i].lossesPercentage,
                        items: listItems
                    });
                }
                // const data = response.detail;
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };

    postData = async (form) => {
        try {
            let msg = { severity: '', content: '', icon: '' };
            const list = form;
            let kondisi;
            if (form.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].item_produksi_id != null && list[i].pmg_id != null && list[i].tanggal != null && list[i].qty != null) {
                        if (i < list.length - 1) {
                            continue;
                        }
                        kondisi = true;
                    } else {
                        msg = { severity: 'warn', content: `Harap dilengkapi terlebih dahulu`, icon: 'pi-exclamation-triangle' };
                        kondisi = false;
                        break;
                    }
                }
                if (kondisi == true) {
                    for (let i = 0; i < list.length; i++) {
                        await this.addPost(list[i]);
                    }
                    msg = { severity: 'success', content: 'Data berhasil di tambahkan', icon: 'pi-check-circle' };
                    return msg;
                } else {
                    return msg;
                }
            } else {
                msg = { severity: 'warn', content: `Harap dilengkapi terlebih dahulu`, icon: 'pi-exclamation-triangle' };
                return msg;
            }
        } catch (error) {
            return { severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', icon: 'pi-times-circle' };
        }
    };
})();
