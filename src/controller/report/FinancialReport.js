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
    const colors = ['rgba(217, 119, 6, 1)', 'rgba(26, 82, 118, 0.6)', 'rgba(76, 165, 138, 0.6)']; // Add new color for last year's data
    const colorsLabel = ['#b15d05', '#1a3e58', '#3b8e77'];
    const total = 'Percentage 2024: 30%';
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
        chartOptions: combo3ChartOptionsApex(total, label1, label2, label3, listLabels, colors, colorsLabel, scale1, scale2, scale3),
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
        { periode: 'January', pendapatan: 378.46, rkap: 353.32 },
        { periode: 'February', pendapatan: 187.77, rkap: 802 },
        { periode: 'March', pendapatan: 190.14, rkap: 852.69 },
        { periode: 'April', pendapatan: 240.53, rkap: 1207.45 },
        { periode: 'May', pendapatan: 194.27, rkap: 1718.87 },
        { periode: 'June', pendapatan: 242.86, rkap: 1643.25 },
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
    const ebitdaMarginThisYear = [
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
    const ebitdaMarginLastYear = [
        { periode: 'January', ebitda: -2.46, ebitdaPersen: -0.65 },
        { periode: 'February', ebitda: 0.4, ebitdaPersen: 0.22 },
        { periode: 'March', ebitda: -2.14, ebitdaPersen: -1.13 },
        { periode: 'April', ebitda: 16.1, ebitdaPersen: 6.69 },
        { periode: 'May', ebitda: -1.67, ebitdaPersen: -0.86 },
        { periode: 'June', ebitda: 6.59, ebitdaPersen: 2.71 },
        { periode: 'July', ebitda: 4.2, ebitdaPersen: 1.5 },
        { periode: 'August', ebitda: -1.5, ebitdaPersen: -0.25 },
        { periode: 'September', ebitda: 7.6, ebitdaPersen: 3.8 },
        { periode: 'October', ebitda: -0.8, ebitdaPersen: -1.1 },
        { periode: 'November', ebitda: 2.1, ebitdaPersen: 0.95 },
        { periode: 'December', ebitda: 3.5, ebitdaPersen: 2.3 }
    ];

    return { ebitdaMarginThisYear, ebitdaMarginLastYear };
};

export const ebitdaMargin = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [-0.65, 0.22, -1.13, 6.69, -0.86, 2.71, 0, 0, 0, 0, 0, 0];
    const data2 = [-2.46, 0.4, -2.14, 16.1, -1.67, 6.59, 0, 0, 0, 0, 0, 0];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + 'B IDR of EBITDA (YTD)';
    const label1 = 'EBITDA%';
    const label2 = 'EBITDA';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(251, 191, 36, 0.6)', 'rgba(99, 102, 241, 1)'];
    const colorsLabel = ['#c9971c', '#4f52c9'];
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
    };
};

export const ebitdaMarginLastYear = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [-0.65, 0.22, -1.13, 6.69, -0.86, 2.71, 1.5, -0.25, 3.8, -1.1, 0.95, 2.3];
    const data2 = [-2.46, 0.4, -2.14, 16.1, -1.67, 6.59, 4.2, -1.5, 7.6, -0.8, 2.1, 3.5];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + 'B IDR of EBITDA (YTD)';
    const label1 = 'EBITDA%';
    const label2 = 'EBITDA';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(16, 185, 129, 0.6)', 'rgba(139, 92, 246, 1)'];
    const colorsLabel = ['#a21caf', '#6d28d9'];
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
    };
};

export const netProfitMarginData = () => {
    const netProfitMarginThisYear = [
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
    const netProfitMarginLastYear = [
        { periode: 'January', lababersih: -2.46, npm: -0.65 },
        { periode: 'February', lababersih: 0.4, npm: 0.22 },
        { periode: 'March', lababersih: -2.14, npm: -1.13 },
        { periode: 'April', lababersih: 16.1, npm: 6.69 },
        { periode: 'May', lababersih: -1.67, npm: -0.86 },
        { periode: 'June', lababersih: 6.59, npm: 2.71 },
        { periode: 'July', lababersih: 4.2, npm: 1.5 },
        { periode: 'August', lababersih: -1.5, npm: -0.25 },
        { periode: 'September', lababersih: 7.6, npm: 3.8 },
        { periode: 'October', lababersih: -0.8, npm: -1.1 },
        { periode: 'November', lababersih: 2.1, npm: 0.95 },
        { periode: 'December', lababersih: 3.5, npm: 2.3 }
    ];

    return { netProfitMarginThisYear, netProfitMarginLastYear };
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
    const colors = ['rgba(6, 95, 70, 0.6)', 'rgba(34, 211, 238, 1)'];
    const colorsLabel = ['#15803d', '#0891b2'];
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
    };
};

export const netProfitMarginLastYear = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [-0.65, 0.22, -1.13, 6.69, -0.86, 2.71, 1.5, -0.25, 3.8, -1.1, 0.95, 2.3];
    const data2 = [-2.46, 0.4, -2.14, 16.1, -1.67, 6.59, 4.2, -1.5, 7.6, -0.8, 2.1, 3.5];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + ' Bn IDR of Net Profit (YTD)';
    const label1 = 'NPM%';
    const label2 = 'Laba Bersih';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(245, 158, 11, 0.6)', 'rgba(101, 163, 13, 1)'];
    const colorsLabel = ['#754c07', '#2b4506'];
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
    };
};

export const grossProfit = async () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [3, 4.43, 6.19, 10.66, 5.43, 4.85, 0, 0, 0, 0, 0, 0];
    const data2 = [11.4, 8.3, 11.8, 25.6, 10.6, 11.8, 0, 0, 0, 0, 0, 0];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + `B IDR of Gross Profit (YTD) ${currentYear}`;
    const label1 = 'GPM%';
    const label2 = 'Laba Kotor';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(217, 70, 239, 0.6)', 'rgba(0, 188, 212, 1)'];
    const colorsLabel = ['#a21caf', '#1a5276'];
    const scale1 = 'percent';
    const scale2 = 'number';
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
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
    };
};

export const grossProfitLastYear = async () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [2.5, 4.0, 6.0, 10.0, 5.0, 4.5, 3.0, 4.2, 5.1, 6.3, 7.2, 8.5];
    const data2 = [10.5, 8.0, 11.0, 25.0, 10.0, 11.0, 12.0, 15.0, 9.5, 14.2, 18.0, 21.1];
    const sum = parseFloat(data2.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2));
    const total = sum + `B IDR of Gross Profit (YTD) ${currentYear - 1}`;
    const label1 = 'GPM%';
    const label2 = 'Laba Kotor';
    const type1 = 'line';
    const type2 = 'column';
    const colors = ['rgba(105, 115, 132, 0.6)', 'rgba(251, 191, 36, 1)'];
    const colorsLabel = ['#2d3748', '#b45309'];
    const scale1 = 'percent';
    const scale2 = 'number';
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
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
    };
};

export const grossProfitData = () => {
    const grossProfitThisYear = [
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

    const grossProfitLastYear = [
        { periode: 'January', labakotor: 2.5, gpm: 10.5 },
        { periode: 'February', labakotor: 4.0, gpm: 8.0 },
        { periode: 'March', labakotor: 6.0, gpm: 11.0 },
        { periode: 'April', labakotor: 10.0, gpm: 25.0 },
        { periode: 'May', labakotor: 5.0, gpm: 10.0 },
        { periode: 'June', labakotor: 4.5, gpm: 11.0 },
        { periode: 'July', labakotor: 3.0, gpm: 12.0 },
        { periode: 'August', labakotor: 4.2, gpm: 15.0 },
        { periode: 'September', labakotor: 5.1, gpm: 9.5 },
        { periode: 'October', labakotor: 6.3, gpm: 14.2 },
        { periode: 'November', labakotor: 7.2, gpm: 18.0 },
        { periode: 'December', labakotor: 8.5, gpm: 21.1 }
    ];

    return { grossProfitThisYear, grossProfitLastYear };
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
    const total = '';
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
    const total = '';
    // const typeChart = 'line'

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'CFF Payment Schedule (in IDR Bn)',
        total: total,
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
        { periode: 'January', pembayaran: 14.2, status: 'Paid' },
        { periode: 'February', pembayaran: 14.2, status: 'Paid' },
        { periode: 'March', pembayaran: 14.2, status: 'Paid' },
        { periode: 'April', pembayaran: 14.2, status: 'Paid' },
        { periode: 'May', pembayaran: 14.2, status: 'Paid' },
        { periode: 'June', pembayaran: 14.2, status: 'Unpaid' },
        { periode: 'July', pembayaran: 0, status: '-' },
        { periode: 'August', pembayaran: 0, status: '-' },
        { periode: 'September', pembayaran: 0, status: '-' },
        { periode: 'October', pembayaran: 0, status: '-' },
        { periode: 'November', pembayaran: 0, status: '-' },
        { periode: 'December', pembayaran: 0, status: '-' }
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
    const total = '';

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
        total: total,
        chartOptions: stackedChartOptionsApex(total, listLabels, null, null),
        series: series
    };
};

export const cfiPaymentData = () => {
    const cfiPayment = [
        { cfi: 'Kontraktor EPC PMG II by ETI', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, aug: 47.97, sep: 0, oct: 0, nov: 0, des: 0 },
        { cfi: 'Pekerjaan Bangunan Perusahaan', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, aug: 5, sep: 0, oct: 0, nov: 0, des: 0 },
        { cfi: 'Licensor Biodiesel by Desment Technology', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, des: 81.9 }
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

export const cashFlowLastYear = async () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dataSeries = [
        { label: 'CFO in', data: [178.02, 235.31, 457.8, 256.91, 150.12, 224.94, 178.02, 235.31, 457.8, 256.91, 150.12, 224.94] },
        { label: 'CFO out', data: [-265.33, -197.78, -164.38, -159.9, -229.55, -227.66, -265.33, -197.78, -164.38, -159.9, -229.55, -227.66] },
        { label: 'CFI', data: [-2.46, 0, -93.86, -62.93, -0.05, -0.15, -2.46, 0, -93.86, -62.93, -0.05, -0.15] },
        { label: 'CFF', data: [-14.67, -14.37, -14.39, -14.79, -14.42, -51.46, -14.67, -14.37, -14.39, -14.79, -14.42, -51.46] }
    ];

    const typeChart = 'bar';
    const total = '';

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
    const cashFlowThisYear = [
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
    const cashFlowLastYear = [
        { periode: 'January', cfoin: 178.02, cfoout: -265.33, cfi: -2.46, cff: -14.67 },
        { periode: 'February', cfoin: 235.31, cfoout: -197.78, cfi: 0, cff: -14.37 },
        { periode: 'March', cfoin: 457.8, cfoout: -164.38, cfi: -93.86, cff: -14.39 },
        { periode: 'April', cfoin: 256.91, cfoout: -159.9, cfi: -62.93, cff: -14.79 },
        { periode: 'May', cfoin: 150.12, cfoout: -229.55, cfi: -0.05, cff: -14.42 },
        { periode: 'June', cfoin: 224.94, cfoout: -227.66, cfi: -0.15, cff: -51.46 },
        { periode: 'July', cfoin: 178.02, cfoout: -265.33, cfi: -2.46, cff: -14.67 },
        { periode: 'August', cfoin: 235.31, cfoout: -197.78, cfi: 0, cff: -14.37 },
        { periode: 'September', cfoin: 457.8, cfoout: -164.38, cfi: -93.86, cff: -14.39 },
        { periode: 'October', cfoin: 256.91, cfoout: -159.9, cfi: -62.93, cff: -14.79 },
        { periode: 'November', cfoin: 150.12, cfoout: -229.55, cfi: -0.05, cff: -14.42 },
        { periode: 'December', cfoin: 224.94, cfoout: -227.66, cfi: -0.15, cff: -51.46 }
    ];

    return { cashFlowThisYear, cashFlowLastYear };
};

export const hargaBulkyData = () => {
    const bulky = [
        { produk: 'CPO', spotIdr: 10641, spotUsd: 701, invIdr: 10423, invUsd: 686 },
        { produk: 'PFAD', spotIdr: 10641, spotUsd: 701, invIdr: 10423, invUsd: 686 },
        { produk: 'RBD Stearin', spotIdr: 16.656, spotUsd: 856, invIdr: 12867, invUsd: 847 },
        { produk: 'RBD Olein IV-56', spotIdr: 16656, spotUsd: 856, invIdr: 12867, invUsd: 847 },
        { produk: 'RBD Olein IV-57', spotIdr: 16656, spotUsd: 856, invIdr: 12867, invUsd: 847 },
        { produk: 'RBD Olein IV-58', spotIdr: 16656, spotUsd: 856, invIdr: 12867, invUsd: 847 },
        { produk: 'RBD Olein IV-60', spotIdr: 16656, spotUsd: 856, invIdr: 12867, invUsd: 847 }
    ];

    return bulky;
};
