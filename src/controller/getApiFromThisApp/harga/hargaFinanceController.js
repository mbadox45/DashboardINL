import hargaFinanceAPI from '@/api/thisAPI/harga/hargaFinanceAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';

export default new (class hargaFinanceController {
    addPost = async (form) => {
        try {
            const response = await hargaFinanceAPI.addPost(form);
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
            const response = await hargaFinanceAPI.updatePost(id, form);
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
            const response = await hargaFinanceAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await hargaFinanceAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByJenis = async (jenis) => {
        try {
            const response = await hargaFinanceAPI.getByJenis(jenis);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await hargaFinanceAPI.getByPeriod(form);
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
            if (response != null) {
                const list = [];
                const periodHargaBulk = response.periodHargaBulk;
                if (periodHargaBulk != null) {
                    const products = periodHargaBulk.products;
                    for (let i = 0; i < products.length; i++) {
                        const details = products[i].details;
                        for (let j = 0; j < details.length; j++) {
                            list.push({
                                id: details[j].id,
                                id_product: details[j].id_product,
                                tanggal: details[j].tanggal,
                                inventory: details[j].inventory,
                                kurs: details[j].kurs,
                                hargaAsingInventory: details[j].hargaAsingInventory,
                                product: details[j].product.name,
                                jenis: details[j].product.jenis
                            });
                        }
                    }
                }
                const periodHargaRitel = response.periodHargaRitel;
                if (periodHargaRitel != null) {
                    const products = periodHargaRitel.products;
                    for (let i = 0; i < products.length; i++) {
                        const details = products[i].details;
                        for (let j = 0; j < details.length; j++) {
                            list.push({
                                id: details[j].id,
                                id_product: details[j].id_product,
                                tanggal: details[j].tanggal,
                                inventory: details[j].inventory,
                                kurs: details[j].kurs,
                                hargaAsingInventory: details[j].hargaAsingInventory,
                                product: details[j].product.name,
                                jenis: details[j].product.jenis
                            });
                        }
                    }
                }
                // const list = response;
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
})();
