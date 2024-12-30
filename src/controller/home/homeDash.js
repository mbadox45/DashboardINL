import { cashBalance, cashFlowMovement, cffPaySchedule, cfiPaySchedule, ebitdaMargin, grossProfitMargin, netProfitMargin, revenue } from '@/controller/home/components/FinanceHome';
import { cpoOlahVsRKAP, laporanProduksi, pemakaianMaterial } from '@/controller/home/components/OperationHome';
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
})();
