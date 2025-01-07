import { barChartOptionsApex, combo3ChartOptionsApex, comboChartOptionsApex, stackedChartOptionsApex } from '@/controller/chartStyle/chartDummy';
import moment from 'moment';

export const currentYear = 2024;

export const revenueYtd = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [353.32, 802, 852.69, 1207.45, 1718.87, 1643.25, 0, 0, 0, 0, 0, 0];
    const data2 = [378.46, 187.77, 190.14, 240.53, 194.27, 242.86, 0, 0, 0, 0, 0, 0];
    const data3 = [150.0, 180.0, 200.0, 220.0, 210.0, 230.0, 240.0, 250.0, 260.0, 270.0, 280.0, 290.0];
    const label1 = `Target RKAP ${currentYear}`;
    const label2 = `Pendapatan ${currentYear}`;
    const label3 = `Pendapatan ${currentYear - 1}`; // Add dynamic label for last year's revenue
    const type1 = 'line';
    const type2 = 'bar';
    const type3 = 'bar'; // Assuming you want this as a bar chart like the others
    const colors = ['rgba(255, 99, 132, 1)', 'rgba(255, 255, 0, 0.6)', 'rgba(16, 185, 129, 0.6)']; // Add new color for last year's data
    const total = '';
    const scale1 = 'number';
    const scale2 = 'number';
    const scale3 = 'number';
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'Revenue (in IDR Bn)',
        type: typeChart,
        chartOptions: combo3ChartOptionsApex(total, label1, label2, label3, listLabels, colors, scale1, scale2, scale3),
        series: [
            {
                name: label1,
                type: type1,
                data: data1
            },
            {
                name: label2,
                type: type2,
                data: data2
            },

            {
                name: label3,
                type: type3,
                data: data3
            }
        ]
    };
};

export const revenueData = () => {
    const revenueThisYear = [
        { periode: 'January', pendapatan: 194.27, rkap: 378.46 },
        { periode: 'February', pendapatan: 187.77, rkap: 187.77 },
        { periode: 'March', pendapatan: 190.14, rkap: 190.14 },
        { periode: 'April', pendapatan: 240.53, rkap: 240.53 },
        { periode: 'May', pendapatan: 194.27, rkap: 194.27 },
        { periode: 'June', pendapatan: 242.86, rkap: 242.86 },
        { periode: 'July', pendapatan: 0, rkap: 0 },
        { periode: 'August', pendapatan: 0, rkap: 0 },
        { periode: 'September', pendapatan: 0, rkap: 0 },
        { periode: 'October', pendapatan: 0, rkap: 0 },
        { periode: 'November', pendapatan: 0, rkap: 0 },
        { periode: 'December', pendapatan: 0, rkap: 0 }
    ];

    const revenueLastYear = [
        { periode: 'January', pendapatan: 150.0, rkap: 300.0 },
        { periode: 'February', pendapatan: 180.0, rkap: 250.0 },
        { periode: 'March', pendapatan: 200.0, rkap: 275.0 },
        { periode: 'April', pendapatan: 220.0, rkap: 295.0 },
        { periode: 'May', pendapatan: 210.0, rkap: 280.0 },
        { periode: 'June', pendapatan: 230.0, rkap: 310.0 },
        { periode: 'July', pendapatan: 240.0, rkap: 320.0 },
        { periode: 'August', pendapatan: 250.0, rkap: 330.0 },
        { periode: 'September', pendapatan: 260.0, rkap: 340.0 },
        { periode: 'October', pendapatan: 270.0, rkap: 350.0 },
        { periode: 'November', pendapatan: 280.0, rkap: 360.0 },
        { periode: 'December', pendapatan: 290.0, rkap: 370.0 }
    ];

    return { revenueThisYear, revenueLastYear };
};

export const ebitdaMarginData = () => {
    const grossProfit = [
        { periode: 'January', ebitda: -2.64, ebitdaPersen: -0.65 },
        { periode: 'February', ebitda: 0.4, ebitdaPersen: 0.22 },
        { periode: 'March', ebitda: -2.14, ebitdaPersen: -1.13 },
        { periode: 'April', ebitda: 16.1, ebitdaPersen: 6.69 },
        { periode: 'May', ebitda: -1.67, ebitdaPersen: -0.86 },
        { periode: 'June', ebitda: 6.59, ebitdaPersen: 2.71 },
        { periode: 'July', ebitda: 0, ebitdaPersen: 0 },
        { periode: 'August', ebitda: 0, ebitdaPersen: 0 },
        { periode: 'September', ebitda: 0, ebitdaPersen: 0 },
        { periode: 'October', ebitda: 0, ebitdaPersen: 0 },
        { periode: 'November', ebitda: 0, ebitdaPersen: 0 },
        { periode: 'December', ebitda: 0, ebitdaPersen: 0 }
    ];

    return grossProfit;
};

export const ebitdaMargin = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [-0.65, 0.22, -1.13, 6.69, -0.86, 2.71, 0, 0, 0, 0, 0, 0];
    const data2 = [-2.46, 0.4, -2.14, 16.1, -1.67, 6.59, 0, 0, 0, 0, 0, 0];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + 'B IDR of Gross Profit (YTD)';
    const label1 = 'EBITDA%';
    const label2 = 'EBITDA';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(157, 5, 245, 0.6)', 'rgba(0, 34, 255, 1)'];
    const scale1 = 'percent';
    const scale2 = 'number';
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'Ebitda Margin & Amount (in % & IDR Bn)',
        total: sum + ' IDR of Ebitda (YTD)',
        type: typeChart,
        chartOptions: comboChartOptionsApex(total, label1, label2, listLabels, colors, scale1, scale2),
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
    };
};

export const netProfitMarginData = () => {
    const netProfit = [
        { periode: 'January', lababersih: 4.97, npm: 0.01 },
        { periode: 'February', lababersih: -10.98, npm: -0.06 },
        { periode: 'March', lababersih: -12.93, npm: -0.07 },
        { periode: 'April', lababersih: 5.07, npm: 0.02 },
        { periode: 'May', lababersih: -9.16, npm: -0.05 },
        { periode: 'June', lababersih: -0.31, npm: -0.0 },
        { periode: 'July', lababersih: 0, npm: 0 },
        { periode: 'August', lababersih: 0, npm: 0 },
        { periode: 'September', lababersih: 0, npm: 0 },
        { periode: 'October', lababersih: 0, npm: 0 },
        { periode: 'November', lababersih: 0, npm: 0 },
        { periode: 'December', lababersih: 0, npm: 0 }
    ];

    return netProfit;
};

export const netProfitMargin = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [0.01, -0.06, -0.07, 0.02, -0.05, -0.002, 0, 0, 0, 0, 0, 0];
    const data2 = [4.97, -10.98, -12.93, 5.07, -9.16, -0.31, 0, 0, 0, 0, 0, 0];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + ' Bn IDR of Net Profit (YTD)';
    const label1 = 'NPM%';
    const label2 = 'Laba Bersih';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(157, 5, 245, 0.6)', 'rgba(0, 34, 255, 1)'];
    const scale1 = 'percent';
    const scale2 = 'number';
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'NET Profit Margin & Amount (in % & IDR Bn)',
        total: sum + ' Bn IDR of Net Profit (YTD)',
        type: typeChart,
        chartOptions: comboChartOptionsApex(total, label1, label2, listLabels, colors, scale1, scale2),
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
    };
};

export const grossProfit = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [3, 4.43, 6.19, 10.66, 5.43, 4.85, 0, 0, 0, 0, 0, 0];
    const data2 = [11.4, 8.3, 11.8, 25.6, 10.6, 11.8, 0, 0, 0, 0, 0, 0];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + 'B IDR of Gross Profit (YTD)';
    const label1 = 'GPM%';
    const label2 = 'Laba Kotor';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(157, 5, 245, 0.6)', 'rgba(0, 34, 255, 1)'];
    const scale1 = 'percent';
    const scale2 = 'number';
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'Gross Profit Margin & Amount (in % & IDR Bn)',
        total: sum + 'B IDR of Gross Profit (YTD)',
        type: typeChart,
        chartOptions: comboChartOptionsApex(total, label1, label2, listLabels, colors, scale1, scale2),
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
    };
};

export const grossProfitData = () => {
    const grossProfit = [
        { periode: 'January', labakotor: 11.4, gpm: 3.0 },
        { periode: 'February', labakotor: 8.3, gpm: 4.43 },
        { periode: 'March', labakotor: 11.8, gpm: 6.19 },
        { periode: 'April', labakotor: 25.6, gpm: 10.66 },
        { periode: 'May', labakotor: 10.6, gpm: 5.43 },
        { periode: 'June', labakotor: 11.8, gpm: 485 },
        { periode: 'July', labakotor: 0, gpm: 0 },
        { periode: 'August', labakotor: 0, gpm: 0 },
        { periode: 'September', labakotor: 0, gpm: 0 },
        { periode: 'October', labakotor: 0, gpm: 0 },
        { periode: 'November', labakotor: 0, gpm: 0 },
        { periode: 'December', labakotor: 0, gpm: 0 }
    ];

    return grossProfit;
};

export const cashBalance = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [343, 365, 553, 581, 486, 535, 0, 0, 0, 0, 0, 0];
    const data2 = [443, 165, 653, 481, 486, 515, 322, 422, 789, 901, 655, 675];
    const label1 = `Laba Bersih ${currentYear}`;
    const label2 = `Laba Bersih ${currentYear - 1}`;
    const type = 'bar';
    const color = ['rgba(6, 130, 212, 0.6)', 'rgba(34, 197, 94, 0.6)']; // Second bar color is Green-500
    const strokeColor = ['rgba(6, 130, 212, 1)', 'rgba(34, 197, 94, 1)']; // Stroke for second bar
    const dataLabelStat = true;
    const total = 'by Month';
    // const typeChart = 'bar'

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: `Cash Balance (in IDR Bn) ${currentYear}`,
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
    };
};

export const cashBalanceData = () => {
    const cashBalanceThisYear = [
        { periode: 'January', labaBersih: 343 },
        { periode: 'February', labaBersih: 365 },
        { periode: 'March', labaBersih: 553 },
        { periode: 'April', labaBersih: 581 },
        { periode: 'May', labaBersih: 486 },
        { periode: 'June', labaBersih: 535 },
        { periode: 'July', labaBersih: 0 },
        { periode: 'August', labaBersih: 0 },
        { periode: 'September', labaBersih: 0 },
        { periode: 'October', labaBersih: 0 },
        { periode: 'November', labaBersih: 0 },
        { periode: 'December', labaBersih: 0 }
    ];

    const cashBalanceLastYear = [
        { periode: 'January', labaBersih: 443 },
        { periode: 'February', labaBersih: 165 },
        { periode: 'March', labaBersih: 653 },
        { periode: 'April', labaBersih: 481 },
        { periode: 'May', labaBersih: 486 },
        { periode: 'June', labaBersih: 515 },
        { periode: 'July', labaBersih: 322 },
        { periode: 'August', labaBersih: 422 },
        { periode: 'September', labaBersih: 789 },
        { periode: 'October', labaBersih: 901 },
        { periode: 'November', labaBersih: 655 },
        { periode: 'December', labaBersih: 675 }
    ];

    return { cashBalanceThisYear, cashBalanceLastYear };
};

export const cffPayment = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = [14.2, 14.2, 14.2, 14.2, 14.2, 14.2, 0, 0, 0, 0, 0, 0];
    const label = 'Pembayaran Pinjaman Kepada Pihak Berelasi';
    const type = 'bar';
    const color = ['rgba(204, 4, 4, 0.6)'];
    const strokeColor = ['rgba(204, 4, 4, 1'];
    const dataLabelStat = true;
    const total = 'by Month';
    // const typeChart = 'line'

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'CFF Payment Schedule (in IDR Bn)',
        total: 'by Month',
        type: type,
        chartOptions: barChartOptionsApex(listLabels, color, strokeColor, dataLabelStat, total),
        series: [
            {
                name: label,
                data: data
            }
        ]
    };
};

export const cffPaymentData = () => {
    const cffPayment = [
        { periode: 'January', pembayaran: 14.2 },
        { periode: 'February', pembayaran: 14.2 },
        { periode: 'March', pembayaran: 14.2 },
        { periode: 'April', pembayaran: 14.2 },
        { periode: 'May', pembayaran: 14.2 },
        { periode: 'June', pembayaran: 14.2 },
        { periode: 'July', pembayaran: 0 },
        { periode: 'August', pembayaran: 0 },
        { periode: 'September', pembayaran: 0 },
        { periode: 'October', pembayaran: 0 },
        { periode: 'November', pembayaran: 0 },
        { periode: 'December', pembayaran: 0 }
    ];

    return cffPayment;
};

export const cfiPayment = async () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dataSeries = [
        { label: 'Kontraktor EPC PMG II by ETI', data: [0, 0, 0, 0, 0, 0, 0, 47.97, 0, 0, 0, 0] },
        { label: 'Pekerjaan Bangunan Perusahaan', data: [0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0] },
        { label: 'Licensor Biodiesel by Desment Technology', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81.9] }
    ];

    const typeChart = 'bar';
    const total = 'by Month';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    const series = dataSeries.map((dataItem) => ({
        name: dataItem.label,
        data: dataItem.data
    }));

    return {
        name: 'CFI Payment Schedule (in IDR Bn)',
        type: typeChart,
        chartOptions: stackedChartOptionsApex(total, listLabels, null, null),
        series: series
    };
};

export const cfiPaymentData = () => {
    const cfiPayment = [
        { periode: 'January', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'February', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'March', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'April', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'May', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'June', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'July', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'August', kontraktor: 47.97, pekerjaan: 5, licensor: 0 },
        { periode: 'September', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'October', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'November', kontraktor: 0, pekerjaan: 0, licensor: 0 },
        { periode: 'December', kontraktor: 0, pekerjaan: 0, licensor: 81.9 }
    ];

    return cfiPayment;
};

export const cashFlow = async () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dataSeries = [
        { label: 'CFO in', data: [178.02, 235.31, 457.8, 256.91, 150.12, 224.94, 0, 0, 0, 0, 0, 0] },
        { label: 'CFO out', data: [-265.33, -197.78, -164.38, -159.9, -229.55, -227.66, 0, 0, 0, 0, 0, 0] },
        { label: 'CFI', data: [-2.46, 0, -93.86, -62.93, -0.05, -0.15, 0, 0, 0, 0, 0, 0] },
        { label: 'CFF', data: [-14.67, -14.37, -14.39, -14.79, -14.42, -51.46, 0, 0, 0, 0, 0, 0] }
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

    return {
        name: 'Cash Flow Movement (YTD Jun-24; in IDR Bn)',
        type: typeChart,
        chartOptions: stackedChartOptionsApex(total, listLabels, null),
        series: series
    };
};

export const cashFlowData = () => {
    const cashFlow = [
        { periode: 'January', cfoin: 178.02, cfoout: -265.33, cfi: -2.46, cff: -14.67 },
        { periode: 'February', cfoin: 235.31, cfoout: -197.78, cfi: 0, cff: -14.37 },
        { periode: 'March', cfoin: 457.8, cfoout: -164.38, cfi: -93.86, cff: -14.39 },
        { periode: 'April', cfoin: 256.91, cfoout: -159.9, cfi: -62.93, cff: -14.79 },
        { periode: 'May', cfoin: 150.12, cfoout: -229.55, cfi: -0.05, cff: -14.42 },
        { periode: 'June', cfoin: 224.94, cfoout: -227.66, cfi: -0.15, cff: -51.46 },
        { periode: 'July', cfoin: 0, cfoout: 0, cfi: 0, cff: 0 },
        { periode: 'August', cfoin: 0, cfoout: 0, cfi: 0, cff: 0 },
        { periode: 'September', cfoin: 0, cfoout: 0, cfi: 0, cff: 0 },
        { periode: 'October', cfoin: 0, cfoout: 0, cfi: 0, cff: 0 },
        { periode: 'November', cfoin: 0, cfoout: 0, cfi: 0, cff: 0 },
        { periode: 'December', cfoin: 0, cfoout: 0, cfi: 0, cff: 0 }
    ];

    return cashFlow;
};
