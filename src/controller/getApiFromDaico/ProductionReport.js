import laporanProduksiAPI from '@/api/fromDaico/production/laporanProduksi';
import { comboMultipleChartOptionsApex } from '@/controller/chartStyle/chartDummy';
import { pieChartApex, pieChartApex2 } from '@/controller/chartStyle/radialBarDummy';
import moment from 'moment';

export const packagingData = async () => {
    const date = '2024-04-01';
    try {
        const load = await laporanProduksiAPI.getByDate({ tanggal: date });
        const data = load.data;
        // const laporanProduksi = data != null ? data.laporanProduksi : null;
        const laporanProduksi = Array.isArray(data?.laporanProduksi) ? data.laporanProduksi : [];
        const packaging = laporanProduksi != null ? laporanProduksi.filter((item) => item.nama.toLowerCase().includes('refinery') || item.nama.toLowerCase().includes('fraksinasi')) : null;
        const result = {
            data: packaging,
            status: 200,
            message: 'success get data laporan produksi'
        };
        return result;
    } catch (error) {
        const load = {
            data: null,
            status: 400,
            message: 'data not found !'
        };
        return load;
    }
};

export const listTablePackaging = [
    {
        title: 'Packaging Salvaco 1 Ltr',
        uraian: [
            { nama: 'Olein IV 60 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton Salvaco', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging Salvaco 2 Ltr',
        uraian: [
            { nama: 'Olein IV 60 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton Salvaco', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging Nusakita 1 Ltr',
        uraian: [
            { nama: 'Olein IV 60 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton Nusakita', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging Nusakita 2 Ltr',
        uraian: [
            { nama: 'Olein IV 60 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton Nusakita', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging Minyakita 1 Ltr',
        uraian: [
            { nama: 'Olein IV 56 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton Nusakita', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging Minyakita 2 Ltr',
        uraian: [
            { nama: 'Olein IV 56 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton Nusakita', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging INL 250 mL',
        uraian: [
            { nama: 'Olein IV 57 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton INL', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging INL 450 mL',
        uraian: [
            { nama: 'Olein IV 57 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton INL', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging INL 900 mL',
        uraian: [
            { nama: 'Olein IV 57 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton INL', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    },
    {
        title: 'Packaging INL 1800 mL',
        uraian: [
            { nama: 'Olein IV 57 Consume', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Carton INL', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Vit. A', qty: 0, rkap: 0, satuan: 'Kg' },
            { nama: 'Consumable Packing Tape', qty: 0, rkap: 0, satuan: 'Kg' }
        ]
    }
];

export const chartPackaging = async () => {
    const qtyRkap = [1000000, 2000000];
    const labelRkap = ['Realisasi', 'RKAP'];
    const nameRkap = 'Realisasi vs RKAP';
    const colorRkap = ['#2874a6', '#2e4053'];
    const chartDataRkap = pieChartApex2(labelRkap, qtyRkap);

    const qtyUtility = [1000000, 300000];
    const labelUtility = ['Realisasi', 'Utility'];
    const nameUtility = 'Realisasi vs Utility';
    const colorUtility = ['#2e4053', '#616a6b'];
    const chartDataUtility = pieChartApex2(labelUtility, qtyUtility);

    const qtyPlan = [1000000, 90000];
    const labelPlan = ['Realisasi', 'Sales Plan'];
    const namePlan = 'Realisasi vs Sales Plan';
    const colorPlan = ['#76448a', '#76448a'];
    const chartDataPlan = pieChartApex2(labelPlan, qtyPlan);

    const result = [
        {
            qty: qtyRkap,
            label: labelRkap,
            name: nameRkap,
            chartData: chartDataRkap
        },
        {
            qty: qtyUtility,
            label: labelUtility,
            name: nameUtility,
            chartData: chartDataUtility
        },
        {
            qty: qtyPlan,
            label: labelPlan,
            name: namePlan,
            chartData: chartDataPlan
        }
    ];

    return result;
};

export const cpoOlah = async () => {
    const cpo = 8860560;
    const rkap = 52800000;
    const utility = 66000000;
    const persenRkap = (cpo / rkap) * 100;
    const persenUtility = (cpo / utility) * 100;

    const valueRkap = [cpo, rkap];
    const valueUtility = [cpo, utility];
    const labelRkap = ['CPO Olah', 'RKAP'];
    const labelUtility = ['CPO Olah', 'Utility'];

    const chartDataRkap = pieChartApex(labelRkap, valueRkap);
    const chartDataUtility = pieChartApex(labelUtility, valueUtility);

    const dataChart = [
        {
            qty: valueRkap,
            label: labelRkap,
            name: 'RKAP',
            persen: persenRkap,
            chartData: chartDataRkap
        },
        {
            qty: valueUtility,
            label: labelUtility,
            name: 'Utility',
            persen: persenUtility,
            chartData: chartDataUtility
        }
    ];

    return {
        data: dataChart
    };
};

export const listTableCPOOlah = [
    { uraian: 'Bahan Baku', bebanProduksi: 107293333858.0, rpKg: 12109.09 },
    { uraian: 'Gaji, Tunjangan & Biaya Sosial Karyawan Pimpinan', bebanProduksi: 600003823.53, rpKg: 67.72 },
    { uraian: 'Gaji, Tunjangan & Biaya Sosial Karyawan Pelaksana', bebanProduksi: 679911614.26, rpKg: 76.73 },
    { uraian: 'Bahan Bakar', bebanProduksi: 5184478100.34, rpKg: 585.12 },
    { uraian: 'Bahan Kimia & Bahan Pendukung Produksi', bebanProduksi: 349281750.0, rpKg: 39.42 },
    { uraian: 'Biaya Analisa & Laboratorium', bebanProduksi: 3298800.0, rpKg: 0.37 },
    { uraian: 'Biaya Listrik', bebanProduksi: 796979376.0, rpKg: 89.95 },
    { uraian: 'Biaya Air', bebanProduksi: 141132700.0, rpKg: 15.93 }
];

// export const chartLaporanProduksi = () => {
//     const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
//     const refinery = {
//         name: 'Refinery',
//         type:'line',
//         data: [0,0,0,8398524,0,0,0,0,0,0,0,0]
//     }
//     const frakIv56 = {
//         name: 'Fraksinasi IV 56',
//         type:'column',
//         data: [0,0,0,0,0,0,0,0,0,0,0,0]
//     }
//     const frakIv57 = {
//         name: 'Fraksinasi IV 57',
//         type:'column',
//         data: [0,0,0,60502,0,0,0,0,0,0,0,0]
//     }
//     const frakIv58 = {
//         name: 'Fraksinasi IV 58',
//         type:'column',
//         data: [0,0,0,9586794,0,0,0,0,0,0,0,0]
//     }
//     const frakIv60 = {
//         name: 'Fraksinasi IV 58',
//         type:'column',
//         data: [0,0,0,0,0,0,0,0,0,0,0,0]
//     }
//     const result = {}
//     return result
// }

export const chartLaporanProduksi = async () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data1 = [0, 0, 0, 83985, 0, 0, 0, 0, 0, 0, 0, 0];
    const data2 = [0, 0, 0, 20030, 0, 0, 0, 0, 0, 0, 0, 0];
    const data3 = [0, 0, 0, 60502, 0, 0, 0, 0, 0, 0, 0, 0];
    const data4 = [0, 0, 0, 95867, 0, 0, 0, 0, 0, 0, 0, 0];
    const data5 = [0, 0, 0, 50304, 0, 0, 0, 0, 0, 0, 0, 0];
    const label = [`Refinery`, `Fraksinasi IV 56`, `Fraksinasi IV 57`, `Fraksinasi IV 58`, `Fraksinasi IV 60`];
    const label1 = `Refinery`;
    const label2 = `Fraksinasi IV 56`;
    const label3 = `Fraksinasi IV 57`;
    const label4 = `Fraksinasi IV 58`;
    const label5 = `Fraksinasi IV 60`;
    const type1 = 'line';
    const type2 = 'bar';
    const type3 = 'bar';
    const type4 = 'bar';
    const type5 = 'bar';
    const colors = ['rgba(217, 119, 6, 1)', 'rgba(26, 82, 118, 0.6)', 'rgba(76, 165, 138, 0.6)', 'rgba(52, 73, 94, 0.6)', 'rgba(125, 60, 152, 0.6)']; // Add new color for last year's data
    const colorsLabel = ['#b15d05', '#1a3e58', '#3b8e77', '#34495e', '#7d3c98'];
    const total = '';
    const scale = ['number', 'number', 'number', 'number', 'number'];
    const typeChart = 'line';

    const listLabels = [];
    for (let i = 0; i < labels.length; i++) {
        listLabels.push(moment(labels[i], 'MMMM').format('MMM'));
    }

    return {
        name: 'Laporan Produksi',
        type: typeChart,
        chartOptions: comboMultipleChartOptionsApex(total, label, listLabels, colors, colorsLabel, scale),
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
            },
            {
                name: label4,
                type: type4,
                data: data4
            },
            {
                name: label5,
                type: type5,
                data: data5
            }
        ]
    };
};
