import { cashBalance, cashFlowMovement, cffPaySchedule, cfiPaySchedule, ebitdaMargin, grossProfitMargin, netProfitMargin, revenue } from '@/controller/home/components/FinanceHome';
import { cpoOlahVsRKAP, laporanProduksi, pemakaianMaterial } from '@/controller/home/components/OperationHome';
import { avgCPOKpbn, incomingCpo, outstandingCPo, saldoPe } from '@/controller/home/components/SCMHome';
import { UpdateHargaCPO, UpdateKursMataUang, UpdateVolume } from '@/controller/home/components/SalesHome';

export default new (class HomeDashboard {
    cardSalesPerformance() {
        const list = [UpdateHargaCPO(), UpdateKursMataUang(), UpdateVolume()];
        return list;
    }
    cardFinancial() {
        const list = [revenue(), grossProfitMargin(), ebitdaMargin(), netProfitMargin(), cashBalance(), cffPaySchedule(), cfiPaySchedule(), cashFlowMovement()];
        return list;
    }
    cardOperational() {
        const list = [cpoOlahVsRKAP(), laporanProduksi(), pemakaianMaterial()];
        return list;
    }
    cardSCM() {
        const list = [avgCPOKpbn(), incomingCpo(), outstandingCPo(), saldoPe()];
        return list;
    }
})();
