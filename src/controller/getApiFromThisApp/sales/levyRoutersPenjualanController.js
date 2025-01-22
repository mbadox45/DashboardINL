import levyRoutersPenjualanAPI from '@/api/thisAPI/sales/levyRoutersPenjualanAPI';
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
        const levyduty = await levyDutyPenjualanController.addPost();
        const routers = await marketRoutersPenjualanController.addPost();
    };
})();
