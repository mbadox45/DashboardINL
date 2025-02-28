import retailStockScmAPI from '@/api/thisAPI/supplyChain/stock/retailStockScmAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class retailStockScmController {
    addPost = async (form) => {
        try {
            const response = await retailStockScmAPI.addPost(form);
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
                    msg: `Data sudah tersedia.`
                };
            } else {
                return msg_error;
            }
        }
    };
    updatePost = async (id, form) => {
        try {
            const response = await retailStockScmAPI.updatePost(id, form);
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
            const response = await retailStockScmAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await retailStockScmAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await retailStockScmAPI.getByPeriod(form);
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
                warehouse: [],
                totalWarehouse: [],
                totalProduct: []
            };
            const getAllData = await this.getAll();
            if (getAllData != null) {
                const data = getAllData.filter((item) => {
                    const itemTanggal = moment(item.tanggal, 'YYYY-MM-DD'); // Konversi item.tanggal ke moment object
                    const startDate = moment(form.tanggalAwal, 'YYYY-MM-DD');
                    const endDate = moment(form.tanggalAkhir, 'YYYY-MM-DD');

                    return itemTanggal.isBetween(startDate, endDate, 'day', '[]');
                });
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        const konversiTon = Number(data[i].product.konversi_ton);
                        const konversiPallet = Number(data[i].product.konversi_pallet);
                        const qtyTon = Number(data[i].qty) * konversiTon;
                        const qtyPallet = Number(data[i].qty) / konversiPallet;
                        list.warehouse.push({
                            tanggal: data[i].tanggal,
                            qty: Number(data[i].qty),
                            umur: Number(data[i].umur),
                            qtyTon: Number(qtyTon).toFixed(2),
                            qtyPallet: Number(qtyPallet).toFixed(0),
                            remarks: data[i].remarks,
                            warehouse: data[i].warehouse.name,
                            product: data[i].product.name
                        });
                    }
                }
            }
            const response = await this.getByPeriod(form);
            if (response != null) {
                const warehouse = response.warehouse;
                if (warehouse != null) {
                    for (let i = 0; i < warehouse.length; i++) {
                        const detail = warehouse[i].detail;
                        // for (let j = 0; j < detail.length; j++) {
                        //     list.warehouse.push({
                        //         tanggal: detail[j].tanggal,
                        //         qty: Number(detail[j].qty),
                        //         umur: Number(detail[j].umur),
                        //         qtyTon: Number(detail[j].qtyTon),
                        //         qtyPallet: Number(detail[j].qtyPallet),
                        //         remarks: detail[j].remarks,
                        //         warehouse: detail[j].warehouse.name,
                        //         product: detail[j].product.name
                        //     });
                        // }
                        list.totalWarehouse.push({
                            warehouse: warehouse[i].warehouseName,
                            warehouseCapacity: Number(Number(warehouse[i].warehouseCapacity).toFixed(2)),
                            warehouseQty: Number(Number(warehouse[i].warehouseQty).toFixed(2)),
                            warehouseTon: Number(Number(warehouse[i].warehouseTon).toFixed(2)),
                            warehouseSpace: Number(Number(warehouse[i].warehouseSpace).toFixed(2)),
                            warehouseUtilisasiPercent: Number(Number(warehouse[i].warehousePallet).toFixed(2))
                        });
                    }
                }
                const total = response.total;
                if (total != null) {
                    const products = total.products;
                    for (let i = 0; i < products.length; i++) {
                        list.totalProduct.push({
                            product_name: products[i].product_name,
                            totalQty: products[i].totalQty,
                            totalTon: products[i].totalTon
                        });
                    }
                    list.totalProduct.push({
                        product_name: 'Total Product',
                        totalQty: total.totalQty,
                        totalTon: total.totalTon
                    });
                }
            }
            return list;
        } catch (error) {
            return {
                warehouse: [],
                total: []
            };
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            const years = moment(form.tanggalAwal).format('YYYY');
            const data = response.warehouse;
            if (data != null) {
                return {
                    data: data,
                    total: response.total
                };
            } else {
                return {
                    data: [],
                    total: null
                };
            }
        } catch (error) {
            return {
                data: [],
                total: null
            };
        }
    };
    postData = async (form) => {
        try {
            let msg = { severity: '', content: '', icon: '' };
            const list = form;
            let kondisi;
            if (form.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].warehouse_id != null && list[i].id_ritel != null && list[i].tanggal != null && list[i].qty != null && list[i].umur != null && list[i].remarks != null) {
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
