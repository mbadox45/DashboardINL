import { cashBalance, cashFlowMovement, cffPaySchedule, cfiPaySchedule, ebitdaMargin, grossProfitMargin, netProfitMargin, revenue } from '@/controller/home/components/FinanceHome';
import { cpoOlahVsRKAP, laporanProduksi, pemakaianMaterial } from '@/controller/home/components/OperationHome';
import { avgCPOKpbn, incomingCpo, outstandingCPo, saldoPe, stockBulky, stockRetail, transaction } from '@/controller/home/components/SCMHome';
import { UpdateHargaCPO, UpdateKursMataUang } from '@/controller/home/components/SalesHome';
import { sdm } from '@/controller/home/components/SdmHome';

export default new (class HomeDashboard {
    cardSalesPerformance() {
        const list = [UpdateHargaCPO(), UpdateKursMataUang()];
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
        const list = [avgCPOKpbn(), saldoPe(), outstandingCPo(), incomingCpo(), stockBulky(), stockRetail(), transaction()];
        return list;
    }
    cardSdm() {
        const list = [sdm()];
        return list;
    }
})();
