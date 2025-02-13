import { formatCurrency } from '../dummyController';

export const barHorizontalChartApex = (label) => {
    return {
        chart: {
            type: 'bar',
            height: 350,
            foreColor: '#ffffff' // Warna teks default menjadi putih
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: label,
            labels: {
                style: {
                    colors: '#ffffff', // Warna putih untuk teks di bawah
                    fontSize: '12px'
                },
                formatter: function (val) {
                    return formatCurrency(Number(val).toFixed(0)); // Format nilai di bawah
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff', // Warna putih untuk teks di samping
                    fontSize: '12px'
                }
            }
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif'
            },
            y: {
                formatter: function (val) {
                    return 'Total ' + formatCurrency(Number(val).toFixed(0));
                }
            }
        }
    };
};

export const barChartApex = (label) => {
    return {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            }
        },
        dataLabels: {
            enabled: false,
            style: {
                colors: ['#ffffff'] // Warna putih untuk nilai di dalam chart
            }
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: label,
            labels: {
                style: {
                    colors: '#ffffff', // Warna putih untuk label di sumbu X
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff', // Warna putih untuk label di sumbu Y
                    fontSize: '12px'
                },
                formatter: function (val) {
                    return formatCurrency(Number(val).toFixed(0)); // Format nilai dengan formatCurrency
                }
            },
            title: {
                text: 'Qty (Kg)',
                style: {
                    color: '#ffffff' // Warna putih untuk judul sumbu Y
                }
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#ffffff' // Warna putih untuk teks di tooltip
            },
            y: {
                formatter: function (val) {
                    return 'Qty ' + formatCurrency(Number(val).toFixed(0)) + ' Kg';
                }
            }
        },
        legend: {
            labels: {
                colors: '#ffffff', // Warna putih untuk teks legend
                useSeriesColors: false
            }
        }
    };
};

export const lineChartApex = (label) => {
    return {
        chart: {
            height: 350,
            type: 'area'
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F6', '#33FFF6', '#A633FF', '#FF8C33', '#33FF8C', '#8C33FF', '#FF3366', '#66FF33'],
        dataLabels: {
            enabled: false,
            style: {
                colors: ['#ffffff'] // Warna putih untuk nilai di chart
            }
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: label,
            labels: {
                style: {
                    colors: '#ffffff', // Warna putih untuk label di sumbu X
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff', // Warna putih untuk label di sumbu Y
                    fontSize: '12px'
                },
                formatter: function (val) {
                    return formatCurrency(Number(val).toFixed(0)); // Format nilai dengan formatCurrency
                }
            }
        },
        plotOptions: {
            area: {
                colors: {
                    ranges: [
                        {
                            from: -Infinity,
                            to: 0,
                            color: 'rgba(255, 0, 0, 0.6)'
                        }
                    ]
                },
                dataLabels: {
                    position: 'bottom',
                    offsetY: 10
                }
            }
        },
        tooltip: {
            theme: 'dark', // Mengubah background tooltip menjadi hitam
            x: {
                format: 'dd/MM/yy'
            },
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#ffffff' // Warna putih untuk teks di tooltip
            }
        },
        legend: {
            labels: {
                colors: '#ffffff' // Mengubah warna teks legend menjadi putih
            }
        }
    };
};

export const comboChartOptionsApex = (total, label1, label2, listLabels, colors, colorsLabel, scale1, scale2) => {
    return {
        chart: {
            height: 350,
            type: 'line',
            background: '#000000',
            foreColor: '#ffffff'
        },
        stroke: {
            width: [2, 4],
            curve: 'smooth'
        },
        title: {
            text: total,
            style: {
                color: '#d97706'
            }
        },
        colors: colors,
        dataLabels: {
            enabled: true,
            // enabledOnSeries: [0], // Only enable for the first series (line chart)
            style: {
                fontSize: '0.5vw',
                colors: colorsLabel
            },
            formatter: function (val, opts) {
                if (val === 0) {
                    return '';
                }

                const seriesIndex = opts.seriesIndex; // Get the index of the series
                const currentScale = seriesIndex === 0 ? scale2 : scale1; // Choose the correct scale
                if (currentScale === 'percent') {
                    return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                } else {
                    return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val;
                }
            },
            background: {
                enabled: true,
                borderRadius: 3,
                borderColor: '#ffffff',
                borderWidth: 1,
                opacity: 1
            }
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [
                        {
                            from: -Infinity,
                            to: 0,
                            color: 'rgba(255, 0, 0, 0.6)'
                        }
                    ]
                },
                dataLabels: {
                    position: 'bottom',
                    offsetY: 10
                }
            }
        },
        labels: listLabels,
        xaxis: {
            categories: listLabels // Label kategori untuk X-axis
        },
        yaxis: [
            {
                title: {
                    text: label2
                },
                labels: {
                    formatter: function (val) {
                        if (scale2 === 'percent') {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                        } else {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val;
                        }
                    }
                }
            },
            {
                opposite: true,
                title: {
                    text: label1
                },
                labels: {
                    formatter: function (val) {
                        if (scale1 === 'percent') {
                            if (val >= 1000) {
                                return (val / 1000).toFixed(1) + 'K%';
                            }
                            return val.toFixed(2) + '%';
                        } else {
                            if (val >= 1000) {
                                return (val / 1000).toFixed(1) + 'K';
                            }
                            return val;
                        }
                    }
                }
            }
        ],
        legend: {
            labels: {
                useSeriesColors: false
            },
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 0
        },
        tooltip: {
            theme: 'dark', // Ganti tema tooltip jika diperlukan
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#FF5733' // Warna font pada tooltip
            },
            y: {
                formatter: function (val) {
                    if (val >= 1000) {
                        return (val / 1000).toFixed(1) + 'K';
                    }
                    return val.toFixed(2);
                }
            }
        }
    };
};

export const combo3ChartOptionsApex = (total, label1, label2, label3, listLabels, colors, colorsLabel, scale1, scale2, scale3) => {
    return {
        chart: {
            height: 350,
            type: 'line',
            background: '#000000',
            foreColor: '#ffffff'
        },
        stroke: {
            width: [2, 4, 4],
            curve: 'straight'
            // curve: 'smooth'
        },
        title: {
            text: total,
            style: {
                color: '#d97706'
            }
        },
        colors: colors,
        dataLabels: {
            enabled: true,
            // enabledOnSeries: [0], // Only enable for the first series (line chart)
            style: {
                fontSize: '0.65vw',
                colors: colorsLabel
                // colors: ['#d97706', '#1a5276', '#4ca58a']
            },
            formatter: function (val) {
                if (val === 0) {
                    return '';
                }

                if (scale1 === 'percent') {
                    return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                } else {
                    return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val;
                }
            },
            background: {
                enabled: true,
                borderRadius: 3,
                borderColor: '#ffffff',
                borderWidth: 1,
                opacity: 1
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'bottom',
                    offsetY: 10
                }
            }
        },
        labels: listLabels,
        xaxis: {
            categories: listLabels
        },
        yaxis: [
            {
                title: {
                    text: label1
                },
                labels: {
                    formatter: function (val) {
                        if (scale1 === 'percent') {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                        } else {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val.toFixed(2);
                        }
                    }
                }
            },
            {
                opposite: true,
                title: {
                    text: label2
                },
                labels: {
                    formatter: function (val) {
                        if (scale2 === 'percent') {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                        } else {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val;
                        }
                    }
                }
            },
            {
                opposite: true,
                title: {
                    text: label3
                },
                labels: {
                    formatter: function (val) {
                        // Share the same formatting logic as label2
                        if (scale3 === 'percent') {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                        } else {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val.toFixed(2);
                        }
                    }
                }
            }
        ],
        legend: {
            labels: {
                useSeriesColors: false
            },
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 0
        },
        tooltip: {
            theme: 'dark',
            y: {
                // Adjust formatting if needed
            }
        }
    };
};

export const comboMultipleChartOptionsApex = (total, label, listLabels, colors, colorsLabel, scale) => {
    const dataLabel = [];
    for (let i = 0; i < label.length; i++) {
        if (i > 0) {
            dataLabel.push({
                opposite: true,
                title: {
                    text: label[i]
                },
                labels: {
                    formatter: function (val) {
                        if (scale[i] === 'percent') {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                        } else {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val.toFixed(2);
                        }
                    }
                }
            });
        } else {
            dataLabel.push({
                title: {
                    text: label[i]
                },
                labels: {
                    formatter: function (val) {
                        if (scale[i] === 'percent') {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                        } else {
                            return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val.toFixed(2);
                        }
                    }
                }
            });
        }
    }
    return {
        chart: {
            height: 350,
            type: 'line',
            background: '#000000',
            foreColor: '#ffffff'
        },
        stroke: {
            width: [2, 4, 4],
            curve: 'straight'
            // curve: 'smooth'
        },
        title: {
            text: total,
            style: {
                color: '#d97706'
            }
        },
        colors: colors,
        dataLabels: {
            enabled: true,
            // enabledOnSeries: [0], // Only enable for the first series (line chart)
            style: {
                fontSize: '0.65vw',
                colors: colorsLabel
                // colors: ['#d97706', '#1a5276', '#4ca58a']
            },
            formatter: function (val) {
                if (val === 0) {
                    return '';
                }

                if (scale[0] === 'percent') {
                    return val >= 1000 ? (val / 1000).toFixed(1) + 'K%' : val.toFixed(2) + '%';
                } else {
                    return val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val;
                }
            },
            background: {
                enabled: true,
                borderRadius: 3,
                borderColor: '#ffffff',
                borderWidth: 1,
                opacity: 1
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'bottom',
                    offsetY: 10
                }
            }
        },
        labels: listLabels,
        xaxis: {
            categories: listLabels
        },
        yaxis: [dataLabel],
        legend: {
            labels: {
                useSeriesColors: false
            },
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 0
        },
        tooltip: {
            theme: 'dark',
            y: {
                // Adjust formatting if needed
            }
        }
    };
};

export const barChartOptionsApex = (labels, color, strokeColor, dataLabelStat, total) => {
    return {
        chart: {
            background: '#000000',
            foreColor: '#ffffff',
            toolbar: {
                show: true
            }
        },
        title: {
            text: total,
            style: {
                color: '#d97706'
            }
        },
        xaxis: {
            categories: labels,
            tickPlacement: 'on'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: dataLabelStat,
            style: {
                fontSize: '0.8vw',
                colors: ['#fff']
            },
            offsetY: 10,
            formatter: function (value) {
                if (value === 0) {
                    return '';
                }
                return value;
            }
        },
        colors: color,
        stroke: {
            show: true,
            width: 3,
            colors: strokeColor
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#FF5733'
            }
        },
        legend: {
            labels: {
                useSeriesColors: false
            },
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 0
        }
    };
};

export const stackedChartOptionsApex = (total, listLabels, toolbar) => {
    return {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            background: '#000000',
            foreColor: '#ffffff',
            toolbar: {
                show: toolbar !== null ? toolbar : true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end',
                dataLabels: {
                    total: {
                        enabled: true,
                        offsetX: 0,
                        offsetY: -5,
                        formatter: function (val) {
                            if (val === 0) {
                                return '';
                            }
                            // Return the formatted value
                            return `${val.toFixed(2)}`;
                        },
                        style: {
                            // fontSize: '12px',
                            fontSize: '0.8vw',
                            color: 'rgba(245, 158, 11, 0.8)'
                        }
                    }
                }
            }
        },
        title: {
            text: total,
            style: {
                colors: '#d97706'
            }
        },
        labels: listLabels,
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '8px',
                colors: ['#ffffff']
            }
        },
        xaxis: {
            tickPlacement: 'on'
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (val >= 1000) {
                        return (val / 1000).toFixed(1) + 'K';
                    }
                    return val;
                }
            }
        },
        legend: {
            labels: {
                useSeriesColors: false
            },
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY: 10
        },
        tooltip: {
            theme: 'dark',
            y: {}
        }
    };
};
