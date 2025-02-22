import { barHorizontalChartApex, lineChartApex, stackedChartOptionsApex } from '@/controller/chartStyle/chartDummy';
import { formatCurrency } from '@/controller/dummyController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import levyRoutersPenjualanController from '@/controller/getApiFromThisApp/sales/levyRoutersPenjualanController';
import incomingCpoScmController from '@/controller/getApiFromThisApp/supplyChain/incomingCpoScmController';
import outstandingCpoScmController from '@/controller/getApiFromThisApp/supplyChain/outstandingCpoScmController';
import saldoPeScmController from '@/controller/getApiFromThisApp/supplyChain/saldoPeScmController';
import bulkStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/bulkStockScmController';
import cpoStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/cpoStockScmController';
import retailStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/retailStockScmController';
import moment from 'moment';

export default new (class scmDetailController {
    marketReuters = async (form) => {
        try {
            const color = ['#F9E79F', '#D6EAF8', '#FAE5D3', '#F2D7D5', '#73c6b6', '#aeb6bf', '#d2b4de'];
            const result = [];
            const response = await levyRoutersPenjualanController.getByPeriod(form);
            const productBulk = await productMasterController.getAll();
            const bulk = productBulk.filter((item) => item.jenis == 'bulk');
            // console.log(response);
            const listBulk = [];
            if (bulk != null) {
                for (let i = 0; i < bulk.length; i++) {
                    listBulk.push({
                        name: bulk[i].name,
                        id: bulk[i].id,
                        color: color[i]
                    });
                }
            }
            if (response != null) {
                for (let j = 0; j < response.length; j++) {
                    const averageKurs = response[j].averageKurs == null ? 0 : formatCurrency(Number(response[j].averageKurs).toFixed(2));
                    const averageMarketUsd = response[j].averageMarketReutersExcldLevyDuty == null ? null : response[j].averageMarketReutersExcldLevyDuty;
                    const listUsd = [];
                    if (averageMarketUsd != null) {
                        for (let i = 0; i < averageMarketUsd.length; i++) {
                            listUsd.push({
                                product: averageMarketUsd[i].product,
                                avg: formatCurrency(Number(averageMarketUsd[i].avg).toFixed(2))
                            });
                        }
                    }
                    const averageMarketIdr = response[j].averageMarketIdr == null ? null : response[j].averageMarketIdr;
                    const listIdr = [];
                    if (averageMarketIdr != null) {
                        for (let i = 0; i < averageMarketIdr.length; i++) {
                            listIdr.push({
                                product: averageMarketIdr[i].product,
                                avg: formatCurrency(Number(averageMarketIdr[i].avg).toFixed(2))
                            });
                        }
                    }

                    const listTable = [];

                    const listKurs = [];
                    const listLevy = [];
                    const listMarket = [];
                    const listExcld = [];
                    const listMarketIdr = [];

                    const months = await response[j].months;
                    if (months) {
                        for (let i = 0; i < months.length; i++) {
                            const kurs = months[i].kurs;
                            for (let k = 0; k < kurs.length; k++) {
                                listKurs.push({
                                    id: kurs[k].id,
                                    id_mata_uang: kurs[k].id_mata_uang,
                                    mata_uang: kurs[k].mata_uang,
                                    tanggal: kurs[k].tanggal,
                                    value: kurs[k].value
                                });
                            }

                            const products = months[i].products;
                            for (let k = 0; k < products.length; k++) {
                                const levyduty = products[k].levyduty || [];
                                for (let l = 0; l < levyduty.length; l++) {
                                    listLevy.push({
                                        name: products[k].product.trim().toLowerCase(),
                                        nilai: levyduty[l].nilai,
                                        id_bulky: levyduty[l].id_bulky,
                                        id_mata_uang: levyduty[l].id_mata_uang,
                                        tanggal: levyduty[l].tanggal
                                    });
                                }

                                const marketReuters = products[k].marketReuters || [];
                                for (let l = 0; l < marketReuters.length; l++) {
                                    listMarket.push({
                                        name: products[k].product.trim().toLowerCase(),
                                        nilai: marketReuters[l].nilai,
                                        id_bulky: marketReuters[l].id_bulky,
                                        id_mata_uang: marketReuters[l].id_mata_uang,
                                        tanggal: marketReuters[l].tanggal
                                    });
                                }

                                const marketReutersExcld = products[k].marketReutersExcldLevyDuty || [];
                                for (let l = 0; l < marketReutersExcld.length; l++) {
                                    listExcld.push({
                                        name: products[k].product.trim().toLowerCase(),
                                        nilai: marketReutersExcld[l].nilai,
                                        tanggal: marketReutersExcld[l].tanggal
                                    });
                                }

                                const marketIdr = products[k].marketIdr || [];
                                for (let l = 0; l < marketIdr.length; l++) {
                                    listMarketIdr.push({
                                        name: products[k].product.trim().toLowerCase(),
                                        nilai: marketIdr[l].nilai,
                                        tanggal: marketIdr[l].tanggal
                                    });
                                }
                            }
                        }
                    }

                    // Debugging untuk memastikan data sudah masuk
                    console.log('listKurs:', listKurs);
                    console.log('listBulk:', listBulk);

                    if (listKurs.length > 0 && listBulk.length > 0) {
                        for (let i = 0; i < listKurs.length; i++) {
                            const productData = {};

                            for (let k = 0; k < listBulk.length; k++) {
                                let nilaiLevy = 0;
                                let nilaiReuters = 0;
                                let nilaiExcld = 0;
                                let nilaiIdr = 0;

                                const bulkName = listBulk[k].name.trim().toLowerCase(); // Normalisasi nama

                                // Levy Duty
                                const levyDuty = listLevy.find((item) => item.tanggal === listKurs[i].tanggal && item.id_bulky === listBulk[k].id);
                                if (levyDuty) {
                                    nilaiLevy = levyDuty.nilai;
                                }

                                // Market Reuters
                                const market = listMarket.find((item) => item.tanggal === listKurs[i].tanggal && item.id_bulky === listBulk[k].id);
                                if (market) {
                                    nilaiReuters = market.nilai;
                                }

                                // Market Excld Levy & Duty
                                const excld = listExcld.find((item) => item.tanggal === listKurs[i].tanggal && item.name === bulkName);
                                if (excld) {
                                    nilaiExcld = excld.nilai;
                                }

                                // Market IDR
                                const idr = listMarketIdr.find((item) => item.tanggal === listKurs[i].tanggal && item.name === bulkName);
                                if (idr) {
                                    nilaiIdr = idr.nilai;
                                }

                                // Simpan data dalam productData sesuai dengan productList
                                productData[listBulk[k].id] = {
                                    name: listBulk[k].name,
                                    reuters: nilaiReuters,
                                    levy: nilaiLevy,
                                    excld: nilaiExcld,
                                    idr: nilaiIdr
                                };
                            }

                            listTable.push({
                                tanggal: listKurs[i].tanggal,
                                id_mata_uang: listKurs[i].id_mata_uang,
                                value: listKurs[i].value,
                                productData: productData
                            });
                        }
                    }

                    // Debugging hasil akhir
                    console.log('listTable:', listTable);

                    // Final Result
                    result.push({
                        year: response[j].year == null ? '' : response[j].year,
                        averageKurs: averageKurs,
                        averageMarketUsd: listUsd,
                        averageMarketIdr: listIdr,
                        dataTable: listTable,
                        productList: listBulk
                    });
                }
            }
            return result;
        } catch (error) {
            return null;
        }
    };
    stockCpo = async (form) => {
        try {
            const list = [];
            const series = [];
            const label = [];
            let totalStock = 0;
            const response = await cpoStockScmController.getByPeriod(form);
            if (response != null) {
                const value = [];
                totalStock = response.totalStock == null ? 0 : formatCurrency(Number(response.totalStock).toFixed(2));
                const data = response.data;
                if (data.length > 0 && data != null) {
                    for (let i = 0; i < data.length; i++) {
                        value.push(Number(Number(data[i].qty).toFixed(2)));
                        label.push([data[i].tanki.name, data[i].tanki.lokasi.name]);
                        list.push({
                            tanki: data[i].tanki.name,
                            lokasi: data[i].tanki.lokasi.name,
                            qty: formatCurrency(Number(data[i].qty).toFixed(2)),
                            space: formatCurrency(Number(data[i].space).toFixed(2)),
                            umur: formatCurrency(Number(data[i].umur).toFixed(0)),
                            kapasitas: formatCurrency(Number(data[i].tanki.kapasitas).toFixed(2))
                        });
                    }
                }
                series.push({
                    name: 'Stok CPO',
                    data: value
                });
            }
            return { table: list, series: series, chart: barHorizontalChartApex(label), total: totalStock };
        } catch (error) {
            return null;
        }
    };
    outstandingCpo = async () => {
        try {
            const list = [];
            const series = [];
            const label = [];
            const response = await outstandingCpoScmController.getByPeriod();
            if (response != null) {
                const value = [];
                const data = response.data;
                const top5 = data.sort((a, b) => b.value - a.value).slice(0, 5); // Ambil 5 nilai teratas
                for (let i = 0; i < top5.length; i++) {
                    value.push(top5[i].value);
                    label.push([top5[i].kontrak, top5[i].supplier.name]);
                    list.push({
                        supplier: top5[i].supplier.name,
                        kontrak: top5[i].kontrak,
                        qty: formatCurrency(Number(top5[i].qty).toFixed(2)),
                        harga: formatCurrency(Number(top5[i].harga).toFixed(2)),
                        value: formatCurrency(Number(top5[i].value).toFixed(2))
                    });
                }
                series.push({
                    name: 'Total Harga',
                    data: value
                });
            }
            return { table: list, series: series, chart: barHorizontalChartApex(label) };
        } catch (error) {
            return null;
        }
    };
    actualIncomingCpo = async (form) => {
        try {
            const list = [];
            const series = [];
            const label = [];
            let chart = null;
            const result = await incomingCpoScmController.getByPeriod(form);
            if (result != null) {
                const target = [];
                const qty = [];
                const data = result.data;
                for (let i = 0; i < data.length; i++) {
                    qty.push(Number(data[i].monthQty));
                    // target.push(Number(10096354));
                    target.push(Number(data[i].target));
                    label.push(moment(`${data[i].month} ${data[i].year}`, 'M YYYY').format('MMMM YYYY'));
                    list.push({
                        qty: formatCurrency(Number(data[i].monthQty).toFixed(2)),
                        target: formatCurrency(Number(data[i].target).toFixed(2)),
                        remaining: formatCurrency(Number(data[i].remaining).toFixed(2)),
                        total: formatCurrency(Number(data[i].monthValue).toFixed(2)),
                        month: moment(`${data[i].month} ${data[i].year}`, 'M YYYY').format('MMMM YYYY')
                    });
                }

                series.push({ name: 'Qty', data: qty }, { name: 'target', data: target });

                chart = stackedChartOptionsApex('', label, null);
                // console.log(stackedChartOptionsApex('', label, null));
            }
            const dataSeries = series.map((dataItem) => ({
                name: dataItem.name,
                data: dataItem.data
            }));
            return { table: list, series: dataSeries, chart: chart };
        } catch (error) {
            return null;
        }
    };
    saldoPe = async (form) => {
        try {
            const label = [];
            const series = [];
            const table = [];
            let result = {
                series: [],
                chartOptions: null,
                table: null
            };
            const response = await saldoPeScmController.getAll();
            if (response != null) {
                const saldo = response
                    .filter((item) => {
                        const itemDate = new Date(item.tanggal); // Ubah ke tipe Date
                        return itemDate >= new Date(form.tanggalAwal) && itemDate <= new Date(form.tanggalAkhir);
                    })
                    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
                if (saldo.length > 0) {
                    for (let i = 0; i < saldo.length; i++) {
                        label.push(saldo[i].tanggal);
                        series.push(saldo[i].saldo_tersedia);
                    }
                    const nilai = saldo.length - 1;
                    result.table = {
                        tanggal: moment(saldo[nilai].tanggal).format('DD MMMM YYYY'),
                        saldo_awal: formatCurrency(Number(saldo[nilai].saldo_awal).toFixed(2)),
                        saldo_pakai: formatCurrency(Number(saldo[nilai].saldo_pakai).toFixed(2)),
                        saldo_tersedia: formatCurrency(Number(saldo[nilai].saldo_tersedia).toFixed(2))
                    };
                }
                result.series.push({
                    name: 'Saldo Tersedia',
                    data: series
                });
                result.chartOptions = lineChartApex(label);
            }
            return result;
        } catch (error) {
            return null;
        }
    };
    stockRitel = async (form) => {
        try {
            const listQtyProduct = [];
            const response = await retailStockScmController.getByPeriod(form);
            const produk = await productMasterController.getAll();
            const ritel = produk.filter((item) => item.jenis == 'ritel');

            if (response != null) {
                // const warehouse = response.warehouse;
                // for (let i = 0; i < warehouse.length; i++) {
                //     const detail = warehouse[i].detail;
                //     for (let j = 0; j < detail.length; j++) {
                //         listQtyProduct.push({
                //             idRitel: detail[j].id_ritel,
                //             product: detail[j].product.name,
                //             qty: Number(detail[j].qty),
                //             tanggal: detail[j].tanggal
                //         });
                //     }
                // }
                const chart = response.chart;
                if (chart.length > 0) {
                    for (let i = 0; i < chart.length; i++) {
                        const products = chart[i];
                        for (let j = 0; j < products.length; j++) {
                            listQtyProduct.push({
                                idRitel: products[j].id_ritel,
                                product: products[j].product.name,
                                qty: Number(products[j].qty),
                                tanggal: products[j].tanggal
                            });
                        }
                    }
                }
            }
            // 🔥 Grouping data berdasarkan idRitel dan tanggal
            const groupedData = listQtyProduct
                .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                .reduce((acc, item) => {
                    const key = `${item.idRitel}-${item.tanggal}`; // Buat kunci unik
                    if (!acc[key]) {
                        acc[key] = { ...item }; // Simpan item pertama kali
                    } else {
                        acc[key].qty += item.qty; // Tambahkan qty jika sudah ada
                    }
                    return acc;
                }, {});

            // 🔹 Konversi kembali ke array
            const finalList = Object.values(groupedData);
            const listLabel = [...new Set(finalList.map((item) => moment(item.tanggal).format('DD MMM YYYY')))];

            // Masuk ke Data Produk
            const series = [];
            if (ritel != null) {
                for (let i = 0; i < ritel.length; i++) {
                    const dataRitel = finalList.filter((item) => item.idRitel == ritel[i].id);
                    if (dataRitel != null) {
                        const nilai = [];
                        for (let j = 0; j < listLabel.length; j++) {
                            const value = dataRitel.find((item) => item.tanggal == moment(listLabel[j], 'DD MMM YYYY').format('YYYY-MM-DD'));
                            if (value != null) {
                                nilai.push(Number(value.qty));
                            } else {
                                nilai.push(0);
                            }
                        }
                        series.push({
                            name: ritel[i].name,
                            data: nilai
                        });
                    } else {
                        const nilai = [];
                        for (let j = 0; j < listLabel.length; j++) {
                            nilai.push(0);
                        }
                        series.push({
                            name: ritel[i].name,
                            data: nilai
                        });
                    }
                }
            }
            return { series: series, chart: lineChartApex(listLabel) }; // Mengembalikan hasil
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    stockBulk = async (form) => {
        try {
            const listQtyProduct = [];
            const listQtyProduct2 = [];
            const response = await bulkStockScmController.getByPeriod(form);
            const produk = await productMasterController.getAll();
            const bulk = produk.filter((item) => item.jenis == 'bulk');

            if (response != null) {
                const chart = response.chart;
                if (chart.length > 0) {
                    for (let i = 0; i < chart.length; i++) {
                        const products = chart[i];
                        for (let j = 0; j < products.length; j++) {
                            listQtyProduct.push({
                                idBulk: products[j].id_bulky,
                                product: products[j].product.name,
                                qty: Number(products[j].qty),
                                tanggal: products[j].tanggal
                            });
                        }
                    }
                }
            }
            // 🔥 Grouping data berdasarkan idRitel dan tanggal
            const groupedData = listQtyProduct
                .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                .reduce((acc, item) => {
                    const key = `${item.idBulk}-${item.tanggal}`; // Buat kunci unik
                    if (!acc[key]) {
                        acc[key] = { ...item }; // Simpan item pertama kali
                    } else {
                        acc[key].qty += item.qty; // Tambahkan qty jika sudah ada
                    }
                    return acc;
                }, {});

            // 🔹 Konversi kembali ke array
            const finalList = Object.values(groupedData);
            const listLabel = [...new Set(finalList.map((item) => moment(item.tanggal).format('DD MMM YYYY')))];
            // console.log(listLabel);

            // Masuk ke Data Produk
            const series = [];
            if (bulk != null) {
                for (let i = 0; i < bulk.length; i++) {
                    const dataRitel = finalList.filter((item) => item.idBulk == bulk[i].id);
                    if (dataRitel != null) {
                        const nilai = [];
                        for (let j = 0; j < listLabel.length; j++) {
                            const value = dataRitel.find((item) => item.tanggal == moment(listLabel[j], 'DD MMM YYYY').format('YYYY-MM-DD'));
                            if (value != null) {
                                nilai.push(Number(value.qty));
                            } else {
                                nilai.push(0);
                            }
                        }
                        series.push({
                            name: bulk[i].name,
                            data: nilai
                        });
                        // console.log(nilai);
                    } else {
                        const nilai = [];
                        for (let j = 0; j < listLabel.length; j++) {
                            nilai.push(0);
                        }
                        series.push({
                            name: bulk[i].name,
                            data: nilai
                        });
                    }
                }
            }
            return { series: series, chart: lineChartApex(listLabel) }; // Mengembalikan hasil
        } catch (error) {
            console.error(error);
            return null;
        }
    };
})();
