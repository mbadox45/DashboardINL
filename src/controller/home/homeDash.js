import { hargaSpotInventoryBulky, hargaSpotInventoryRetail, transaction } from '@/controller/home/components/FinanceHome';
import { cpoOlahVsRKAP, laporanProduksi, packagingPerformance, pemakaianMaterial } from '@/controller/home/components/OperationHome';
import { actualIncommingCPO, balanceStockCPO, stockBulky, stockRetail } from '@/controller/home/components/SCMHome';
import { QtyPenjualanBulky, QtyPenjualanRetail, avgCPOKpbn, outstandingCPo, proportionCost, saldoPe } from '@/controller/home/components/SalesHome';
import { sdm } from '@/controller/home/components/SdmHome';

export default new (class HomeDashboard {
    cardSalesPerformance = () => {
        const list = [QtyPenjualanBulky(), QtyPenjualanRetail()];
        return list;
    };
    cardFinancial = async () => {
        const list = [avgCPOKpbn(), transaction()];
        return list;
    };

    cardHarga = () => {
        const list = [hargaSpotInventoryBulky(), hargaSpotInventoryRetail()];
        return list;
    };
    cardOperational = () => {
        const list = [cpoOlahVsRKAP(), laporanProduksi()];
        return list;
    };
    cardOperationalMaterial = () => {
        const list = [pemakaianMaterial()];
        return list;
    };
    cardSCM = () => {
        const list = [balanceStockCPO(), stockBulky(), stockRetail(), actualIncommingCPO(), outstandingCPo(), saldoPe(), proportionCost(), sdm()];
        return list;
    };
    cardPackaging = () => {
        const list = [packagingPerformance()];
        return list;
    };
    cardSdm = () => {
        const list = [sdm()];
        return list;
    };
})();
