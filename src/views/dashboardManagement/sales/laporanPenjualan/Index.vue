<script setup>
import { formatCurrency } from '@/controller/dummyController';
import customerPartnerMasterController from '@/controller/getApiFromThisApp/master/customerPartnerMasterController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import laporanPenjualanController from '@/controller/getApiFromThisApp/sales/laporanPenjualanController';
import uraianPenjualanController from '@/controller/getApiFromThisApp/sales/uraianPenjualanController';
import { FilterMatchMode } from '@primevue/core/api';
import FileSaver from 'file-saver';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';

const listTable = ref([]);
const search = ref('');
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const allData = ref();
const loadingData = ref(false);

const listProduct = ref([]);
const listUraian = ref([]);
const listCustomer = ref([]);

let count = ref(0);

const formData = ref({
    id: null,
    customer_id: null,
    product_id: null,
    kontrak: null,
    tanggal: moment().format('YYYY-MM-DD'),
    qty: null,
    harga_satuan: null,
    margin_percent: null
});

const optionButton = ref(0);

const op = ref();

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());
const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);

const initFilters = () => {
    search.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadData();
});

const loadData = async () => {
    loadingData.value = true;
    try {
        const form = {
            tanggalAwal: beforeDate.value,
            tanggalAkhir: now.value
        };
        const data = await laporanPenjualanController.loadTable(form);
        allData.value = data;
        const ritel = data.ritel;
        const bulk = data.bulk;
        console.log(data);

        const produk = await productMasterController.getAll();
        // console.log('produk:', produk);
        // if (optionButton.value == 1) {
        //     listTable.value = ritel.products;
        //     listProduct.value = produk.filter((item) => item.jenis == 'ritel');
        // } else {
        //     listProduct.value = produk.filter((item) => item.jenis == 'bulk');
        //     listTable.value = bulk.products;
        // }

        listProduct.value = [...produk.filter((item) => item.jenis === (optionButton.value == 1 ? 'ritel' : 'bulk'))];
        listTable.value = optionButton.value == 1 ? ritel.products : bulk.products;
        // listTable.value = [...produk.filter((item) => item.jenis === (optionButton.value == 1 ? ritel.products : bulk.products))];

        loadingData.value = false;
        // await loadUraian();
        // await loadCustomer();
    } catch (error) {
        loadingData.value = false;
        listTable.value = [];
    }
};

const loadUraian = async () => {
    const response = await uraianPenjualanController.getAll();
    listUraian.value = response;
};

const loadCustomer = async () => {
    const response = await customerPartnerMasterController.getAll();
    listCustomer.value = response;
};

const showDrawer = async (data) => {
    try {
        await loadUraian();
        await loadCustomer();
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const list = [];
            const response = await laporanPenjualanController.getByID(data.id);
            const history = response.history;
            for (let i = 0; i < history.length; i++) {
                let from,
                    to = null;
                // if (history[i].changes.length == 0) {
                //     from = null;
                //     to = null;
                // } else {
                //     from = history[i].changes.name.old;
                //     to = history[i].changes.name.new;
                // }
                list.push({
                    action: history[i].action,
                    user_name: history[i].user_name,
                    date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
                    changes: from == null && to == null ? [] : []
                });
            }
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.customer_id = data.customer_id;
            formData.value.product_id = data.product_id;
            formData.value.kontrak = data.kontrak;
            formData.value.qty = Number(data.qty);
            formData.value.harga_satuan = Number(data.harga_satuan);
            formData.value.margin_percent = Number(data.margin_percent);
            formData.value.tanggal = moment(data.tanggal, 'YYYY-MM-DD').toDate();
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.customer_id = null;
            formData.value.product_id = null;
            formData.value.qty = null;
            formData.value.kontrak = null;
            formData.value.harga_satuan = null;
            formData.value.margin_percent = null;
            formData.value.tanggal = moment().format('YYYY-MM-DD');
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.customer_id = null;
        formData.value.product_id = null;
        formData.value.qty = null;
        formData.value.harga_satuan = null;
        formData.value.kontrak = null;
        formData.value.margin_percent = null;
        formData.value.tanggal = moment().format('YYYY-MM-DD');
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.customer_id = null;
    formData.value.product_id = null;
    formData.value.qty = null;
    formData.value.harga_satuan = null;
    formData.value.kontrak = null;
    formData.value.margin_percent = null;
    formData.value.tanggal = moment().format('YYYY-MM-DD');
};

const toggle = async (event) => {
    op.value.toggle(event);
};

const exportToExcel = () => {
    const { saveAs } = FileSaver; // Ambil saveAs dari FileSaver
    if (listTable.value.length === 0) {
        messages.value = [{ severity: 'warn', content: 'Tidak ada data untuk diekspor!', id: count.value++, icon: 'pi-exclamation-triangle' }];
        return;
    }

    const list = [];
    const response = listTable.value;
    for (let i = 0; i < response.length; i++) {
        const detail = response[i].detail;
        for (let j = 0; j < detail.length; j++) {
            list.push({
                Kontrak: detail[j].kontrak,
                Customer: detail[j].customer.name,
                Product: detail[j].product.name,
                Tanggal: detail[j].tanggal,
                'Margin (%)': Number(detail[j].margin_percent),
                'Harga Satuan (IDR/Kg)': Number(detail[j].harga_satuan),
                'Jumlah (Kg)': Number(detail[j].qty),
                'Nilai (IDR)': Number(detail[j].value)
            });
        }
    }

    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Dashboard INL Edge');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(data, `Data-Laporan-Penjualan-${moment().format('YYYY-MM-DD-HHmmss')}.xlsx`);
};

const changeDate = async () => {
    const list = dates.value;
    const listdate = [];
    let start, end;

    if (list != null) {
        if (list.length > 1) {
            start = moment(list[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
            const lastDayOfMonth = moment(list[0], 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');
            end = moment(list[1] === null ? lastDayOfMonth : list[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
        } else {
            start = beforeDate.value;
            end = now.value;
        }
    } else {
        start = beforeDate.value;
        end = now.value;
    }
    listdate.push(convertDate(start), convertDate(end));

    beforeDate.value = start;
    now.value = end;
    dates.value = listdate;

    await loadData();
    await toggle();
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate();
    return date;
};

const selectButton = async (val) => {
    optionButton.value = val;
    await loadData();
};

const submitData = async () => {
    if (formData.value.customer_id != null && formData.value.product_id != null && formData.value.tanggal != null && formData.value.qty != null && formData.value.harga_satuan != null && formData.value.margin_percent != null) {
        formData.value.tanggal = moment(formData.value.tanggal).format('YYYY-MM-DD');
        if (statusForm.value == 'add') {
            const response = await laporanPenjualanController.addPost(formData.value);
            // const load = response.data;
            if (response.status == true) {
                messages.value = [{ severity: 'success', content: 'Data berhasil di tambahkan', id: count.value++, icon: 'pi-check-circle' }];
                loadingSave.value = true;
                setTimeout(function () {
                    loadData();
                    drawerCond.value = false;
                    loadingSave.value = false;
                }, timeResponse.value);
            } else {
                messages.value = [{ severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', id: count.value++, icon: 'pi-times-circle' }];
            }
        } else {
            console.log(formData.value);
            const response = await laporanPenjualanController.updatePost(formData.value.id, formData.value);
            // const load = response.data;
            if (response.status == true) {
                messages.value = [{ severity: 'success', content: 'Data berhasil di simpan', id: count.value++, icon: 'pi-check-circle' }];
                loadingSave.value = true;
                setTimeout(function () {
                    loadData();
                    drawerCond.value = false;
                    loadingSave.value = false;
                }, timeResponse.value);
            } else {
                messages.value = [{ severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', id: count.value++, icon: 'pi-times-circle' }];
            }
        }
    } else {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    }
};
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-3xl">Laporan Penjualan</span>
            <div class="flex gap-3">
                <button @click="showDrawer(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-blue-500 hover:bg-blue-700 text-white rounded-lg flex gap-2">
                    <i class="pi pi-plus"></i>
                    <span>Tambah Data</span>
                </button>
                <button
                    v-if="loadingData == false"
                    @click="exportToExcel"
                    class="px-3 py-2 border rounded-lg bg-emerald-500 text-white hover:shadow-md hover:bg-emerald-600 transition-all duration-300 shadow-sm flex items-center gap-2 justify-center"
                >
                    <i class="pi pi-file-excel"></i>
                    <span>Export ke Excel</span>
                </button>
            </div>
        </div>
        <Drawer v-model:visible="drawerCond" position="right" class="!w-full md:!w-[30rem]">
            <template #header>
                <span class="text-[1vw] font-bold">Form Laporan Penjualan</span>
            </template>
            <template #footer>
                <div class="flex w-full justify-end pt-3 border-t">
                    <span class="text-[0.7vw]"><span class="text-red-500 font-bold text-[1vw]">*</span> Wajib di Isi</span>
                </div>
            </template>
            <div class="flex flex-col gap-4">
                <transition-group name="p-message" tag="div" class="flex flex-col">
                    <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity" class="mt-4"><i :class="`pi ${msg.icon}`"></i> {{ msg.content }}</Message>
                </transition-group>
                <div class="flex flex-col gap-1">
                    <label for="lokasi">Kontrak <small class="text-red-500 font-bold">*</small></label>
                    <InputText type="text" v-model="formData.kontrak" placeholder="No. Kontrak" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="lokasi">Produk <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.product_id" :options="listProduct" optionLabel="name" filter optionValue="id" placeholder="Pilih Produk" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Customer <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.customer_id" :options="listCustomer" optionLabel="name" filter optionValue="id" placeholder="Pilih Customer" class="w-full" />
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <label for="date" class="font-bold">Tanggal <small class="text-red-500 font-bold">*</small></label>
                    <DatePicker v-model="formData.tanggal" dateFormat="yy-mm-dd" :maxDate="maxDate" showIcon placeholder="Please input Date" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="kapasitas">Jumlah <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.qty" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="harga_satuan">Harga Satuan ({{ optionButton == 0 ? 'IDR/Kg' : 'IDR/Box' }}) <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.harga_satuan" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="margin_percent">Margin <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.margin_percent" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-row-reverse w-full gap-3">
                    <button @click="refreshForm" class="px-3 py-2 w-full border rounded-lg hover:shadow-md hover:shadow-black transition-all duration-300 shadow-sm shadow-black flex items-center gap-2 justify-center">
                        <i class="pi pi-refresh"></i><span>Reset</span>
                    </button>
                    <button
                        @click="submitData"
                        :disabled="loadingSave == true ? true : false"
                        :class="loadingSave == true ? 'opacity-50' : 'opacity-100'"
                        class="px-3 py-2 w-full border rounded-lg border-transparent hover:shadow-md hover:shadow-black hover:bg-emerald-800 transition-all duration-300 shadow-sm text-white shadow-black flex items-center gap-2 justify-center bg-emerald-700"
                    >
                        <i class="pi pi-save"></i><span>{{ loadingSave == true ? 'Saving..' : 'Save' }}</span>
                    </button>
                </div>
                <span class="mt-3 px-3" v-if="statusForm == 'edit'">Log Activity</span>
                <ScrollPanel v-if="statusForm == 'edit'" style="width: 100%; height: 22rem">
                    <div class="flex flex-col gap-2 w-full p-3">
                        <div class="flex flex-col pb-2 px-2" v-for="(item, index) in logFile" :key="index" :class="index < logFile.length ? 'border-b' : 'border-none'">
                            <div class="flex items-center w-full gap-5">
                                <i class="pi pi-user p-3 bg-pink-500 text-white rounded-full" style="font-size: 0.8vw"></i>
                                <div class="flex flex-col gap-1 w-full">
                                    <span class="text-[0.8vw] font-bold">{{ item.user_name }}</span>
                                    <div class="flex items-center gap-3">
                                        <i class="pi pi-clock" style="font-size: 0.5vw"></i>
                                        <span class="text-[0.5vw]">{{ item.date }}</span>
                                    </div>
                                </div>
                                <div class="w-full flex flex-col items-end gap-1">
                                    <small class="uppercase text-[0.6vw] font-bold p-2 rounded-full bg-slate-200">{{ item.action }}</small>
                                    <div class="flex flex-col items-end">
                                        <span class="text-[0.6vw] flex flex-row-reverse gap-2 items-center justify-end" v-for="(change, indexes) in item.changes" :key="indexes"
                                            ><i :class="change.icon" style="font-size: 0.5vw"></i><span class="font-bold">{{ change.name }}</span></span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollPanel>
            </div>
        </Drawer>
        <Popover ref="op">
            <div class="flex flex-col items-center gap-4 w-[25rem] py-2">
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex flex-col gap-1 w-full items-start">
                        <label for="pmg" class="text-[0.8vw]">Pilih Periode</label>
                        <DatePicker v-model="dates" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :maxDate="maxDate" :manualInput="false" placeholder="Select Date Range" class="w-full" />
                    </div>
                </div>
                <Divider />
                <button @click="changeDate" class="py-2 px-6 w-full flex gap-3 items-center justify-center rounded-lg shadow shadow-gray-700 hover:bg-cyan-600 transition-all duration-300 text-white bg-cyan-500">
                    <i class="pi pi-verified" style="font-size: 0.8vw"></i><span class="text-[0.8vw]">Submit</span>
                </button>
            </div>
        </Popover>
        <Card>
            <template #title>
                <div class="flex gap-2 items-center mb-5">
                    <div class="flex items-center justify-between gap-3 w-full">
                        <button @click="toggle" class="py-2 px-3 text-black text-[0.8vw] flex gap-3 items-center bg-pink-200 shadow-md rounded-lg shadow-gray-200 font-bold hover:bg-pink-300 transition-all duration-300">
                            <i class="pi pi-calendar" style="font-size: 0.8vw"></i><span>Filter</span>
                        </button>
                        <Chip :label="`${moment(beforeDate).format('DD MMM YYYY')} - ${moment(now).format('DD MMM YYYY')}`" icon="pi pi-calendar" style="font-size: 0.6vw" class="font-bold" />
                    </div>
                    <div class="w-full flex justify-end items-center">
                        <div class="flex gap-3 p-2 border-2 rounded-xl">
                            <button @click="selectButton(0)" :class="optionButton == 0 ? 'bg-pink-500 text-black shadow' : ''" class="px-3 py-1 text-[0.8vw] rounded-lg">Bulky</button>
                            <button @click="selectButton(1)" :class="optionButton == 1 ? 'bg-pink-500 text-black shadow' : ''" class="px-3 py-1 text-[0.8vw] rounded-lg">Retail</button>
                        </div>
                    </div>
                    <!-- <InputGroup>
                        <InputText placeholder="Search Components" v-model="search['global'].value" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup> -->
                </div>
            </template>
            <template #content>
                <div v-if="loadingData == true" class="flex w-full justify-center font-bold">
                    <span>Loading Data ...</span>
                </div>
                <div v-else class="flex flex-col gap-3">
                    <InputGroup>
                        <InputText placeholder="Search Components" v-model="search['global'].value" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                    <ScrollPanel style="width: 100%; height: 35vw">
                        <div v-if="listTable.length < 1" class="flex w-full justify-center items-center font-bold">
                            <span>- Data not found -</span>
                        </div>
                        <div v-else class="flex flex-col gap-3">
                            <Panel v-for="(item, index) in listTable" :key="index" toggleable :collapsed="true">
                                <template #header>
                                    <span class="text-[0.9vw] font-bold italic">{{ item.name }}</span>
                                </template>
                                <DataTable :value="item.detail" showGridlines>
                                    <Column field="kontrak" sortable style="width: 20%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #header>
                                            <div class="flex w-full justify-center font-bold text-black">
                                                <span>Kontrak</span>
                                            </div>
                                        </template>
                                        <template #body="{ data }">
                                            <div class="flex w-full justify-start">
                                                <span>{{ data.kontrak }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="customer.name" sortable style="width: 20%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #header>
                                            <div class="flex w-full justify-center font-bold text-black">
                                                <span>Customer</span>
                                            </div>
                                        </template>
                                        <template #body="{ data }">
                                            <div class="flex w-full justify-start">
                                                <span>{{ data.customer.name }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="tanggal" sortable style="width: 10%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #header>
                                            <div class="flex w-full justify-center font-bold text-black">
                                                <span>Tanggal</span>
                                            </div>
                                        </template>
                                        <template #body="{ data }">
                                            <div class="flex w-full justify-start">
                                                <span>{{ moment(data.tanggal).format('DD MMM YYYY') }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="totalQty" sortable style="width: 13%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #header>
                                            <div class="flex w-full justify-center font-bold text-black">
                                                <span>Margin (%)</span>
                                            </div>
                                        </template>
                                        <template #body="{ data }">
                                            <div class="flex w-full justify-end">
                                                <span class="capitalize">{{ formatCurrency(Number(data.margin_percent).toFixed(2)) }}%</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="harga_satuan" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #header>
                                            <div class="flex w-full justify-center font-bold text-black">
                                                <span>Harga Satuan ({{ optionButton == 0 ? 'IDR/Kg' : 'IDR/Box' }}) </span>
                                            </div>
                                        </template>
                                        <template #body="{ data }">
                                            <div class="flex w-full justify-end">
                                                <span class="capitalize">{{ formatCurrency(Number(data.harga_satuan).toFixed(2)) }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="qty" sortable style="width: 15%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #header>
                                            <div class="flex w-full justify-center font-bold text-black">
                                                <span>Jumlah ({{ optionButton == 0 ? 'Kg' : 'Box' }}) </span>
                                            </div>
                                        </template>
                                        <template #body="{ data }">
                                            <div class="flex w-full justify-end">
                                                <span class="capitalize">{{ formatCurrency(Number(data.qty).toFixed(2)) }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="value" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #header>
                                            <div class="flex w-full justify-center font-bold text-black">
                                                <span>Nilai</span>
                                            </div>
                                        </template>
                                        <template #body="{ data }">
                                            <div class="flex w-full justify-end">
                                                <span class="capitalize">{{ formatCurrency(Number(data.value).toFixed(2)) }}</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="id" style="width: 5%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                                        <template #body="{ data }">
                                            <div class="flex justify-center items center">
                                                <button @click="showDrawer(data)" class="p-3 border rounded-full flex bg-teal-200 justify-center items-center hover:bg-amber-300 shadow-md transition-all duration-300">
                                                    <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                                </button>
                                            </div>
                                        </template>
                                    </Column>
                                    <ColumnGroup type="footer">
                                        <Row>
                                            <Column footer="Total :" :colspan="4" footerStyle="text-align:right; font-size:0.7vw;" />
                                            <Column :footer="formatCurrency(item.totalHargaSatuan.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.7vw;" />
                                            <Column :footer="formatCurrency(item.totalQty.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.7vw;" />
                                            <Column :footer="formatCurrency(item.totalValue.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.7vw;" />
                                            <Column footer="" footerStyle="text-align:right; background-color:black; color:white; font-size:0.7vw;" />
                                        </Row>
                                    </ColumnGroup>
                                </DataTable>
                            </Panel>
                        </div>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>
