<script setup>
import { formatCurrency } from '@/controller/dummyController';
import jenisLaporanMaterialController from '@/controller/getApiFromThisApp/laporanMaterial/jenisLaporanMaterialController';
import laporanMaterialController from '@/controller/getApiFromThisApp/laporanMaterial/laporanMaterialController';
import pmgMasterController from '@/controller/getApiFromThisApp/master/pmgMasterController';
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

const listTable = ref([]);
const totalTable = ref({ cpoOlah: 0, totalCost: 0, totalHargaSatuan: 0 });
const search = ref();
const expandedRows = ref([]);
const loadingData = ref(false);

const selectedPmg = ref(1);
const pmg = ref([]);
const listJenis = ref([]);

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
    item_material_id: null,
    pmg_id: null,
    tanggal: moment().format('YYYY-MM-DD'),
    qty: null
});

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadData();
});

const loadData = async () => {
    loadingData.value = true;
    try {
        // Change Picker
        const form = {
            idPmg: selectedPmg.value,
            tanggalAwal: beforeDate.value,
            tanggalAkhir: now.value
        };

        await loadJenis();

        // get Select Option
        const loadPMG = await pmgMasterController.getAll();
        pmg.value = loadPMG;

        const data = await laporanMaterialController.loadTable(form);
        listTable.value = data;
        loadingData.value = false;
    } catch (error) {
        loadingData.value = false;
        listTable.value = [];
    }
};

const loadJenis = async () => {
    try {
        const response = await jenisLaporanMaterialController.getAll();
        const list = [];
        for (let i = 0; i < response.length; i++) {
            const items = response[i].items;
            for (let j = 0; j < items.length; j++) {
                list.push({
                    id: items[j].id,
                    name: `(${response[i].name}) - ${items[j].name}`
                });
            }
        }
        // console.log(list);
        listJenis.value = list;
    } catch (error) {
        return [];
    }
};

const filteredList = computed(() => {
    return listTable.value.filter((item) => {
        const jenisLaporan = item.jenis_laporan || ''; // Pastikan tidak null atau undefined
        const searchValue = search.value || ''; // Pastikan tidak null atau undefined
        return jenisLaporan.toLowerCase().includes(searchValue.toLowerCase());
    });
});

const toggle = async (event) => {
    op.value.toggle(event);
};

const exportToExcel = async () => {
    const { saveAs } = FileSaver;
    const form = {
        idPmg: selectedPmg.value,
        tanggalAwal: beforeDate.value,
        tanggalAkhir: now.value
    };
    const response = await laporanMaterialController.loadToExportTable(form);

    // Laporan
    if (response.laporan.length === 0 && response.norma.length === 0) {
        messages.value = [{ severity: 'warn', content: 'Tidak ada data untuk diekspor!', id: count.value++, icon: 'pi-exclamation-triangle' }];
        return;
    }

    // 🔹 Format data untuk sheet "Data Laporan Material"
    const exportDataLaporan = response.laporan.map((item) => ({
        Tanggal: item.tanggal,
        'Jenis Produksi': item.jenis,
        Item: item.material,
        PMG: item.pmg,
        Kategori: item.kategori,
        Quantity: item.qty
    }));

    // 🔹 Format data untuk sheet "Data Norma" (pastikan `response.norma` ada)
    const exportDataNorma = response.norma
        ? response.norma.map((item) => ({
              Tanggal: item.tanggal,
              'Jenis Laporan': item.jenis,
              Material: item.material,
              Kategori: item.kategori,
              Satuan: item.satuan,
              Quantity: item.qty
          }))
        : [];

    // 🔹 Buat workbook dan sheets
    const workbook = XLSX.utils.book_new();

    // 🔹 Tambahkan sheet "Data Laporan Material"
    const worksheetLaporan = XLSX.utils.json_to_sheet(exportDataLaporan);
    XLSX.utils.book_append_sheet(workbook, worksheetLaporan, 'Data Laporan Material');

    // 🔹 Tambahkan sheet "Data Norma" jika ada data
    if (exportDataNorma.length > 0) {
        const worksheetNorma = XLSX.utils.json_to_sheet(exportDataNorma);
        XLSX.utils.book_append_sheet(workbook, worksheetNorma, 'Data Norma');
    }

    // 🔹 Simpan file Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(data, `Data-Laporan-${moment().format('YYYY-MM-DD-HHmmss')}.xlsx`);
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
            const response = await laporanMaterialController.getByID(data.id);
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
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.item_material_id = data.item_material_id;
            formData.value.pmg_id = data.pmg_id;
            formData.value.tanggal = moment(data.tanggal, 'YYYY-MM-DD').toDate();
            formData.value.qty = Number(data.qty);
            statusForm.value = 'edit';
        } else {
            router.push('/operation/laporan-material/create');
            // window.location.replace(`${URL_WEB}operation/laporan-material/create`);
            logFile.value = [];
            formData.value.id = null;
            formData.value.item_material_id = null;
            formData.value.pmg_id = null;
            formData.value.tanggal = moment().format('YYYY-MM-DD');
            formData.value.qty = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        router.push('/operation/laporan-material/create');
        // window.location.replace(`${URL_WEB}operation/laporan-material/create`);
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.item_material_id = null;
        formData.value.pmg_id = null;
        formData.value.tanggal = moment().format('YYYY-MM-DD');
        formData.value.qty = null;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    messages.value = [];
    formData.value.item_material_id = null;
    formData.value.pmg_id = null;
    formData.value.tanggal = moment().format('YYYY-MM-DD');
    formData.value.qty = null;
};

const submitData = async () => {
    formData.value.tanggal = moment(formData.value.tanggal).format('YYYY-MM-DD');
    if (formData.value.pmg_id != null && formData.value.tanggal != null && formData.value.item_material_id != null && formData.value.qty != null) {
        formData.value.tanggal = moment(formData.value.tanggal).format('YYYY-MM-DD');
        if (statusForm.value == 'add') {
            const response = await laporanMaterialController.addPost(formData.value);
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
            const response = await laporanMaterialController.updatePost(formData.value.id, formData.value);
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
            <span class="text-4xl">Laporan Material</span>
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
                <span class="text-[1vw] font-bold">Form Data</span>
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
                    <label for="date">Uraian <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.item_material_id" filter :options="listJenis" optionLabel="name" optionValue="id" placeholder="Select a Description" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">PMG <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.pmg_id" :options="pmg" optionLabel="nama" optionValue="id" placeholder="Select a Region" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Tanggal <small class="text-red-500 font-bold">*</small></label>
                    <DatePicker v-model="formData.tanggal" dateFormat="yy-mm-dd" :maxDate="maxDate" showIcon placeholder="Please input Date" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Quantity <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.qty" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
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
                        <label for="pmg" class="text-[0.8vw]">Pilih PMG</label>
                        <Select v-model="selectedPmg" :options="pmg" optionLabel="nama" optionValue="id" placeholder="Select a Region" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1 w-full items-start">
                        <label for="pmg" class="text-[0.8vw]">Pilih Periode</label>
                        <DatePicker v-model="dates" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-full" />
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
                        <InputText placeholder="Search Components" v-model="search" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <ScrollPanel style="width: 100%; height: 30vw">
                    <div class="flex flex-col gap-3">
                        <Panel v-for="(item, index) in filteredList" :key="index" toggleable :collapsed="true">
                            <template #header>
                                <span class="text-[1vw] font-bold italic font-sans">{{ item.jenis_laporan }}</span>
                            </template>
                            <div class="flex flex-col gap-1">
                                <Panel v-for="(items, dex) in item.kategori_data" :key="dex" toggleable :collapsed="true">
                                    <template #header>
                                        <div class="flex items-center w-full gap-3">
                                            <span class="text-[0.9vw] font-sans w-full uppercase font-bold">{{ items.kategori }}</span>
                                        </div>
                                    </template>
                                    <div class="flex flex-col gap-3">
                                        <div class="py-3 flex flex-col gap-2" v-for="(materials, ind) in items.materials" :key="ind">
                                            <div class="flex items-center w-full gap-3">
                                                <span class="text-[0.8vw] font-medium italic font-sans w-full uppercase">{{ materials.name }}</span>
                                            </div>
                                            <DataTable :value="materials.detail" showGridlines dataKey="id">
                                                <Column field="tanggal" sortable header="Tanggal" style="width: 25%; font-size: 0.8vw" headerStyle="background-color:rgb(251 207 232); color:black">
                                                    <template #body="{ data }">
                                                        <div class="flex w-full font-bold">
                                                            <span>{{ moment(data.tanggal).format('DD MMM YYYY') }}</span>
                                                        </div>
                                                    </template>
                                                </Column>
                                                <Column field="qty" sortable header="Quantity" style="width: 25%; font-size: 0.8vw" headerStyle="background-color:rgb(251 207 232); color:black">
                                                    <template #body="{ data }">
                                                        <div class="flex w-full justify-end font-bold">
                                                            <span>{{ formatCurrency(Number(data.qty).toFixed(2)) }}</span>
                                                        </div>
                                                    </template>
                                                </Column>
                                                <Column field="qty" style="width: 25%; font-size: 0.8vw" headerStyle="background-color:rgb(251 207 232); color:black">
                                                    <template #body="{ data }">
                                                        <div class="flex w-full items-center justify-end font-bold">
                                                            <button @click="showDrawer(data)" class="p-3 border rounded-full flex justify-center items-center bg-teal-200 hover:bg-amber-300 shadow-md transition-all duration-300">
                                                                <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                                            </button>
                                                        </div>
                                                    </template>
                                                </Column>
                                            </DataTable>
                                        </div>
                                    </div>
                                    <div class="w-full"></div>
                                </Panel>
                            </div>
                        </Panel>
                    </div>
                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>
