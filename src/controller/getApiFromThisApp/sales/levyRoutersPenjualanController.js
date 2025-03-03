import levyRoutersPenjualanAPI from '@/api/thisAPI/sales/levyRoutersPenjualanAPI';
import moment from 'moment';
import productMasterController from '../master/productMasterController';
import levyDutyPenjualanController from './levyDutyPenjualanController';
import marketRoutersPenjualanController from './marketRoutersPenjualanController';

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
    loadTable2 = async (form) => {
        try {
            const color = ['#F9E79F', '#D6EAF8', '#FAE5D3', '#F2D7D5', '#73c6b6', '#aeb6bf', '#d2b4de'];
            let result = {
                dataTable: [],
                productList: [],
                kurs: 'USD'
            };
            // Bulky List
            const productBulk = await productMasterController.getAll();
            const bulk = productBulk.filter((item) => item.jenis == 'bulk');
            const listBulk = [];
            if (bulk != null) {
                for (let i = 0; i < bulk.length; i++) {
                    listBulk.push({
                        name: bulk[i].name,
                        id: bulk[i].id,
                        color: color[i]
                    });
                }
            }

            // Data
            const response = await this.getByPeriod(form);
            if (response != null) {
                const listTable = [];

                const listKurs = [];
                const listLevy = [];
                const listMarket = [];
                const listExcld = [];
                const listMarketIdr = [];

                const months = response[0].months;
                if (months != null) {
                    const kurs = months[0].kurs;
                    if (kurs.length > 0) {
                        const mataUang = kurs[0].mata_uang.name;
                        result.kurs = mataUang;
                        for (let k = 0; k < kurs.length; k++) {
                            listKurs.push({
                                id: kurs[k].id,
                                id_mata_uang: kurs[k].id_mata_uang,
                                mata_uang: kurs[k].mata_uang,
                                tanggal: kurs[k].tanggal,
                                value: kurs[k].value
                            });
                        }
                    }

                    const products = months[0].products;
                    for (let k = 0; k < products.length; k++) {
                        const levyduty = products[k].levyduty || [];
                        for (let l = 0; l < levyduty.length; l++) {
                            listLevy.push({
                                name: products[k].product.trim().toLowerCase(),
                                nilai: levyduty[l].nilai,
                                id_bulky: levyduty[l].id_bulky,
                                id_mata_uang: levyduty[l].id_mata_uang,
                                tanggal: levyduty[l].tanggal
                            });
                        }

                        const marketReuters = products[k].marketReuters || [];
                        for (let l = 0; l < marketReuters.length; l++) {
                            listMarket.push({
                                name: products[k].product.trim().toLowerCase(),
                                nilai: marketReuters[l].nilai,
                                id_bulky: marketReuters[l].id_bulky,
                                id_mata_uang: marketReuters[l].id_mata_uang,
                                tanggal: marketReuters[l].tanggal
                            });
                        }

                        const marketReutersExcld = products[k].marketReutersExcldLevyDuty || [];
                        for (let l = 0; l < marketReutersExcld.length; l++) {
                            listExcld.push({
                                name: products[k].product.trim().toLowerCase(),
                                nilai: marketReutersExcld[l].nilai,
                                tanggal: marketReutersExcld[l].tanggal
                            });
                        }

                        const marketIdr = products[k].marketIdr || [];
                        for (let l = 0; l < marketIdr.length; l++) {
                            listMarketIdr.push({
                                name: products[k].product.trim().toLowerCase(),
                                nilai: marketIdr[l].nilai,
                                tanggal: marketIdr[l].tanggal
                            });
                        }
                    }
                }

                const start = form.tanggalAwal;
                const end = form.tanggalAkhir;
                const totalDays = Number(moment(end).diff(moment(start), 'days')) + 1;
                // console.log(totalDays);
                for (let i = 0; i < totalDays; i++) {
                    const tanggal = moment(start).add(i, 'days').format('YYYY-MM-DD');

                    const productData = {};
                    for (let k = 0; k < listBulk.length; k++) {
                        let nilaiLevy = 0;
                        let nilaiReuters = 0;
                        let nilaiExcld = 0;
                        let nilaiIdr = 0;

                        const bulkName = listBulk[k].name.trim().toLowerCase(); // Normalisasi nama

                        // Levy Duty
                        const levyDuty = listLevy.find((item) => item.tanggal === tanggal && item.id_bulky === listBulk[k].id);
                        if (levyDuty) {
                            nilaiLevy = levyDuty.nilai;
                        }

                        // Market Reuters
                        const market = listMarket.find((item) => item.tanggal === tanggal && item.id_bulky === listBulk[k].id);
                        if (market) {
                            nilaiReuters = market.nilai;
                        }

                        // Market Excld Levy & Duty
                        const excld = listExcld.find((item) => item.tanggal === tanggal && item.name === bulkName);
                        if (excld) {
                            nilaiExcld = excld.nilai;
                        }

                        // Market IDR
                        const idr = listMarketIdr.find((item) => item.tanggal === tanggal && item.name === bulkName);
                        if (idr) {
                            nilaiIdr = idr.nilai;
                        }

                        // Simpan data dalam productData sesuai dengan productList
                        productData[listBulk[k].id] = {
                            name: listBulk[k].name,
                            reuters: nilaiReuters,
                            levy: nilaiLevy,
                            excld: nilaiExcld,
                            idr: nilaiIdr
                        };
                    }

                    const kurs = listKurs.length <= 0 ? null : listKurs.find((item) => item.tanggal == tanggal && item.id_mata_uang == form.idMataUang);
                    listTable.push({
                        tanggal: tanggal,
                        id_mata_uang: form.idMataUang,
                        value: kurs == null ? 0 : kurs.value,
                        productData: productData
                    });
                }
                result.dataTable = listTable;
                result.productList = listBulk;
            }
            return result;
        } catch (error) {
            const result = {
                dataTable: [],
                productList: [],
                kurs: 'USD'
            };
            return result;
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
                const awal = new Date(form.tanggalAwal); // 2023-01-01
                const akhir = new Date(form.tanggalAkhir); // 2025-01-28
                const dates = [];
                let currentDate = awal;
                const loadkurs = months[0].kurs;

                while (currentDate <= akhir) {
                    const tgl = currentDate.toISOString().split('T')[0];
                    const kurs = loadkurs.find((item) => item.tanggal == tgl);
                    let nilaiKurs = 0;
                    if (kurs != null) {
                        nilaiKurs = kurs.value;
                    }
                    dates.push({
                        tanggal: tgl,
                        kursValue: nilaiKurs
                    });

                    // Tambah 1 hari
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                return dates;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
    pengecekanDataUpdate = async (form) => {
        try {
            const result = [];
            const response = await this.getByPeriod(form);
            if (response != null) {
                for (let i = 0; i < response.length; i++) {
                    const months = response[i].months;
                    for (let j = 0; j < months.length; j++) {
                        const products = months[j].products;
                        for (let k = 0; k < products.length; k++) {
                            const levy = products[k].levyduty;
                            for (let l = 0; l < levy.length; l++) {
                                result.push({
                                    id: levy[l].id,
                                    id_bulky: levy[l].id_bulky,
                                    id_mata_uang: levy[l].id_mata_uang,
                                    nilai: Number(levy[l].nilai),
                                    tanggal: levy[l].tanggal,
                                    type: 'levy'
                                });
                            }
                            const reuters = products[k].marketReuters;
                            for (let l = 0; l < reuters.length; l++) {
                                result.push({
                                    id: reuters[l].id,
                                    id_bulky: reuters[l].id_bulky,
                                    id_mata_uang: reuters[l].id_mata_uang,
                                    nilai: Number(reuters[l].nilai),
                                    tanggal: reuters[l].tanggal,
                                    type: 'reuters'
                                });
                            }
                        }
                    }
                }
            }
            return result;
        } catch (error) {
            return null;
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
                            tanggal: moment(list[i].tanggal).format('YYYY-MM-DD'),
                            nilai: list[i].nilaiLevy,
                            id_mata_uang: list[i].id_mata_uang
                        };
                        if (list[i].statusLevy == 'add') {
                            await levyDutyPenjualanController.addPost(form);
                        } else {
                            await levyDutyPenjualanController.updatePost(list[i].idLevy, form);
                        }
                    }
                    for (let i = 0; i < list.length; i++) {
                        const form = {
                            id_bulky: list[i].id_bulky,
                            tanggal: moment(list[i].tanggal).format('YYYY-MM-DD'),
                            nilai: list[i].nilaiRouters,
                            id_mata_uang: list[i].id_mata_uang
                        };
                        if (list[i].statusRouters == 'add') {
                            await marketRoutersPenjualanController.addPost(form);
                        } else {
                            await marketRoutersPenjualanController.updatePost(list[i].idRouters, form);
                        }
                    }
                    msg = { severity: 'success', content: 'Data berhasil di simpan', icon: 'pi-check-circle' };
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
