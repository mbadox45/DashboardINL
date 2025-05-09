import simulasiRspAPI from '@/api/thisAPI/sicalRSP/simulasiRspAPI';
import { formatCurrency } from '@/controller/dummyController';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import masterCostSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/masterCostSicalRspController';
import utilisasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/utilisasiSicalRspController';
export default new (class simulasiSicalRspController {
    addPost = async (form) => {
        try {
            const response = await simulasiRspAPI.addPost(form);
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
            const response = await simulasiRspAPI.updatePost(id, form);
            const load = response.data;
            // console.log(load);
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
            const response = await simulasiRspAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await simulasiRspAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };

    loadTable = async (form) => {
        try {
            const list = [];
            const allSimulation = await this.getAll();
            const utilisasi = await utilisasiSicalRspController.getAll();
            const kurs = await kursController.getByLatest(form);
            let nilaiKurs = 0;
            if (kurs != null) {
                nilaiKurs = kurs.value;
            }
            const listSimulasi = [];
            if (allSimulation != null) {
                for (let i = 0; i < allSimulation.length; i++) {
                    const cost = allSimulation[i].cost;
                    for (let j = 0; j < cost.length; j++) {
                        const util = utilisasi == null ? null : utilisasi.find((item) => item.id == cost[j].id_utilisasi);
                        const utilName = utilisasi == null ? null : util.name;
                        listSimulasi.push({
                            id: cost[j].id,
                            master_cost: cost[j].master_cost.name,
                            valueIdr: Number(cost[j].value),
                            valueUsd: nilaiKurs == 0 ? 0 : (Number(cost[j].value) / Number(nilaiKurs)) * 1000,
                            utilisasi: utilName,
                            id_utilisasi: cost[j].id_utilisasi
                        });
                    }
                }
            }
            if (utilisasi != null) {
                for (let util = 0; util < utilisasi.length; util++) {
                    const simulasi = listSimulasi.filter((item) => item.id);
                }
            }
            return list;
        } catch (error) {
            return null;
        }
    };

    simulationCalc = async (form1, form2) => {
        const list = [];

        // Deklarasi Form 2
        const form = [];
        for (let i = 0; i < form2.length; i++) {
            const util = form2[i].util;
            for (let j = 0; j < util.length; j++) {
                form.push({
                    id: form2[i].id,
                    name: form2[i].name,
                    id_util: util[j].id,
                    util: util[j].name,
                    value: util[j].value,
                    nilai: util[j].nilai,
                    nilai_asing: util[j].nilai_asing
                });
            }
        }
        const utilisasi = await utilisasiSicalRspController.getAll();
        const master = await masterCostSicalRspController.getAll();
        for (let i = 0; i < utilisasi.length; i++) {
            const productData = {};
            for (let j = 0; j < master.length; j++) {
                const data = form.find((item) => item.id == master[j].id && item.id_util == utilisasi[i].id);
                const usd = data.nilai == 0 ? 0 : (data.nilai / form1.kurs) * 1000;
                productData[master[j].id] = {
                    name: master[j].name,
                    idr: formatCurrency(data.nilai.toFixed(0)),
                    usd: formatCurrency(usd.toFixed(0))
                };
            }
            const bulk = form.find((item) => item.id == 4 && item.id_util == utilisasi[i].id);
            const raw = form.find((item) => item.id == 1 && item.id_util == utilisasi[i].id);
            const idr = (Number(form1.margin) / 100) * (raw.nilai + bulk.nilai);
            list.push({
                id_util: utilisasi[i].id,
                name: utilisasi[i].name,
                productData: productData,
                idr: formatCurrency(idr.toFixed(0)),
                persentage: formatCurrency(((idr / (raw.nilai + bulk.nilai)) * 100).toFixed(0))
            });
        }
        return list;
    };

    simulationCalc2 = async (form1, form2) => {
        try {
            const costs = [];
            for (let i = 0; i < form2.length; i++) {
                const util = form2[i].util;
                for (let j = 0; j < util.length; j++) {
                    costs.push({
                        id_master_cost: form2[i].id,
                        id_utilisasi: util[j].id,
                        value: util[j].nilai
                    });
                }
            }

            const form = {
                product_id: 4,
                kurs: form1.kurs,
                expected_margin: form1.margin,
                id_dmo: form1.id_dmo,
                offer: {
                    price: form1.offer_buyer,
                    volume: form1.volume
                },
                costs: costs
            };
            const response = await simulasiRspAPI.getCalculate(form);
            const load = response.data;
            const data = load.data;
            const utilisasi = data.utilisasi;
            // console.log(utilisasi);
            const table1 = [];
            const table2 = [];
            const table3 = [];
            const table4 = [];

            for (let i = 0; i < utilisasi.length; i++) {
                // Table Simulasi 1
                const cost = utilisasi[i].cost;
                const product1 = {};
                for (let j = 0; j < cost.length; j++) {
                    product1[j + 1] = {
                        name: cost[j].name,
                        value: formatCurrency(Number(cost[j].value).toFixed(0)),
                        usd: formatCurrency(Number(cost[j].usd).toFixed(0)),
                        proportion: Number(cost[j].proportion).toFixed(0)
                    };
                }
                table1.push({
                    name: utilisasi[i].name,
                    margin: utilisasi[i].marginValue,
                    marginPercent: utilisasi[i].marginPercent,
                    product: product1
                });

                // Table Simulasi 2
                const tanpaDmo = utilisasi[i].tanpaDmo;
                const fob = tanpaDmo.find((item) => item.name.toLowerCase().includes('fob'));
                const loco = tanpaDmo.find((item) => item.name.toLowerCase().includes('loco'));
                const denganPengaliDMO = utilisasi[i].biayaDmoDenganPengali;
                const pengaliProduct = {};
                for (let j = 0; j < denganPengaliDMO.length; j++) {
                    pengaliProduct[j + 1] = {
                        name: denganPengaliDMO[j].name,
                        idr: formatCurrency(Number(denganPengaliDMO[j].idr).toFixed(0)),
                        usd: formatCurrency(Number(denganPengaliDMO[j].usd).toFixed(0))
                    };
                }
                table2.push({
                    name: utilisasi[i].name,
                    kerugianIdr: formatCurrency(Number(utilisasi[i].biayaDmoKerugian.idr).toFixed(0)),
                    kerugianUsd: formatCurrency(Number(utilisasi[i].biayaDmoKerugian.usd).toFixed(0)),
                    kerugianProportion: formatCurrency(Number(utilisasi[i].biayaDmoKerugian.proportion).toFixed(0)),
                    fobIdr: formatCurrency(fob.idr),
                    fobUsd: formatCurrency(Number(fob.usd).toFixed(0)),
                    fobCpo: formatCurrency(Number(fob.cpoPlus).toFixed(0)),
                    locoCpo: formatCurrency(Number(loco.cpoPlus).toFixed(0)),
                    product: pengaliProduct
                });

                // Table Simulasi 3
                const denganDmo = utilisasi[i].denganDmo;
                const dmoProduct = {};
                for (let j = 0; j < denganDmo.length; j++) {
                    dmoProduct[j + 1] = {
                        name: denganDmo[j].name,
                        idr: formatCurrency(Number(denganDmo[j].idr).toFixed(0)),
                        usd: formatCurrency(Number(denganDmo[j].usd).toFixed(0)),
                        idrCpoPlus: formatCurrency(Number(denganDmo[j].idrCpoPlus).toFixed(0)),
                        usdCpoPlus: formatCurrency(Number(denganDmo[j].usdCpoPlus).toFixed(0))
                    };
                }
                table3.push({
                    name: utilisasi[i].name,
                    product: dmoProduct
                });

                // Table Simulasi 4
                const rekom = utilisasi[i].rekomHargaJualDenganDmo;
                const rekomProduct = {};
                for (let j = 0; j < rekom.length; j++) {
                    rekomProduct[j + 1] = {
                        name: rekom[j].name,
                        value: formatCurrency(Number(rekom[j].value).toFixed(0))
                    };
                }
                const potensi = utilisasi[i].potensiLabaRugiDenganDmo;
                const potensiProduct = {};
                for (let j = 0; j < potensi.length; j++) {
                    potensiProduct[j + 1] = {
                        name: potensi[j].name,
                        value: formatCurrency(Number(potensi[j].value).toFixed(0))
                    };
                }
                table4.push(
                    {
                        name: utilisasi[i].name,
                        analisa: 'Rekom Harga Jual',
                        tanpaDMO: formatCurrency(Number(utilisasi[i].rekomHargaJualTanpaDmo).toFixed(0)),
                        product: rekomProduct
                    },
                    {
                        name: utilisasi[i].name,
                        analisa: 'Potensi Laba (Rugi)',
                        tanpaDMO: formatCurrency(Number(utilisasi[i].potensiLabaRugiTanpaDmo).toFixed(0)),
                        product: potensiProduct
                    }
                );
            }
            return {
                sim1: table1,
                sim2: table2,
                sim3: table3,
                sim4: table4
            };
        } catch (error) {
            const table1 = [];
            const table2 = [];
            const table3 = [];
            const table4 = [];
            return {
                sim1: table1,
                sim2: table2,
                sim3: table3,
                sim4: table4
            };
        }
    };

    simulationCalc3 = async (formData) => {
        try {
            const costs = [];
            const costForm = formData.costs;
            for (let i = 0; i < costForm.length; i++) {
                const util = costForm[i].utils;
                for (let j = 0; j < util.length; j++) {
                    costs.push({
                        id_master_cost: costForm[i].id,
                        id_utilisasi: util[j].id,
                        value: util[j].nilai
                    });
                }
            }

            const form = {
                product_id: formData.product_id,
                kurs: formData.kurs,
                expected_margin: formData.expected_margin,
                id_dmo: formData.id_dmo,
                offer: {
                    price: formData.offer.price,
                    volume: formData.offer.volume
                },
                costs: costs
            };
            const response = await simulasiRspAPI.getCalculate(form);
            const load = response.data;
            const data = load.data;
            const utilisasi = data.utilisasi;
            // console.log(utilisasi);
            const table1 = [];
            const table2 = [];
            const table3 = [];
            const table4 = [];

            for (let i = 0; i < utilisasi.length; i++) {
                // Table Simulasi 1
                const cost = utilisasi[i].cost;
                const product1 = {};
                for (let j = 0; j < cost.length; j++) {
                    product1[j + 1] = {
                        name: cost[j].name,
                        value: formatCurrency(Number(cost[j].value).toFixed(0)),
                        usd: formatCurrency(Number(cost[j].usd).toFixed(0)),
                        proportion: Number(cost[j].proportion).toFixed(0)
                    };
                }
                table1.push({
                    name: utilisasi[i].name,
                    margin: utilisasi[i].marginValue,
                    marginPercent: utilisasi[i].marginPercent,
                    product: product1
                });

                // Table Simulasi 2
                const tanpaDmo = utilisasi[i].tanpaDmo;
                const fob = tanpaDmo.find((item) => item.name.toLowerCase().includes('fob'));
                const loco = tanpaDmo.find((item) => item.name.toLowerCase().includes('loco'));
                const denganPengaliDMO = utilisasi[i].biayaDmoDenganPengali;
                const pengaliProduct = {};
                for (let j = 0; j < denganPengaliDMO.length; j++) {
                    pengaliProduct[j + 1] = {
                        name: denganPengaliDMO[j].name,
                        idr: formatCurrency(Number(denganPengaliDMO[j].idr).toFixed(0)),
                        usd: formatCurrency(Number(denganPengaliDMO[j].usd).toFixed(0))
                    };
                }
                table2.push({
                    name: utilisasi[i].name,
                    kerugianIdr: formatCurrency(Number(utilisasi[i].biayaDmoKerugian.idr).toFixed(0)),
                    kerugianUsd: formatCurrency(Number(utilisasi[i].biayaDmoKerugian.usd).toFixed(0)),
                    kerugianProportion: formatCurrency(Number(utilisasi[i].biayaDmoKerugian.proportion).toFixed(0)),
                    fobIdr: formatCurrency(Number(fob.idr).toFixed(0)),
                    fobUsd: formatCurrency(Number(fob.usd).toFixed(0)),
                    fobCpo: formatCurrency(Number(fob.cpoPlus).toFixed(0)),
                    locoCpo: formatCurrency(Number(loco.cpoPlus).toFixed(0)),
                    product: pengaliProduct
                });

                // Table Simulasi 3
                const denganDmo = utilisasi[i].denganDmo;
                const dmoProduct = {};
                for (let j = 0; j < denganDmo.length; j++) {
                    dmoProduct[j + 1] = {
                        name: denganDmo[j].name,
                        idr: formatCurrency(Number(denganDmo[j].idr).toFixed(0)),
                        usd: formatCurrency(Number(denganDmo[j].usd).toFixed(0)),
                        idrCpoPlus: formatCurrency(Number(denganDmo[j].idrCpoPlus).toFixed(0)),
                        usdCpoPlus: formatCurrency(Number(denganDmo[j].usdCpoPlus).toFixed(0))
                    };
                }
                table3.push({
                    name: utilisasi[i].name,
                    product: dmoProduct
                });

                // Table Simulasi 4
                const rekom = utilisasi[i].rekomHargaJualDenganDmo;
                const rekomProduct = {};
                for (let j = 0; j < rekom.length; j++) {
                    rekomProduct[j + 1] = {
                        name: rekom[j].name,
                        value: Number(rekom[j].value).toFixed(0)
                    };
                }
                const potensi = utilisasi[i].potensiLabaRugiDenganDmo;
                const potensiProduct = {};
                for (let j = 0; j < potensi.length; j++) {
                    potensiProduct[j + 1] = {
                        name: potensi[j].name,
                        value: Number(potensi[j].value).toFixed(0)
                    };
                }
                table4.push(
                    {
                        name: utilisasi[i].name,
                        analisa: 'Rekom Harga Jual',
                        tanpaDMO: Number(utilisasi[i].rekomHargaJualTanpaDmo).toFixed(0),
                        product: rekomProduct
                    },
                    {
                        name: utilisasi[i].name,
                        analisa: 'Potensi Laba (Rugi)',
                        tanpaDMO: Number(utilisasi[i].potensiLabaRugiTanpaDmo).toFixed(0),
                        product: potensiProduct
                    }
                );
            }
            return {
                sim1: table1,
                sim2: table2,
                sim3: table3,
                sim4: table4
            };
        } catch (error) {
            const table1 = [];
            const table2 = [];
            const table3 = [];
            const table4 = [];
            return {
                sim1: table1,
                sim2: table2,
                sim3: table3,
                sim4: table4
            };
        }
    };

    postData = async (formData) => {
        try {
            let msg = {
                severity: '',
                content: '',
                info: ''
            };
            if (
                formData.product_id != null &&
                formData.date != null &&
                formData.name != null &&
                formData.kurs != null &&
                formData.kurs_id != null &&
                formData.expected_margin != null &&
                formData.id_dmo != null &&
                formData.dmo != null &&
                formData.offer.buyer_name != null &&
                formData.offer.price != null &&
                formData.offer.volume != null
            ) {
                let kondisi;
                const catatan = formData.catatan;
                for (let i = 0; i < catatan.length; i++) {
                    if (catatan[i].judul != null) {
                        const detail = catatan[i].detailCatatan;
                        for (let j = 0; j < detail.length; j++) {
                            if (detail[j].teks != null) {
                                if (j < detail.length - 1) {
                                    continue;
                                }
                                kondisi = true;
                            } else {
                                msg = {
                                    severity: 'warn',
                                    content: 'Mohon data diisi dengan lengkap',
                                    info: 'Perhatian !'
                                };
                                kondisi = false;
                                break;
                            }
                        }
                    } else {
                        msg = {
                            severity: 'warn',
                            content: 'Mohon data diisi dengan lengkap',
                            info: 'Perhatian !'
                        };
                        kondisi = false;
                        break;
                    }
                }

                if (kondisi == true) {
                    const listCost = [];
                    const costs = formData.costs;
                    for (let i = 0; i < costs.length; i++) {
                        const utils = costs[i].utils;
                        for (let j = 0; j < utils.length; j++) {
                            listCost.push({
                                id_master_cost: costs[i].id,
                                id_utilisasi: utils[j].id,
                                value: utils[j].nilai
                            });
                        }
                    }
                    const form = {
                        product_id: formData.product_id,
                        date: formData.date,
                        name: formData.name,
                        kurs: formData.kurs,
                        kurs_id: formData.kurs_id,
                        expected_margin: formData.expected_margin,
                        id_dmo: formData.id_dmo,
                        dmo: formData.dmo,
                        offer: {
                            buyer_name: formData.offer.buyer_name,
                            price: formData.offer.price,
                            volume: formData.offer.volume
                        },
                        costs: listCost,
                        catatan: formData.catatan
                    };

                    let response;
                    if (formData.id == null) {
                        response = await this.addPost(form);
                    } else {
                        response = await this.updatePost(formData.id, form);
                    }
                    msg.severity = response.status == true ? 'success' : 'error';
                    msg.info = response.status == true ? 'Success' : 'Error';
                    msg.content = response.msg;
                }
            } else {
                msg = {
                    severity: 'warn',
                    content: 'Mohon data diisi dengan lengkap',
                    info: 'Perhatian !'
                };
            }
            return msg;
        } catch (error) {
            const msg = {
                severity: 'error',
                content: 'Proses gagal, silahkan hubungi tim IT',
                info: 'Error'
            };
            return msg;
        }
    };
})();
