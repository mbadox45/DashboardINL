import { cashBalance, cashFlowMovement, cffPaySchedule, hargaSpotInventoryBulky, hargaSpotInventoryRetail, netProfitMargin, transaction } from '@/controller/home/components/FinanceHome';
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
        const list = [netProfitMargin(), await cashBalance(), cashFlowMovement(), await cffPaySchedule(), avgCPOKpbn(), transaction()];
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
        const list = [balanceStockCPO(), stockBulky(), stockRetail(), actualIncommingCPO(), saldoPe(), outstandingCPo(), proportionCost(), sdm()];
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
