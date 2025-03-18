<script setup>
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import dmoSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/dmoSicalRspController';
import masterCostSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/masterCostSicalRspController';
import simulasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/simulasiSicalRspController';
import utilisasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/utilisasiSicalRspController';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const descriptionList = ref([{ name: 'Input', items: [{ id: 'A', color: 'bg-emerald-900', desc: 'Cek /update biaya : Packaging, logistik dan processing cost (Biaya ini bisa berubah jika ada efisiensi / in-efisiensi' }] }]);
const listMasterCost = ref([]);
const listUtilisasi = ref([]);
const listSimulasi = ref([]);
const nilaiDMO = ref(0);
const remarkDMO = ref('');
const nilaiKurs = ref(0);
const remarkKurs = ref('');

// Input Form
const expectedMargin = ref(0);

onMounted(() => {
    loadMasterCost();
    loadUtilisasi();
    loadSimulasi();
    loadDMO();
    loadKurs();
});

const loadDMO = async () => {
    try {
        const response = await dmoSicalRspController.getLatest();
        nilaiDMO.value = Number(response.value);
        remarkDMO.value = response.remark;
    } catch (error) {
        nilaiDMO.value = 0;
    }
};

const loadKurs = async () => {
    try {
        const response = await kursController.getByLatest({ idMataUang: 1 });
        nilaiKurs.value = Number(response.value);
        remarkKurs.value = `Jisdor Bank Indonesia tanggal ${moment(response.tanggal).format('DD MMMM YYYY')}`;
    } catch (error) {
        nilaiKurs.value = 0;
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

const loadSimulasi = async () => {
    try {
        const response = await simulasiSicalRspController.loadTable({ idMataUang: 1 });
        console.log(response);
        listSimulasi.value = response;
    } catch (error) {
        listSimulasi.value = [];
    }
};
</script>

<template>
    <div class="flex bg-neutral-950 min-h-screen font-mono text-white app-dark w-full py-8 px-6 flex-col gap-5">
        <Card style="color: white; --tw-bg-opacity: 1; background-color: rgb(38 38 38 / var(--tw-bg-opacity, 1))">
            <template #content>
                <div class="flex w-full bg-pink-200 flex-col gap-2">
                    <div class="grid grid-cols-7 w-full font-bold">
                        <div class="text-[0.9vw] col-span-2 text-center flex items-center justify-center bg-slate-800 p-3 border">
                            <span>ASUMSI DASAR PERHITUNGAN</span>
                        </div>
                        <div
                            v-for="(list, index) in listMasterCost"
                            :key="index"
                            class="bg-yellow-400 p-3 border text-black text-center flex flex-col items-center justify-center"
                            :class="list.name.toLowerCase().includes('bulk processing') ? 'col-span-2' : 'col-span-1'"
                        >
                            <span class="text-[0.9vw]" :class="list.name.toLowerCase().includes('bulk processing') ? 'text-red-700' : 'text-black'">{{ list.name }}</span>
                            <div class="flex w-full">
                                <span class="w-full">(IDR)</span>
                                <span class="w-full" v-if="list.name.toLowerCase().includes('bulk processing')">(USD)</span>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-7 w-full font-bold text-black">
                        <div class="font-bold col-span-2 text-center flex items-center p-2">
                            <span>INTERNAL COST (HPP)</span>
                        </div>
                        <div v-for="(list, index) in listMasterCost" :key="index" class="p-2 text-black text-center flex flex-col items-center justify-center" :class="list.name.toLowerCase().includes('bulk processing') ? 'col-span-2' : 'col-span-1'">
                            <span class="text-[0.7vw]" v-if="list.name.toLowerCase().includes('packaging')">* DMO</span>
                            <span class="text-[0.7vw]" v-if="list.name.toLowerCase().includes('logistic')">* FOB</span>
                        </div>
                        <div class="text-[0.7vw] col-span-1 text-center flex items-center justify-center p-2"></div>
                    </div>
                    <div class="grid grid-cols-7 w-full font-bold">
                        <div class="text-[0.7vw] col-span-1 text-center flex items-center justify-center bg-neutral-800 p-3 border">
                            <span>STRUKTUR BIAYA PRODUKSI INL (HPP)</span>
                        </div>
                        <div class="text-[0.7vw] col-span-1 text-center flex flex-col items-center justify-center bg-neutral-800 p-3 border">
                            <span class="w-full" v-for="(list, index) in listUtilisasi" :key="index">{{ list.name }}</span>
                        </div>
                        <div
                            v-for="(list, index) in listMasterCost"
                            :key="index"
                            class="bg-blue-300 border text-black text-center flex flex-col items-center justify-center"
                            :class="list.name.toLowerCase().includes('bulk processing') ? 'col-span-2' : 'col-span-1'"
                        >
                            <div class="flex p-1 gap-1 w-full">
                                <InputNumber placeholder="IDR" class="w-full" />
                                <span class="w-full" v-if="list.name.toLowerCase().includes('bulk processing')"><InputNumber placeholder="USD" class="w-full" /></span>
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
                            <!-- <span>{{remarkKurs}}</span> -->
                        </div>
                    </div>
                </div>
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
