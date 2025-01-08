import { radialBarCustomApex } from '@/controller/chartStyle/radialBarDummy';

export const bulkySalesChart = () => {
    const qtyReal = 17326580;
    const qtyRKAP = 37485933;
    const totalQty = qtyReal + qtyRKAP;
    const persenQtyReal = (qtyReal / totalQty).toFixed(2);
    const persenQtyRKAP = (qtyRKAP / totalQty).toFixed(2);
    const series = [persenQtyReal, persenQtyRKAP];
    const labels = ['Real', 'RKAP'];
    const type = 'radialBar';
    const colors = ['#0084ff', '#0077B5'];
    return {
        name: `Statistic`,
        type: type,
        chartOptions: radialBarCustomApex(colors),
        series: [
            {
                name: labels,
                type: type,
                data: series
            }
        ]
    };
};

// export const cffPayment = async () => {
//     // Revenue Ytd
//     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     const data = [14.2, 14.2, 14.2, 14.2, 14.2, 14.2, 0, 0, 0, 0, 0, 0];
//     const label = 'Pembayaran Pinjaman Kepada Pihak Berelasi';
//     const type = 'bar';
//     const color = ['rgba(204, 4, 4, 0.6)'];
//     const strokeColor = ['rgba(204, 4, 4, 1'];
//     const dataLabelStat = true;
//     const total = 'by Month';
//     // const typeChart = 'line'

//     const listLabels = [];
//     for (let i = 0; i < labels.length; i++) {
//         listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
//     }

//     return {
//         name: 'CFF Payment Schedule (in IDR Bn)',
//         total: 'by Month',
//         type: type,
//         chartOptions: barChartOptionsApex(listLabels, color, strokeColor, dataLabelStat, total),
//         series: [
//             {
//                 name: label,
//                 data: data
//             }
//         ]
//     };
// };
