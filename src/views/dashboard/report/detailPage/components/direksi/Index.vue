<script setup>
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import mataUangKursController from '@/controller/getApiFromThisApp/kurs/mataUangKursController';
import dmoSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/dmoSicalRspController';
import masterCostSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/masterCostSicalRspController';
import utilisasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/utilisasiSicalRspController';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const descriptionList = ref([{ name: 'Input', items: [{ id: 'A', color: 'bg-emerald-900', desc: 'Cek /update biaya : Packaging, logistik dan processing cost (Biaya ini bisa berubah jika ada efisiensi / in-efisiensi' }] }]);
const listMasterCost = ref([]);
const listUtilisasi = ref([]);
const listKurs = ref([]);
const listMataUang = ref([]);
const nilaiDMO = ref(0);
const remarkDMO = ref('');
const nilaiKurs = ref(0);
const remarkKurs = ref('');
const labelMataUang = ref('USD');

const formData = ref({
    kurs: 0,
    kurs_id: 1,
    dmo: 0,
    margin: 0,
    offer_buyer: 0,
    volume: 0,
    internal_cost: []
});

const formInternal = ref([]);

// Input Form
const expectedMargin = ref(0);

onMounted(() => {
    loadAll();
    loadDMO();
    loadKursLatest();
});

const loadAll = async () => {
    await loadKurs();
    await loadMasterCost();
    await loadUtilisasi();
    await loadInputData();
};

const loadDMO = async () => {
    try {
        const response = await dmoSicalRspController.getLatest();
        nilaiDMO.value = Number(response.value);
        remarkDMO.value = response.remark;
        formData.value.dmo = nilaiDMO.value;
    } catch (error) {
        nilaiDMO.value = 0;
        formData.value.dmo = 0;
    }
};

const loadKursLatest = async () => {
    try {
        const response = await kursController.getByLatest({ idMataUang: formData.value.kurs_id });
        nilaiKurs.value = Number(response.value);
        remarkKurs.value = `Jisdor Bank Indonesia Tanggal ${moment(response.tanggal).format('DD MMMM YYYY')}`;
        formData.value.kurs = nilaiKurs.value;
    } catch (error) {
        formData.value.kurs = 0;
        nilaiKurs.value = 0;
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

const loadUtilisasi = async () => {
    try {
        const response = await utilisasiSicalRspController.getAll();
        listUtilisasi.value = response.sort((a, b) => a.id - b.id);
    } catch (error) {
        listUtilisasi.value = [];
    }
};

const loadInputData = async () => {
    const master = listMasterCost.value;
    const list = [];
    for (let i = 0; i < master.length; i++) {
        const util = listUtilisasi.value;
        const listUtil = [];
        for (let j = 0; j < util.length; j++) {
            listUtil.push({
                id: util[j].id,
                name: util[j].name,
                value: util[j].value,
                nilai: 0
            });
        }
        list.push({
            id: master[i].id,
            name: master[i].name,
            util: listUtil
        });
    }
    formInternal.value = list;
};

const reset = async () => {
    formData.value = {
        kurs: nilaiKurs.value,
        kurs_id: 1,
        dmo: nilaiDMO.value,
        margin: 0,
        offer_buyer: 0,
        volume: 0,
        internal_cost: []
    };
    const listMU = listMataUang.value.find((item) => item.id == formData.value.kurs_id);
    labelMataUang.value = listMU.name;
};

const loadSimulasi = async () => {
    try {
        const listMU = listMataUang.value.find((item) => item.id == formData.value.kurs_id);
        labelMataUang.value = listMU.name;
        // const response = await simulasiSicalRspController.loadTable({ idMataUang: 1 });
        // console.log(response);
        // listSimulasi.value = response;
    } catch (error) {
        // listSimulasi.value = [];
    }
};
</script>

<template>
    <div class="flex bg-neutral-950 min-h-screen font-mono text-white app-dark w-full py-8 px-6 flex-col gap-5">
        <Card style="color: white; --tw-bg-opacity: 1; background-color: rgb(38 38 38 / var(--tw-bg-opacity, 1))">
            <template #title>
                <div class="flex w-full items-center justify-center">
                    <span class="font-bold w-full text-3xl">ASUMSI DASAR PERHITUNGAN</span>
                    <div class="flex justify-end w-full gap-2">
                        <Button label="Calculate" icon="pi pi-calculator" severity="danger" @click="loadSimulasi" />
                        <Button label="Reset" icon="pi pi-refresh" severity="info" @click="reset" />
                    </div>
                </div>
            </template>
            <template #content>
                <div class="flex w-full gap-10 items-start mb-10">
                    <div class="flex w-full flex-col gap-2">
                        <span class="font-bold text-xl text-neutral-300">INTERNAL COST (HPP) </span>
                        <div class="grid grid-cols-2 gap-7 w-full">
                            <div v-for="(internal, index) in formInternal" :key="index" class="flex flex-col col-span-1 gap-1 w-full p-4 rounded-xl bg-yellow-600">
                                <label class="text-lg font-bold" :for="internal.name">{{ internal.name }}</label>
                                <div class="flex flex-col w-full" v-for="(util, indexs) in internal.util" :key="indexs">
                                    <span class="w-full">{{ util.name }}</span>
                                    <div class="flex gap-1 w-full">
                                        <InputGroup>
                                            <InputGroupAddon class="font-bold">Rp</InputGroupAddon>
                                            <InputNumber v-model="util.nilai" placeholder="" class="w-full" />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupAddon class="font-bold">{{ labelMataUang }}</InputGroupAddon>
                                            <InputNumber v-model="util.nilai" placeholder="" class="w-full" disabled />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex flex-col gap-2">
                            <span class="font-bold text-xl text-neutral-300">EXTERNAL COST (DMO) </span>
                            <div class="flex gap-7 w-full">
                                <div class="flex flex-col gap-1 w-full p-4 rounded-xl bg-neutral-700">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">DMO</label>
                                        <small class="text-neutral-300 font-bold">IDR/Kg incl PPN</small>
                                    </div>
                                    <InputNumber v-model="formData.dmo" placeholder="DMO" class="w-full" disabled />
                                    <small class="text-cyan-400 font-semibold">* {{ remarkDMO }}</small>
                                </div>
                                <div class="flex flex-col gap-1 w-full p-4 rounded-xl bg-neutral-700">
                                    <div class="flex w-full justify-between items-center">
                                        <div class="flex gap-3 items-center">
                                            <label class="text-lg font-bold" for="dmo">Kurs</label>
                                            <i style="font-size: 0.8vw" class="pi pi-question-circle text-yellow-500" v-tooltip.top="'Nilai Default ' + remarkKurs"></i>
                                        </div>
                                        <small class="text-neutral-300 font-bold">IDR / {{ labelMataUang }}</small>
                                    </div>
                                    <InputNumber v-model="formData.kurs" placeholder="DMO" class="w-full" />
                                    <small class="text-cyan-400 font-semibold">* Diupdate rate kurs yang sesuai</small>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2 w-full">
                            <span class="font-bold text-xl uppercase text-neutral-300">OFFER </span>
                            <div class="flex gap-7 w-full">
                                <div class="flex flex-col gap-1 w-full p-4 rounded-xl bg-emerald-700">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">Offer dari Buyer</label>
                                    </div>
                                    <InputNumber v-model="formData.offer_buyer" placeholder="Offer dari Buyer" class="w-full" />
                                </div>
                                <div class="flex flex-col gap-1 w-full p-4 rounded-xl bg-emerald-700">
                                    <div class="flex w-full justify-between items-center">
                                        <label class="text-lg font-bold" for="dmo">Volume</label>
                                    </div>
                                    <InputNumber v-model="formData.volume" placeholder="Volume" class="w-full" />
                                </div>
                            </div>
                        </div>

                        <div class="flex w-full gap-7">
                            <div class="flex flex-col gap-2 w-full">
                                <span class="font-bold text-xl uppercase text-neutral-300">Expected Margin </span>
                                <div class="flex gap-7 w-full">
                                    <div class="flex flex-col gap-1 w-full p-4 rounded-xl bg-pink-700">
                                        <div class="flex w-full justify-between items-center">
                                            <label class="text-lg font-bold" for="dmo">Margin</label>
                                            <small class="text-neutral-300 font-bold">%</small>
                                        </div>
                                        <InputGroup>
                                            <InputNumber v-model="formData.margin" placeholder="Margin %" class="w-full" />
                                            <InputGroupAddon class="font-bold">%</InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <span class="font-bold text-xl uppercase text-neutral-300">Mata Uang </span>
                                <div class="flex gap-7 w-full">
                                    <div class="flex flex-col gap-1 w-full p-4 rounded-xl bg-cyan-700">
                                        <div class="flex w-full justify-between items-center">
                                            <label class="text-lg font-bold" for="dmo">Set Mata Uang</label>
                                            <small class="text-neutral-300 font-bold">%</small>
                                        </div>
                                        <Select v-model="formData.kurs_id" :options="listKurs" optionLabel="name" optionValue="id" filter placeholder="Pilih Mata Uang" class="w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="flex w-full bg-pink-200 flex-col gap-2">
                    <div class="grid grid-cols-6 w-full font-bold">
                        <div class="text-[0.9vw] col-span-2 text-center flex items-center justify-center bg-slate-800 p-3 border">
                            <span>ASUMSI DASAR PERHITUNGAN</span>
                        </div>
                        <div v-for="(list, index) in listMasterCost" :key="index" class="bg-yellow-400 p-3 border text-black text-center flex flex-col items-center justify-center col-span-1">
                            <span class="text-[0.9vw]" :class="list.name.toLowerCase().includes('bulk processing') ? 'text-red-700' : 'text-black'">{{ list.name }}</span>
                            <div class="flex w-full">
                                <span class="w-full">(IDR)</span>
                                <span class="w-full" v-if="list.name.toLowerCase().includes('bulk processing')">(USD)</span>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-7 w-full font-bold text-black">
                        <div class="font-bold col-span-2 text-center flex items-center p-1">
                            <span>INTERNAL COST (HPP)</span>
                        </div>
                        <div v-for="(list, index) in listMasterCost" :key="index" class="p-1 text-black text-center flex flex-col items-center justify-center" :class="list.name.toLowerCase().includes('bulk processing') ? 'col-span-2' : 'col-span-1'">
                            <span class="text-[0.7vw]" v-if="list.name.toLowerCase().includes('packaging')">* DMO</span>
                            <span class="text-[0.7vw]" v-if="list.name.toLowerCase().includes('logistic')">* FOB</span>
                        </div>
                        <div class="text-[0.7vw] col-span-1 text-center flex items-center justify-center p-1"></div>
                    </div>
                    <div class="grid grid-cols-6 w-full font-bold">
                        <div class="text-[0.7vw] col-span-1 text-center flex items-center justify-center bg-neutral-800 p-3 border">
                            <span>STRUKTUR BIAYA PRODUKSI INL (HPP)</span>
                        </div>
                        <div class="text-[0.7vw] col-span-1 text-center flex flex-col items-center justify-center bg-neutral-800 p-3 border">
                            <span class="w-full" v-for="(list, index) in listUtilisasi" :key="index">{{ list.name }}</span>
                        </div>
                        <div v-for="(list, index) in listMasterCost" :key="index" class="bg-blue-300 border text-black text-center flex flex-col items-center justify-center col-span-1 w-full">
                            <div class="grid grid-cols-2 p-1 gap-1 w-full">
                                <div class="col-span-1 flex w-full">
                                    <InputNumber placeholder="IDR" class="w-1" />
                                </div>
                                <div class="col-span-1 flex w-full">
                                    <InputNumber placeholder="USD" class="w-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-7 w-full font-bold text-black">
                        <div class="font-bold col-span-8 text-center flex items-center p-2">
                            <span>EXTERNAL COST (DMO)</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-7 w-full font-bold">
                        <div class="text-[0.8vw] col-span-1 text-center flex flex-col items-center justify-center bg-neutral-800 p-3 border">
                            <span class="h-full flex items-center">DMO</span>
                            <span class="h-full flex items-center">Kurs</span>
                        </div>
                        <div class="text-[0.8vw] col-span-1 text-center flex flex-col items-center justify-center bg-neutral-800 p-3 border">
                            <span class="h-full flex items-center">IDR/Kg incl PPN</span>
                            <span class="h-full flex items-center">IDR / USD </span>
                        </div>
                        <div class="text-[0.8vw] text-black col-span-2 text-center flex flex-col items-center bg-blue-300 justify-center p-3 border">
                            <InputNumber v-model="nilaiDMO" placeholder="DMO" class="w-full" />
                            <InputNumber v-model="nilaiKurs" placeholder="KURS" class="w-full" />
                        </div>
                        <div class="text-[0.8vw] col-span-3 text-center flex flex-col items-center bg-neutral-900 justify-center p-3 border">
                            <span class="h-full flex items-center">{{ remarkDMO }}</span>
                            <span class="h-full flex items-center">Diupdate rate kurs yang sesuai</span>
                        </div>
                    </div>
                </div> -->
            </template>
        </Card>
        <Card style="color: white; --tw-bg-opacity: 1; background-color: rgb(38 38 38 / var(--tw-bg-opacity, 1))">
            <template #title>
                <div class="flex w-full justify-between py-2">
                    <span class="font-bold">INL SIMULATION CALCULATOR FOR RECOMMENDED SELLING PRICE (SICAL RSP)</span>
                    <i style="font-size: 1.4vw" class="pi pi-question-circle text-yellow-500"></i>
                </div>
            </template>
            <template #content>
                <DataTable :value="listUtilisasi" showGridlines editMode="cell" scrollHeight="550px" dataKey="id">
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>

                    <ColumnGroup type="header">
                        <Row>
                            <Column :rowspan="3">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-black">
                                        <span>Utilisasi</span>
                                    </div>
                                </template>
                            </Column>

                            <!-- Looping Produk -->
                            <Column v-for="product in listMasterCost" :key="product.id" :colspan="product.name.toLowerCase().includes('packaging') ? 1 : 2">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-black">
                                        <span>{{ product.name }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column :colspan="2">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-black">
                                        <span>Expected Margin</span>
                                    </div>
                                </template>
                            </Column>
                        </Row>
                        <Row>
                            <Column :colspan="listMasterCost.length * 2 - 1" headerStyle="background-color:#eab308;">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-black">
                                        <span>COST OF GOOD SOLD / HPP</span>
                                    </div>
                                </template>
                            </Column>
                            <Column :colspan="2" headerStyle="background-color:#93c5fd;">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-black bg-blue-300">
                                        <InputGroup>
                                            <InputNumber v-model="expectedMargin" placeholder="0.0" />
                                            <InputGroupAddon>%</InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                </template>
                            </Column>
                        </Row>
                        <Row>
                            <!-- Looping Produk -->
                            <template v-for="product in listMasterCost" :key="product.id">
                                <Column headerStyle="background-color:#dc2626; color:white">
                                    <template #header>
                                        <div class="text-center w-full flex justify-center font-bold">
                                            <span>IDR</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column v-if="!product.name.toLowerCase().includes('packaging')" headerStyle="background-color:#134e4a; color:white">
                                    <template #header>
                                        <div class="text-center w-full flex justify-center font-bold">
                                            <span>USD</span>
                                        </div>
                                    </template>
                                </Column>
                            </template>
                            <Column headerStyle="background-color:#dc2626; color:white">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>IDR</span>
                                    </div>
                                </template>
                            </Column>
                            <Column>
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-black">
                                        <span>%</span>
                                    </div>
                                </template>
                            </Column>
                        </Row>
                    </ColumnGroup>
                    <Column field="name" style="min-width: 13rem">
                        <template #body="{ data }">
                            <div class="flex justify-between items-center gap-2">
                                <strong class="text-sm w-full">{{ data.name }}</strong>
                            </div>
                        </template>
                    </Column>
                    <template v-for="product in listMasterCost" :key="product.id">
                        <Column>
                            <template #body="{ data }">
                                <div class="flex justify-between">
                                    <small>{{ data.name }}</small>
                                </div>
                            </template>
                        </Column>
                        <Column v-if="!product.name.toLowerCase().includes('packaging')">
                            <template #body="{ data }">
                                <div class="flex justify-between">
                                    <small>{{ data.name }}</small>
                                </div>
                            </template>
                        </Column>
                    </template>
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-between items-center gap-2">
                                <strong class="text-sm w-full">{{ data.name }}</strong>
                                <!-- <Button icon="pi pi-pencil" severity="warning" text /> -->
                            </div>
                        </template>
                    </Column>
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-between items-center gap-2">
                                <strong class="text-sm w-full">{{ data.name }}</strong>
                                <!-- <Button icon="pi pi-pencil" severity="warning" text /> -->
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <!-- <div class="flex w-full flex-col">
                    <div class="w-full font-bold" :class="`grid grid-cols-${listMasterCost.length * 2 - 1 + 2 + 1}`">
                        <div class="text-center flex items-center justify-center p-3 border">
                            <span>Utilisasi</span>
                        </div>
                    </div>
                    <div class="w-full font-bold" :class="`grid grid-cols-${listMasterCost.length * 2 - 1 + 2 + 1}`">
                        <div class="col-span-1 text-center flex items-center justify-center p-3 border">
                            <span>Utilisasi</span>
                        </div>
                        <div
                            v-for="(list, index) in listMasterCost"
                            :key="index"
                            class="p-3 border text-black text-center flex flex-col items-center justify-center"
                            :class="list.name.toLowerCase().includes('packaging') ? 'col-span-1' : 'col-span-2'"
                        >
                            <span class="text-pink-500">{{ list.name }}</span>
                        </div>
                        <div class="col-span-2 text-center flex items-center justify-center p-3 border">
                            <span>Expected Margin</span>
                        </div>
                    </div>
                    <div class="w-full font-bold" :class="`grid grid-cols-${listMasterCost.length * 2 - 1 + 2 + 1}`">
                        <div class="col-span-1 text-center flex items-center justify-center p-3 border">
                            <span>%</span>
                        </div>
                        <div
                            v-for="(list, index) in listMasterCost"
                            :key="index"
                            class="p-3 border text-black text-center flex flex-col items-center justify-center"
                            :class="list.name.toLowerCase().includes('packaging') ? 'col-span-1' : 'col-span-2'"
                        >
                            <span class="text-pink-500">{{ list.name }}</span>
                        </div>
                        <div class="col-span-2 text-center flex items-center justify-center p-3 border">
                            <span>Expected Margin</span>
                        </div>
                    </div>
                </div> -->
            </template>
        </Card>
    </div>
</template>
