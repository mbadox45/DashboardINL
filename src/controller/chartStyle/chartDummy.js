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
