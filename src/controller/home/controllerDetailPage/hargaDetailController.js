import hargaFinanceController from '@/controller/getApiFromThisApp/harga/hargaFinanceController';
import hargaSpotSalesController from '@/controller/getApiFromThisApp/harga/hargaSpotSalesController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';

export default new (class hargaDetailController {
    hargaSpotInventoryRetail = async (form) => {
        try {
            const hargaInventory = await hargaFinanceController.getByPeriod(form);
            const hargaSpot = await hargaSpotSalesController.getByPeriod(form);
            const listInv = [];
            const listSpot = [];
            const listAll = [];
            const produk = await productMasterController.getAll();
            const produkJenis = produk.filter((item) => item.jenis == 'ritel');
            if (hargaInventory != null) {
                const latestHargaRitel = hargaInventory.latestHargaRitel;
                for (let i = 0; i < produkJenis.length; i++) {
                    const ritel = latestHargaRitel.find((item) => item.id_product == produkJenis[i].id);
                    // console.log(ritel);
                    if (ritel != null) {
                        listInv.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            invRp: Number(ritel.inventory).toFixed(2),
                            invUsd: Number(ritel.hargaAsingInventory).toFixed(2),
                            invBoxRp: Number(ritel.hargaBoxInventory).toFixed(2),
                            invBoxUsd: Number(ritel.hargaAsingBoxInventory).toFixed(2)
                        });
                    } else {
                        listInv.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            invRp: 0,
                            invUsd: 0,
                            invBoxRp: 0,
                            invBoxUsd: 0
                        });
                    }
                }
            }
            if (hargaSpot != null) {
                const latestHargaRitel = hargaSpot.latestHargaRitel;
                for (let i = 0; i < produkJenis.length; i++) {
                    const ritel = latestHargaRitel.find((item) => item.id_product == produkJenis[i].id);
                    if (ritel != null) {
                        listSpot.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            spotRp: Number(ritel.spot).toFixed(2),
                            spotUsd: Number(ritel.hargaAsingSpot).toFixed(2),
                            spotBoxRp: Number(ritel.hargaBoxSpot).toFixed(2),
                            spotBoxUsd: Number(ritel.hargaAsingBoxSpot).toFixed(2)
                        });
                    } else {
                        listSpot.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            spotRp: 0,
                            spotUsd: 0,
                            spotBoxRp: 0,
                            spotBoxUsd: 0
                        });
                    }
                }
            }
            for (let i = 0; i < produkJenis.length; i++) {
                const spot = listSpot.find((item) => item.id_product == produkJenis[i].id);
                const inventory = listInv.find((item) => item.id_product == produkJenis[i].id);
                listAll.push({
                    id_product: produkJenis[i].id,
                    produk: produkJenis[i].name,
                    invRp: inventory == null ? 0 : inventory.invRp,
                    invUsd: inventory == null ? 0 : inventory.invUsd,
                    invBoxRp: inventory == null ? 0 : inventory.invBoxRp,
                    invBoxUsd: inventory == null ? 0 : inventory.invBoxUsd,
                    spotRp: spot == null ? 0 : spot.spotRp,
                    spotUsd: spot == null ? 0 : spot.spotUsd,
                    spotBoxRp: spot == null ? 0 : spot.spotBoxRp,
                    spotBoxUsd: spot == null ? 0 : spot.spotBoxUsd
                });
            }
            return listAll;
        } catch (error) {
            const produk = await productMasterController.getAll();
            const produkBulk = produk.filter((item) => item.jenis == 'bulk');
            const list = [];
            for (let i = 0; i < produkBulk.length; i++) {
                list.push({
                    produk: produkBulk[i].name,
                    spotRp: 0,
                    spotUsd: 0,
                    spotBoxRp: 0,
                    spotBoxUsd: 0,
                    invRp: 0,
                    invUsd: 0,
                    invBoxRp: 0,
                    invBoxUsd: 0
                });
            }
            return list;
        }
    };
    hargaSpotInventoryBulk = async (form) => {
        try {
            const hargaInventory = await hargaFinanceController.getByPeriod(form);
            const hargaSpot = await hargaSpotSalesController.getByPeriod(form);
            const listInv = [];
            const listSpot = [];
            const listAll = [];
            const produk = await productMasterController.getAll();
            const produkJenis = produk.filter((item) => item.jenis == 'bulk');
            if (hargaInventory != null) {
                const latestHargaBulk = hargaInventory.latestHargaBulk;
                for (let i = 0; i < produkJenis.length; i++) {
                    const ritel = latestHargaBulk.find((item) => item.id_product == produkJenis[i].id);
                    // console.log(ritel);
                    if (ritel != null) {
                        listInv.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            invRp: Number(ritel.inventory).toFixed(2),
                            invUsd: Number(ritel.hargaAsingInventory).toFixed(2)
                        });
                    } else {
                        listInv.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            invRp: 0,
                            invUsd: 0
                        });
                    }
                }
            }
            if (hargaSpot != null) {
                const latestHargaBulk = hargaSpot.latestHargaBulk;
                for (let i = 0; i < produkJenis.length; i++) {
                    const ritel = latestHargaBulk.find((item) => item.id_product == produkJenis[i].id);
                    if (ritel != null) {
                        listSpot.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            spotRp: Number(ritel.spot).toFixed(2),
                            spotUsd: Number(ritel.hargaAsingSpot).toFixed(2)
                        });
                    } else {
                        listSpot.push({
                            id_product: produkJenis[i].id,
                            produk: produkJenis[i].name,
                            spotRp: 0,
                            spotUsd: 0
                        });
                    }
                }
            }
            for (let i = 0; i < produkJenis.length; i++) {
                const spot = listSpot.find((item) => item.id_product == produkJenis[i].id);
                const inventory = listInv.find((item) => item.id_product == produkJenis[i].id);
                listAll.push({
                    id_product: produkJenis[i].id,
                    produk: produkJenis[i].name,
                    invRp: inventory == null ? 0 : inventory.invRp,
                    invUsd: inventory == null ? 0 : inventory.invUsd,
                    spotRp: spot == null ? 0 : spot.spotRp,
                    spotUsd: spot == null ? 0 : spot.spotUsd
                });
            }
            return listAll;
        } catch (error) {
            const produk = await productMasterController.getAll();
            const produkBulk = produk.filter((item) => item.jenis == 'bulk');
            const list = [];
            for (let i = 0; i < produkBulk.length; i++) {
                list.push({
                    produk: produkBulk[i].name,
                    spotRp: 0,
                    spotUsd: 0,
                    invRp: 0,
                    invUsd: 0,
                    tanggal: ''
                });
            }
            return list;
        }
    };
})();
