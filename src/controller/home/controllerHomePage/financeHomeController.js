import { valueToBilion } from '@/controller/dummyController';
import profitabilityController from '@/controller/getApiFromThisApp/profitability/profitabilityController';

export default new (class financeHomeController {
    revenue = async (form) => {
        try {
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                const monthsThisYear = response.thisYear.months;
                const monthsLastYear = response.lastYear.months;

                // If thisYear has data, get the latest month
                if (monthsThisYear.length > 0) {
                    const latestMonth = monthsThisYear.reduce((prev, current) => (prev.month > current.month ? prev : current));

                    const thisYearLatestMonth = {
                        month: latestMonth.month,
                        pendapatan: valueToBilion(latestMonth.pendapatan),
                        targetPendapatanRkap: valueToBilion(latestMonth.targetPendapatanRkap),
                        persenPendapatan: Number(latestMonth.targetPendapatanRkap) == 0 ? 0 : ((Number(latestMonth.pendapatan) / Number(latestMonth.targetPendapatanRkap)) * 100).toFixed(0),
                        labaKotor: latestMonth.labaKotor,
                        gpmPercent: latestMonth.gpmPercent,
                        ebitda: latestMonth.ebitda,
                        ebitdaPercent: latestMonth.ebitdaPercent,
                        labaBersih: latestMonth.labaBersih,
                        npmPercent: latestMonth.npmPercent,
                        details: latestMonth.details
                    };
                    return thisYearLatestMonth;
                }
                // If thisYear has no data, use last year's data
                else if (monthsThisYear.length === 0 && monthsLastYear.length > 0) {
                    const latestMonth = monthsLastYear.reduce((prev, current) => (prev.month > current.month ? prev : current));

                    const thisYearLatestMonth = {
                        month: latestMonth.month,
                        pendapatan: valueToBilion(latestMonth.pendapatan),
                        targetPendapatanRkap: valueToBilion(latestMonth.targetPendapatanRkap),
                        persenPendapatan: Number(latestMonth.targetPendapatanRkap) == 0 ? 0 : ((Number(latestMonth.pendapatan) / Number(latestMonth.targetPendapatanRkap)) * 100).toFixed(0),
                        labaKotor: latestMonth.labaKotor,
                        gpmPercent: latestMonth.gpmPercent,
                        ebitda: latestMonth.ebitda,
                        ebitdaPercent: latestMonth.ebitdaPercent,
                        labaBersih: latestMonth.labaBersih,
                        npmPercent: latestMonth.npmPercent,
                        details: latestMonth.details
                    };
                    return thisYearLatestMonth;
                }
                // If both thisYear and lastYear have no data, return 0 values
                else {
                    const thisYearLatestMonth = {
                        month: 0,
                        pendapatan: 0,
                        targetPendapatanRkap: 0,
                        persenPendapatan: 0,
                        labaKotor: 0,
                        gpmPercent: 0,
                        ebitda: 0,
                        ebitdaPercent: 0,
                        labaBersih: 0,
                        npmPercent: 0,
                        details: 0
                    };
                    return thisYearLatestMonth;
                }
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
})();
