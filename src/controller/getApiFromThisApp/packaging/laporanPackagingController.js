import laporanPackagingAPI from '@/api/thisAPI/packaging/laporanPackagingAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class laporanPackagingController {
    addPost = async (form) => {
        try {
            const response = await laporanPackagingAPI.addPost(form);
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
            const response = await laporanPackagingAPI.updatePost(id, form);
            const load = response.data;
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
            const response = await laporanPackagingAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await laporanPackagingAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await laporanPackagingAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadTable = async (form) => {
        try {
            const data = await this.getByPeriod(form);
            const response = data.summary;
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
                    if (bahan_olah != null) {
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
                    }
                    // Produk Hasil
                    if (produk_hasil != null) {
                        if (produk_hasil.items != null) {
                            for (let j = 0; j < produk_hasil.items.length; j++) {
                                listItems.push({
                                    id: `${response[i].jenis_laporan} ${produk_hasil.items[j].name}`,
                                    name: `${produk_hasil.items[j].name} (Box)`,
                                    totalQty: produk_hasil.items[j].totalQty,
                                    detail: produk_hasil.items[j].detail
                                });
                            }
                        }
                    }
                    // Others
                    if (others != null) {
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
                    }
                    list.push({
                        jenis_laporan: response[i].jenis_laporan,
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
                    if (list[i].item_packaging_id != null && list[i].packaging_id != null && list[i].tanggal != null && list[i].qty != null) {
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
