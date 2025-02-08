import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import retailStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/retailStockScmController';

export default new (class scmDetailController {
    stockRitel = async (form) => {
        try {
            const listQtyProduct = [];
            const response = await retailStockScmController.getByPeriod(form);
            const produk = await productMasterController.getAll();
            const ritel = produk.filter((item) => item.jenis == 'ritel');

            if (response != null) {
                const warehouse = response.warehouse;
                for (let i = 0; i < warehouse.length; i++) {
                    const detail = warehouse[i].detail;
                    for (let j = 0; j < detail.length; j++) {
                        listQtyProduct.push({
                            idRitel: detail[j].id_ritel,
                            product: detail[j].product.name,
                            qty: Number(detail[j].qty),
                            tanggal: detail[j].tanggal
                        });
                    }
                }
            }
            // 🔥 Grouping data berdasarkan idRitel dan tanggal
            const groupedData = listQtyProduct.reduce((acc, item) => {
                const key = `${item.idRitel}-${item.tanggal}`; // Buat kunci unik
                if (!acc[key]) {
                    acc[key] = { ...item }; // Simpan item pertama kali
                } else {
                    acc[key].qty += item.qty; // Tambahkan qty jika sudah ada
                }
                return acc;
            }, {});

            // 🔹 Konversi kembali ke array
            const finalList = Object.values(groupedData);

            // Masuk ke Data Produk
            const listLabel = [];
            if (ritel != null) {
                for (let i = 0; i < ritel.length; i++) {
                    const dataRitel = finalList.filter((item) => item.idRitel);
                }
            }
            return finalList; // Mengembalikan hasil
        } catch (error) {
            console.error(error);
            return null;
        }
    };
})();
