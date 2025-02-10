import { formatCurrency } from '@/controller/dummyController';
import incomingCpoScmController from '@/controller/getApiFromThisApp/supplyChain/incomingCpoScmController';
import outstandingCpoScmController from '@/controller/getApiFromThisApp/supplyChain/outstandingCpoScmController';
import saldoPeScmController from '@/controller/getApiFromThisApp/supplyChain/saldoPeScmController';
import bulkStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/bulkStockScmController';
import cpoStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/cpoStockScmController';
import retailStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/retailStockScmController';
import moment from 'moment';

export default new (class supplyChainHomeController {
    outstandingCpo = async () => {
        try {
            const response = await outstandingCpoScmController.getByPeriod();
            let result = {
                total: 0,
                supplier: []
            };
            if (response != null) {
                result.total = formatCurrency(Number(response.totalValue).toFixed(2));
                const data = response.data;
                const supplier = [];
                for (let i = 0; i < 2; i++) {
                    supplier.push({
                        supplier: data[i].supplier.name,
                        value: formatCurrency(Number(data[i].value).toFixed(2))
                    });
                }
                result.supplier = supplier;
            }
            return result;
        } catch (error) {
            const result = {};
            return result;
        }
    };
    actualIncomingCpo = async (form) => {
        try {
            let result = {
                totalHarga: 0,
                totalQty: 0,
                hargaSatuan: 0,
                tanggal: ''
            };
            const response = await incomingCpoScmController.getByPeriod(form);
            if (response != null) {
                result.totalQty = formatCurrency(Number(response.totalQty).toFixed(2));
                result.totalHarga = formatCurrency(Number(response.totalValue).toFixed(2));
                result.hargaSatuan = formatCurrency((Number(response.totalValue) / Number(response.totalQty)).toFixed(2));
                const data = response.data;
                if (data != null) {
                    const tanggal = moment(`${data[data.length - 1].year}-${data[data.length - 1].month > 9 ? data[data.length - 1].month : '0' + data[data.length - 1].month}-01`).format('MMMM YYYY');
                    result.tanggal = tanggal;
                }
            }
            return result;
        } catch (error) {
            const result = {
                totalHarga: 0,
                totalQty: 0,
                hargaSatuan: 0,
                tanggal: ''
            };
            return result;
        }
    };
    stokRitel = async (form) => {
        try {
            const result = [];
            const response = await retailStockScmController.getByPeriod(form);
            const total = response.total;
            if (total != null) {
                const produk = total.products;
                if (produk != null) {
                    for (let i = 0; i < produk.length; i++) {
                        result.push({
                            productName: produk[i].product_name,
                            total: formatCurrency(Number(produk[i].totalQty).toFixed(2)) // dalam box
                            // total: formatCurrency(Number(produk[i].totalTon).toFixed(2)), // dalam ton
                        });
                    }
                }
            }
            return result;
        } catch (error) {
            const result = [];
            return result;
        }
    };
    stokBulky = async (form) => {
        try {
            const result = [];
            const response = await bulkStockScmController.getByPeriod(form);
            const total = response.total;
            if (total != null) {
                for (let i = 0; i < total.length; i++) {
                    result.push({
                        productName: total[i].product_name,
                        total: formatCurrency(Number(total[i].total).toFixed(2))
                    });
                }
            }
            return result;
        } catch (error) {
            const result = [];
            return result;
        }
    };
    saldoPe = async (form) => {
        try {
            let result = {
                saldoAwal: 0,
                saldoTersedia: 0,
                pengiriman: 0
            };
            const response = await saldoPeScmController.getByPeriod(form);
            // console.log(response)
            if (response != null) {
                result.saldoAwal = formatCurrency(Number(response.saldo_awal).toFixed(2));
                result.saldoTersedia = formatCurrency(Number(response.saldo_tersedia).toFixed(2));
                result.pengiriman = formatCurrency((Number(response.saldo_awal).toFixed(2) - Number(response.saldo_tersedia).toFixed(2)).toFixed(2));
            }
            return result;
        } catch (error) {
            const result = {
                saldoAwal: 0,
                saldoTersedia: 0,
                pengiriman: 0
            };
            return result;
        }
    };
    stokCpo = async (form) => {
        try {
            let total = 0;
            const response = await cpoStockScmController.getByPeriod(form);
            if (response != null) {
                total = response.totalStock == null ? 0 : formatCurrency(Number(response.totalStock).toFixed(2));
            }
            return {
                total: total,
                cpoIn: 0,
                cpoFeed: 0,
                tanggal: moment(form.tanggalAkhir).format('DD MMM YYYY')
            };
        } catch (error) {
            return {
                total: 0,
                cpoIn: 0,
                cpoFeed: 0,
                tanggal: '-'
            };
        }
    };
})();
