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
    loadTable = async () => {
        try {
            const response = await this.getAll();
            if (response != null) {
                const list = response;
                // const data = response.detail;
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
    postData = async (form, status) => {
        try {
            let msg = { severity: '', content: '', icon: '' };
            const list = form.items;
            let kondisi;
            for (let i = 0; i < list.length; i++) {
                if (list[i].name != null && list[i].kategori != null) {
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
                if (status == 'add') {
                    const response = await this.addPost(form);
                    if (response.status == true) {
                        msg = { severity: 'success', content: 'Data berhasil di tambahkan', icon: 'pi-check-circle' };
                    } else {
                        msg = { severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', icon: 'pi-times-circle' };
                    }
                    return msg;
                } else {
                    const response = await this.updatePost(form.id, form);
                    if (response.status == true) {
                        msg = { severity: 'success', content: 'Data berhasil di simpan', icon: 'pi-check-circle' };
                    } else {
                        msg = { severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', icon: 'pi-times-circle' };
                    }
                    return msg;
                }
            } else {
                return msg;
            }
        } catch (error) {
            return { severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', icon: 'pi-times-circle' };
        }
    };
})();
