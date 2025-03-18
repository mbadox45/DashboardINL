<script setup>
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import mataUangKursController from '@/controller/getApiFromThisApp/kurs/mataUangKursController';
import dmoSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/dmoSicalRspController';
import masterCostSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/masterCostSicalRspController';
import pengaliSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/pengaliSicalRspController';
import simulasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/simulasiSicalRspController';
import utilisasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/utilisasiSicalRspController';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const descriptionList = ref([{ name: 'Input', items: [{ id: 'A', color: 'bg-emerald-900', desc: 'Cek /update biaya : Packaging, logistik dan processing cost (Biaya ini bisa berubah jika ada efisiensi / in-efisiensi' }] }]);
const listMasterCost = ref([]);
const listUtilisasi = ref([]);
const listKurs = ref([]);
const listMataUang = ref([]);
const listPengali = ref([]);
const nilaiDMO = ref(0);
const remarkDMO = ref('');
const nilaiKurs = ref(0);
const remarkKurs = ref('');
const labelMataUang = ref('USD');
const showTable = ref(false);
const loadingCard1 = ref(false);
const loadingCard2 = ref(false);

// Table
const listSimulasi1 = ref([]);
const listSimulasi2 = ref([]);
const listSimulasi3 = ref([]);
const listSimulasi4 = ref([]);

const formData = ref({
    kurs: 0,
    kurs_id: 1,
    dmo: 0,
    id_dmo: 0,
    margin: 0,
    offer_buyer: 973,
    volume: 12000,
    internal_cost: []
});

const formInternal = ref([]);

// Input Form
const expectedMargin = ref(0);

onMounted(() => {
    loadAll();
});

const loadAll = async () => {
    loadingCard1.value = true;
    await loadKursLatest();
    await loadKurs();
    await loadMasterCost();
    await loadUtilisasi();
    await loadDMO();
    await loadPengali();
    await loadInputData();
    loadingCard1.value = false;
};

const loadDMO = async () => {
    try {
        const response = await dmoSicalRspController.getLatest();
        nilaiDMO.value = Number(response.value);
        remarkDMO.value = response.remark;
        formData.value.dmo = nilaiDMO.value;
        formData.value.id_dmo = response.id;
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

const loadInputData = async () => {
    try {
        const response = await simulasiSicalRspController.getAll();
        let data = [];
        if (response != null) {
            const dataSical = response.sort((a, b) => b.id - a.id);
            data = dataSical[0].cost;
        }
        const master = listMasterCost.value;
        const list = [];
        for (let i = 0; i < master.length; i++) {
            const util = listUtilisasi.value;
            const listUtil = [];
            for (let j = 0; j < util.length; j++) {
                const cost = data.find((item) => item.id_master_cost == master[i].id && item.id_utilisasi == util[j].id);
                const nilai = cost == null ? 0 : Number(cost.value);
                listUtil.push({
                    id: util[j].id,
                    name: util[j].name,
                    value: util[j].value,
                    nilai: nilai,
                    nilai_asing: nilai == 0 ? 0 : ((nilai / formData.value.kurs) * 1000).toFixed(2)
                });
            }
            list.push({
                id: master[i].id,
                name: master[i].name,
                util: listUtil
            });
        }
        formInternal.value = list;
        loadingCard1.value = false;
    } catch (error) {
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
                    nilai: 0,
                    nilai_asing: 0
                });
            }
            list.push({
                id: master[i].id,
                name: master[i].name,
                util: listUtil
            });
        }
        formInternal.value = list;
        loadingCard1.value = false;
    }
};

const reset = async () => {
    formData.value.kurs = nilaiKurs.value;
    formData.value.kurs_id = 1;
    formData.value.dmo = nilaiDMO.value;
    formData.value.margin = 0;
    formData.value.offer_buyer = 973;
    formData.value.volume = 12000;
    formData.value.internal_cost = [];
    const listMU = listMataUang.value.find((item) => item.id == formData.value.kurs_id);
    labelMataUang.value = listMU.name;
    showTable.value = false;
};

const loadSimulasi = async () => {
    loadingCard2.value = true;
    try {
        const listMU = listMataUang.value.find((item) => item.id == formData.value.kurs_id);
        labelMataUang.value = listMU.name;

        // Hasil Kalkulasi
        const response = await simulasiSicalRspController.simulationCalc2(formData.value, formInternal.value);
        console.log(response);
        listSimulasi1.value = response.sim1;
        listSimulasi2.value = response.sim2;
        listSimulasi3.value = response.sim3;
        listSimulasi4.value = response.sim4;
        showTable.value = true;
        loadingCard2.value = false;
    } catch (error) {
        listSimulasi1.value = [];
        listSimulasi2.value = [];
        listSimulasi3.value = [];
        listSimulasi4.value = [];
        showTable.value = true;
        loadingCard2.value = false;
    }
};
</script>

<template>
    <div class="flex bg-neutral-950 min-h-screen font-mono text-white app-dark w-full py-8 px-6 flex-col gap-5">
        <Card style="color: white; --tw-bg-opacity: 1; background-color: rgb(38 38 38 / var(--tw-bg-opacity, 1))">
            <template #title>
                <div class="flex w-full items-center justify-center">
                    <span class="font-bold w-full text-3xl">ASUMSI DASAR PERHITUNGAN - SICAL RSP</span>
                    <div class="flex justify-end w-full gap-2">
                        <Button label="Calculate" icon="pi pi-calculator" severity="danger" @click="loadSimulasi" />
                        <Button label="Reset" icon="pi pi-refresh" severity="info" @click="reset" />
                    </div>
                </div>
            </template>
            <template #content>
                <div v-if="loadingCard1 == true" class="flex w-full gap-10 items-center justify-center min-h-[10rem]">
                    <span>-- Loading Data --</span>
                </div>
                <div v-else class="flex w-full gap-10 items-start">
                    <div class="flex w-full flex-col gap-2">
                        <span class="font-bold text-xl text-neutral-300">INTERNAL COST (HPP) </span>
                        <div class="grid grid-cols-2 gap-7 w-full">
                            <div v-for="(internal, index) in formInternal" :key="index" class="flex flex-col col-span-1 gap-1 w-full p-4 rounded-xl bg-yellow-600">
                                <label class="text-lg font-bold" :for="internal.name">{{ internal.name }}</label>
                                <div class="flex flex-col w-full" v-for="(util, indexs) in internal.util" :key="indexs">
                                    <span class="w-full">{{ util.name }}</span>
                                    <div class="flex gap-1 w-full">
                                        <InputGroup>
                                            <InputGroupAddon class="font-bold">IDR</InputGroupAddon>
                                            <InputNumber v-model="util.nilai" placeholder="" class="w-full" />
                                        </InputGroup>
                                        <!-- <InputGroup>
                                            <InputGroupAddon class="font-bold">{{ labelMataUang }}</InputGroupAddon>
                                            <InputNumber v-model="util.nilai_asing" placeholder="" class="w-full" disabled />
                                        </InputGroup> -->
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

                        <div class="flex flex-col gap-1 w-full">
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
                            <div class="flex flex-col gap-1 w-full">
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
                            <div class="flex flex-col gap-1 w-full">
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
            </template>
        </Card>
        <Card style="color: white; --tw-bg-opacity: 1; background-color: rgb(38 38 38 / var(--tw-bg-opacity, 1))">
            <template #title>
                <div class="flex w-full justify-between py-2">
                    <span class="font-bold text-3xl text-pink-500">INL SIMULATION CALCULATOR FOR RECOMMENDED SELLING PRICE (SICAL RSP)</span>
                    <i style="font-size: 1.4vw" class="pi pi-question-circle text-yellow-500"></i>
                </div>
            </template>
            <template #content>
                <div v-if="loadingCard2 == true" class="w-full flex justify-center items-center">
                    <span>-- Loading Data --</span>
                </div>
                <div v-else>
                    <div v-if="showTable == true" class="flex flex-col gap-5">
                        <DataTable :value="listSimulasi1" showGridlines editMode="cell" scrollHeight="550px" dataKey="id">
                            <template #empty>
                                <div class="flex w-full items-center justify-center">
                                    <span>-- Data tidak tersedia --</span>
                                </div>
                            </template>
                            <template #loading> Loading customers data. Please wait. </template>

                            <ColumnGroup type="header">
                                <Row>
                                    <Column :rowspan="3" headerStyle="background-color:#262626">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-white">
                                                <span>Utilisasi</span>
                                            </div>
                                        </template>
                                    </Column>

                                    <!-- Looping Produk -->
                                    <Column v-for="product in listMasterCost" :key="product.id" :colspan="2">
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
                                    <Column :colspan="listMasterCost.length * 2" headerStyle="background-color:#eab308;">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-black">
                                                <span>COST OF GOOD SOLD / HPP</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column :colspan="2" headerStyle="background-color:#93c5fd;">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-black bg-blue-300">
                                                <span>{{ formData.margin }} %</span>
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
                                        <Column headerStyle="background-color:#134e4a; color:white">
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
                                        <div class="flex justify-center">
                                            <small>{{ data.product?.[product.id].value }}</small>
                                        </div>
                                    </template>
                                </Column>
                                <Column>
                                    <template #body="{ data }">
                                        <div class="flex justify-center">
                                            <small>{{ data.product?.[product.id].usd }}</small>
                                        </div>
                                    </template>
                                </Column>
                            </template>
                            <Column field="name">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center w-full gap-2">
                                        <strong class="text-sm">{{ data.margin }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center w-full gap-2">
                                        <strong class="text-sm">{{ data.marginPercent }}%</strong>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>

                        <DataTable :value="listSimulasi2" showGridlines editMode="cell" scrollHeight="550px" dataKey="id">
                            <template #empty>
                                <div class="flex w-full items-center justify-center">
                                    <span>-- Data tidak tersedia --</span>
                                </div>
                            </template>
                            <template #loading> Loading customers data. Please wait. </template>

                            <ColumnGroup type="header">
                                <Row>
                                    <Column :rowspan="3" headerStyle="background-color:#262626">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-white">
                                                <span>Utilisasi</span>
                                            </div>
                                        </template>
                                    </Column>

                                    <!-- Looping Produk -->
                                    <Column :colspan="4" headerStyle="background-color:#dc2626; color:white">
                                        <template #header>
                                            <div class="w-full flex flex-col items-center justify-center font-bold">
                                                <span>REKOMENDASI Harga Jual TANPA DMO</span>
                                                <p class="text-center">(DMO ditanggung Buyer / Penjualan Domestik )</p>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column :colspan="2" :rowspan="2">
                                        <template #header>
                                            <div class="w-full flex flex-col items-center justify-center font-bold text-black">
                                                <span>BIAYA DMO</span>
                                                <p class="text-center">Kerugian per kg (IDR) atau per Ton (USD) Minyakita</p>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column :colspan="2 * listPengali.length">
                                        <template #header>
                                            <div class="w-full flex flex-col items-center justify-center font-bold text-black">
                                                <span>BIAYA DMO</span>
                                                <p class="text-center">(Per KG (IDR) atau per MT (USD) Olein Export ) Dengan Variasi FAKTOR Pengali</p>
                                            </div>
                                        </template>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column :colspan="3">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-black">
                                                <span> FOB Kuala Tanjung</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column>
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-black">
                                                <span>LOCO INL</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <template v-for="pengali in listPengali" :key="pengali.id">
                                        <Column :colspan="2">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold text-black">
                                                    <span>{{ pengali.value }}</span>
                                                </div>
                                            </template>
                                        </Column>
                                    </template>
                                </Row>
                                <Row>
                                    <Column headerStyle="background-color:#dc2626; color:white">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold">
                                                <span>IDR</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column headerStyle="background-color:#134e4a; color:white">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold">
                                                <span>USD</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column>
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-black">
                                                <span>CPO+</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column>
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-black">
                                                <span>CPO+</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column headerStyle="background-color:#dc2626; color:white">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold">
                                                <span>IDR</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column headerStyle="background-color:#134e4a; color:white">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold">
                                                <span>USD</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <template v-for="pengali in listPengali" :key="pengali.id">
                                        <Column headerStyle="background-color:#dc2626; color:white">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold">
                                                    <span>IDR</span>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column headerStyle="background-color:#134e4a; color:white">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold">
                                                    <span>USD</span>
                                                </div>
                                            </template>
                                        </Column>
                                    </template>
                                </Row>
                            </ColumnGroup>
                            <Column field="name" style="min-width: 13rem">
                                <template #body="{ data }">
                                    <div class="flex justify-between items-center gap-2">
                                        <strong class="text-sm">{{ data.name }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <Column field="fobIdr">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center gap-2">
                                        <strong class="text-sm">{{ data.fobIdr }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center gap-2">
                                        <strong class="text-sm">{{ data.fobUsd }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center gap-2">
                                        <strong class="text-sm">{{ data.fobCpo }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center gap-2">
                                        <strong class="text-sm">{{ data.locoCpo }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center gap-2">
                                        <strong class="text-sm">{{ data.kerugianIdr }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center gap-2">
                                        <strong class="text-sm">{{ data.kerugianUsd }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <template v-for="pengali in listPengali" :key="pengali.id">
                                <Column field="name">
                                    <template #body="{ data }">
                                        <div class="flex justify-center items-center gap-2">
                                            <strong class="text-sm">{{ data.product?.[pengali.id].idr }}</strong>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="name">
                                    <template #body="{ data }">
                                        <div class="flex justify-center items-center gap-2">
                                            <strong class="text-sm">{{ data.product?.[pengali.id].usd }}</strong>
                                        </div>
                                    </template>
                                </Column>
                            </template>
                        </DataTable>

                        <DataTable :value="listSimulasi3" showGridlines editMode="cell" scrollHeight="550px" dataKey="id">
                            <template #empty>
                                <div class="flex w-full items-center justify-center">
                                    <span>-- Data tidak tersedia --</span>
                                </div>
                            </template>
                            <template #loading> Loading customers data. Please wait. </template>

                            <ColumnGroup type="header">
                                <Row>
                                    <Column :rowspan="3" headerStyle="background-color:#262626">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-white">
                                                <span>Utilisasi</span>
                                            </div>
                                        </template>
                                    </Column>

                                    <!-- Looping Produk -->
                                    <Column :colspan="listPengali.length * 2 * 2" headerStyle="background-color:#dc2626; color:white">
                                        <template #header>
                                            <div class="w-full flex flex-col items-center justify-center font-bold">
                                                <span>REKOMENDASI Harga Jual DENGAN DMO DITANGGUNG INL</span>
                                            </div>
                                        </template>
                                    </Column>
                                </Row>
                                <Row>
                                    <template v-for="pengali in listPengali" :key="pengali.id">
                                        <Column :colspan="2">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold text-black">
                                                    <span>{{ pengali.name }}</span>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column :colspan="2">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold text-black">
                                                    <span>CPO +</span>
                                                </div>
                                            </template>
                                        </Column>
                                    </template>
                                </Row>
                                <Row>
                                    <template v-for="pengali in listPengali" :key="pengali.id">
                                        <Column headerStyle="background-color:#dc2626; color:white">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold">
                                                    <span>IDR</span>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column headerStyle="background-color:#134e4a; color:white">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold">
                                                    <span>USD</span>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column headerStyle="background-color:#dc2626; color:white">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold">
                                                    <span>IDR</span>
                                                </div>
                                            </template>
                                        </Column>
                                        <Column headerStyle="background-color:#134e4a; color:white">
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold">
                                                    <span>USD</span>
                                                </div>
                                            </template>
                                        </Column>
                                    </template>
                                </Row>
                            </ColumnGroup>
                            <Column field="name" style="min-width: 13rem">
                                <template #body="{ data }">
                                    <div class="flex justify-between items-center gap-2">
                                        <strong class="text-sm w-full">{{ data.name }}</strong>
                                    </div>
                                </template>
                            </Column>

                            <template v-for="pengali in listPengali" :key="pengali.id">
                                <Column field="name">
                                    <template #body="{ data }">
                                        <div class="flex justify-center items-center gap-2">
                                            <strong class="text-sm">{{ data.product?.[pengali.id].idr }}</strong>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="name">
                                    <template #body="{ data }">
                                        <div class="flex justify-center items-center gap-2">
                                            <strong class="text-sm">{{ data.product?.[pengali.id].usd }}</strong>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="name">
                                    <template #body="{ data }">
                                        <div class="flex justify-center items-center gap-2">
                                            <strong class="text-sm">{{ data.product?.[pengali.id].idrCpoPlus }}</strong>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="name">
                                    <template #body="{ data }">
                                        <div class="flex justify-center items-center gap-2">
                                            <strong class="text-sm">{{ data.product?.[pengali.id].usdCpoPlus }}</strong>
                                        </div>
                                    </template>
                                </Column>
                            </template>
                        </DataTable>

                        <DataTable :value="listSimulasi4" :sortOrder="1" showGridlines rowGroupMode="subheader" groupRowsBy="analisa" sortField="analisa" sortMode="single" dataKey="analisa">
                            <template #empty>
                                <div class="flex w-full items-center justify-center">
                                    <span>-- Data tidak tersedia --</span>
                                </div>
                            </template>
                            <template #loading> Loading customers data. Please wait. </template>

                            <!-- <ColumnGroup type="header">
                                <Row>
                                    <Column :rowspan="2" :colspan="2" headerStyle="background-color:#262626">
                                        <template #header>
                                            <div class="text-center w-full flex justify-center font-bold text-white">
                                                <span>ANALISA POTENSI LABA (RUGI)</span>
                                            </div>
                                        </template>
                                    </Column>

                                    <Column :rowspan="2" headerStyle="background-color:#262626">
                                        <template #header>
                                            <div class="text-center w-full flex flex-col justify-center font-bold text-white">
                                                <span>Tanpa DMO</span>
                                                <span>({{ labelMataUang }})</span>
                                            </div>
                                        </template>
                                    </Column>
                                    <Column :colspan="listPengali.length" headerStyle="background-color:#262626">
                                        <template #header>
                                            <div class="text-center w-full flex gap-2 justify-center font-bold text-white">
                                                <span>Dengan DMO</span>
                                                <span>({{ labelMataUang }})</span>
                                            </div>
                                        </template>
                                    </Column>
                                </Row>
                                <Row>
                                    <template v-for="pengali in listPengali" :key="pengali.id">
                                        <Column>
                                            <template #header>
                                                <div class="text-center w-full flex justify-center font-bold text-black">
                                                    <span>{{ pengali.name }}</span>
                                                </div>
                                            </template>
                                        </Column>
                                    </template>
                                </Row>
                            </ColumnGroup> -->
                            <Column field="analisa" header="Analisa" :sortable="true">
                                <template #groupheader="{ data }">
                                    <div class="p-2 font-bold bg-gray-700 text-white">{{ data.analisa }}</div>
                                </template>
                            </Column>
                            <Column field="name" header="Name" style="min-width: 13rem">
                                <template #body="{ data }">
                                    <div class="flex justify-between items-center gap-2">
                                        <strong class="text-sm w-full">{{ data.name }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <!-- <Column field="tanpaDOM">
                                <template #body="{ data }">
                                    <div class="flex justify-center items-center gap-2">
                                        <strong class="text-sm">{{ data.tanpaDOM }}</strong>
                                    </div>
                                </template>
                            </Column>
                            <template v-for="pengali in listPengali" :key="pengali.id">
                                <Column field="name">
                                    <template #body="{ data }">
                                        <div class="flex justify-center items-center gap-2">
                                            <strong class="text-sm">{{ data.product?.[pengali.id].value }}</strong>
                                        </div>
                                    </template>
                                </Column>
                            </template> -->
                        </DataTable>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>
