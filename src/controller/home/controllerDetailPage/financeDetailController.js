import { barChartOptionsApex, combo3ChartOptionsApex, comboChartOptionsApex, stackedChartOptionsApex } from '@/controller/chartStyle/chartDummy';
import { halfRadialChartApex2 } from '@/controller/chartStyle/radialBarDummy';
import { formatCurrency, months, valueToBilion } from '@/controller/dummyController';
import cashFlowMovementController from '@/controller/getApiFromThisApp/cashFlowMovement/cashFlowMovementController';
import cashFlowScheduleController from '@/controller/getApiFromThisApp/cashFlowSchedule/cashFlowScheduleController';
import cpoKpbnController from '@/controller/getApiFromThisApp/cpoKpbn/cpoKpbnController';
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import profitabilityController from '@/controller/getApiFromThisApp/profitability/profitabilityController';
import moment from 'moment';

export default new (class financeDetailController {
    kursMataUang = async (form) => {
        try {
            const result = [];
            const response = await kursController.getByPeriod(form);
            if (response != null) {
                for (let i = 0; i < response.length; i++) {
                    result.push({
                        tanggal: moment(response[i].tanggal).format('DD MMM YYYY'),
                        value: Number(response[i].value),
                        mata_uang: `${response[i].mata_uang.symbol}_${response[i].mata_uang.name} - ${response[i].mata_uang.remark}`
                    });
                }
            }
            return result;
        } catch (error) {
            const result = [];
            return result;
        }
    };
    resultKursMataUang = async (form) => {
        const response = await this.kursMataUang(form);

        const chart = [];

        if (response.length > 0) {
            // CFF
            const mataUang = response[0].mata_uang;
            const label = 'Mata Uang (' + mataUang + ')';
            const type = 'bar';
            const color = ['rgba(204, 4, 4, 0.6)'];
            const strokeColor = ['rgba(204, 4, 4, 1'];
            const dataLabelStat = true;
            const total = '';
            const data = [];
            const listLabels = [];
            for (let i = 0; i < response.length; i++) {
                data.push(response[i].value);
                listLabels.push(response[i].tanggal);
            }
            // const typeChart = 'line'

            chart.push({
                name: label,
                total: total,
                type: type,
                chartOptions: barChartOptionsApex(listLabels, color, strokeColor, dataLabelStat, total),
                series: [
                    {
                        name: label,
                        data: data
                    }
                ]
            });
        }
        return {
            chart: chart.length > 0 ? chart[0] : null
        };
    };
    cpoKpbn = async (form) => {
        try {
            let result = [];
            const response = await cpoKpbnController.getByPeriod(form);
            if (response != null) {
                const years = response.years;
                const listData = [];
                for (let i = 0; i < years.length; i++) {
                    const month = years[i].months;
                    for (let j = 0; j < month.length; j++) {
                        listData.push({
                            name: moment(month[j].month, 'M').format('MMM') + ' ' + years[i].year,
                            avg: month[j].average,
                            avgAsing: month[j].averageAsing,
                            records: month[j].detail
                        });
                        // listData.push(month[j].average);
                        // listLabel.push(moment(month[j].month, 'M').format('MMM') + ' ' + years[i].year);
                    }
                }
                result = listData;
            }
            return result;
        } catch (error) {
            const result = [];
            return result;
        }
    };
    paySchedule = async (form) => {
        try {
            let result = {
                chart: [],
                tabel: []
            };
            const response = await cashFlowScheduleController.getByPeriod(form);
            const year = moment(form.tanggalAkhir).format('YYYY');
            if (response != null) {
                const kategori = response.kategori;
                const cffKategori = kategori.find((item) => item.name.toLowerCase().includes('cash flow funding'));
                if (cffKategori != null) {
                    const listChart = [];
                    const listName = [];
                    const listTable = [];
                    const period = cffKategori.period;
                    const list = [];
                    for (let i = 0; i < period.length; i++) {
                        const data = period[i].data;
                        for (let j = 0; j < data.length; j++) {
                            listName.push({ name: data[j].name });
                        }
                    }
                    const uniqueDataName = Array.from(new Map(listName.map((item) => [item.name, item])).values());
                    const dataArray = [];
                    for (let i = 0; i < months.length; i++) {
                        const dataPeriod = period.find((item) => item.month == months[i].id);
                        if (dataPeriod != null) {
                            const data = dataPeriod.data;
                            const total = data.filter((item) => item.name === uniqueDataName[0].name).reduce((sum, item) => sum + (Number(item.value) || 0), 0);
                            dataArray.push(Number(valueToBilion(total)));
                            listTable.push({
                                periode: months[i].name + ' ' + year,
                                value: valueToBilion(total),
                                pay_status: data[0].pay_status.name
                            });
                        } else {
                            dataArray.push(0);
                            listTable.push({
                                periode: months[i].name + ' ' + year,
                                value: 0,
                                pay_status: '-'
                            });
                        }
                    }
                    result.chart.push({
                        name: cffKategori.name + ' ' + year,
                        data: dataArray
                    });
                    result.tabel.push({
                        name: cffKategori.name + ' ' + year,
                        data: listTable,
                        color: '#cc0404'
                    });
                }
                const cfiKategori = kategori.find((item) => item.name.toLowerCase().includes('cash flow investment'));
                if (cfiKategori != null) {
                    const period = cfiKategori.period;
                    const listName = [];
                    const listTable = [];
                    const listChart = [];
                    for (let i = 0; i < period.length; i++) {
                        const data = period[i].data;
                        for (let j = 0; j < data.length; j++) {
                            listName.push({ name: data[j].name });
                        }
                    }
                    const uniqueDataName = Array.from(new Map(listName.map((item) => [item.name, item])).values());
                    if (uniqueDataName.length > 0) {
                        for (let i = 0; i < uniqueDataName.length; i++) {
                            const dataArray = [];
                            const tableRow = { name: uniqueDataName[i].name }; // Objek dinamis untuk setiap nama unik
                            for (let j = 0; j < months.length; j++) {
                                const dataPeriod = period.find((item) => item.month == months[j].id);
                                const monthKey = moment(months[j].name, 'MMMM').format('MMM').toLowerCase(); // Contoh: "Jan" → "jan"

                                if (dataPeriod != null) {
                                    const data = dataPeriod.data;
                                    const totalData = data.filter((item) => item.name === uniqueDataName[i].name).reduce((sum, item) => sum + (Number(item.value) || 0), 0);
                                    const statusData = data.find((item) => item.name === uniqueDataName[i].name);
                                    let status;
                                    if (statusData != null) {
                                        status = statusData.pay_status ? statusData.pay_status.name : '-';
                                    } else {
                                        status = '-';
                                    }
                                    tableRow[monthKey] = {
                                        value: valueToBilion(totalData),
                                        status: status
                                    };
                                    dataArray.push(Number(valueToBilion(totalData)));
                                } else {
                                    dataArray.push(0);
                                    tableRow[monthKey] = {
                                        value: formatCurrency(Number(0).toFixed(2)),
                                        status: '-'
                                    };
                                }
                            }
                            listTable.push(tableRow); // Tambahkan ke listTable
                            listChart.push({
                                name: uniqueDataName[i].name,
                                data: dataArray
                            });
                        }
                    }
                    // for (let i = 0; i < uniqueDataName.length; i++) {
                    //     const dataArray = [];
                    //     const dataTable = [];
                    //     for (let j = 0; j < months.length; j++) {
                    //         const dataPeriod = period.find((item) => item.month == months[j].id);
                    //         if (dataPeriod != null) {
                    //             const data = dataPeriod.data;
                    //             const total = data.filter((item) => item.name === uniqueDataName[i].name).reduce((sum, item) => sum + (Number(item.value) || 0), 0);
                    //             dataArray.push(Number(valueToBilion(total)));
                    //             dataTable.push({
                    //                 periode: moment(months[j].name, 'MMMM').format('MMM'),
                    //                 value: valueToBilion(total)
                    //             });
                    //         } else {
                    //             dataArray.push(0);
                    //             dataTable.push({
                    //                 periode: moment(months[j].name, 'MMMM').format('MMM'),
                    //                 value: 0
                    //             });
                    //         }
                    //     }
                    //     listChart.push({
                    //         name: uniqueDataName[i].name,
                    //         data: dataArray
                    //     });
                    //     listTable.push({
                    //         name: uniqueDataName[i].name,
                    //         data: dataTable
                    //     });
                    // }
                    result.chart.push({
                        name: cfiKategori.name + ' ' + year,
                        dataChart: listChart
                    });
                    result.tabel.push({
                        name: cfiKategori.name + ' ' + year,
                        dataTable: listTable,
                        color: '#1a5276'
                    });
                }

                const cfoKategori = kategori.find((item) => item.name.toLowerCase().includes('cash flow operation'));
                if (cfoKategori != null) {
                    const period = cfoKategori.period;
                    const listName = [];
                    const listNameChart = [];
                    const listTable = [];
                    const listChart = [];

                    // ListTable
                    for (let i = 0; i < period.length; i++) {
                        const data = period[i].data;
                        if (data.length > 0) {
                            for (let j = 0; j < data.length; j++) {
                                listName.push({ name: data[j].name });
                            }
                        } else {
                            continue;
                        }
                    }
                    const uniqueDataName = Array.from(new Map(listName.map((item) => [item.name, item])).values());
                    if (uniqueDataName.length > 0) {
                        for (let i = 0; i < uniqueDataName.length; i++) {
                            const tableRow = { name: uniqueDataName[i].name }; // Objek dinamis untuk setiap nama unik
                            for (let j = 0; j < months.length; j++) {
                                const dataPeriod = period.find((item) => item.month == months[j].id);
                                const monthKey = moment(months[j].name, 'MMMM').format('MMM').toLowerCase(); // Contoh: "Jan" → "jan"

                                if (dataPeriod != null) {
                                    const data = dataPeriod.data;
                                    const totalData = data.filter((item) => item.name === uniqueDataName[i].name).reduce((sum, item) => sum + (Number(item.value) || 0), 0);
                                    const statusData = data.find((item) => item.name === uniqueDataName[i].name);
                                    let status;
                                    if (statusData != null) {
                                        status = statusData.pay_status ? statusData.pay_status.name : '-';
                                    } else {
                                        status = '-';
                                    }
                                    tableRow[monthKey] = {
                                        value: valueToBilion(totalData),
                                        status: status
                                    };
                                } else {
                                    tableRow[monthKey] = {
                                        value: formatCurrency(Number(0).toFixed(2)),
                                        status: '-'
                                    };
                                }
                            }
                            listTable.push(tableRow); // Tambahkan ke listTable
                        }
                    }

                    // ListChart
                    for (let i = 0; i < period.length; i++) {
                        const data = period[i].progress;
                        if (data.length > 0) {
                            for (let j = 0; j < data.length; j++) {
                                listNameChart.push({ name: data[j].name });
                            }
                        } else {
                            continue;
                        }
                    }
                    const uniqueDataNameChart = Array.from(new Map(listNameChart.map((item) => [item.name, item])).values());
                    if (uniqueDataNameChart.length > 0) {
                        for (let i = 0; i < uniqueDataNameChart.length; i++) {
                            const dataArray = [];
                            for (let j = 0; j < months.length; j++) {
                                const dataPeriod = period.find((item) => item.month == months[j].id);

                                if (dataPeriod != null) {
                                    const progress = dataPeriod.progress;
                                    const totalProgress = progress.filter((item) => item.name === uniqueDataNameChart[i].name).reduce((sum, item) => sum + (Number(item.value) || 0), 0);
                                    dataArray.push(Number(valueToBilion(totalProgress)));
                                } else {
                                    dataArray.push(0);
                                }
                            }

                            listChart.push({
                                name: uniqueDataNameChart[i].name,
                                data: dataArray
                            });
                        }
                    }

                    result.chart.push({
                        name: cfoKategori.name + ' ' + year,
                        dataChart: listChart
                    });
                    result.tabel.push({
                        name: cfoKategori.name + ' ' + year,
                        dataTable: listTable,
                        color: '#1a5276'
                    });
                }
            }
            return result;
        } catch (error) {
            const result = {
                chart: [],
                tabel: []
            };
            return result;
        }
    };
    resultPaySchedule = async (form) => {
        const response = await this.paySchedule(form);

        // Label Chart
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const listLabels = [];
        for (let i = 0; i < labels.length; i++) {
            listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
        }

        // Chart
        const listChart = [];
        const chart = response.chart;
        if (chart.length > 0) {
            // CFF
            const cffChart = chart.find((item) => item.name.includes('Cash Flow Funding'));
            let data = [];
            if (cffChart != null) {
                data = cffChart.data;
            } else {
                const list = [];
                for (let i = 0; i < labels.length; i++) {
                    list.push(0);
                }
                data = list;
            }
            const label = 'Pembayaran Pinjaman Kepada Pihak Berelasi';
            const type = 'bar';
            const color = ['rgba(204, 4, 4, 0.6)'];
            const strokeColor = ['rgba(204, 4, 4, 1'];
            const dataLabelStat = true;
            const total = '';
            // const typeChart = 'line'

            listChart.push({
                name: 'CFF Payment Schedule (dlm IDR Miliar)',
                total: total,
                type: type,
                chartOptions: barChartOptionsApex(listLabels, color, strokeColor, dataLabelStat, total),
                series: [
                    {
                        name: label,
                        data: data
                    }
                ]
            });

            // CFI
            const cfiChart = chart.find((item) => item.name.includes('Cash Flow Investment'));
            const dataSeries = [];
            const dataChart = cfiChart.dataChart;
            for (let i = 0; i < dataChart.length; i++) {
                dataSeries.push({
                    label: dataChart[i].name,
                    data: dataChart[i].data
                });
            }
            const typeChart = 'bar';
            const series = dataSeries.map((dataItem) => ({
                name: dataItem.label,
                data: dataItem.data
            }));

            listChart.push({
                name: 'CFI Payment Schedule (dlm IDR Miliar)',
                type: typeChart,
                total: total,
                chartOptions: stackedChartOptionsApex(total, listLabels, null, null),
                series: series
            });

            // CFO
            const cfoChart = chart.find((item) => item.name.includes('Cash Flow Operation'));
            const dataSeriesCfo = [];
            const dataChartCfo = cfoChart.dataChart;
            for (let i = 0; i < dataChartCfo.length; i++) {
                dataSeriesCfo.push({
                    label: dataChartCfo[i].name,
                    data: dataChartCfo[i].data
                });
            }
            const typeChartCfo = 'bar';
            const seriesCfo = dataSeriesCfo.map((dataItem) => ({
                name: dataItem.label,
                data: dataItem.data
            }));

            listChart.push({
                name: 'CFO Payment Schedule - Non Paid (dlm IDR Miliar)',
                type: typeChartCfo,
                total: total,
                chartOptions: stackedChartOptionsApex(total, listLabels, null, null),
                series: seriesCfo
            });
        }
        return {
            table: response.tabel,
            chart: listChart
        };
    };
    cashFlowMovement = async (form) => {
        try {
            let result = {
                chart: [],
                tabel: []
            };
            const response = await cashFlowMovementController.getByPeriod(form);
            if (response != null) {
                const monthsThisYear = response.thisYear;
                if (monthsThisYear != null) {
                    const data = monthsThisYear.data;
                    const dataTable = [];
                    const chartCfoIn = [];
                    const chartCfoOut = [];
                    const chartCfi = [];
                    const chartCff = [];
                    for (let i = 0; i < months.length; i++) {
                        const month = data.find((item) => item.month == months[i].id);
                        if (month !== undefined && month !== null) {
                            const detail = month.detail;
                            if (detail.length > 0) {
                                const starting = detail.find((item) => item.name.toLowerCase().includes('starting cash balanced'));
                                const ending = formatCurrency(valueToBilion(month.ending_cash_balanced));
                                const cfoIn = detail.find((item) => item.name.toLowerCase().includes('net cash flow operating in'));
                                const cfoOut = detail.find((item) => item.name.toLowerCase().includes('net cash flow operating out'));
                                const cfi = detail.find((item) => item.name.toLowerCase().includes('net cash flow investment'));
                                const cff = detail.find((item) => item.name.toLowerCase().includes('net cash flow funding'));
                                chartCfoIn.push(cfoIn.nilai == 'positive' ? Number(valueToBilion(cfoIn.value)) : valueToBilion(cfoIn.value) * -1);
                                chartCfoOut.push(cfoOut.nilai == 'positive' ? Number(valueToBilion(cfoOut.value)) : valueToBilion(cfoOut.value) * -1);
                                chartCfi.push(cfi.nilai == 'positive' ? Number(valueToBilion(cfi.value)) : valueToBilion(cfi.value) * -1);
                                chartCff.push(cff.nilai == 'positive' ? Number(valueToBilion(cff.value)) : valueToBilion(cff.value) * -1);
                                dataTable.push({
                                    periode: months[i].name,
                                    starting: `${starting.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(starting.value))}`,
                                    cfoIn: `${cfoIn.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cfoIn.value))}`,
                                    cfoOut: `${cfoOut.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cfoOut.value))}`,
                                    cfi: `${cfi.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cfi.value))}`,
                                    cff: `${cff.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cff.value))}`,
                                    ending: ending
                                });
                            } else {
                                chartCfoIn.push(0);
                                chartCfoOut.push(0);
                                chartCfi.push(0);
                                chartCff.push(0);
                                dataTable.push({
                                    periode: months[i].name,
                                    starting: 0,
                                    cfoIn: 0,
                                    cfoOut: 0,
                                    cfi: 0,
                                    cff: 0,
                                    ending: 0
                                });
                            }
                        } else {
                            chartCfoIn.push(0);
                            chartCfoOut.push(0);
                            chartCfi.push(0);
                            chartCff.push(0);
                            dataTable.push({
                                periode: months[i].name,
                                starting: 0,
                                cfoIn: 0,
                                cfoOut: 0,
                                cfi: 0,
                                cff: 0,
                                ending: 0
                            });
                        }
                    }
                    result.tabel.push({
                        year: monthsThisYear.year,
                        data: dataTable,
                        color: '#f59e0b'
                    });
                    result.chart.push({
                        year: monthsThisYear.year,
                        cfoIn: chartCfoIn,
                        cfoOut: chartCfoOut,
                        cfi: chartCfi,
                        cff: chartCff
                    });
                }

                const monthsLastMonth = response.lastYear;
                if (monthsLastMonth != null) {
                    const data = monthsLastMonth.data;
                    const dataTable = [];
                    const chartCfoIn = [];
                    const chartCfoOut = [];
                    const chartCfi = [];
                    const chartCff = [];
                    for (let i = 0; i < months.length; i++) {
                        const month = data.find((item) => item.month == months[i].id);
                        if (month !== undefined && month !== null) {
                            const detail = month.detail;
                            if (detail.length > 0) {
                                const starting = detail.find((item) => item.name.toLowerCase().includes('starting cash balanced'));
                                const ending = formatCurrency(valueToBilion(month.ending_cash_balanced));
                                const cfoIn = detail.find((item) => item.name.toLowerCase().includes('net cash flow operating in'));
                                const cfoOut = detail.find((item) => item.name.toLowerCase().includes('net cash flow operating out'));
                                const cfi = detail.find((item) => item.name.toLowerCase().includes('net cash flow investment'));
                                const cff = detail.find((item) => item.name.toLowerCase().includes('net cash flow funding'));
                                chartCfoIn.push(cfoIn.nilai == 'positive' ? Number(valueToBilion(cfoIn.value)) : valueToBilion(cfoIn.value) * -1);
                                chartCfoOut.push(cfoOut.nilai == 'positive' ? Number(valueToBilion(cfoOut.value)) : valueToBilion(cfoOut.value) * -1);
                                chartCfi.push(cfi.nilai == 'positive' ? Number(valueToBilion(cfi.value)) : valueToBilion(cfi.value) * -1);
                                chartCff.push(cff.nilai == 'positive' ? Number(valueToBilion(cff.value)) : valueToBilion(cff.value) * -1);
                                dataTable.push({
                                    periode: months[i].name,
                                    starting: `${starting.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(starting.value))}`,
                                    cfoIn: `${cfoIn.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cfoIn.value))}`,
                                    cfoOut: `${cfoOut.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cfoOut.value))}`,
                                    cfi: `${cfi.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cfi.value))}`,
                                    cff: `${cff.nilai == 'positive' ? '' : '-'}${formatCurrency(valueToBilion(cff.value))}`,
                                    ending: ending
                                });
                            } else {
                                chartCfoIn.push(0);
                                chartCfoOut.push(0);
                                chartCfi.push(0);
                                chartCff.push(0);
                                dataTable.push({
                                    periode: months[i].name,
                                    starting: 0,
                                    cfoIn: 0,
                                    cfoOut: 0,
                                    cfi: 0,
                                    cff: 0,
                                    ending: 0
                                });
                            }
                        } else {
                            chartCfoIn.push(0);
                            chartCfoOut.push(0);
                            chartCfi.push(0);
                            chartCff.push(0);
                            dataTable.push({
                                periode: months[i].name,
                                starting: 0,
                                cfoIn: 0,
                                cfoOut: 0,
                                cfi: 0,
                                cff: 0,
                                ending: 0
                            });
                        }
                    }
                    result.tabel.push({
                        year: monthsLastMonth.year,
                        data: dataTable,
                        color: '#84cc16'
                    });
                    result.chart.push({
                        year: monthsLastMonth.year,
                        cfoIn: chartCfoIn,
                        cfoOut: chartCfoOut,
                        cfi: chartCfi,
                        cff: chartCff
                    });
                }
            }
            return result;
        } catch (error) {
            const result = {
                chart: [],
                tabel: []
            };
            return result;
        }
    };
    resultCashFlowMovement = async (form) => {
        const response = await this.cashFlowMovement(form);
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Chart
        const chart = response.chart;
        const listChart = [];
        if (chart.length > 0) {
            for (let i = 0; i < chart.length; i++) {
                const dataSeries = [
                    { label: 'CFO in', data: chart[i].cfoIn },
                    { label: 'CFO out', data: chart[i].cfoOut },
                    { label: 'CFI', data: chart[i].cfi },
                    { label: 'CFF', data: chart[i].cff }
                ];

                const typeChart = 'bar';
                const total = '*';

                const listLabels = [];
                for (let i = 0; i < labels.length; i++) {
                    listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
                }
                // Generating the series dynamically using a loop
                const series = dataSeries.map((dataItem) => ({
                    name: dataItem.label,
                    data: dataItem.data
                }));

                listChart.push({
                    name: 'Cash Flow Movement (YTD Jun-24; in IDR Bn)',
                    type: typeChart,
                    chartOptions: stackedChartOptionsApex(total, listLabels, null),
                    series: series
                });
            }
        }
        return {
            table: response.tabel,
            chart: listChart
        };
    };
    cashBalance = async (form) => {
        try {
            let result = {
                chart: {
                    dataNow: [],
                    dataLast: []
                },
                tabel: {
                    tahunNow: 0,
                    tahunLast: 0,
                    dataNow: [],
                    dataLast: []
                }
            };
            const response = await cashFlowMovementController.getByPeriod(form);
            if (response != null) {
                const dataNowChart = [];
                const dataNowTable = [];
                const dataLastChart = [];
                const dataLastTable = [];
                const monthsThisYear = response.thisYear;
                if (monthsThisYear != null) {
                    result.tabel.tahunNow = monthsThisYear.year;
                    const data = monthsThisYear.data;
                    for (let i = 0; i < months.length; i++) {
                        const month = data.find((item) => item.month == months[i].id);
                        if (month != null) {
                            dataNowChart.push(valueToBilion(month.ending_cash_balanced));
                            dataNowTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(valueToBilion(Number(month.ending_cash_balanced)))
                            });
                        } else {
                            dataNowChart.push(0);
                            dataNowTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(Number(0).toFixed(2))
                            });
                        }
                    }
                    result.chart.dataNow = dataNowChart;
                    result.tabel.dataNow = dataNowTable;
                }

                const monthsLastMonth = response.lastYear;
                if (monthsLastMonth != null) {
                    result.tabel.tahunLast = monthsLastMonth.year;
                    const data = monthsLastMonth.data;
                    for (let i = 0; i < months.length; i++) {
                        const month = data.find((item) => item.month == months[i].id);
                        if (month != null) {
                            dataLastChart.push(valueToBilion(month.ending_cash_balanced));
                            dataLastTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(valueToBilion(Number(month.ending_cash_balanced)))
                            });
                        } else {
                            dataLastChart.push(0);
                            dataLastTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(Number(0).toFixed(2))
                            });
                        }
                    }
                    result.chart.dataLast = dataLastChart;
                    result.tabel.dataLast = dataLastTable;
                }
            }
            return result;
        } catch (error) {
            const result = {
                chart: {
                    dataNow: [],
                    dataLast: [],
                    dataTarget: []
                },
                tabel: {
                    tahunNow: 0,
                    tahunLast: 0,
                    dataNow: [],
                    dataLast: []
                }
            };
            return result;
        }
    };
    resultCashBalanced = async (form) => {
        const response = await this.cashBalance(form);

        // Tabel
        const thisYear = [];
        const lastYear = [];
        const tableNow = response.tabel.dataNow;
        for (let i = 0; i < tableNow.length; i++) {
            thisYear.push({
                periode: tableNow[i].bulan,
                pendapatan: tableNow[i].value,
                rkap: tableNow[i].rkap
            });
        }
        const tableLast = response.tabel.dataLast;
        for (let i = 0; i < tableLast.length; i++) {
            lastYear.push({
                periode: tableLast[i].bulan,
                pendapatan: tableLast[i].value,
                rkap: tableLast[i].rkap
            });
        }

        // Chart
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const data1 = response.chart.dataNow;
        const data2 = response.chart.dataLast;
        const label1 = `Saldo Tunai ${response.tabel.tahunNow}`;
        const label2 = `Saldo Tunai ${response.tabel.tahunLast}`;
        const type = 'bar';
        const color = ['rgba(6, 130, 212, 0.6)', 'rgba(34, 197, 94, 0.6)']; // Second bar color is Green-500
        const strokeColor = ['rgba(6, 130, 212, 1)', 'rgba(34, 197, 94, 1)']; // Stroke for second bar
        const dataLabelStat = true;
        const total = '';
        const listLabels = [];
        for (let i = 0; i < labels.length; i++) {
            listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
        }
        return {
            table: [
                { tahun: response.tabel.tahunNow, data: thisYear, color: '#1a5276' },
                { tahun: response.tabel.tahunLast, data: lastYear, color: '#22C55E' }
            ],
            chart: {
                name: `Cash Balance (in IDR Bn) ${response.tabel.tahunNow}`,
                type: type,
                chartOptions: barChartOptionsApex(listLabels, color, strokeColor, dataLabelStat, total),
                series: [
                    {
                        name: label1,
                        type: type,
                        data: data1
                    },
                    {
                        name: label2,
                        type: type,
                        data: data2
                    }
                ]
            }
        };
    };
    netProfit = async (form) => {
        try {
            let result = {
                chart: [],
                table: [],
                latest: {
                    labaBersih: 0,
                    targetLabaBersihRkap: 0,
                    npmRkapPercent: 0
                }
            };
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                const listChart = [];
                const listTable = [];
                const monthsThisYear = response.thisYear;
                if (monthsThisYear != null) {
                    const month = monthsThisYear.months;
                    const list = [];
                    const dataLaba = [];
                    const dataGpm = [];
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataLaba.push(Number(valueToBilion(data.labaBersih)));
                            dataGpm.push(Number(Number(data.npmPercent).toFixed(2)));
                            list.push({
                                periode: months[i].name,
                                labaBersih: formatCurrency(valueToBilion(data.labaBersih)),
                                target: formatCurrency(valueToBilion(data.targetLabaBersihRkap)),
                                npmPercent: formatCurrency(Number(data.npmPercent).toFixed(2))
                            });
                        } else {
                            dataLaba.push(0);
                            dataGpm.push(0);
                            list.push({
                                periode: months[i].name,
                                labaBersih: 0,
                                target: 0,
                                npmPercent: 0
                            });
                        }
                    }
                    listChart.push({ laba: dataLaba, gpm: dataGpm, year: monthsThisYear.year });
                    listTable.push({ year: monthsThisYear.year, data: list, color: '#047857' });
                }

                const monthsLastMonth = response.lastYear;
                if (monthsLastMonth != null) {
                    const month = monthsLastMonth.months;
                    const list = [];
                    const dataLaba = [];
                    const dataGpm = [];
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataLaba.push(Number(valueToBilion(data.labaBersih)));
                            dataGpm.push(Number(Number(data.npmPercent).toFixed(2)));
                            list.push({
                                periode: months[i].name,
                                labaBersih: formatCurrency(valueToBilion(data.labaBersih)),
                                target: formatCurrency(valueToBilion(data.targetLabaBersihRkap)),
                                npmPercent: formatCurrency(Number(data.npmPercent).toFixed(2))
                            });
                        } else {
                            dataLaba.push(0);
                            dataGpm.push(0);
                            list.push({
                                periode: months[i].name,
                                labaBersih: 0,
                                target: 0,
                                npmPercent: 0
                            });
                        }
                    }
                    listChart.push({ laba: dataLaba, gpm: dataGpm, year: monthsLastMonth.year });
                    listTable.push({ year: monthsLastMonth.year, data: list, color: '#84cc16' });
                }

                const latestMonth = response.latestMonth;
                if (latestMonth != null) {
                    result.latest.labaBersih = latestMonth.labaBersih;
                    result.latest.targetLabaBersihRkap = latestMonth.targetLabaBersihRkap;
                    result.latest.npmRkapPercent = latestMonth.npmRkapPercent;
                }

                result.chart = listChart;
                result.table = listTable;
            }
            return result;
        } catch (error) {
            let result = {
                chart: [],
                table: [],
                latest: {
                    labaBersih: 0,
                    targetLabaBersihRkap: 0,
                    npmRkapPercent: 0
                }
            };
            return result;
        }
    };
    resultNetProfit = async (form) => {
        const response = await this.netProfit(form);

        // Chart
        const chart = response.chart;
        const color = [
            { colorChart: ['rgba(6, 95, 70, 0.6)', 'rgba(34, 211, 238, 1)'], colorLabel: ['#15803d', '#0891b2'] },
            { colorChart: ['rgba(245, 158, 11, 0.6)', 'rgba(101, 163, 13, 1)'], colorLabel: ['#754c07', '#2b4506'] }
        ];
        const listChart = [];
        if (chart.length > 0) {
            for (let i = 0; i < chart.length; i++) {
                const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const data1 = chart[i].gpm;
                const data2 = chart[i].laba;
                const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
                const total = sum + `Bn IDR of Net Profit (YTD) ${chart[i].year}`;
                const label1 = 'NPM%';
                const label2 = 'Laba Bersih';
                const type1 = 'line';
                const type2 = 'column';
                const colors = color[i].colorChart;
                const colorsLabel = color[i].colorLabel;
                const scale1 = 'percent';
                const scale2 = 'number';
                const typeChart = 'line';

                const listLabels = [];
                for (let i = 0; i < labels.length; i++) {
                    listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
                }

                listChart.push({
                    name: 'NET Profit Margin & Amount (in % & IDR Bn)',
                    total: total,
                    type: typeChart,
                    chartOptions: comboChartOptionsApex(total, label1, label2, listLabels, colors, colorsLabel, scale1, scale2),
                    series: [
                        {
                            name: label2,
                            type: type2,
                            data: data2
                        },
                        {
                            name: label1,
                            type: type1,
                            data: data1
                        }
                    ]
                });
            }
        }

        const latest = response.latest;
        // const gpmRkapPercent = 90;
        const ebitdaRkapPercent = latest.npmRkapPercent;
        const series = [Number(ebitdaRkapPercent) > 0 ? Number(Number(ebitdaRkapPercent).toFixed(2)) : Number(Number(ebitdaRkapPercent).toFixed(2) * -1)];
        const chartData = halfRadialChartApex2(['Target RKAP'], Number(ebitdaRkapPercent));
        return {
            table: response.table,
            chart: listChart,
            latest: {
                chart: chartData,
                series: series,
                labaBersih: valueToBilion(latest.labaBersih),
                targetLabaBersihRkap: valueToBilion(latest.targetLabaBersihRkap)
            }
        };
    };
    ebitda = async (form) => {
        try {
            let result = {
                chart: [],
                table: [],
                latest: {
                    ebitda: 0,
                    targetEbitdaRkap: 0,
                    ebitdaRkapPercent: 0
                }
            };
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                const listChart = [];
                const listTable = [];
                const monthsThisYear = response.thisYear;
                if (monthsThisYear != null) {
                    const month = monthsThisYear.months;
                    const list = [];
                    const dataLaba = [];
                    const dataGpm = [];
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataLaba.push(Number(valueToBilion(data.ebitda)));
                            dataGpm.push(Number(Number(data.ebitdaPercent).toFixed(2)));
                            list.push({
                                periode: months[i].name,
                                ebitda: formatCurrency(valueToBilion(data.targetEbitdaRkap)),
                                target: formatCurrency(valueToBilion(data.ebitda)),
                                ebitdaPersen: formatCurrency(Number(data.ebitdaPercent).toFixed(2))
                            });
                        } else {
                            dataLaba.push(0);
                            dataGpm.push(0);
                            list.push({
                                periode: months[i].name,
                                ebitda: 0,
                                target: 0,
                                ebitdaPersen: 0
                            });
                        }
                    }
                    listChart.push({ laba: dataLaba, gpm: dataGpm, year: monthsThisYear.year });
                    listTable.push({ year: monthsThisYear.year, data: list, color: '#6366f1' });
                }

                const monthsLastMonth = response.lastYear;
                if (monthsLastMonth != null) {
                    const month = monthsLastMonth.months;
                    const list = [];
                    const dataLaba = [];
                    const dataGpm = [];
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataLaba.push(Number(valueToBilion(data.ebitda)));
                            dataGpm.push(Number(Number(data.ebitdaPercent).toFixed(2)));
                            list.push({
                                periode: months[i].name,
                                ebitda: formatCurrency(valueToBilion(data.ebitda)),
                                target: formatCurrency(valueToBilion(data.targetEbitdaRkap)),
                                ebitdaPersen: formatCurrency(Number(data.ebitdaPercent).toFixed(2))
                            });
                        } else {
                            dataLaba.push(0);
                            dataGpm.push(0);
                            list.push({
                                periode: months[i].name,
                                ebitda: 0,
                                target: 0,
                                ebitdaPersen: 0
                            });
                        }
                    }
                    listChart.push({ laba: dataLaba, gpm: dataGpm, year: monthsLastMonth.year });
                    listTable.push({ year: monthsLastMonth.year, data: list, color: '#10b981' });
                }

                const latestMonth = response.latestMonth;
                if (latestMonth != null) {
                    result.latest.ebitda = latestMonth.ebitda;
                    result.latest.targetEbitdaRkap = latestMonth.targetEbitdaRkap;
                    result.latest.ebitdaRkapPercent = latestMonth.ebitdaRkapPercent;
                }

                result.chart = listChart;
                result.table = listTable;
            }
            return result;
        } catch (error) {
            let result = {
                chart: [],
                table: [],
                latest: {
                    ebitda: 0,
                    targetEbitdaRkap: 0,
                    ebitdaRkapPercent: 0
                }
            };
            return result;
        }
    };
    resultEbitda = async (form) => {
        const response = await this.ebitda(form);

        // Chart
        const chart = response.chart;
        const color = [
            { colorChart: ['rgba(251, 191, 36, 0.6)', 'rgba(99, 102, 241, 1)'], colorLabel: ['#c9971c', '#4f52c9'] },
            { colorChart: ['rgba(16, 185, 129, 0.6)', 'rgba(139, 92, 246, 1)'], colorLabel: ['#a21caf', '#6d28d9'] }
        ];
        const listChart = [];
        if (chart.length > 0) {
            for (let i = 0; i < chart.length; i++) {
                const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const data1 = chart[i].gpm;
                const data2 = chart[i].laba;
                const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
                const total = sum + `B IDR of Gross Profit (YTD) ${chart[i].year}`;
                const label1 = 'EBITDA%';
                const label2 = 'EBITDA';
                const type1 = 'line';
                const type2 = 'column';
                const colors = color[i].colorChart;
                const colorsLabel = color[i].colorLabel;
                const scale1 = 'percent';
                const scale2 = 'number';
                const typeChart = 'line';

                const listLabels = [];
                for (let i = 0; i < labels.length; i++) {
                    listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
                }

                listChart.push({
                    name: 'Gross Profit Margin & Amount (in % & IDR Bn)',
                    total: total,
                    type: typeChart,
                    chartOptions: comboChartOptionsApex(total, label1, label2, listLabels, colors, colorsLabel, scale1, scale2),
                    series: [
                        {
                            name: label2,
                            type: type2,
                            data: data2
                        },
                        {
                            name: label1,
                            type: type1,
                            data: data1
                        }
                    ]
                });
            }
        }
        const latest = response.latest;
        console.log(latest);
        // const gpmRkapPercent = 90;
        const ebitdaRkapPercent = latest.ebitdaRkapPercent;
        const series = [Number(ebitdaRkapPercent) > 0 ? Number(Number(ebitdaRkapPercent).toFixed(2)) : Number(Number(ebitdaRkapPercent).toFixed(2) * -1)];
        const chartData = halfRadialChartApex2(['Target RKAP'], Number(ebitdaRkapPercent));

        return {
            table: response.table,
            chart: listChart,
            latest: {
                chart: chartData,
                series: series,
                targetEbitdaRkap: valueToBilion(latest.targetEbitdaRkap),
                ebitda: valueToBilion(latest.ebitda)
            }
        };
    };
    grossProfit = async (form) => {
        try {
            let result = {
                chart: [],
                table: [],
                latest: {
                    totalLabaKotor: 0,
                    labaKotor: 0,
                    gpmPercent: 0,
                    targetLabaKotorRkap: 0,
                    gpmRkapPercent: 0
                }
            };
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                const listChart = [];
                const listTable = [];
                const monthsThisYear = response.thisYear;
                if (monthsThisYear != null) {
                    const month = monthsThisYear.months;
                    const list = [];
                    const dataLaba = [];
                    const dataGpm = [];
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataLaba.push(Number(valueToBilion(data.labaKotor)));
                            dataGpm.push(Number(Number(data.gpmPercent).toFixed(2)));
                            list.push({
                                periode: months[i].name,
                                labakotor: formatCurrency(valueToBilion(data.labaKotor)),
                                target: formatCurrency(valueToBilion(data.targetLabaKotorRkap)),
                                gpm: formatCurrency(Number(data.gpmPercent).toFixed(2))
                            });
                        } else {
                            dataLaba.push(0);
                            dataGpm.push(0);
                            list.push({
                                periode: months[i].name,
                                labakotor: 0,
                                target: 0,
                                gpm: 0
                            });
                        }
                    }
                    listChart.push({ laba: dataLaba, gpm: dataGpm, year: monthsThisYear.year });
                    listTable.push({ year: monthsThisYear.year, data: list, color: '#d946ef' });
                }

                const monthsLastMonth = response.lastYear;
                if (monthsLastMonth != null) {
                    const month = monthsLastMonth.months;
                    const list = [];
                    const dataLaba = [];
                    const dataGpm = [];
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataLaba.push(Number(valueToBilion(data.labaKotor)));
                            dataGpm.push(Number(Number(data.gpmPercent).toFixed(2)));
                            list.push({
                                periode: months[i].name,
                                labakotor: formatCurrency(valueToBilion(data.labaKotor)),
                                target: formatCurrency(valueToBilion(data.targetLabaKotorRkap)),
                                gpm: formatCurrency(Number(data.gpmPercent).toFixed(2))
                            });
                        } else {
                            dataLaba.push(0);
                            dataGpm.push(0);
                            list.push({
                                periode: months[i].name,
                                labakotor: 0,
                                target: 0,
                                gpm: 0
                            });
                        }
                    }
                    listChart.push({ laba: dataLaba, gpm: dataGpm, year: monthsLastMonth.year });
                    listTable.push({ year: monthsLastMonth.year, data: list, color: '#2e86c1' });
                }

                const latestMonth = response.latestMonth;
                if (latestMonth != null) {
                    result.latest.gpmRkapPercent = latestMonth.gpmRkapPercent;
                    result.latest.labaKotor = latestMonth.labaKotor;
                    result.latest.gpmPercent = latestMonth.gpmPercent;
                    result.latest.targetLabaKotorRkap = latestMonth.targetLabaKotorRkap;
                }

                result.chart = listChart;
                result.table = listTable;
            }
            return result;
        } catch (error) {
            let result = {
                chart: [],
                table: [],
                latest: {
                    totalLabaKotor: 0,
                    labaKotor: 0,
                    gpmPercent: 0,
                    targetLabaKotorRkap: 0,
                    gpmRkapPercent: 0
                }
            };
            return result;
        }
    };
    resultGrossProfit = async (form) => {
        const response = await this.grossProfit(form);

        // Chart
        const chart = response.chart;
        const color = [
            { colorChart: ['rgba(217, 70, 239, 0.6)', 'rgba(0, 188, 212, 1)'], colorLabel: ['#a21caf', '#1a5276'] },
            { colorChart: ['rgba(105, 115, 132, 0.6)', 'rgba(251, 191, 36, 1)'], colorLabel: ['#2d3748', '#b45309'] }
        ];
        const listChart = [];
        if (chart.length > 0) {
            for (let i = 0; i < chart.length; i++) {
                const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const data1 = chart[i].gpm;
                const data2 = chart[i].laba;
                const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
                const total = sum + `B IDR of Gross Profit (YTD) ${chart[i].year}`;
                const label1 = 'GPM%';
                const label2 = 'Laba Kotor';
                const type1 = 'line';
                const type2 = 'column';
                const colors = color[i].colorChart;
                const colorsLabel = color[i].colorLabel;
                const scale1 = 'percent';
                const scale2 = 'number';
                const typeChart = 'line';

                const listLabels = [];
                for (let i = 0; i < labels.length; i++) {
                    listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
                }

                listChart.push({
                    name: 'Gross Profit Margin & Amount (in % & IDR Bn)',
                    total: total,
                    type: typeChart,
                    chartOptions: comboChartOptionsApex(total, label1, label2, listLabels, colors, colorsLabel, scale1, scale2),
                    series: [
                        {
                            name: label2,
                            type: type2,
                            data: data2
                        },
                        {
                            name: label1,
                            type: type1,
                            data: data1
                        }
                    ]
                });
            }
        }

        const latest = response.latest;
        // const gpmRkapPercent = 90;
        const gpmRkapPercent = latest.gpmRkapPercent;
        const series = [Number(gpmRkapPercent) > 0 ? Number(Number(gpmRkapPercent).toFixed(2)) : Number(Number(gpmRkapPercent).toFixed(2) * -1)];
        const chartData = halfRadialChartApex2(['Target RKAP'], Number(gpmRkapPercent));
        return {
            table: response.table,
            chart: listChart,
            latest: {
                chart: chartData,
                series: series,
                targetLabaKotorRkap: valueToBilion(latest.targetLabaKotorRkap),
                labaKotor: valueToBilion(latest.labaKotor),
                totalLabaKotor: valueToBilion(latest.totalLabaKotor)
            }
        };
    };
    revenue = async (form) => {
        try {
            let result = {
                chart: {
                    dataNow: [],
                    dataLast: [],
                    dataTarget: []
                },
                tabel: {
                    tahunNow: 0,
                    tahunLast: 0,
                    dataNow: [],
                    dataLast: []
                }
            };
            const response = await profitabilityController.getByPeriod(form);
            if (response != null) {
                const dataNowChart = [];
                const dataTargetChart = [];
                const dataNowTable = [];
                const dataLastChart = [];
                const dataLastTable = [];
                const monthsThisYear = response.thisYear;
                if (monthsThisYear != null) {
                    const month = monthsThisYear.months;
                    result.tabel.tahunNow = monthsThisYear.year;
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataNowChart.push(valueToBilion(data.pendapatan));
                            dataTargetChart.push(valueToBilion(Number(data.targetPendapatanRkap)));
                            dataNowTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(valueToBilion(Number(data.pendapatan))),
                                rkap: formatCurrency(valueToBilion(Number(data.targetPendapatanRkap)))
                            });
                        } else {
                            dataNowChart.push(0);
                            dataTargetChart.push(0);
                            dataNowTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(Number(0).toFixed(2)),
                                rkap: formatCurrency(Number(0).toFixed(2))
                            });
                        }
                    }
                    result.chart.dataNow = dataNowChart;
                    result.chart.dataTarget = dataTargetChart;
                    result.tabel.dataNow = dataNowTable;
                }
                const monthsLasttMonth = response.lastYear;
                if (monthsLasttMonth != null) {
                    result.tabel.tahunLast = monthsLasttMonth.year;
                    const month = monthsLasttMonth.months;
                    for (let i = 0; i < months.length; i++) {
                        const data = month.find((item) => item.month == months[i].id);
                        if (data != null) {
                            dataLastChart.push(valueToBilion(data.pendapatan));
                            dataLastTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(valueToBilion(Number(data.pendapatan))),
                                rkap: formatCurrency(valueToBilion(Number(data.targetPendapatanRkap)))
                            });
                        } else {
                            dataLastChart.push(0);
                            dataLastTable.push({
                                bulan: months[i].name,
                                value: formatCurrency(Number(0).toFixed(2)),
                                rkap: formatCurrency(Number(0).toFixed(2))
                            });
                        }
                    }
                    result.chart.dataLast = dataLastChart;
                    result.tabel.dataLast = dataLastTable;
                }
            }
            return result;
        } catch (error) {
            let result = {
                chart: {
                    dataNow: [],
                    dataLast: [],
                    dataTarget: []
                },
                tabel: {
                    tahunNow: 0,
                    tahunLast: 0,
                    dataNow: [],
                    dataLast: []
                }
            };
            return result;
        }
    };
    resultRevenue = async (form) => {
        const response = await this.revenue(form);

        // Tabel
        const thisYear = [];
        const lastYear = [];
        const tableNow = response.tabel.dataNow;
        for (let i = 0; i < tableNow.length; i++) {
            thisYear.push({
                periode: tableNow[i].bulan,
                pendapatan: tableNow[i].value,
                rkap: tableNow[i].rkap
            });
        }
        const tableLast = response.tabel.dataLast;
        for (let i = 0; i < tableLast.length; i++) {
            lastYear.push({
                periode: tableLast[i].bulan,
                pendapatan: tableLast[i].value,
                rkap: tableLast[i].rkap
            });
        }

        // Chart
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const label1 = `Target RKAP ${response.tabel.tahunNow}`;
        const label2 = `Pendapatan ${response.tabel.tahunNow}`;
        const label3 = `Pendapatan ${response.tabel.tahunLast}`;
        // Data*
        const data1 = response.chart.dataTarget;
        const data2 = response.chart.dataNow;
        const data3 = response.chart.dataLast;
        // Colors*
        const colors = ['rgba(217, 119, 6, 1)', 'rgba(26, 82, 118, 0.6)', 'rgba(76, 165, 138, 0.6)']; // Add new color for last year's data
        const colorsLabel = ['#b15d05', '#1a3e58', '#3b8e77'];
        const listLabels = [];
        for (let i = 0; i < labels.length; i++) {
            listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
        }
        return {
            tanggal: moment(form.tanggalAkhir).format('MMM YYYY'),
            table: [
                { tahun: response.tabel.tahunNow, data: thisYear },
                { tahun: response.tabel.tahunLast, data: lastYear }
            ],
            chart: {
                name: 'Revenue (in IDR Bn)',
                type: 'line',
                chartOptions: combo3ChartOptionsApex('', label1, label2, label3, listLabels, colors, colorsLabel, 'number', 'number', 'number'),
                series: [
                    {
                        name: label1,
                        type: 'line',
                        data: data1
                    },
                    {
                        name: label2,
                        type: 'bar',
                        data: data2
                    },

                    {
                        name: label3,
                        type: 'bar',
                        data: data3
                    }
                ]
            }
        };
    };
})();
