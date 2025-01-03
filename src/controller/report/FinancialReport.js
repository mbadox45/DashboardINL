import { comboChartOptionsApex } from '@/controller/chartStyle/chartDummy';
import moment from 'moment';

export const revenueYtd = async () => {
    // Revenue Ytd
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [353.32, 802, 852.69, 1207.45, 1718.87, 1643.25, 0, 0, 0, 0, 0, 0];
    const data2 = [378.46, 187.77, 190.14, 240.53, 194.27, 242.86, 0, 0, 0, 0, 0, 0];
    const label1 = 'Target RKAP';
    const label2 = 'Pendapatan';
    const type1 = 'line';
    const type2 = 'bar';
    const colors = ['rgba(245, 217, 5, 0.6)', 'rgba(0, 34, 255, 1)'];
    const total = '*';
    const scale1 = 'number';
    const scale2 = 'number';
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'Revenue YTD (in IDR Bn)',
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
