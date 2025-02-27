import laporanMaterialAPI from '@/api/thisAPI/laporanMaterial/laporanMaterialAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class laporanMaterialController {
    addPost = async (form) => {
        try {
            const response = await laporanMaterialAPI.addPost(form);
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
            const response = await laporanMaterialAPI.updatePost(id, form);
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
            const response = await laporanMaterialAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await laporanMaterialAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await laporanMaterialAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadToExportTable = async (form) => {
        try {
            const list = {
                laporan: [],
                norma: []
            };
            const response = await this.getByPeriod(form);
            if (response != null) {
                const laporan_material = response.laporan_material;
                if (laporan_material != null) {
                    for (let i = 0; i < laporan_material.length; i++) {
                        const kategori_data = laporan_material[i].kategori_data;
                        for (let j = 0; j < kategori_data.length; j++) {
                            const materials = kategori_data[j].materials;
                            for (let k = 0; k < materials.length; k++) {
                                const detail = materials[k].detail;
                                for (let l = 0; l < detail.length; l++) {
                                    list.laporan.push({
                                        tanggal: detail[l].tanggal,
                                        pmg: `PMG ${detail[l].pmg_id}`,
                                        qty: Number(detail[l].qty),
                                        material: materials[k].name,
                                        kategori: kategori_data[j].kategori,
                                        jenis: laporan_material[i].jenis_laporan
                                    });
                                }
                            }
                        }
                    }
                }

                const norma = response.norma;
                if (norma != null) {
                    for (let i = 0; i < norma.length; i++) {
                        const materials = norma[i].materials;
                        for (let k = 0; k < materials.length; k++) {
                            const detail = materials[k].details;
                            for (let l = 0; l < detail.length; l++) {
                                list.norma.push({
                                    tanggal: detail[l].tanggal,
                                    qty: Number(detail[l].qty),
                                    material: materials[k].name,
                                    satuan: detail[l].satuan,
                                    kategori: materials[k].kategori,
                                    jenis: norma[i].jenis_laporan
                                });
                            }
                        }
                    }
                }
            }
            return list;
        } catch (error) {
            return {
                laporan: [],
                norma: []
            };
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            const laporan = response.laporan_material;
            if (laporan != null) {
                const list = laporan;
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
                    if (list[i].item_material_id != null && list[i].pmg_id != null && list[i].tanggal != null && list[i].qty != null) {
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
