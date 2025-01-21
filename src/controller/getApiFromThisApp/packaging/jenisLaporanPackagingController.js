import jenisLaporanPackagingAPI from '@/api/thisAPI/packaging/jenisLaporanPackagingAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';

export default new (class jenisLaporanPackagingController {
    addPost = async (form) => {
        try {
            const response = await jenisLaporanPackagingAPI.addPost(form);
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
    updatePost = async (id, form) => {
        try {
            const response = await jenisLaporanPackagingAPI.updatePost(id, form);
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
            const response = await jenisLaporanPackagingAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await jenisLaporanPackagingAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
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
                // console.log(form);
                const list_form = [];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].kategori == 'produk_hasil') {
                        list_form.push({
                            id: list[i].id,
                            kategori: list[i].kategori,
                            product_id: list[i].name
                        });
                    } else {
                        list_form.push({
                            id: list[i].id,
                            kategori: list[i].kategori,
                            name: list[i].name
                        });
                    }
                }
                const formData = {
                    id: form.id,
                    condition_olah: form.condition_olah,
                    name: form.name,
                    items: list_form
                };
                if (status == 'add') {
                    const response = await this.addPost(formData);
                    if (response.status == true) {
                        msg = { severity: 'success', content: 'Data berhasil di tambahkan', icon: 'pi-check-circle' };
                    } else {
                        msg = { severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', icon: 'pi-times-circle' };
                    }
                    return msg;
                } else {
                    const response = await this.updatePost(formData.id, formData);
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
