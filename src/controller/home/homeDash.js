import { cashBalance, cashFlowMovement, cffPaySchedule, ebitdaMargin, grossProfitMargin, hargaSpotInventoryBulky, hargaSpotInventoryRetail, netProfitMargin, revenue } from '@/controller/home/components/FinanceHome';
import { cpoOlahVsRKAP, laporanProduksi, packagingPerformance, pemakaianMaterial } from '@/controller/home/components/OperationHome';
import { actualIncommingCPO, balanceStockCPO, stockBulky, stockRetail } from '@/controller/home/components/SCMHome';
import { QtyPenjualanBulky, QtyPenjualanRetail, avgCPOKpbn } from '@/controller/home/components/SalesHome';
import { sdm } from '@/controller/home/components/SdmHome';

export default new (class HomeDashboard {
    cardSalesPerformance() {
        const list = [QtyPenjualanBulky(), QtyPenjualanRetail()];
        return list;
    }
    // cardSalesPerformance() {
    //     const list = [avgCPOKpbn(), saldoPe(), outstandingCPo(), proportionCost(), QtyPenjualanBulky(), QtyPenjualanRetail()];
    //     return list;
    // }
    cardFinancial() {
        const list = [revenue(), grossProfitMargin(), ebitdaMargin(), netProfitMargin(), cashBalance(), cashFlowMovement(), cffPaySchedule(), avgCPOKpbn()];
        return list;
    }

    cardHarga() {
        const list = [hargaSpotInventoryBulky(), hargaSpotInventoryRetail()];
        return list;
    }
    // cardFinancial() {
    //     const list = [revenue(), grossProfitMargin(), ebitdaMargin(), transaction(), netProfitMargin(), cashBalance(), cffPaySchedule(), cashFlowMovement(), hargaSpotInventoryBulky(), hargaSpotInventoryRetail()];
    //     return list;
    // }
    cardOperational() {
        const list = [cpoOlahVsRKAP(), laporanProduksi(), pemakaianMaterial()];
        return list;
    }
    cardSCM() {
        const list = [balanceStockCPO(), stockBulky(), stockRetail(), actualIncommingCPO()];
        // const list = [avgCPOKpbn(), saldoPe(), outstandingCPo(), incomingCpo(), stockBulky(), stockRetail()];
        return list;
    }
    cardPackaging() {
        const list = [packagingPerformance()];
        return list;
    }
    cardSdm() {
        const list = [sdm()];
        return list;
    }
})();
