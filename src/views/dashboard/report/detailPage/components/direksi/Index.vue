<script setup>
import { formatCurrency } from '@/controller/dummyController';
import cpoKpbnController from '@/controller/getApiFromThisApp/cpoKpbn/cpoKpbnController';
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import mataUangKursController from '@/controller/getApiFromThisApp/kurs/mataUangKursController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import dmoSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/dmoSicalRspController';
import masterCostSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/masterCostSicalRspController';
import pengaliSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/pengaliSicalRspController';
import simulasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/simulasiSicalRspController';
import utilisasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/utilisasiSicalRspController';
import moment from 'moment';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

// Components
import SimulationCalc from '@/views/dashboardManagement/direksi/components/SimulationCalc.vue';

const toast = useToast();
const confirm = useConfirm();

const listTable = ref([]);
const listMasterCost = ref([]);
const listUtilisasi = ref([]);
const listKurs = ref([]);
const listMataUang = ref([]);
const listPengali = ref([]);
const listCatatan = ref([]);
const listProduk = ref([]);
const cpoKpbn = ref({
    nilai: null,
    remark: null
});
const dmoData = ref({
    nilai: null,
    remark: null
});
const kursData = ref({
    nilai: null,
    remark: null
});
const labelMataUang = ref('USD');
const showTable = ref(false);
const loadingCard1 = ref(false);
const loadingCard2 = ref(false);
const visible = ref(false);
const visibleSave = ref(false);
const visibleLoadHistory = ref(false);
const getToken = ref(localStorage.getItem('usertoken'));
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());
const setTime = ref(3000);
const opRawMaterial = ref();
const opKurs = ref();

// Table
const calcResult = ref(null);

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

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadAll();
});

const loadData = async () => {
    try {
        visibleLoadHistory.value = true;
        const list = [];
        const response = await simulasiSicalRspController.getAll();
        const data = response.sort((a, b) => b.id - a.id);
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
        visibleLoadHistory.value = true;
        listTable.value = [];
    }
};

const loadAll = async () => {
    loadingCard1.value = true;
    await loadKursLatest();
    await loadKurs();
    await loadMasterCost();
    await loadUtilisasi();
    await loadDMO();
    await loadPengali();
    await loadProduk();
    await loadCPOKpbnLatest();
    await loadInputData();
    loadingCard1.value = false;
};

const toggle = (event) => {
    opRawMaterial.value.toggle(event);
};

const toggleKurs = (event) => {
    opKurs.value.toggle(event);
};

const loadProduk = async () => {
    const produk = await productMasterController.getAll();
    const jenis = produk.filter((item) => item.jenis.toLowerCase().includes('bulk'));
    listProduk.value = jenis;
};

const loadCPOKpbnLatest = async () => {
    const response = await cpoKpbnController.getLatest();
    cpoKpbn.value.nilai = response == null ? 0 : Number(response.Penetapan_Harga).toFixed(2);
    cpoKpbn.value.remark = response == null ? '' : `Nilai di ambil dari Harga CPO KPBN per-tanggal ${moment(response.Tanggal).format('DD MMMM YYYY')} - Rp. ${formatCurrency(cpoKpbn.value.nilai)}`;
};

const loadDMO = async () => {
    try {
        const response = await dmoSicalRspController.getLatest();
        dmoData.value.nilai = Number(response.value);
        dmoData.value.remark = response.remark;
        formData.value.dmo = dmoData.value.nilai;
        formData.value.id_dmo = response.id;
    } catch (error) {
        dmoData.value.nilai = 0;
        formData.value.dmo = 0;
    }
};

const loadKursLatest = async () => {
    try {
        const response = await kursController.getByLatest({ idMataUang: formData.value.kurs_id });
        kursData.value.nilai = Number(response.value);
        kursData.value.remark = `Jisdor Bank Indonesia Tanggal ${moment(response.tanggal).format('DD MMMM YYYY')} - Rp. ${formatCurrency(kursData.value.nilai)}`;
        formData.value.kurs = kursData.value.nilai;
    } catch (error) {
        formData.value.kurs = 0;
        kursData.value.nilai = 0;
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
        listMataUang.value = response;
        listKurs.value = list;
    } catch (error) {
        listKurs.value = [];
    }
};

const loadMasterCost = async () => {
    try {
        const response = await masterCostSicalRspController.getAll();
        listMasterCost.value = response.sort((a, b) => a.id - b.id);
    } catch (error) {
        listMasterCost.value = [];
    }
};

const loadPengali = async () => {
    try {
        const response = await pengaliSicalRspController.getAll();
        listPengali.value = response.sort((a, b) => a.id - b.id);
    } catch (error) {
        listPengali.value = [];
    }
};

const loadUtilisasi = async () => {
    try {
        const response = await utilisasiSicalRspController.getAll();
        listUtilisasi.value = response.sort((a, b) => a.id - b.id);
    } catch (error) {
        listUtilisasi.value = [];
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

const loadInputData = async () => {
    try {
        formData.value.name = `Simulation Calc ${moment().format('YYYYMMDD-HHmmss')}`;
        formData.value.date = moment().toDate();
        formData.value.kurs_id = 1;
        formData.value.expected_margin = 0;
        formData.value.product_id = 4;
        formData.value.offer.buyer_name = null;
        formData.value.offer.volume = 0;
        formData.value.offer.price = 0;

        const response = await simulasiSicalRspController.getAll();
        const catatan = [];
        if (response != null) {
            const dataSical = response.sort((a, b) => b.id - a.id);

            const note = dataSical[0].catatan;
            for (let i = 0; i < note.length; i++) {
                const detail = note[i].detail_catatan;
                const list = [];
                for (let j = 0; j < detail.length; j++) {
                    list.push({
                        id: detail[j].id,
                        id_catatan: detail[j].id_catatan,
                        teks: detail[j].teks
                    });
                }
                catatan.push({
                    id: note[i].id,
                    id_simulation: note[i].id_simulation,
                    judul: note[i].judul,
                    detailCatatan: list
                });
            }
        }
        formData.value.catatan = catatan;

        const master = listMasterCost.value;
        const util = listUtilisasi.value;
        const list = [];
        for (let i = 0; i < master.length; i++) {
            const listUtil = [];
            let nilai = 0;
            if (master[i].name.toLowerCase().includes('raw material cost')) {
                nilai = cpoKpbn.value.nilai;
            }
            for (let j = 0; j < util.length; j++) {
                listUtil.push({
                    id: util[j].id,
                    name: util[j].name,
                    value: util[j].value,
                    nilai: nilai
                });
            }
            list.push({
                id: master[i].id,
                name: master[i].name,
                utils: listUtil
            });
        }
        formData.value.costs = list;
        listCatatan.value = catatan;
        loadingCard1.value = false;
    } catch (error) {
        formData.value.name = `Simulation Calc ${moment().format('YYYYMMDD-HHmmss')}`;
        formData.value.date = moment().toDate();
        formData.value.kurs_id = 1;
        formData.value.expected_margin = 0;
        formData.value.product_id = 4;
        formData.value.offer.buyer_name = null;
        formData.value.offer.volume = 0;
        formData.value.offer.price = 0;

        formData.value.catatan = [{ judul: '', detailCatatan: [{ teks: '' }] }];

        const master = listMasterCost.value;
        const list = [];
        for (let i = 0; i < master.length; i++) {
            const util = listUtilisasi.value;
            const listUtil = [];
            let nilai = 0;
            if (master[i].name.toLowerCase().includes('raw material cost')) {
                nilai = cpoKpbn.value.nilai;
            }
            for (let j = 0; j < util.length; j++) {
                listUtil.push({
                    id: util[j].id,
                    name: util[j].name,
                    value: util[j].value,
                    nilai: nilai
                });
            }
            list.push({
                id: master[i].id,
                name: master[i].name,
                util: listUtil
            });
        }
        listCatatan.value = [];
        formData.value.costs = list;
        loadingCard1.value = false;
    }
};

const reset = async () => {
    await loadInputData();
    showTable.value = false;
};

const detailShow = async (data) => {
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

    formData.value.catatan = [];
    const catatan = data.catatan;
    for (let i = 0; i < catatan.length; i++) {
        const detail = catatan[i].detail_catatan;
        const detailCatatan = [];
        for (let j = 0; j < detail.length; j++) {
            detailCatatan.push({
                id: detail[j].id,
                id_catatan: detail[j].id_catatan,
                teks: detail[j].teks
            });
        }
        formData.value.catatan.push({
            id: catatan[i].id,
            id_simulation: catatan[i].id_simulation,
            judul: catatan[i].judul,
            detailCatatan: detailCatatan
        });
    }
    showTable.value = false;
    visibleLoadHistory.value = false;
};

const loadSimulasi = async () => {
    loadingCard2.value = true;
    try {
        const response = await simulasiSicalRspController.simulationCalc3(formData.value);
        calcResult.value = response;
        showTable.value = true;
        loadingCard2.value = false;
    } catch (error) {
        calcResult.value = null;
        showTable.value = true;
        loadingCard2.value = false;
    }
};

const postData = async () => {
    const response = await simulasiSicalRspController.postData(formData.value);
    toast.add({ severity: response.severity, summary: response.info, detail: response.content, life: 3000 });
    if (response.severity == 'success') {
        setTimeout(function () {
            visibleSave.value = false;
            loadAll();
        }, setTime.value);
    }
};
</script>

<template>
    <div class="flex bg-neutral-950 min-h-screen font-mono text-white app-dark w-full py-8 px-6 flex-col gap-5">
        <Toast />
        <ConfirmPopup group="customDialog"></ConfirmPopup>
        <Card style="color: white; --tw-bg-opacity: 1; background-color: #0b2838">
            <template #title>
                <div class="flex w-full items-center justify-center">
                    <span class="font-bold w-full text-3xl">ASUMSI DASAR PERHITUNGAN - SICAL RSP</span>
                    <div class="flex justify-end w-full gap-2">
                        <Button label="Calculate" icon="pi pi-calculator" @click="loadSimulasi" :style="{ backgroundColor: '#205781', color: 'white', borderColor: '#205781' }" />
                        <Button label="Reset" icon="pi pi-refresh" @click="reset" :style="{ backgroundColor: '#A31D1D', color: 'white', borderColor: '#0b2838' }" />
                        <Button v-if="getToken != null" label="Save" @click="visibleSave = true" icon="pi pi-save" :style="{ backgroundColor: '#3A7D44', color: 'white', borderColor: '#0b2838' }" />
                        <Button label="Records" icon="pi pi-history" @click="loadData" :style="{ backgroundColor: '#D98324', color: 'white', borderColor: '#0b2838' }" />
                    </div>
                </div>
            </template>
            <template #content>
                <div v-if="loadingCard1 == true" class="flex w-full gap-10 items-center justify-center min-h-[10rem]">
                    <span>-- Loading Data --</span>
                </div>
                <div v-else class="flex flex-col w-full gap-5 items-start">
                    <div v-show="getToken != null" class="flex w-full flex-col gap-2 mt-5">
                        <div class="grid grid-cols-4 gap-7 w-full p-4 rounded-xl" :style="{ backgroundColor: '#0B666A' }">
                            <div class="flex flex-col col-span-1 gap-1 w-full text-white">
                                <label for="">Tanggal</label>
                                <DatePicker v-model="formData.date" dateFormat="yy-mm-dd" disabled :maxDate="maxDate" showIcon placeholder="Please input tanggal" />
                            </div>
                            <div class="flex flex-col col-span-1 gap-1 w-full text-white">
                                <label for="">Produk</label>
                                <Select v-model="formData.product_id" :options="listProduk" optionLabel="name" optionValue="id" disabled placeholder="Pilih Produk" class="w-full" />
                            </div>
                            <div class="flex flex-col col-span-1 gap-1 w-full text-white">
                                <label for="">Nama Simulasi</label>
                                <InputText v-model="formData.name" placeholder="Please input Name" />
                            </div>
                            <div class="flex flex-col col-span-1 gap-1 w-full text-white">
                                <label for="">Nama Buyer</label>
                                <InputText v-model="formData.offer.buyer_name" placeholder="Please input Buyer Name" />
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <span class="font-bold text-xl text-neutral-300">INTERNAL COST (HPP) </span>
                        <div class="grid grid-cols-4 gap-7 w-full">
                            <div v-for="(internal, index) in formData.costs" :key="index" class="flex flex-col col-span-1 gap-1 w-full p-4 rounded-xl text-white" :style="{ backgroundColor: '#0B666A' }">
                                <div class="flex w-full justify-between items-center">
                                    <label class="text-lg font-bold" :for="internal.name">{{ internal.name }}</label>
                                    <i v-show="internal.name.toLowerCase().includes('raw material')" style="font-size: 0.8vw" class="pi pi-question-circle text-yellow-500" @click="toggle"></i>
                                </div>
                                <div class="flex flex-col w-full" v-for="(util, indexs) in internal.utils" :key="indexs">
                                    <span class="w-full">{{ util.name }}</span>
                                    <div class="flex gap-1 w-full">
                                        <InputGroup>
                                            <InputGroupAddon class="font-bold">IDR</InputGroupAddon>
                                            <InputNumber v-model="util.nilai" placeholder="" class="w-full" locale="en-US" :minFractionDigits="2" />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 w-full">
                        <div class="col-span-1 flex flex-col w-full gap-2">
                            <span class="font-bold text-xl text-neutral-300">EXTERNAL COST (DMO) </span>
                            <div class="grid grid-cols-2 gap-7 w-full p-4 rounded-xl" :style="{ backgroundColor: '#0B666A' }">
                                <div class="col-span-1 flex flex-col gap-1 w-full text-white">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">DMO</label>
                                        <small class="text-white font-bold">IDR/Kg incl PPN</small>
                                    </div>
                                    <InputNumber v-model="formData.dmo" placeholder="DMO" class="w-full" disabled />
                                    <small class="text-white font-semibold">* {{ dmoData.remark }}</small>
                                </div>
                                <div class="col-span-1 flex flex-col gap-1 w-full text-white">
                                    <div class="flex w-full justify-between items-center">
                                        <div class="flex gap-3 items-center">
                                            <label class="text-lg font-bold" for="dmo">Kurs</label>
                                            <i style="font-size: 0.8vw" class="pi pi-question-circle text-yellow-500" @click="toggleKurs"></i>
                                        </div>
                                        <small class="text-white font-bold">IDR / {{ labelMataUang }}</small>
                                    </div>
                                    <InputNumber v-model="formData.kurs" placeholder="DMO" class="w-full" locale="en-US" :minFractionDigits="2" />
                                    <small class="text-white font-semibold">* Diupdate rate kurs yang sesuai</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1 flex flex-col gap-1 w-full">
                            <span class="font-bold text-xl uppercase text-neutral-300">OFFER </span>
                            <div class="flex gap-7 w-full p-4 rounded-xl h-full" :style="{ backgroundColor: '#2E5077' }">
                                <div class="flex flex-col gap-1 w-full">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">Offer dari Buyer</label>
                                    </div>
                                    <InputNumber v-model="formData.offer.price" placeholder="Offer dari Buyer" class="w-full" locale="en-US" :minFractionDigits="2" />
                                </div>
                                <div class="flex flex-col gap-1 w-full">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">Volume</label>
                                    </div>
                                    <InputNumber v-model="formData.offer.volume" placeholder="Volume" class="w-full" locale="en-US" :minFractionDigits="2" />
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1 grid grid-cols-2 w-full gap-5">
                            <div class="col-span-1 flex flex-col gap-1 w-full">
                                <span class="font-bold text-xl uppercase text-neutral-300">Expected Margin </span>
                                <div class="flex flex-col gap-1 w-full p-4 rounded-xl h-full" :style="{ backgroundColor: '#2E5077' }">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">Margin</label>
                                        <small class="text-neutral-300 font-bold">%</small>
                                    </div>
                                    <InputGroup>
                                        <InputNumber v-model="formData.expected_margin" placeholder="Margin %" class="w-full" locale="en-US" :minFractionDigits="2" />
                                        <InputGroupAddon class="font-bold">%</InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                            <div class="col-span-1 flex flex-col gap-1 w-full">
                                <span class="font-bold text-xl uppercase text-neutral-300">Mata Uang </span>
                                <div class="flex flex-col gap-1 w-full p-4 rounded-xl h-full" :style="{ backgroundColor: '#2E5077' }">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">Mata Uang</label>
                                        <small class="text-neutral-300 font-bold">%</small>
                                    </div>
                                    <Select v-model="formData.kurs_id" :options="listKurs" disabled optionLabel="name" optionValue="id" filter placeholder="Pilih Mata Uang" class="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>
        <Dialog v-model:visible="visible" modal :style="{ width: '75rem', backgroundColor: '#0a0a0a', color: 'white' }">
            <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                    <span class="font-bold whitespace-nowrap text-2xl uppercase">RECOMMENDED SELLING STRATEGY on OLEIN BULK PROFITABILITY</span>
                </div>
            </template>
            <div class="flex flex-col gap-2">
                <span class="text-surface-300 block capitalize">Update your information</span>
                <div class="flex flex-col gap-8">
                    <div class="flex items-center gap-6" v-for="(catatan, index) in listCatatan" :key="index">
                        <i class="text-cyan-500 pi pi-star-fill" style="font-size: 2rem"></i>
                        <div class="flex-col flex gap-1 w-full">
                            <span class="text-xl font-bold">{{ catatan.judul }}</span>
                            <div class="flex flex-col">
                                <small v-for="(note, indexs) in catatan.detailCatatan" :key="indexs" class="font-medium text-cyan-200">
                                    {{ note.teks }}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
        <Dialog v-model:visible="visibleLoadHistory" modal :style="{ width: '75rem' }">
            <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                    <span class="font-bold whitespace-nowrap text-2xl uppercase">History Sical RSP</span>
                </div>
            </template>
            <div class="flex flex-col gap-2">
                <span class="text-surface-500 block capitalize">List Data</span>
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
            </div>
        </Dialog>
        <Popover ref="opRawMaterial">
            <div class="flex flex-col gap-4 w-[26rem]">
                <div class="flex items-center gap-2">
                    <i class="pi pi-question-circle text-yellow-600"></i>
                    <span class="font-bold uppercase">Perhatian</span>
                </div>
                <span class="font-medium text-center">{{ cpoKpbn.remark }}</span>
            </div>
        </Popover>
        <Popover ref="opKurs">
            <div class="flex flex-col gap-4 w-[26rem]">
                <div class="flex items-center gap-2">
                    <i class="pi pi-question-circle text-yellow-600"></i>
                    <span class="font-bold uppercase">Perhatian</span>
                </div>
                <span class="font-medium">{{ kursData.remark }}</span>
            </div>
        </Popover>
        <Dialog v-model:visible="visibleSave" modal :style="{ width: '55rem', backgroundColor: '#0a0a0a', color: 'white' }">
            <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                    <span class="font-bold whitespace-nowrap text-2xl uppercase text-pink-300">Apakah Anda ingin simpan data RSP ?</span>
                </div>
            </template>
            <div class="flex flex-col gap-2 font-mono">
                <small class="block font-bold mb-2"><span class="text-red-500 text-lg">*</span> Harap dilengkapi.</small>
                <div class="flex flex-col gap-3">
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
                </div>
            </div>
            <template #footer>
                <div class="flex items-center justify-end w-full gap-2">
                    <button @click="postData" class="py-2 px-4 rounded-lg bg-emerald-600 text-white font-medium items-center"><i class="pi pi-save"></i> Save</button>
                </div>
            </template>
        </Dialog>
        <Card style="color: white; --tw-bg-opacity: 1; background-color: #0b2838">
            <template #title>
                <div class="flex w-full justify-between py-2">
                    <span class="font-bold text-3xl text-white">INL SIMULATION CALCULATOR FOR RECOMMENDED SELLING PRICE (SICAL RSP)</span>
                    <i @click="visible = true" style="font-size: 1.4vw" class="pi pi-question-circle text-yellow-500 hover:text-yellow-300 transition-all duration-300 cursor-pointer"></i>
                </div>
            </template>
            <template #content>
                <div v-if="loadingCard2 == true" class="w-full flex justify-center items-center">
                    <span>-- Loading Data --</span>
                </div>
                <div v-else>
                    <div v-if="showTable == true" class="flex w-full gap-5">
                        <simulation-calc v-if="calcResult != null" :datas="calcResult" />
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>
