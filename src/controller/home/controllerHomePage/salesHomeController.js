import laporanPenjualanController from '@/controller/getApiFromThisApp/sales/laporanPenjualanController';
import targetPenjualanController from '@/controller/getApiFromThisApp/sales/targetPenjualanController';

export default new (class financeHomeController {
    laporanPenjualanSales = async (form) => {
        try {
            const laporanPenjualan = await laporanPenjualanController.getByPeriod(form);
            const targetPenjualan = await targetPenjualanController.getByPeriod(form);
            const listAll = [];
            if (laporanPenjualan != null) {
                const penjualanBulk = laporanPenjualan.bulk;
                const penjualanRetail = laporanPenjualan.ritel;
            }
            if (targetPenjualan != null) {
                const targetBulk = targetPenjualan.bulk;
                const targetRetail = targetPenjualan.ritel;
            }
            // for (let i = 0; i < produkRitel.length; i++) {
            //     const spot = listSpot.find((item) => item.id_product == produkRitel[i].id);
            //     const inventory = listInv.find((item) => item.id_product == produkRitel[i].id);
            //     listAll.push({
            //         id_product: produkRitel[i].id,
            //         produk: produkRitel[i].name,
            //         invRp: inventory == null ? 0 : inventory.invRp,
            //         invUsd: inventory == null ? 0 : inventory.invUsd,
            //         spotRp: spot == null ? 0 : spot.spotRp,
            //         spotUsd: spot == null ? 0 : spot.spotUsd
            //     });
            // }
            return listAll;
        } catch (error) {
            // const produk = await productMasterController.getAll();
            // const produkRitel = produk.filter((item) => item.jenis == 'bulk');
            // const list = [];
            // for (let i = 0; i < produkRitel.length; i++) {
            //     list.push({
            //         produk: produkRitel[i].name,
            //         spotRp: 0,
            //         spotUsd: 0,
            //         invRp: 0,
            //         invUsd: 0,
            //         tanggal: ''
            //     });
            // }
            return list;
        }
    };
})();
