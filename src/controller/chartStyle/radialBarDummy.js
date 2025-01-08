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
                        return (val / 1000).toFixed(1) + 'K';
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
