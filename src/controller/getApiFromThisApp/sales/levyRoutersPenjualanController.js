import levyRoutersPenjualanAPI from '@/api/thisAPI/sales/levyRoutersPenjualanAPI';
import productMasterController from '../master/productMasterController';

export default new (class levyRoutersPenjualanController {
    getByPeriod = async (form) => {
        try {
            const response = await levyRoutersPenjualanAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            // const
            console.log(response);
            const months = response[0].months;
            if (months != null) {
                const produk = await productMasterController.getAll();
                const listProduct = produk.filter((item) => item.jenis == 'bulk');
                console.log(listProduct);
                return months[0].kurs.map((kurs) => ({
                    tanggal: kurs.tanggal,
                    marketReuters: listProduct.map((product) => product.marketReuters.find((m) => m.tanggal === kurs.tanggal)),
                    levyduty: listProduct.map((product) => product.levyduty.find((l) => l.tanggal === kurs.tanggal)),
                    marketReutersExcldLevyDuty: listProduct.map((product) => product.marketReutersExcldLevyDuty.find((m) => m.tanggal === kurs.tanggal)),
                    marketIdr: listProduct.map((product) => product.marketIdr.find((m) => m.tanggal === kurs.tanggal))
                }));
                // return list;
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
                    if (list[i].id_bulky != null && list[i].tanggal != null && list[i].nilaiLevy != null && list[i] != null && list[i].nilaiRouters != null) {
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
                        const form = {
                            id_bulky: list[i].id_bulky,
                            tanggal: list[i].tanggal,
                            nilai: list[i].nilaiLevy,
                            id_mata_uang: list[i].id_mata_uang
                        };
                        await levyDutyPenjualanController.addPost(form);
                    }
                    for (let i = 0; i < list.length; i++) {
                        const form = {
                            id_bulky: list[i].id_bulky,
                            tanggal: list[i].tanggal,
                            nilai: list[i].nilaiLevy,
                            id_mata_uang: list[i].id_mata_uang
                        };
                        await marketRoutersPenjualanController.addPost(form);
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
