<script setup>
import { formatCurrency } from '@/controller/dummyController';
import productStorageScmController from '@/controller/getApiFromThisApp/supplyChain/productStorageScmController';
import cpoStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/cpoStockScmController';
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
const listProduk = ref([]);
const loadingData = ref(false);

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());
const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);

let count = ref(0);
const op = ref();

const formData = ref({
    id: null,
    tanki_id: null,
    tanggal: moment().format('YYYY-MM-DD'),
    qty: null,
    umur: null,
    remarks: null
});

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
        const data = await cpoStockScmController.getByPeriod(form);
        listTable.value = data.data;

        await loadProduk();
        loadingData.value = false;
    } catch (error) {
        loadingData.value = false;
        listTable.value = [];
    }
};

const loadProduk = async () => {
    const produk = await productStorageScmController.getByJenis('tanki');
    console.log(produk);
    const list = [];
    for (let i = 0; i < produk.length; i++) {
        list.push({
            id: produk[i].id,
            name: produk[i].name + ' - ' + produk[i].lokasi.name
        });
    }
    listProduk.value = list;
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

    const exportData = listTable.value.map((item) => ({
        Tanggal: item.tanggal,
        Lokasi: item.tanki.lokasi.name,
        Kapasitas: item.tanki.kapasitas,
        'No Tangki': item.tanki.name,
        'Stock (MT)': Number(item.qty),
        'Space (MT)': item.space,
        'Umur (Hari)': item.umur,
        Remark: item.remarks
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Dashboard INL Edge');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(data, `Data-Stock-CPO-${moment().format('YYYY-MM-DD-HHmmss')}.xlsx`);
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

const showDrawer = async (data) => {
    try {
        await loadProduk();
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const response = await cpoStockScmController.getByID(data.id);
            const history = response.history;
            const list = [];
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
            formData.value.tanki_id = data.tanki_id;
            formData.value.tanggal = moment(data.tanggal).format('YYYY-MM-DD');
            formData.value.remarks = data.remarks;
            formData.value.umur = Number(data.umur);
            formData.value.qty = Number(data.qty);
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.tanki_id = null;
            formData.value.tanggal = moment().format('YYYY-MM-DD');
            formData.value.remarks = null;
            formData.value.umur = null;
            formData.value.qty = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.tanki_id = null;
        formData.value.tanggal = moment().format('YYYY-MM-DD');
        formData.value.remarks = null;
        formData.value.umur = null;
        formData.value.qty = null;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.tanki_id = null;
    formData.value.tanggal = moment().format('YYYY-MM-DD');
    formData.value.remarks = null;
    formData.value.umur = null;
    formData.value.qty = null;
};

const submitData = async () => {
    if (formData.value.tanki_id != null && formData.value.tanggal != null && formData.value.remarks != null && formData.value.umur != null && formData.value.qty != null) {
        // console.log(formData.value);
        formData.value.tanggal = moment(formData.value.tanggal).format('YYYY-MM-DD');
        if (statusForm.value == 'add') {
            // messages.value = [{ severity: 'success', content: 'Data berhasil di tambahkan', id: count.value++, icon: 'pi-check-circle' }];
            const response = await cpoStockScmController.addPost(formData.value);
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
            // console.log(formData.value);
            // messages.value = [{ severity: 'success', content: 'Data berhasil di simpan', id: count.value++, icon: 'pi-check-circle' }];
            const response = await cpoStockScmController.updatePost(formData.value.id, formData.value);
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
            <span class="text-3xl">Stock CPO</span>
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
                <span class="text-[1vw] font-bold">Form Component</span>
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
                    <label for="name">Tanggal <small class="text-red-500 font-bold">*</small></label>
                    <DatePicker v-model="formData.tanggal" dateFormat="yy-mm-dd" showIcon :maxDate="maxDate" placeholder="Please input Date" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Tangki <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.tanki_id" :options="listProduk" optionLabel="name" optionValue="id" placeholder="Pilih Tangki" filter class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="umur">Umur (Hari) <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.umur" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="qty">Stock (MT)<small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.qty" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="remarks">Remarks <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.remarks" placeholder="Input Remarks" />
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
                        <DatePicker v-model="dates" selectionMode="range" :maxDate="maxDate" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-full" />
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
                    <InputGroup>
                        <InputText placeholder="Cari" v-model="search['global'].value" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <div v-if="loadingData == true" class="flex w-full justify-center font-bold">
                    <span>Loading Data ...</span>
                </div>
                <DataTable :value="listTable" v-model:filters="search" showGridlines paginator :rows="10" dataKey="period" :globalFilterFields="['tanki.lokasi.name', 'tanki.name', 'tanki.kapasitas', 'remarks']">
                    <template #empty>
                        <div class="flex w-full justify-center items-center font-bold">
                            <span>- Data not found -</span>
                        </div>
                    </template>
                    <Column field="tanggal" sortable style="width: 15%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Tanggal</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ moment(data.tanggal).format('DD MMM YYYY') }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="tanki.lokasi.name" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Lokasi</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ data.tanki.lokasi.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="tanki.name" sortable style="width: 10%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>No Tangki</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-start">
                                <span class="capitalize">{{ data.tanki.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="tanki.kapasitas" sortable style="width: 10%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Kapasitas</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.tanki.kapasitas).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="qty" sortable style="width: 10%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Stock (MT)</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.qty).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="space" sortable style="width: 10%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Space (MT)</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.space).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="umur" sortable style="width: 10%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Umur (Hari)</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.umur).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="remarks" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Remark</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-start">
                                <span class="capitalize">{{ data.remarks }}</span>
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
                </DataTable>
            </template>
        </Card>
    </div>
</template>
