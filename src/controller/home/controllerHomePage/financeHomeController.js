import { formatCurrency, valueToBilion } from '@/controller/dummyController';
import cashFlowMovementController from '@/controller/getApiFromThisApp/cashFlowMovement/cashFlowMovementController';
import cashFlowScheduleController from '@/controller/getApiFromThisApp/cashFlowSchedule/cashFlowScheduleController';
import cpoKpbnController from '@/controller/getApiFromThisApp/cpoKpbn/cpoKpbnController';
import hargaFinanceController from '@/controller/getApiFromThisApp/harga/hargaFinanceController';
import hargaSpotSalesController from '@/controller/getApiFromThisApp/harga/hargaSpotSalesController';
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import profitabilityController from '@/controller/getApiFromThisApp/profitability/profitabilityController';
import moment from 'moment';

export default new (class financeHomeController {
    hargaSpotInvRitel = async (form) => {
        try {
            const hargaInventory = await hargaFinanceController.getByPeriod(form);
            const hargaSpot = await hargaSpotSalesController.getByPeriod(form);
            const listInv = [];
            const listSpot = [];
            const listAll = [];
            const produk = await productMasterController.getAll();
            const produkRitel = produk.filter((item) => item.jenis == 'ritel');
            if (hargaInventory != null) {
                const latestHargaRitel = hargaInventory.latestHargaRitel;
                for (let i = 0; i < produkRitel.length; i++) {
                    const ritel = latestHargaRitel.find((item) => item.id_product == produkRitel[i].id);
                    // console.log(ritel);
                    if (ritel != null) {
                        listInv.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            invRp: formatCurrency(Number(ritel.hargaBoxInventory).toFixed(2)),
                            invUsd: formatCurrency(Number(ritel.hargaAsingBoxInventory).toFixed(2))
                        });
                    } else {
                        listInv.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            invRp: 0,
                            invUsd: 0
                        });
                    }
                }
            }
            if (hargaSpot != null) {
                const latestHargaRitel = hargaSpot.latestHargaRitel;
                for (let i = 0; i < produkRitel.length; i++) {
                    const ritel = latestHargaRitel.find((item) => item.id_product == produkRitel[i].id);
                    if (ritel != null) {
                        listSpot.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            spotRp: formatCurrency(Number(ritel.hargaBoxSpot).toFixed(2)),
                            spotUsd: formatCurrency(Number(ritel.hargaAsingBoxSpot).toFixed(2))
                        });
                    } else {
                        listSpot.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            spotRp: 0,
                            spotUsd: 0
                        });
                    }
                }
            }
            for (let i = 0; i < produkRitel.length; i++) {
                const spot = listSpot.find((item) => item.id_product == produkRitel[i].id);
                const inventory = listInv.find((item) => item.id_product == produkRitel[i].id);
                listAll.push({
                    id_product: produkRitel[i].id,
                    produk: produkRitel[i].name,
                    invRp: inventory == null ? 0 : inventory.invRp,
                    invUsd: inventory == null ? 0 : inventory.invUsd,
                    spotRp: spot == null ? 0 : spot.spotRp,
                    spotUsd: spot == null ? 0 : spot.spotUsd
                });
            }
            return listAll;
        } catch (error) {
            const produk = await productMasterController.getAll();
            const produkRitel = produk.filter((item) => item.jenis == 'bulk');
            const list = [];
            for (let i = 0; i < produkRitel.length; i++) {
                list.push({
                    produk: produkRitel[i].name,
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
    hargaSpotInvBulk = async (form) => {
        try {
            const hargaInventory = await hargaFinanceController.getByPeriod(form);
            const hargaSpot = await hargaSpotSalesController.getByPeriod(form);
            const listInv = [];
            const listSpot = [];
            const listAll = [];
            const produk = await productMasterController.getAll();
            const produkRitel = produk.filter((item) => item.jenis == 'bulk');
            if (hargaInventory != null) {
                const latestHargaRitel = hargaInventory.latestHargaBulk;
                for (let i = 0; i < produkRitel.length; i++) {
                    const ritel = latestHargaRitel.find((item) => item.id_product == produkRitel[i].id);
                    // console.log(ritel);
                    if (ritel != null) {
                        listInv.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            invRp: formatCurrency(Number(ritel.inventory).toFixed(2)),
                            invUsd: formatCurrency(Number(ritel.hargaAsingInventory).toFixed(2))
                        });
                    } else {
                        listInv.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            invRp: 0,
                            invUsd: 0
                        });
                    }
                }
            }
            if (hargaSpot != null) {
                const latestHargaRitel = hargaSpot.latestHargaBulk;
                for (let i = 0; i < produkRitel.length; i++) {
                    const ritel = latestHargaRitel.find((item) => item.id_product == produkRitel[i].id);
                    if (ritel != null) {
                        listSpot.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            spotRp: formatCurrency(Number(ritel.spot).toFixed(2)),
                            spotUsd: formatCurrency(Number(ritel.hargaAsingSpot).toFixed(2))
                        });
                    } else {
                        listSpot.push({
                            id_product: produkRitel[i].id,
                            produk: produkRitel[i].name,
                            spotRp: 0,
                            spotUsd: 0
                        });
                    }
                }
            }
            for (let i = 0; i < produkRitel.length; i++) {
                const spot = listSpot.find((item) => item.id_product == produkRitel[i].id);
                const inventory = listInv.find((item) => item.id_product == produkRitel[i].id);
                listAll.push({
                    id_product: produkRitel[i].id,
                    produk: produkRitel[i].name,
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
    kursMataUang = async (form) => {
        try {
            const response = await kursController.getByPeriod(form);
            if (response != null) {
                const load = response[response.length - 1];
                const kurs = {
                    tanggal: moment(load.tanggal).format('DD MMMM YYYY'),
                    value: formatCurrency(Number(load.value).toFixed(2)),
                    matauang: load.mata_uang.name,
                    symbol: load.mata_uang.symbol,
                    remark: load.mata_uang.remark
                };
                return kurs;
            } else {
                const kurs = {
                    tanggal: moment(form.tanggalAkhir).format('DD MMMM YYYY'),
                    value: '-',
                    matauang: '-',
                    symbol: '-',
                    remark: '-'
                };
                return kurs;
            }
        } catch (error) {
            const kurs = {
                tanggal: moment(form.tanggalAkhir).format('DD MMMM YYYY'),
                value: '-',
                matauang: '-',
                symbol: '-',
                remark: '-'
            };
            return kurs;
        }
    };
    cpoKpbn = async (form) => {
        try {
            const response = await cpoKpbnController.getByPeriod(form);
            // console.log(response);
            if (response != null) {
                return {
                    averageAsingTotal: formatCurrency(Number(response.averageAsingTotal).toFixed(2)),
                    averageKurs: formatCurrency(Number(response.averageKurs).toFixed(2)),
                    averageTotal: formatCurrency(Number(response.averageTotal).toFixed(2)),
                    latestCpoDate: moment(response.latestCpoDate).format('DD MMMM YYYY'),
                    latestCpoValue: formatCurrency(Number(response.latestCpoValue).toFixed(2)),
                    latestKursDate: moment(response.latestKursDate).format('DD MMMM YYYY'),
                    latestKursValue: formatCurrency(Number(response.latestKursValue).toFixed(2)),
                    latestAsingTotal: response.latestKursValue == 0 ? formatCurrency(Number(0).toFixed(2)) : formatCurrency(((Number(response.latestCpoValue) / Number(response.latestKursValue)) * 1000).toFixed(2))
                };
            } else {
                return {
                    averageAsingTotal: 0,
                    averageKurs: 0,
                    averageTotal: 0,
                    latestCpoDate: '',
                    latestCpoValue: 0,
                    latestKursDate: '',
                    latestKursValue: 0
                };
            }
        } catch (error) {
            return {
                averageAsingTotal: 0,
                averageKurs: 0,
                averageTotal: 0,
                latestCpoDate: '',
                latestCpoValue: 0,
                latestKursDate: '',
                latestKursValue: 0
            };
        }
    };
    paySchedule = async (form) => {
        try {
            const response = await cashFlowScheduleController.getByPeriod(form);
            const cff = response.kategori.find((item) => item.name.toLowerCase().includes('funding'));
            const cfi = response.kategori.find((item) => item.name.toLowerCase().includes('investment'));
            const cfo = response.kategori.find((item) => item.name.toLowerCase().includes('operation'));
            const last = cff.period[cff.period.length - 1];

            const result = {
                cff: valueToBilion(Number(cff.total)),
                cfi: valueToBilion(Number(cfi.total)),
                cfo: valueToBilion(Number(cfo.total)),
                period: moment(last.month > 9 ? `${last.year.toString()}-${last.month.toString()}-01` : `${last.year.toString()}-0${last.month.toString()}-01`).format('MMMM YYYY')
            };
            return result;
        } catch (error) {
            return {
                cff: 0,
                cfi: 0,
                cfo: 0,
                period: '-'
            };
        }
    };
    cashBalance = async (form) => {
        try {
            const response = await cashFlowMovementController.getByPeriod(form);
            let balance;
            let cashFlowMovement;
            if (response != null) {
                // Cash Balance
                if (response?.latestCashBalance) {
                    const dataCashBalance = response?.latestCashBalance;
                    const tanggalAkhir = `${response?.latestMonth?.month} ${response?.latestMonth?.year}`;
                    balance = {
                        tanggal: moment(tanggalAkhir, 'M YYYY').format('MMMM YYYY'),
                        lastMonth: moment(tanggalAkhir, 'M YYYY').subtract(1, 'month').format('MMM YYYY'),
                        value: valueToBilion(Number(dataCashBalance.value)),
                        status: dataCashBalance.status,
                        difference: valueToBilion(Number(dataCashBalance.difference))
                    };
                } else {
                    balance = {
                        tanggal: '',
                        lastMonth: '',
                        value: 0,
                        status: 'none',
                        difference: 0
                    };
                }

                // Cash Flow Movement
                if (response?.latestMonth?.data) {
                    const dataCashFlowMovement = response?.latestMonth?.data;
                    const tanggal = `${response?.latestMonth?.month} ${response?.latestMonth?.year}`;
                    const thisMonth = dataCashFlowMovement;
                    if (thisMonth.detail.length > 0) {
                        const starting = thisMonth.detail.find((item) => item.name.toLowerCase().includes('starting'));
                        const cfoIn = thisMonth.detail.find((item) => item.name.toLowerCase().includes('operating in'));
                        const cfoOut = thisMonth.detail.find((item) => item.name.toLowerCase().includes('operating out'));
                        const cfi = thisMonth.detail.find((item) => item.name.toLowerCase().includes('investment'));
                        const cff = thisMonth.detail.find((item) => item.name.toLowerCase().includes('funding'));
                        let total = 0;
                        const detail = thisMonth.detail;
                        const totalPositive = detail
                            .filter((item) => item.nilai === 'positive' && item.name !== 'Starting Cash Balanced') // Ambil item dengan nilai "positive"
                            .map((item) => item.value) // Ambil hanya nilai `value`
                            .reduce((acc, val) => acc + val, 0); // Jumlahkan nilai

                        const totalNegative = detail
                            .filter((item) => item.nilai === 'negative' && item.name !== 'Starting Cash Balanced') // Ambil item dengan nilai "negative"
                            .map((item) => item.value) // Ambil hanya nilai `value`
                            .reduce((acc, val) => acc + val, 0);

                        total = totalPositive - totalNegative;
                        cashFlowMovement = {
                            starting: valueToBilion(Number(starting.value)),
                            startingStatus: starting.nilai,
                            cfoIn: valueToBilion(Number(cfoIn.value)),
                            cfoInStatus: cfoIn.nilai,
                            cfoOut: valueToBilion(Number(cfoOut.value)),
                            cfoOutStatus: cfoOut.nilai,
                            cfi: valueToBilion(Number(cfi.value)),
                            cfiStatus: cfi.nilai,
                            cff: valueToBilion(Number(cff.value)),
                            cffStatus: cff.nilai,
                            total: valueToBilion(Number(total)),
                            tanggal: moment(tanggal, 'M YYYY').format('MMMM YYYY')
                        };
                    } else {
                        cashFlowMovement = {
                            cfoIn: 0,
                            cfoInStatus: 'positive',
                            cfoOut: 0,
                            cfoOutStatus: 'negative',
                            cfi: 0,
                            cfiStatus: 'negative',
                            cff: 0,
                            cffStatus: 'negative',
                            tanggal: moment(tanggal, 'M YYYY').format('MMMM YYYY'),
                            total: 0
                        };
                    }
                } else {
                    balance = {
                        tanggal: '',
                        value: 0,
                        status: 'none',
                        difference: 0
                    };
                    cashFlowMovement = {
                        cfoIn: 0,
                        cfoInStatus: 'negative',
                        cfoOut: 0,
                        cfoOutStatus: 'negative',
                        cfi: 0,
                        cfiStatus: 'negative',
                        cff: 0,
                        cffStatus: 'negative',
                        tanggal: moment().format('MMMM YYYY'),
                        total: 0
                    };
                }

                const result = {
                    tanggal: moment(form.tanggalAkhir).format('MMMM YYYY'),
                    cashBalance: balance,
                    cashFlowMovement: cashFlowMovement
                };
                return result;
            } else {
                const balance = {
                    tanggal: '',
                    value: 0,
                    status: 'none',
                    difference: 0
                };
                const cashFlowMovement = {
                    cfoIn: 0,
                    cfoInStatus: 'equals',
                    cfoOut: 0,
                    cfoOutStatus: 'equals',
                    cfi: 0,
                    cfiStatus: 'equals',
                    cff: 0,
                    cffStatus: 'equals',
                    tanggal: moment().format('MMMM YYYY'),
                    total: 0
                };
                const result = {
                    tanggal: '-',
                    cashBalance: balance,
                    cashFlowMovement: cashFlowMovement
                };
                return result;
            }
        } catch (error) {
            const balance = {
                tanggal: '',
                value: 0,
                status: 'none',
                difference: 0
            };
            const cashFlowMovement = {
                cfoIn: 0,
                cfoInStatus: 'equals',
                cfoOut: 0,
                cfoOutStatus: 'equals',
                cfi: 0,
                cfiStatus: 'equals',
                cff: 0,
                cffStatus: 'equals',
                tanggal: moment().format('MMMM YYYY'),
                total: 0
            };
            const result = {
                tanggal: '-',
                cashBalance: balance,
                cashFlowMovement: cashFlowMovement
            };
            return result;
        }
    };
    revenue = async (form) => {
        try {
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                // console.log(response);
                const monthsThisYear = response.latestMonth;
                // If thisYear has data, get the latest month
                if (monthsThisYear != null) {
                    const thisYearLatestMonth = {
                        month: monthsThisYear.month,
                        tanggal: moment(`${monthsThisYear.month}-${monthsThisYear.year}`, 'M-YYYY').format('MMM YYYY'),
                        year: moment(`${monthsThisYear.year}`, 'YYYY').format('YYYY'),
                        lastMonth: moment(`${monthsThisYear.month}-${monthsThisYear.year}`, 'M-YYYY').subtract(1, 'month').format('MMM YYYY'),
                        pendapatan: valueToBilion(monthsThisYear.pendapatan),
                        targetPendapatanRkap: valueToBilion(monthsThisYear.targetPendapatanRkap),
                        persenPendapatan: Number(monthsThisYear.targetPendapatanRkap) == 0 ? 0 : ((Number(monthsThisYear.pendapatan) / Number(monthsThisYear.targetPendapatanRkap)) * 100).toFixed(0),
                        labaKotor: valueToBilion(monthsThisYear.labaKotor),
                        labaKotorLastMonth: valueToBilion(monthsThisYear.labaKotorLastMonth),
                        targetLabaKotorRkap: valueToBilion(monthsThisYear.targetLabaKotorRkap),
                        gpmPercent: Number(monthsThisYear.gpmPercent).toFixed(2),
                        gpmPercentLastMonth: Number(monthsThisYear.gpmPercentLastMonth).toFixed(2),
                        gpmRkapPercent: Number(monthsThisYear.gpmRkapPercent).toFixed(2),

                        ebitda: valueToBilion(monthsThisYear.ebitda),
                        ebitdaLastMonth: valueToBilion(monthsThisYear.ebitdaLastMonth),
                        targetEbitdaRkap: valueToBilion(monthsThisYear.targetEbitdaRkap),
                        ebitdaPercent: Number(monthsThisYear.ebitdaPercent).toFixed(2),
                        ebitdaPercentLastMonth: Number(monthsThisYear.ebitdaPercentLastMonth).toFixed(2),
                        ebitdaRkapPercent: Number(monthsThisYear.ebitdaRkapPercent).toFixed(2),

                        labaBersih: valueToBilion(monthsThisYear.labaBersih),
                        labaBersihLastMonth: valueToBilion(monthsThisYear.labaBersihLastMonth),
                        targetLabaBersihRkap: valueToBilion(monthsThisYear.targetLabaBersihRkap),
                        npmRkapPercent: Number(monthsThisYear.npmRkapPercent).toFixed(2),
                        npmPercent: Number(monthsThisYear.npmPercent).toFixed(2),
                        npmPercentLastMonth: Number(monthsThisYear.npmPercentLastMonth).toFixed(2),
                        totalEbitda: valueToBilion(monthsThisYear.totalEbitda),
                        totalLabaKotor: valueToBilion(monthsThisYear.totalLabaKotor),
                        totallabaBersih: valueToBilion(monthsThisYear.totallabaBersih)
                    };
                    return thisYearLatestMonth;
                }
                // If both thisYear and lastYear have no data, return 0 values
                else {
                    const thisYearLatestMonth = {
                        month: 0,
                        tanggal: moment(form.tanggalAkhir).format('MMM YYYY'),
                        year: moment(form.tanggalAkhir).format('YYYY'),
                        lastMonth: moment(form.tanggalAkhir).format('MMM YYYY'),
                        pendapatan: 0,
                        targetPendapatanRkap: 0,
                        persenPendapatan: 0,
                        labaKotor: 0,
                        labaKotorLastMonth: 0,
                        gpmPercent: 0,
                        ebitda: 0,
                        ebitdaLastMonth: 0,
                        ebitdaPercent: 0,
                        labaBersih: 0,
                        labaBersihLastMonth: 0,
                        npmPercent: 0,
                        totalEbitda: 0,
                        totalLabaKotor: 0,
                        totallabaBersih: 0
                    };
                    return thisYearLatestMonth;
                }
            } else {
                const thisYearLatestMonth = {
                    month: 0,
                    tanggal: moment(form.tanggalAkhir).format('MMM YYYY'),
                    year: moment(form.tanggalAkhir).format('YYYY'),
                    lastMonth: moment(form.tanggalAkhir).format('MMM YYYY'),
                    pendapatan: 0,
                    targetPendapatanRkap: 0,
                    persenPendapatan: 0,
                    labaKotor: 0,
                    labaKotorLastMonth: 0,
                    gpmPercent: 0,
                    ebitda: 0,
                    ebitdaLastMonth: 0,
                    ebitdaPercent: 0,
                    labaBersih: 0,
                    labaBersihLastMonth: 0,
                    npmPercent: 0,
                    totalEbitda: 0,
                    totalLabaKotor: 0,
                    totallabaBersih: 0
                };
                return thisYearLatestMonth;
            }
        } catch (error) {
            const thisYearLatestMonth = {
                month: 0,
                tanggal: '',
                year: '',
                lastMonth: '',
                pendapatan: 0,
                targetPendapatanRkap: 0,
                persenPendapatan: 0,
                labaKotor: 0,
                labaKotorLastMonth: 0,
                gpmPercent: 0,
                ebitda: 0,
                ebitdaLastMonth: 0,
                ebitdaPercent: 0,
                labaBersih: 0,
                labaBersihLastMonth: 0,
                npmPercent: 0,
                totalEbitda: 0,
                totalLabaKotor: 0,
                totallabaBersih: 0
            };
            return thisYearLatestMonth;
        }
    };
})();
