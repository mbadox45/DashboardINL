import { cashBalance, cashFlowMovement, cffPaySchedule, ebitdaMargin, grossProfitMargin, hargaSpotInventoryBulky, hargaSpotInventoryRetail, netProfitMargin, revenue, transaction } from '@/controller/home/components/FinanceHome';
import { cpoOlahVsRKAP, laporanProduksi, pemakaianMaterial } from '@/controller/home/components/OperationHome';
import { incomingCpo, stockBulky, stockRetail } from '@/controller/home/components/SCMHome';
import { QtyPenjualanBulky, QtyPenjualanRetail, avgCPOKpbn, outstandingCPo, proportionCost, saldoPe } from '@/controller/home/components/SalesHome';
import { sdm } from '@/controller/home/components/SdmHome';

export default new (class HomeDashboard {
    cardSalesPerformance() {
        const list = [avgCPOKpbn(), saldoPe(), QtyPenjualanBulky(), QtyPenjualanRetail(), outstandingCPo(), proportionCost()];
        return list;
    }
    cardFinancial() {
        const list = [revenue(), grossProfitMargin(), ebitdaMargin(), transaction(), netProfitMargin(), cashBalance(), cffPaySchedule(), cashFlowMovement(), hargaSpotInventoryBulky(), hargaSpotInventoryRetail()];
        return list;
    }
    cardOperational() {
        const list = [cpoOlahVsRKAP(), laporanProduksi(), pemakaianMaterial()];
        return list;
    }
    cardSCM() {
        const list = [incomingCpo(), stockBulky(), stockRetail()];
        // const list = [avgCPOKpbn(), saldoPe(), outstandingCPo(), incomingCpo(), stockBulky(), stockRetail()];
        return list;
    }
    cardSdm() {
        const list = [sdm()];
        return list;
    }
})();
