export const bulkySalesChart = () => {
    // const qtyReal = 17326580;
    // const qtyRKAP = 37485933;
    // const totalQty = qtyReal + qtyRKAP;
    // const persenQtyReal = (qtyReal / totalQty).toFixed(2);
    // const persenQtyRKAP = (qtyRKAP / totalQty).toFixed(2);
    // const series = [persenQtyReal, persenQtyRKAP];
    // const labels = ['Real', 'RKAP']
    // const type = 'radialBar';
    // const colors = ['#0084ff', '#0077B5']
    // return {
    //     name: `Cash Balance (in IDR Bn)`,
    //     type: type,
    //     chartOptions: barChartOptionsApex(listLabels, color, strokeColor, dataLabelStat, total),
    //     series: [
    //         {
    //             name: label1,
    //             type: type,
    //             data: data1
    //         },
    //         {
    //             name: label2,
    //             type: type,
    //             data: data2
    //         }
    //     ]
    // };
};

// export const cashBalance = async () => {
//     // Revenue Ytd
//     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     const data1 = [343, 365, 553, 581, 486, 535, 0, 0, 0, 0, 0, 0];
//     const data2 = [443, 165, 653, 481, 486, 515, 322, 422, 789, 901, 655, 675];
//     const label1 = `Laba Bersih ${currentYear}`;
//     const label2 = `Laba Bersih ${currentYear - 1}`;
//     const type = 'bar';
//     const color = ['rgba(6, 130, 212, 0.6)', 'rgba(34, 197, 94, 0.6)']; // Second bar color is Green-500
//     const strokeColor = ['rgba(6, 130, 212, 1)', 'rgba(34, 197, 94, 1)']; // Stroke for second bar
//     const dataLabelStat = true;
//     const total = 'by Month';
//     // const typeChart = 'bar'

//     const listLabels = [];
//     for (let i = 0; i < labels.length; i++) {
//         listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
//     }

//     return {
//         name: `Cash Balance (in IDR Bn) ${currentYear}`,
//         type: type,
//         chartOptions: barChartOptionsApex(listLabels, color, strokeColor, dataLabelStat, total),
//         series: [
//             {
//                 name: label1,
//                 type: type,
//                 data: data1
//             },
//             {
//                 name: label2,
//                 type: type,
//                 data: data2
//             }
//         ]
//     };
// };
