export const radialBarApex = (label, colors) => {
    return {
        chart: {
            height: 390,
            type: 'radialBar'
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: false
                    }
                },
                barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '16px',
                    formatter: function (seriesName, opts) {
                        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
                    }
                }
            }
        },
        colors: colors,
        labels: label,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }
        ]
    };
};

export const dougnutChartApex = (label, colors) => {
    return {
        chart: {
            type: 'donut'
        },
        labels: label,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };
};

export const halfRadialChartApex = (label) => {
    return {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#222', // 🔹 Ubah warna background track
                    strokeWidth: '97%',
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#444',
                        opacity: 0.7, // 🔹 Kurangi opacity shadow
                        blur: 3
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '0.9vw', // 🔹 Ubah ukuran tulisan nilai
                        fontWeight: 'bold', // 🔹 Bikin lebih tebal
                        color: '#ffffff', // 🔹 Ubah warna teks
                        formatter: (val) => {
                            return val >= 1000 ? `${(val / 1000).toFixed(1)}k %` : `${val}%`; // 🔹 Ubah format angka
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100]
            }
        },
        colors: ['#FF4560'], // 🔹 Ubah warna chart (misalnya merah)
        labels: label
    };
};

export const halfRadialChartApex2 = (label, value) => {
    let color = '#28a745'; // Default hijau (>= 50)
    if (value < 0) {
        color = '#FF4560'; // Merah (< 0)
    } else if (value >= 0 && value < 50) {
        color = '#FFC107'; // Kuning (0 - 49)
    }

    return {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#222',
                    strokeWidth: '97%',
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#444',
                        opacity: 0.7,
                        blur: 3
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '0.9vw',
                        fontWeight: 'bold',
                        color: color, // 🔹 Warna teks mengikuti kondisi
                        formatter: (val) => {
                            return value < 0 ? `- ${val}%` : val >= 1000 ? `${(val / 1000).toFixed(1)}k %` : `${val}%`;
                        }
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100]
            }
        },
        colors: [color], // 🔹 Warna chart mengikuti kondisi
        labels: label
    };
};

export const radialChartApex = (label, colors, size) => {
    return {
        chart: {
            height: 50,
            type: 'radialBar'
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '55%',
                    background: 'transparent'
                },
                dataLabels: {
                    name: {
                        show: true,
                        color: colors[0], // Warna putih untuk label
                        fontWeight: 'bold',
                        fontSize: '0.8vw'
                    },
                    value: {
                        show: true,
                        color: '#ffffff', // Warna putih untuk nilai persentase
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontSize: '0.8vw'
                    }
                }
            }
        },
        colors: colors,
        labels: label,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }
        ]
    };
};

export const radialBarCustomApex = (colors) => {
    return {
        chart: {
            height: 390,
            type: 'radialBar'
        },
        colors: colors,
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: false
                    }
                },
                barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '16px',
                    formatter: function (seriesName, opts) {
                        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
                    }
                }
            }
        }
    };
};

export const stackedChartOptionsApex = (total, listLabels, toolbar) => {
    return {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
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
                        offsetY: 0,
                        formatter: function (val) {
                            // Return the formatted value
                            return `${val.toFixed(2)}`;
                        },
                        style: {
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'rgba(245, 158, 11, 0.8)'
                        }
                    }
                }
            }
        },
        title: {
            text: total,
            style: {
                fontSize: '12px',
                colors: '#ffffff'
            }
        },
        labels: listLabels,
        dataLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                colors: ['#ffffff']
            }
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '10px',
                    fontFamily: 'Arial, sans-serif'
                }
            },
            tickPlacement: 'on'
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '10px'
                },
                formatter: function (val) {
                    if (val >= 1000) {
                        return (val / 1000).toFixed(2) + 'K';
                    }
                    return val;
                }
            }
        },
        legend: {
            labels: {
                colors: '#ffffff',
                useSeriesColors: false
            },
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 0
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#FF5733'
            },
            y: {}
        }
    };
};

export const pieChartApex = (label, qty) => {
    const formatValue = (val) => {
        return val >= 1000 ? `${(val / 1000).toFixed(2)}k` : val; // Format values larger than 1000
    };

    return {
        chart: {
            width: 380,
            type: 'pie', // Change to 'donut'
            background: 'transparent',
            foreColor: '#ffffff',
            toolbar: {
                show: false
            }
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F6', '#33FFF6', '#A633FF', '#FF8C33', '#33FF8C', '#8C33FF', '#FF3366', '#66FF33'],
        labels: label,
        series: qty, // Use the qty array for chart data
        legend: {
            show: false
        },
        stroke: {
            show: false, // ✅ Completely removes the border
            width: 0 // Alternative: Set width to 0
        },
        dataLabels: {
            enabled: true,
            formatter: (val, opts) => {
                const rawValue = opts.w.globals.series[opts.seriesIndex];
                return formatValue(rawValue); // Apply formatting
            },
            style: {
                fontSize: '0.5vw', // Adjust label size
                colors: ['#ffffff']
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '80%', // Adjust the size of the donut hole
                    labels: {
                        show: false,
                        name: {
                            show: true,
                            fontSize: '1vw',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '0.7vw',
                            fontWeight: 'bold',
                            marginTop: '-100px',
                            color: '#ffffff',
                            formatter: (val) => {
                                const total = qty.reduce((a, b) => a + b, 0);
                                return `Total: ${formatValue(total)}`; // Format the total value
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '0.7vw',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            formatter: () => {
                                const total = qty.reduce((a, b) => a + b, 0);
                                return formatValue(total); // Apply formatting
                            }
                        }
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };
};

export const pieChartApex2 = (label, qty) => {
    const formatValue = (val) => {
        return val >= 1000 ? `${(val / 1000).toFixed(2)}k` : val; // Format values larger than 1000
    };

    return {
        chart: {
            width: 380,
            type: 'pie', // Change to 'donut'
            background: 'transparent',
            foreColor: '#ffffff',
            toolbar: {
                show: true
            }
        },
        labels: label,
        series: qty, // Use the qty array for chart data
        legend: {
            show: true
        },
        dataLabels: {
            enabled: true,
            formatter: (val, opts) => {
                const rawValue = opts.w.globals.series[opts.seriesIndex];
                return formatValue(rawValue); // Apply formatting
            },
            style: {
                fontSize: '0.5vw', // Adjust label size
                colors: ['#ffffff']
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '80%', // Adjust the size of the donut hole
                    labels: {
                        show: false,
                        name: {
                            show: true,
                            fontSize: '1vw',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '0.7vw',
                            fontWeight: 'bold',
                            marginTop: '-100px',
                            color: '#ffffff',
                            formatter: (val) => {
                                const total = qty.reduce((a, b) => a + b, 0);
                                return `Total: ${formatValue(total)}`; // Format the total value
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '0.7vw',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            formatter: () => {
                                const total = qty.reduce((a, b) => a + b, 0);
                                return formatValue(total); // Apply formatting
                            }
                        }
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };
};
