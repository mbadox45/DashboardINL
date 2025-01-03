import { combo3ChartOptionsApex, comboChartOptionsApex } from '@/controller/chartStyle/chartDummy';
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
