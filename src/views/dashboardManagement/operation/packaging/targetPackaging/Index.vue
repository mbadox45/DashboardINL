<script setup>
import { formatCurrency } from '@/controller/dummyController';
import jenisLaporanPackagingController from '@/controller/getApiFromThisApp/packaging/jenisLaporanPackagingController';
import laporanPackagingController from '@/controller/getApiFromThisApp/packaging/laporanPackagingController';
import packagingController from '@/controller/getApiFromThisApp/packaging/packagingController';
import targetPackagingController from '@/controller/getApiFromThisApp/packaging/targetPackagingController';
import uraianPackagingController from '@/controller/getApiFromThisApp/packaging/uraianPackagingController';
import FileSaver from 'file-saver';
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';

const router = useRouter();
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const optionPage = ref(0);
const loadingTable = ref(false);

const listTable = ref([]);
const totalTable = ref({ cpoOlah: 0, totalCost: 0, totalHargaSatuan: 0 });
const search = ref();
const expandedRows = ref([]);
const loadingData = ref(false);

const selectedPmg = ref(1);
const pmg = ref([]);
const listJenis = ref([]);
const listUraian = ref([]);

const op = ref();

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());
const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);

let count = ref(0);

const formData = ref({
    id: null,
    uraian_id: null,
    packaging_id: null,
    jenis_id: null,
    tanggal: moment().format('YYYY-MM-DD'),
    value: null
});

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadData();
});

const loadData = async () => {
    loadingTable.value = true;
    try {
        // Change Picker
        const form = {
            idPackaging: selectedPmg.value,
            tanggalAwal: beforeDate.value,
            tanggalAkhir: now.value
        };

        await loadJenis();

        // get Select Option
        const loadPMG = await packagingController.getAll();
        pmg.value = loadPMG;

        const uraian = await uraianPackagingController.getAll();
        listUraian.value = uraian;

        const data = await targetPackagingController.loadTable(form);
        listTable.value = data;
        loadingTable.value = false;
    } catch (error) {
        listTable.value = [];
        loadingTable.value = false;
    }
};

const loadJenis = async () => {
    try {
        const response = await jenisLaporanPackagingController.getAll();
        const list = [];
        for (let i = 0; i < response.length; i++) {
            list.push({
                id: response[i].id,
                name: response[i].name
            });
            const items = response[i].item_packaging;
            for (let j = 0; j < items.length; j++) {}
        }
        listJenis.value = list;
    } catch (error) {
        return [];
    }
};

const filteredList = computed(() => {
    return listTable.value.filter((item) => {
        const jenisLaporan = item.jenis.name || ''; // Pastikan tidak null atau undefined
        const searchValue = search.value || ''; // Pastikan tidak null atau undefined
        return jenisLaporan.toLowerCase().includes(searchValue.toLowerCase());
    });
});

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
        'Jenis Packaging': item.jenis.name,
        Packaging: item.packaging.nama,
        'Uraian Target': item.uraian.nama,
        'Nilai (Box)': Number(item.value)
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Dashboard INL Edge');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(data, `Data-Target-Packaging-${moment().format('YYYY-MM-DD-HHmmss')}.xlsx`);
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
        if (data != null) {
            drawerCond.value = true;
            messages.value = [];
            const response = await laporanPackagingController.getByID(data.id);
            const history = response.history;
            const list = [];
            for (let i = 0; i < history.length; i++) {
                let fromValue,
                    toValue,
                    fromTanggal,
                    toTanggal = null;
                // if (history[i].changes.length == 0) {
                //     fromValue = null;
                //     toValue = null;
                //     fromTanggal = null;
                //     toTanggal = null;
                // } else {
                //     fromValue = history[i].changes.value == null ? null : history[i].changes.value.old;
                //     toValue = history[i].changes.value == null ? null : history[i].changes.value.new;
                //     fromTanggal = history[i].changes.tanggal == null ? null : history[i].changes.tanggal.old;
                //     toTanggal = history[i].changes.tanggal == null ? null : history[i].changes.tanggal.new;
                // }
                list.push({
                    action: history[i].action,
                    user_name: history[i].user_name,
                    date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
                    changesLokasi: fromValue == null && toValue == null ? [] : []
                    // changesNama:
                    //     fromTanggal == null && toTanggal == null
                    //         ? []
                    //         : [
                    //               { icon: 'pi pi-arrow-up text-red-500', name: fromTanggal },
                    //               { icon: 'pi pi-arrow-down text-green-500', name: toTanggal }
                    //           ]
                });
            }
            // console.log(data);
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.uraian_id = data.uraian_id;
            formData.value.jenis_id = data.jenis_id;
            formData.value.packaging_id = data.packaging_id;
            formData.value.tanggal = moment(data.tanggal, 'YYYY-MM-DD').toDate();
            formData.value.value = Number(data.value);
            statusForm.value = 'edit';
        } else {
            // router.push('/operation/packaging/target/create');
            logFile.value = [];
            drawerCond.value = true;
            formData.value.id = null;
            formData.value.uraian_id = null;
            formData.value.jenis_id = null;
            formData.value.packaging_id = null;
            formData.value.tanggal = moment().format('YYYY-MM-DD');
            formData.value.value = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        // router.push('/operation/packaging/target/create');
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.uraian_id = null;
        formData.value.jenis_id = null;
        formData.value.packaging_id = null;
        formData.value.tanggal = moment().format('YYYY-MM-DD');
        formData.value.value = null;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    messages.value = [];
    formData.value.uraian_id = null;
    formData.value.jenis_id = null;
    formData.value.packaging_id = null;
    formData.value.tanggal = moment().format('YYYY-MM-DD');
    formData.value.value = null;
};

const submitData = async () => {
    if (formData.value.packaging_id != null && formData.value.tanggal != null && formData.value.uraian_id != null && formData.value.value != null && formData.value.jenis_id != null) {
        formData.value.tanggal = moment(formData.value.tanggal).format('YYYY-MM-01');
        if (statusForm.value == 'add') {
            const response = await targetPackagingController.addPost(formData.value);
            if (response.status == true) {
                messages.value = [{ severity: 'success', content: 'Data berhasil di tambahkan', id: count.value++, icon: 'pi-check-circle' }];
                loadingSave.value = true;
                setTimeout(function () {
                    loadData();
                    drawerCond.value = false;
                    loadingSave.value = false;
                }, timeResponse.value);
            } else {
                messages.value = [{ severity: 'error', content: response.msg, id: count.value++, icon: 'pi-times-circle' }];
            }
        } else {
            const response = await targetPackagingController.updatePost(formData.value.id, formData.value);
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
                messages.value = [{ severity: 'error', content: response.msg, id: count.value++, icon: 'pi-times-circle' }];
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
            <span class="text-4xl">Target Packaging</span>
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
                <span class="text-[1vw] font-bold">Form Target</span>
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
                    <label for="date">Packaging <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.packaging_id" :options="pmg" optionLabel="nama" optionValue="id" placeholder="Pilih Packaging" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Jenis Packaging <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.jenis_id" filter :options="listJenis" optionLabel="name" optionValue="id" placeholder="Pilih Jenis" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Target <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.uraian_id" :options="listUraian" optionLabel="nama" optionValue="id" placeholder="Pilih Target" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Tanggal <small class="text-red-500 font-bold">*</small></label>
                    <DatePicker v-model="formData.tanggal" showIcon view="month" :maxDate="maxDate" dateFormat="yy-mm" placeholder="Please input period" class="w-full" />
                    <!-- <DatePicker v-model="formData.tanggal" dateFormat="yy-mm-dd" showIcon placeholder="Please input Date" /> -->
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Nilai (Box) <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.value" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-row-reverse w-full gap-3 mt-3">
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
                        <label for="pmg" class="text-[0.8vw]">Pilih Packaging</label>
                        <Select v-model="selectedPmg" :options="pmg" optionLabel="nama" optionValue="id" placeholder="Select a Region" class="w-full" />
                    </div>
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
                <div class="flex gap-5 items-center mb-5">
                    <div class="flex items-center justify-between gap-3 w-full">
                        <button @click="toggle" class="py-2 px-3 text-black text-[0.8vw] flex gap-3 items-center bg-pink-200 shadow-md rounded-lg shadow-gray-200 font-bold hover:bg-pink-300 transition-all duration-300">
                            <i class="pi pi-calendar" style="font-size: 0.8vw"></i><span>Filter</span>
                        </button>
                        <Chip :label="`${moment(beforeDate).format('DD MMM YYYY')} - ${moment(now).format('DD MMM YYYY')}`" icon="pi pi-calendar" style="font-size: 0.6vw" class="font-bold" />
                    </div>
                    <InputGroup>
                        <InputText placeholder="Cari Jenis Packaging" v-model="search" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <ScrollPanel style="width: 100%; height: 40vw">
                    <div class="flex w-full h-full items-center justify-center" v-if="loadingTable == true">
                        <span>Loading Data...</span>
                    </div>
                    <DataTable v-else :value="filteredList" rowGroupMode="subheader" groupRowsBy="jenis.name" sortMode="single" sortField="jenis.name" :sortOrder="1" showGridlines>
                        <Column
                            field="tanggal"
                            sortable
                            header="Tanggal"
                            style="width: 25%; font-size: 0.8vw"
                            :globalFilterFields="['tanggal', 'uraian.nama', 'jenis.name', 'value', 'packaging.name']"
                            headerStyle="background-color:rgb(251 207 232); color:black"
                        >
                            <template #body="{ data }">
                                <div class="flex w-full font-bold">
                                    <span>{{ moment(data.tanggal).format('DD MMM YYYY') }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="packaging_id" sortable header="Packaging" style="width: 25%; font-size: 0.8vw" headerStyle="background-color:rgb(251 207 232); color:black">
                            <template #body="{ data }">
                                <div class="flex w-full font-bold">
                                    <span>{{ data.packaging.nama }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="uraian.nama" sortable header="Target" style="width: 25%; font-size: 0.8vw" headerStyle="background-color:rgb(251 207 232); color:black">
                            <template #body="{ data }">
                                <div class="flex w-full font-bold">
                                    <span>{{ data.uraian.nama }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="jenis.name" sortable header="Jenis Packaging" style="width: 25%; font-size: 0.8vw">
                            <template #body="{ data }">
                                <div class="flex w-full font-bold">
                                    <span>{{ data.jenis.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="value" sortable header="Nilai (Box)" style="width: 25%; font-size: 0.8vw" headerStyle="background-color:rgb(251 207 232); color:black">
                            <template #body="{ data }">
                                <div class="flex w-full font-bold">
                                    <span>{{ formatCurrency(data.value) }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="value" style="width: 25%; font-size: 0.8vw" headerStyle="background-color:rgb(251 207 232); color:black">
                            <template #body="{ data }">
                                <div class="flex w-full items-center justify-end font-bold">
                                    <button @click="showDrawer(data)" class="p-3 border rounded-full flex justify-center items-center bg-teal-200 hover:bg-amber-300 shadow-md transition-all duration-300">
                                        <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                    </button>
                                </div>
                            </template>
                        </Column>
                        <template #groupheader="slotProps">
                            <div class="flex items-center gap-2 px-3 py-2 font-bold text-white rounded-md" style="background-color: rgb(194, 245, 66); color: black">
                                <span>{{ slotProps.data.jenis.name }}</span>
                            </div>
                        </template>
                    </DataTable>
                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>
