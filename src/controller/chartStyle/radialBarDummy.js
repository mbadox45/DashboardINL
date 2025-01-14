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
                show: true
            }
        },
        labels: label,
        series: qty, // Use the qty array for chart data
        legend: {
            show: false
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
