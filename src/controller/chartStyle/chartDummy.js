export const setPieChartData = (data1, data2, label) => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: label,
        datasets: [
            {
                data: [data1, data2],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--orange-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--orange-400')],
                borderWidth: 1,
                borderRadius: 5
            }
        ]
    };
};

export const setPieChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor,
                    rotation: 0
                },
                display: false
            }
        },
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            rotation: -0.5 * Math.PI
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#FF5733'
            },
            y: {
                // Adjust formatting if needed
            }
        }
    };
};

export const barChartOptionsApex = (labels, color, strokeColor, dataLabelStat, total) => {
    return {
        chart: {
            toolbar: {
                show: true
            }
        },
        title: {
            text: total,
            style: {
                fontSize: '12px',
                color: '#0284C7'
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
                colors: ['#000'] // sets label text color to black
            },
            offsetY: -20
        },
        colors: color,
        stroke: {
            show: true,
            width: 3,
            colors: strokeColor
        }
    };
};

export const barChartOptionsApex2 = (labels, color, strokeColor, dataLabelStat, total) => {
    return {
        chart: {
            toolbar: {
                show: true
            }
        },
        title: {
            text: total,
            style: {
                fontSize: '12px'
            }
        },
        xaxis: {
            categories: labels,
            tickPlacement: 'on'
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (val >= 1000 && val < 100000) {
                        return val.toLocaleString(); // Convert to thousands and add 'K'
                    } else if (val >= 100000 && val < 1000000) {
                        return (val / 1000).toFixed(2) + ' rb'; // Convert to thousands and add 'K'
                    }
                    if (val >= 1000000) {
                        return (val / 1000000).toFixed(2) + ' jt'; // Convert to thousands and add 'K'
                    } else {
                        return val;
                    }
                    return val; // Return the value as-is if it's below 1000
                },
                style: {
                    fontSize: '12px'
                }
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: dataLabelStat, // enables labels
            style: {
                colors: ['#000'] // sets label text color to black
            },
            offsetY: -20 // moves the label above the bar
        },
        colors: color,
        stroke: {
            show: true,
            width: 3,
            colors: strokeColor
        }
    };
};

export const comboChartOptionsApex = (total, label1, label2, listLabels, colors, scale1, scale2) => {
    return {
        chart: {
            height: 350,
            type: 'line'
        },
        stroke: {
            width: [2, 4],
            curve: 'smooth'
        },
        title: {
            text: total,
            style: {
                fontSize: '12px',
                color: '#FF5733'
            }
        },
        colors: colors,
        dataLabels: {
            enabled: false,
            enabledOnSeries: [0],
            style: {
                fontSize: '10px',
                colors: ['#FF5733']
            },
            background: {
                enabled: false
            },
            formatter: function (val) {
                if (val >= 1000) {
                    return (val / 1000).toFixed(1) + 'K';
                }
                return val.toFixed(2);
            }
        },
        plotOptions: {
            dataLabels: {
                offsetY: 10
            },
            bar: {
                colors: {
                    ranges: [
                        {
                            from: -Infinity,
                            to: 0,
                            color: 'rgb(255, 0, 0)'
                        }
                    ]
                }
            }
        },
        labels: listLabels,
        xaxis: {
            labels: {
                style: {
                    colors: '#ffffff', // Warna font X-axis
                    fontSize: '10px', // Ukuran font
                    fontFamily: 'Arial, sans-serif' // Gaya font opsional
                }
            },
            categories: listLabels // Label kategori untuk X-axis
        },
        yaxis: [
            {
                title: {
                    text: label2,
                    style: {
                        color: '#ffffff' // Warna untuk judul Y-axis
                    }
                },
                labels: {
                    style: {
                        colors: '#ffffff', // Ganti dengan warna label Y-axis
                        fontSize: '10px' // Ukuran font opsional
                    },
                    formatter: function (val) {
                        if (scale2 === 'percent') {
                            if (val >= 1000) {
                                return (val / 1000).toFixed(1) + 'K%';
                            }
                            return val.toFixed(2) + '%';
                        } else {
                            if (val >= 1000) {
                                return (val / 1000).toFixed(1) + 'K';
                            }
                            return val.toFixed(2);
                        }
                    }
                }
            },
            {
                opposite: true,
                title: {
                    text: label1,
                    style: {
                        color: '#ffffff' // Warna untuk judul Y-axis yang lain
                    }
                },
                labels: {
                    style: {
                        colors: '#ffffff', // Ganti dengan warna label Y-axis
                        fontSize: '10px'
                    },
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
                colors: '#ffffff', // Warna font legenda
                useSeriesColors: false // Agar warna mengikuti warna yang ditentukan
            },
            fontSize: '12px', // Ukuran font legenda
            fontFamily: 'Arial, sans-serif' // Gaya font legenda
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

export const combo3ChartOptionsApex = (total, label1, label2, label3, listLabels, colors, scale1, scale2, scale3) => {
    return {
        chart: {
            height: 350,
            type: 'line'
        },
        stroke: {
            width: [4, 2, 4], // Add width for the third line
            curve: 'smooth'
        },
        title: {
            text: total,
            style: {
                fontSize: '12px',
                color: '#FF5733'
            }
        },
        colors: colors,
        dataLabels: {
            enabled: false,
            enabledOnSeries: [0],
            style: {
                fontSize: '10px',
                colors: ['#FF5733']
            },
            background: {
                enabled: false
            }
        },
        plotOptions: {
            dataLabels: {
                offsetY: 10
            },
            bar: {
                colors: {
                    ranges: [
                        {
                            from: -Infinity,
                            to: 0,
                            color: 'rgb(255, 0, 0)'
                        }
                    ]
                }
            }
        },
        labels: listLabels,
        xaxis: {
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '10px',
                    fontFamily: 'Arial, sans-serif'
                }
            },
            categories: listLabels
        },
        yaxis: [
            {
                title: {
                    text: label1, // Pendapatan current year
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    style: {
                        colors: '#ffffff',
                        fontSize: '10px'
                    },
                    formatter: function (val) {
                        if (scale2 === 'percent') {
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
                    text: label2, // Target RKAP
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    style: {
                        colors: '#ffffff',
                        fontSize: '10px'
                    },
                    formatter: function (val) {
                        if (scale1 === 'percent') {
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
                    text: label3, // Pendapatan previous year
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    style: {
                        colors: '#ffffff',
                        fontSize: '10px'
                    },
                    formatter: function (val) {
                        // Share the same formatting logic as label2
                        if (scale2 === 'percent') {
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
                colors: '#ffffff',
                useSeriesColors: false
            },
            fontSize: '12px',
            fontFamily: 'Arial, sans-serif'
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#FF5733'
            },
            y: {
                // Adjust formatting if needed
            }
        }
    };
};

export const barStackedChartOptionsApex = (total, labels) => {
    return {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    total: {
                        enabled: true,
                        offsetX: 0,
                        style: {
                            fontSize: '13px',
                            fontWeight: 600
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '10px', // Reduced font size for data labels inside the bar
                fontWeight: 'bold',
                colors: ['#fff'] // You can change the color if needed
            },
            formatter: function (val) {
                return parseFloat(val).toFixed(2);
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: total
        },
        xaxis: {
            categories: labels,
            labels: {
                formatter: function (val) {
                    return val + 'K';
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + 'K';
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };
};

export const stackedChartOptionsApexNew = (total, listLabels, toolbar) => {
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
        // plotOptions: {
        //   bar: {
        //     horizontal: false,
        //     borderRadius: 10,
        //     borderRadiusApplication: 'end',
        //     borderRadiusWhenStacked: 'last',
        //     // columnWidth: columnWidth !== null ? columnWidth : '80%', // Adjust this value to reduce/increase bar width
        //     dataLabels: {
        //       total: {
        //         enabled: true,
        //         style: {
        //           fontSize: '10px',
        //           fontWeight: 300
        //         },
        //         formatter: function(val) {
        //             return parseFloat(val).toFixed(2);
        //         }
        //       }
        //     }
        //   },
        // },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            }
        },
        title: {
            text: total,
            style: {
                fontSize: '12px'
            }
        },
        labels: listLabels,
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '8px', // Reduced font size for data labels inside the bar
                fontWeight: 'bold',
                colors: ['#fff'] // You can change the color if needed
            },
            formatter: function (val) {
                return parseFloat(val).toFixed(2);
            }
        },
        xaxis: {
            tickPlacement: 'on'
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (val >= 1000) {
                        return (val / 1000).toFixed(1) + 'K'; // Convert to thousands and append 'K'
                    }
                    return val;
                },
                style: {
                    fontSize: '10px' // Adjust the font size if needed
                }
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'left', // Center the legend horizontally
            // floating: false, // Set to false to make sure it does not float
            offsetY: 0
        },
        fill: {
            opacity: 1
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
        // plotOptions: {
        //   bar: {
        //     horizontal: false,
        //     borderRadius: 10,
        //     borderRadiusApplication: 'end',
        //     borderRadiusWhenStacked: 'last',
        //     // columnWidth: columnWidth !== null ? columnWidth : '80%', // Adjust this value to reduce/increase bar width
        //     dataLabels: {
        //       total: {
        //         enabled: true,
        //         style: {
        //           fontSize: '10px',
        //           fontWeight: 300
        //         },
        //         formatter: function(val) {
        //             return parseFloat(val).toFixed(2);
        //         }
        //       }
        //     }
        //   },
        // },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            }
        },
        title: {
            text: total,
            style: {
                fontSize: '12px'
            }
        },
        labels: listLabels,
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '8px', // Reduced font size for data labels inside the bar
                fontWeight: 'bold',
                colors: ['#fff'] // You can change the color if needed
            },
            formatter: function (val) {
                return parseFloat(val).toFixed(2);
            }
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#ffffff', // Warna font X-axis
                    fontSize: '10px', // Ukuran font
                    fontFamily: 'Arial, sans-serif' // Gaya font opsional
                }
            },
            tickPlacement: 'on'
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff', // Ganti dengan warna label Y-axis
                    fontSize: '10px' // Ukuran font opsional
                },
                formatter: function (val) {
                    if (val >= 1000) {
                        return (val / 1000).toFixed(1) + 'K'; // Convert to thousands and append 'K'
                    }
                    return val;
                }
            }
        },
        legend: {
            labels: {
                colors: '#ffffff', // Warna font legenda
                useSeriesColors: false // Agar warna mengikuti warna yang ditentukan
            },
            position: 'bottom',
            horizontalAlign: 'center', // Center the legend horizontally
            // floating: false, // Set to false to make sure it does not float
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
            y: {
                // Adjust formatting if needed
            }
        }
    };
};

export const distributedColumnChart = (labels, colors) => {
    return {
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // Handle chart click event here if needed
                }
            }
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            tickPlacement: 'on',
            categories: labels,
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (val >= 1000) {
                        return (val / 1000).toFixed(1) + 'K'; // Convert to thousands and add 'K'
                    }
                    return val; // Return the value as-is if it's below 1000
                },
                style: {
                    fontSize: '12px'
                }
            }
        }
    };
};

export const distributedColumnChart2 = (labels, colors) => {
    return {
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // Handle chart click event here if needed
                }
            }
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            tickPlacement: 'on',
            categories: labels,
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (val >= 1000 && val < 100000) {
                        return val.toLocaleString(); // Convert to thousands and add 'K'
                    } else if (val >= 100000 && val < 1000000) {
                        return (val / 1000).toFixed(2) + ' rb'; // Convert to thousands and add 'K'
                    }
                    if (val >= 1000000) {
                        return (val / 1000000).toFixed(2) + ' jt'; // Convert to thousands and add 'K'
                    } else {
                        return val;
                    }
                    return val; // Return the value as-is if it's below 1000
                },
                style: {
                    fontSize: '12px'
                }
            }
        }
    };
};
