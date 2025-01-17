import jenisLaporanProduksiAPI from '@/api/thisAPI/laporanProduksi/jenisLaporanProduksiAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class jenisLaporanProduksiController {
    addPost = async (form) => {
        try {
            const response = await jenisLaporanProduksiAPI.addPost(form);
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
            const response = await jenisLaporanProduksiAPI.updatePost(id, form);
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
            const response = await jenisLaporanProduksiAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await jenisLaporanProduksiAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    // loadTable = async (form) => {
    //     try {
    //         const response = await this.getByPeriod(form);
    //         if (response != null) {
    //             const list = [];
    //             // console.log(response);
    //             for (let i = 0; i < response.length; i++) {
    //                 const listItems = [];
    //                 const kategori = response[i].kategori_data;
    //                 const bahan_olah = kategori.find((item) => item.kategori == 'bahan_olah');
    //                 const produk_hasil = kategori.find((item) => item.kategori == 'produk_hasil');
    //                 const others = kategori.find((item) => item.kategori == 'others');

    //                 // Bahan Baku
    //                 if (bahan_olah.items != null) {
    //                     for (let j = 0; j < bahan_olah.items.length; j++) {
    //                         listItems.push({
    //                             id: `${response[i].jenis_laporan} ${bahan_olah.items[j].name}`,
    //                             name: `${bahan_olah.items[j].name} (Olah)`,
    //                             totalQty: bahan_olah.items[j].totalQty,
    //                             detail: bahan_olah.items[j].detail
    //                         });
    //                     }
    //                 }
    //                 // Produk Hasil
    //                 if (produk_hasil.items != null) {
    //                     for (let j = 0; j < produk_hasil.items.length; j++) {
    //                         listItems.push({
    //                             id: `${response[i].jenis_laporan} ${produk_hasil.items[j].name}`,
    //                             name: `${produk_hasil.items[j].name} (Produksi)`,
    //                             totalQty: produk_hasil.items[j].totalQty,
    //                             detail: produk_hasil.items[j].detail
    //                         });
    //                         listItems.push({
    //                             id: `${response[i].jenis_laporan} ${produk_hasil.items[j].name} (Yield Percentage %)`,
    //                             name: `${produk_hasil.items[j].name} (Yield Percentage %)`,
    //                             totalQty: produk_hasil.items[j].yieldPercentage,
    //                             detail: []
    //                         });
    //                     }
    //                 }
    //                 // Others
    //                 if (others.items != null) {
    //                     for (let j = 0; j < others.items.length; j++) {
    //                         listItems.push({
    //                             id: `${response[i].jenis_laporan} ${others.items[j].name}`,
    //                             name: `${others.items[j].name}`,
    //                             totalQty: others.items[j].totalQty,
    //                             detail: others.items[j].detail
    //                         });
    //                     }
    //                 }
    //                 listItems.push({
    //                     id: `${response[i].jenis_laporan} Losses (Kg)`,
    //                     name: `Losses (Kg)`,
    //                     totalQty: response[i].losses,
    //                     detail: []
    //                 });
    //                 listItems.push({
    //                     id: `${response[i].jenis_laporan} Losses (Yield Percentage %)`,
    //                     name: `Losses (Yield Percentage %)`,
    //                     totalQty: response[i].lossesPercentage,
    //                     detail: []
    //                 });
    //                 list.push({
    //                     jenis_laporan: response[i].jenis_laporan,
    //                     losses: response[i].losses,
    //                     lossesPercentage: response[i].lossesPercentage,
    //                     items: listItems
    //                 });
    //             }
    //             // const data = response.detail;
    //             return list;
    //         } else {
    //             return [];
    //         }
    //     } catch (error) {
    //         return [];
    //     }
    // };
})();
