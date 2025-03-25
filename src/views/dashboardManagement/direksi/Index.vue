<script setup>
import { formatCurrency } from '@/controller/dummyController';
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import mataUangKursController from '@/controller/getApiFromThisApp/kurs/mataUangKursController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import dmoSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/dmoSicalRspController';
import masterCostSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/masterCostSicalRspController';
import simulasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/simulasiSicalRspController';
import utilisasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/utilisasiSicalRspController';
import SimulationCalc from '@/views/dashboardManagement/direksi/components/SimulationCalc.vue';
import { FilterMatchMode } from '@primevue/core/api';
import moment from 'moment';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const toast = useToast();

const listTable = ref([]);
const search = ref('');
const drawerCond = ref(false);
const visible = ref(false);
const detailCond = ref(false);
const titleDetail = ref('Create History');
const messages = ref([]);
const statusForm = ref('add');
const dmoData = ref({
    nilai: null,
    remark: null
});
const kursData = ref({
    nilai: null,
    remark: null
});
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const listMasterCost = ref([]);
const listProduk = ref([]);
const listUtilisasi = ref([]);
const listKurs = ref([]);
const calcResult = ref(null);

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());

let count = ref(0);

const formData = ref({
    id: null,
    product_id: null,
    date: null,
    name: null,
    kurs: null,
    kurs_id: 1,
    expected_margin: null,
    id_dmo: null,
    dmo: null,
    offer: {
        buyer_name: null,
        price: null,
        volume: null
    },
    costs: [],
    catatan: []
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
    try {
        const list = [];
        const data = await simulasiSicalRspController.getAll();
        for (let i = 0; i < data.length; i++) {
            list.push({
                id: data[i].id,
                date: moment(data[i].date).format('DD MMM YYYY'),
                product_id: data[i].product_id,
                name: data[i].name,
                kurs: data[i].kurs,
                expected_margin: data[i].expected_margin,
                id_dmo: data[i].id_dmo,
                product: data[i].product,
                dmo: data[i].dmo,
                offer: data[i].offer,
                catatan: data[i].catatan,
                cost: data[i].cost
            });
        }
        listTable.value = list;
    } catch (error) {
        listTable.value = [];
    }
};

const showDrawer = async (data) => {
    try {
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const response = await simulasiSicalRspController.getByID(data.id);
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
            formData.value.date = moment(data.date, 'DD MMM YYYY').toDate();
            formData.value.value = Number(data.value);
            formData.value.remark = data.remark;
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.date = null;
            formData.value.value = null;
            formData.value.remark = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.date = null;
        formData.value.value = null;
        formData.value.remark = null;
        statusForm.value = 'add';
    }
};

const loadKurs = async () => {
    try {
        const response = await mataUangKursController.getAll();
        const list = [];
        for (let i = 0; i < response.length; i++) {
            list.push({
                id: response[i].id,
                name: `${response[i].symbol}_${response[i].name} - ${response[i].remark}`
            });
        }
        listKurs.value = list;
    } catch (error) {
        listKurs.value = [];
    }
};

const loadKursLatest = async () => {
    try {
        const response = await kursController.getByLatest({ idMataUang: formData.value.kurs_id });
        kursData.value.nilai = Number(response.value);
        kursData.value.remark = `Jisdor Bank Indonesia Tanggal ${moment(response.tanggal).format('DD MMMM YYYY')}`;
        formData.value.kurs = kursData.value.nilai;
    } catch (error) {
        formData.value.kurs = 0;
        kursData.value.nilai = 0;
    }
};

const loadProduk = async () => {
    const produk = await productMasterController.getAll();
    const jenis = produk.filter((item) => item.jenis.toLowerCase().includes('bulk'));
    listProduk.value = jenis;
};

const loadMasterCost = async () => {
    listMasterCost.value = await masterCostSicalRspController.getAll();
};

const loadUtilisasi = async () => {
    listUtilisasi.value = await utilisasiSicalRspController.getAll();
};

const loadDMO = async () => {
    try {
        const response = await dmoSicalRspController.getLatest();
        dmoData.value.nilai = Number(response.value);
        dmoData.value.remark = response.remark;
        formData.value.dmo = dmoData.value.nilai;
        formData.value.id_dmo = response.id;
    } catch (error) {
        nilaiDMO.value = 0;
        formData.value.dmo = 0;
    }
};

const detailShow = async (data) => {
    detailCond.value = true;
    await loadMasterCost();
    await loadUtilisasi();
    await loadProduk();
    await loadDMO();
    await loadKurs();
    await loadKursLatest();
    if (data != null) {
        titleDetail.value = 'Update History';
        formData.value.id = data.id;
        formData.value.name = data.name;
        formData.value.date = moment(data.date, 'DD MMM YYYY').toDate();
        formData.value.kurs = data.kurs;
        formData.value.kurs_id = 1;
        formData.value.expected_margin = data.expected_margin;
        formData.value.id_dmo = data.id_dmo;
        formData.value.dmo = Number(data.dmo.value);
        formData.value.product_id = data.product_id;
        formData.value.offer.buyer_name = data.offer.buyer_name;
        formData.value.offer.volume = data.offer.volume;
        formData.value.offer.price = data.offer.price;

        const cost = data.cost;
        const listCost = listMasterCost.value;
        const util = listUtilisasi.value;
        formData.value.costs = [];
        for (let i = 0; i < listCost.length; i++) {
            const utils = [];
            for (let j = 0; j < util.length; j++) {
                const loadUtil = cost.find((item) => item.id_master_cost == listCost[i].id && item.id_utilisasi == util[j].id);
                // console.log(loadUtil);
                utils.push({
                    id: util[j].id,
                    name: util[j].name,
                    value: util[j].value,
                    nilai: loadUtil == null ? 0 : Number(loadUtil.value)
                });
            }
            formData.value.costs.push({
                id: listCost[i].id,
                name: listCost[i].name,
                utils: utils
            });
        }
        formData.value.catatan = data.catatan;
    } else {
        titleDetail.value = 'Create History';
        formData.value.name = `Simulation Calc ${moment().format('YYYYMMDD-HHmmss')}`;
        formData.value.date = moment().toDate();
        formData.value.kurs_id = 1;
        formData.value.expected_margin = 0;
        formData.value.product_id = 4;
        formData.value.offer.buyer_name = null;
        formData.value.offer.volume = 0;
        formData.value.offer.price = 0;

        const listCost = listMasterCost.value;
        const util = listUtilisasi.value;
        formData.value.costs = [];
        for (let i = 0; i < listCost.length; i++) {
            const utils = [];
            for (let j = 0; j < util.length; j++) {
                utils.push({
                    id: util[j].id,
                    name: util[j].name,
                    value: util[j].value,
                    nilai: 0
                });
            }
            formData.value.costs.push({
                id: listCost[i].id,
                name: listCost[i].name,
                utils: utils
            });
        }
        formData.value.catatan = [{ judul: '', detailCatatan: [{ teks: '' }] }];
    }
};

const addCatatan = () => {
    formData.value.catatan.push({
        judul: '',
        detailCatatan: [{ teks: '' }]
    });
};

const addDetailCatatan = (index) => {
    formData.value.catatan[index].detailCatatan.push({ teks: '' });
};

const removeCatatan = (index) => {
    if (formData.value.catatan.length > 1) {
        formData.value.catatan.splice(index, 1);
    }
};

const removeDetailCatatan = (index, detailIndex) => {
    if (formData.value.catatan[index].detailCatatan.length > 1) {
        formData.value.catatan[index].detailCatatan.splice(detailIndex, 1);
    }
};

const submitCalculate = async () => {
    const response = await simulasiSicalRspController.simulationCalc3(formData.value);
    calcResult.value = response;
};

const submitData = async () => {
    console.log(formData.value);
    const response = await simulasiSicalRspController.postData2(formData.value);
    toast.add({ severity: response.severity, summary: response.info, detail: response.content, life: 3000 });
    // messages.value = [{ severity: response.severity, content: response.content, id: count.value++, icon: response.icon }];
};
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <Toast />
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-3xl">History Data Hasil Simulasi</span>
            <button @click="detailShow(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2">
                <i class="pi pi-plus"></i>
                <span>Add History</span>
            </button>
        </div>
        <Dialog v-model:visible="visible" modal header="Catatan" :style="{ width: '55rem' }">
            <span class="text-red-500 dark:text-red-400 block mb-8">* Harap dilengkapi pada bagian catatan.</span>
            <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1 w-full p-5 rounded-lg border" v-for="(catatan, index) in formData.catatan" :key="index">
                    <div class="flex justify-between items-center gap-5">
                        <label class="text-sm font-light" for="name">{{ index + 1 }}. Judul</label>
                        <div class="flex justify-end items-center gap-2">
                            <button @click="addCatatan" class="px-3 py-3 flex items-center justify-center rounded-full bg-cyan-600"><i class="pi pi-plus font-bold" style="font-size: 0.7rem"></i></button>
                            <button @click="removeCatatan(index)" class="px-3 py-3 flex items-center justify-center rounded-full bg-red-600"><i class="pi pi-minus font-bold" style="font-size: 0.7rem"></i></button>
                        </div>
                    </div>
                    <InputText v-model="catatan.judul" placeholder="Judul untuk catatan" class="w-full" />
                    <div class="flex gap-3 items-center w-full mt-4">
                        <small class="w-[10rem]">Detail Catatan</small>
                        <Divider />
                    </div>
                    <div class="flex flex-col gap-1 w-full pl-10" v-for="(detail, indexs) in catatan.detailCatatan" :key="indexs">
                        <div class="flex justify-between items-center gap-5">
                            <label class="text-sm font-light" for="name">{{ index + 1 }}.{{ indexs + 1 }}. Detail</label>
                            <div class="flex justify-end items-center gap-2">
                                <button @click="addDetailCatatan(index)" class="px-3 py-3 flex items-center justify-center rounded-full text-cyan-600"><i class="pi pi-plus font-bold" style="font-size: 0.7rem"></i></button>
                                <button @click="removeDetailCatatan(index, indexs)" class="px-3 py-3 flex items-center justify-center rounded-full text-red-600"><i class="pi pi-minus font-bold" style="font-size: 0.7rem"></i></button>
                            </div>
                        </div>
                        <InputText v-model="detail.teks" placeholder="Detail Catatan" class="w-full" />
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="flex w-full justify-end gap-2">
                    <button @click="submitData" class="py-2 px-4 rounded-lg bg-emerald-600 text-white font-medium items-center"><i class="pi pi-save"></i> Save</button>
                </div>
            </template>
        </Dialog>
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
                    <DatePicker v-model="formData.date" dateFormat="yy-mm-dd" :maxDate="maxDate" showIcon placeholder="Please input tanggal" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="name">Nilai DMO <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.value" placeholder="Please input Value" disabled />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="name">Remarks <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.remark" placeholder="Please input Remarks" />
                </div>
                <div class="flex flex-row-reverse w-full gap-3 mt-5">
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
        <Drawer v-model:visible="detailCond" position="full">
            <template #header>
                <span class="text-3xl font-bold flex items-center gap-3"
                    ><span>Detail - SICAL RSP</span> <small class="text-xs">{{ titleDetail }}</small></span
                >
            </template>
            <div class="flex flex-col gap-3 w-full">
                <div class="p-4 bg-slate-200 font-bold rounded-lg flex gap-3">
                    <div class="flex flex-col w-full gap-1">
                        <label for="">Tanggal</label>
                        <DatePicker v-model="formData.date" dateFormat="yy-mm-dd" disabled :maxDate="maxDate" showIcon placeholder="Please input tanggal" />
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <label for="">Produk</label>
                        <Select v-model="formData.product_id" :options="listProduk" optionLabel="name" optionValue="id" disabled placeholder="Pilih Produk" class="w-full" />
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <label for="">Nama Simulasi</label>
                        <InputText v-model="formData.name" placeholder="Please input Name" />
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <label for="">Nama Buyer</label>
                        <InputText v-model="formData.offer.buyer_name" placeholder="Please input Buyer Name" />
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-xl font-bold">INTERNAL COST (HPP)</span>
                    <div class="grid gap-3 w-full" :class="formData.costs.length > 4 ? 'grid-cols-4' : `grid-cols-${formData.costs.length}`">
                        <div class="p-4 col-span-1 bg-slate-200 font-bold rounded-lg flex flex-col gap-3" v-for="(costs, index) in formData.costs" :key="index">
                            <span>{{ costs.name }}</span>
                            <div class="flex flex-col gap-2">
                                <div class="flex flex-col" v-for="(utils, itils) in costs.utils" :key="itils">
                                    <small>{{ utils.name }}</small>
                                    <InputNumber v-model="utils.nilai" :placeholder="`Please input ${utils.name}`" locale="en-US" :minFractionDigits="2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex flex-col gap-1">
                        <span class="text-xl font-bold">EXTERNAL COST (DMO)</span>
                        <div class="grid grid-cols-2 gap-3 w-full p-4 bg-slate-200 rounded-lg">
                            <div class="col-span-1 font-bold flex flex-col gap-3">
                                <span>DMO</span>
                                <InputNumber v-model="formData.dmo" :placeholder="`Please input DMO`" locale="en-US" :minFractionDigits="2" disabled />
                            </div>
                            <div class="col-span-1 font-bold flex flex-col gap-3">
                                <span>Kurs</span>
                                <InputNumber v-model="formData.kurs" :placeholder="`Please input Kurs`" locale="en-US" :minFractionDigits="2" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-xl font-bold">OFFER</span>
                        <div class="grid grid-cols-2 gap-3 w-full p-4 bg-slate-200 rounded-lg">
                            <div class="col-span-1 font-bold flex flex-col gap-3">
                                <span>Offer dari Buyer</span>
                                <InputNumber v-model="formData.offer.price" :placeholder="`Please input Offer Price`" locale="en-US" :minFractionDigits="2" />
                            </div>
                            <div class="col-span-1 font-bold flex flex-col gap-3">
                                <span>Volume</span>
                                <InputNumber v-model="formData.offer.volume" :placeholder="`Please input Volume`" locale="en-US" :minFractionDigits="2" />
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full gap-2">
                        <div class="flex flex-col gap-1 w-full">
                            <span class="text-xl font-bold uppercase">Expected Margin</span>
                            <div class="grid grid-cols-1 gap-3 w-full">
                                <div class="p-4 col-span-1 bg-slate-200 font-bold rounded-lg flex flex-col gap-3">
                                    <span>Margin</span>
                                    <InputGroup>
                                        <InputNumber v-model="formData.expected_margin" :placeholder="`Please input Expected Margin`" locale="en-US" :minFractionDigits="2" />
                                        <InputGroupAddon>%</InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <span class="text-xl font-bold uppercase">Mata Uang</span>
                            <div class="grid grid-cols-1 gap-3 w-full">
                                <div class="p-4 col-span-1 bg-slate-200 font-bold rounded-lg flex flex-col gap-3">
                                    <span>Mata Uang</span>
                                    <Select disabled v-model="formData.kurs_id" :options="listKurs" optionLabel="name" optionValue="id" filter placeholder="Pilih Mata Uang" class="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-8 flex w-full flex-col gap-3 bg-slate-200 rounded-lg mt-5">
                <span class="text-2xl font-bold">INL SIMULATION CALCULATOR FOR RECOMMENDED SELLING PRICE (SICAL RSP)</span>
                <div class="flex w-full">
                    <simulation-calc v-if="calcResult != null" :datas="calcResult" />
                </div>
            </div>
            <template #footer>
                <div class="flex justify-end items-center gap-3">
                    <button @click="visible = true" class="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 flex gap-2 items-center justify-center">
                        <i class="pi pi-save"></i>
                        <span>Save</span>
                    </button>
                    <button @click="submitCalculate" class="px-4 py-2 bg-sky-700 text-white rounded-lg shadow-md hover:bg-sky-800 flex gap-2 items-center justify-center">
                        <i class="pi pi-calculator"></i>
                        <span>Calculate</span>
                    </button>
                    <button @click="calcResult = null" class="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 flex gap-2 items-center justify-center">
                        <i class="pi pi-refresh"></i>
                        <span>Hide Table Simulation</span>
                    </button>
                </div>
            </template>
        </Drawer>
        <Card>
            <template #title>
                <div class="flex gap-2 items-center mb-5">
                    <span class="text-xl font-bold w-full">List Data</span>
                    <InputGroup>
                        <InputText placeholder="Search Components" v-model="search['global'].value" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <DataTable v-model:filters="search" :value="listTable" showGridlines paginator :rows="10" dataKey="period" :globalFilterFields="['date', 'name', 'kurs', 'product.name']">
                    <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="text-center w-full flex justify-center font-bold">
                                <span>Tanggal</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ data.date }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="text-center w-full flex justify-center font-bold">
                                <span>Nama Simulasi</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ data.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="text-center w-full flex justify-center font-bold">
                                <span>Produk</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ data.product.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="text-center w-full flex justify-center font-bold">
                                <span>Kurs</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center text-center">
                                <span>{{ formatCurrency(Number(data.kurs).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>

                    <Column field="id" style="width: 5%; font-size: 0.7vw">
                        <template #body="{ data }">
                            <div class="flex justify-center items center gap-2">
                                <button @click="detailShow(data)" class="p-3 border rounded-full flex bg-gray-200 justify-center items-center hover:bg-pink-300 shadow-md transition-all duration-300">
                                    <i class="pi pi-eye" style="font-size: 0.6vw"></i>
                                </button>
                                <!-- <button @click="showDrawer(data)" class="p-3 border rounded-full flex bg-gray-200 justify-center items-center hover:bg-amber-300 shadow-md transition-all duration-300">
                                    <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                </button> -->
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
