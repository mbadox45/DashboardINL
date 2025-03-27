<script setup>
import { formatCurrency } from '@/controller/dummyController';
import masterCostSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/masterCostSicalRspController';
import pengaliSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/pengaliSicalRspController';
import { defineProps, onMounted, ref, watch } from 'vue';

const listMasterCost = ref([]);
const listUtilisasi = ref([]);
const listKurs = ref([]);
const listMataUang = ref([]);
const listPengali = ref([]);
const listCatatan = ref([]);

// Table
const listSimulasi1 = ref([]);
const listSimulasi2 = ref([]);
const listSimulasi3 = ref([]);
const listSimulasi4 = ref([]);

const props = defineProps({
    datas: {
        type: Object,
        default: () => {}
    }
});

onMounted(() => {
    loadAll();
});

const loadAll = async () => {
    await loadMasterCost();
    await loadPengali();
};

const loadData = async () => {
    const data = props.datas;
    listSimulasi1.value = data == null ? [] : data.sim1;
    listSimulasi2.value = data == null ? [] : data.sim2;
    listSimulasi3.value = data == null ? [] : data.sim3;
    listSimulasi4.value = data == null ? [] : data.sim4;
};

const loadPengali = async () => {
    try {
        const response = await pengaliSicalRspController.getAll();
        listPengali.value = response.sort((a, b) => a.id - b.id);
    } catch (error) {
        listPengali.value = [];
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

watch(() => props.datas, loadData, { immediate: true });
</script>

<template>
    <div class="w-full flex flex-col gap-6">
        <div class="flex w-full">
            <DataTable :value="listSimulasi1" showGridlines editMode="cell" scrollHeight="550px" dataKey="id" class="w-full">
                <template #empty>
                    <div class="flex w-full items-center justify-center">
                        <span>-- Data tidak tersedia --</span>
                    </div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>

                <ColumnGroup type="header">
                    <Row>
                        <Column :rowspan="3" headerStyle="background-color:#0b2838">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>Utilisasi</span>
                                </div>
                            </template>
                        </Column>

                        <!-- Looping Produk -->
                        <Column v-for="product in listMasterCost" :key="product.id" :colspan="2" headerStyle="background-color:#6E0B0C">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>{{ product.name }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column :colspan="2" headerStyle="background-color:#6E0B0C">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>Expected Margin</span>
                                </div>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <Column :colspan="listMasterCost.length * 2" headerStyle="background-color:#0B666A">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>COST OF GOOD SOLD / HPP</span>
                                </div>
                            </template>
                        </Column>
                        <Column :colspan="2" headerStyle="background-color:#ecee81">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-black">
                                    <span>%</span>
                                    <!-- Ini dari nilai Margin -->
                                </div>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <!-- Looping Produk -->
                        <template v-for="product in listMasterCost" :key="product.id">
                            <Column headerStyle="background-color:#2E5077; color:white">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>IDR</span>
                                    </div>
                                </template>
                            </Column>
                            <Column headerStyle="background-color:#0b2838; color:white">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>USD</span>
                                    </div>
                                </template>
                            </Column>
                        </template>
                        <Column headerStyle="background-color:#2E5077; color:white">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold">
                                    <span>IDR</span>
                                </div>
                            </template>
                        </Column>
                        <Column headerStyle="background-color:#0b2838; color:white">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>%</span>
                                </div>
                            </template>
                        </Column>
                    </Row>
                </ColumnGroup>
                <Column field="name" style="min-width: 13rem">
                    <template #body="{ data }">
                        <div class="flex justify-between items-center gap-2">
                            <strong class="text-base w-full">{{ data.name }}</strong>
                        </div>
                    </template>
                </Column>
                <template v-for="product in listMasterCost" :key="product.id">
                    <!-- <Column style="background-color: #A1E3F9"> -->
                    <Column>
                        <template #body="{ data }">
                            <div class="flex flex-col justify-center text-center">
                                <strong class="text-base" :class="data.product?.[product.id].value < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[product.id].value < 0 ? `(${formatCurrency(data.product?.[product.id].value * -1)})` : formatCurrency(data.product?.[product.id].value)
                                }}</strong>
                                <small v-if="data.product?.[product.id]?.proportion != 0" class="text-gray-500"> ({{ data.product?.[product.id]?.proportion }}%) </small>
                            </div>
                        </template>
                    </Column>
                    <Column>
                        <template #body="{ data }">
                            <div class="flex justify-center">
                                <strong class="text-base" :class="data.product?.[product.id].usd < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[product.id].usd < 0 ? `(${formatCurrency(data.product?.[product.id].usd * -1)})` : formatCurrency(data.product?.[product.id].usd)
                                }}</strong>
                            </div>
                        </template>
                    </Column>
                </template>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center w-full gap-2">
                            <strong class="text-base">{{ formatCurrency(Number(data.margin).toFixed(0)) }}</strong>
                        </div>
                    </template>
                </Column>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center w-full gap-2">
                            <strong class="text-base">{{ data.marginPercent }}%</strong>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="flex w-full">
            <DataTable :value="listSimulasi2" showGridlines editMode="cell" scrollHeight="550px" dataKey="id" class="w-full">
                <template #empty>
                    <div class="flex w-full items-center justify-center">
                        <span>-- Data tidak tersedia --</span>
                    </div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>

                <ColumnGroup type="header">
                    <Row>
                        <Column :rowspan="3" headerStyle="background-color:#0b2838">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>Utilisasi</span>
                                </div>
                            </template>
                        </Column>

                        <!-- Looping Produk -->
                        <Column :colspan="4" headerStyle="background-color:#6E0B0C; color:white">
                            <template #header>
                                <div class="w-full flex flex-col items-center justify-center font-bold">
                                    <span>REKOMENDASI Harga Jual TANPA DMO</span>
                                    <p class="text-center">(DMO ditanggung Buyer / Penjualan Domestik )</p>
                                </div>
                            </template>
                        </Column>
                        <Column :colspan="2" :rowspan="2" headerStyle="background-color:#6E0B0C; color:white">
                            <template #header>
                                <div class="w-full flex flex-col items-center justify-center font-bold text-white">
                                    <span>BIAYA DMO</span>
                                    <p class="text-center">Kerugian per kg (IDR) atau per Ton (USD) Minyakita</p>
                                </div>
                            </template>
                        </Column>
                        <Column :colspan="2 * listPengali.length" headerStyle="background-color:#6E0B0C; color:white">
                            <template #header>
                                <div class="w-full flex flex-col items-center justify-center font-bold text-white">
                                    <span>BIAYA DMO</span>
                                    <p class="text-center">(Per KG (IDR) atau per MT (USD) Olein Export ) Dengan Variasi FAKTOR Pengali</p>
                                </div>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <Column :colspan="3" headerStyle="background-color:#0B666A;">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span> FOB Kuala Tanjung</span>
                                </div>
                            </template>
                        </Column>
                        <Column headerStyle="background-color:#0B666A;">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>LOCO INL</span>
                                </div>
                            </template>
                        </Column>
                        <template v-for="pengali in listPengali" :key="pengali.id">
                            <Column :colspan="2" headerStyle="background-color:#0B666A;">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-white">
                                        <span>{{ pengali.value }}</span>
                                    </div>
                                </template>
                            </Column>
                        </template>
                    </Row>
                    <Row>
                        <Column headerStyle="background-color:#2E5077; color:white">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold">
                                    <span>IDR</span>
                                </div>
                            </template>
                        </Column>
                        <Column headerStyle="background-color:#0b2838; color:white">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold">
                                    <span>USD</span>
                                </div>
                            </template>
                        </Column>
                        <Column headerStyle="background-color:#ecee81">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-black">
                                    <span>CPO+</span>
                                </div>
                            </template>
                        </Column>
                        <Column headerStyle="background-color:#ecee81">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-black">
                                    <span>CPO+</span>
                                </div>
                            </template>
                        </Column>
                        <Column headerStyle="background-color:#2E5077; color:white">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold">
                                    <span>IDR</span>
                                </div>
                            </template>
                        </Column>
                        <Column headerStyle="background-color:#0b2838; color:white">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold">
                                    <span>USD</span>
                                </div>
                            </template>
                        </Column>
                        <template v-for="pengali in listPengali" :key="pengali.id">
                            <Column headerStyle="background-color:#2E5077; color:white">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>IDR</span>
                                    </div>
                                </template>
                            </Column>
                            <Column headerStyle="background-color:#0b2838; color:white">
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
                            <strong class="text-base">{{ data.name }}</strong>
                        </div>
                    </template>
                </Column>
                <Column field="fobIdr">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center gap-2">
                            <strong class="text-base" :class="data.fobIdr < 0 ? 'text-red-500' : ''">{{ data.fobIdr < 0 ? `(${formatCurrency(data.fobIdr * -1)})` : formatCurrency(data.fobIdr) }}</strong>
                        </div>
                    </template>
                </Column>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center gap-2">
                            <strong class="text-base" :class="data.fobUsd < 0 ? 'text-red-500' : ''">{{ data.fobUsd < 0 ? `(${formatCurrency(data.fobUsd * -1)})` : formatCurrency(data.fobUsd) }}</strong>
                        </div>
                    </template>
                </Column>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center gap-2">
                            <strong class="text-base" :class="data.fobCpo < 0 ? 'text-red-500' : ''">{{ data.fobCpo < 0 ? `(${formatCurrency(data.fobCpo * -1)})` : formatCurrency(data.fobCpo) }}</strong>
                        </div>
                    </template>
                </Column>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center gap-2">
                            <strong class="text-base" :class="data.locoCpo < 0 ? 'text-red-500' : ''">{{ data.locoCpo < 0 ? `(${formatCurrency(data.locoCpo * -1)})` : formatCurrency(data.locoCpo) }}</strong>
                        </div>
                    </template>
                </Column>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex flex-col justify-center items-center gap-2">
                            <strong class="text-base" :class="data.kerugianIdr < 0 ? 'text-red-500' : ''">{{ data.kerugianIdr < 0 ? `(${formatCurrency(data.kerugianIdr * -1)})` : formatCurrency(data.kerugianIdr) }}</strong>
                            <small v-if="data.kerugianProportion && data.kerugianProportion != 0" class="text-gray-500"> ({{ data.kerugianProportion }}%) </small>
                        </div>
                    </template>
                </Column>
                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center gap-2">
                            <strong class="text-base" :class="data.kerugianUsd < 0 ? 'text-red-500' : ''">{{ data.kerugianUsd < 0 ? `(${formatCurrency(data.kerugianUsd * -1)})` : formatCurrency(data.kerugianUsd) }}</strong>
                        </div>
                    </template>
                </Column>
                <template v-for="pengali in listPengali" :key="pengali.id">
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-center items-center gap-2">
                                <strong class="text-base" :class="data.product?.[pengali.id].idr < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[pengali.id].idr < 0 ? `(${formatCurrency(data.product?.[pengali.id].idr * -1)})` : formatCurrency(data.product?.[pengali.id].idr)
                                }}</strong>
                            </div>
                        </template>
                    </Column>
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-center items-center gap-2">
                                <strong class="text-base">{{ data.product?.[pengali.id].usd }}</strong>
                            </div>
                        </template>
                    </Column>
                </template>
            </DataTable>
        </div>
        <div class="flex w-full">
            <DataTable :value="listSimulasi3" showGridlines editMode="cell" scrollHeight="550px" dataKey="id" class="w-full">
                <template #empty>
                    <div class="flex w-full items-center justify-center">
                        <span>-- Data tidak tersedia --</span>
                    </div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>

                <ColumnGroup type="header">
                    <Row>
                        <Column :rowspan="3" headerStyle="background-color:#0b2838">
                            <template #header>
                                <div class="text-center w-full flex justify-center font-bold text-white">
                                    <span>Utilisasi</span>
                                </div>
                            </template>
                        </Column>

                        <!-- Looping Produk -->
                        <Column :colspan="listPengali.length * 2 * 2" headerStyle="background-color:#6E0B0C; color:white">
                            <template #header>
                                <div class="w-full flex flex-col items-center justify-center font-bold">
                                    <span>REKOMENDASI Harga Jual DENGAN DMO DITANGGUNG INL</span>
                                </div>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <template v-for="pengali in listPengali" :key="pengali.id">
                            <Column :colspan="2" headerStyle="background-color:#0B666A;">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-white">
                                        <span>{{ pengali.name }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column :colspan="2" headerStyle="background-color:#ecee81">
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
                            <Column headerStyle="background-color:#2E5077; color:white">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>IDR</span>
                                    </div>
                                </template>
                            </Column>
                            <Column headerStyle="background-color:#0b2838; color:white">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>USD</span>
                                    </div>
                                </template>
                            </Column>
                            <Column headerStyle="background-color:#2E5077; color:white">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold">
                                        <span>IDR</span>
                                    </div>
                                </template>
                            </Column>
                            <Column headerStyle="background-color:#0b2838; color:white">
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
                            <strong class="text-base w-full">{{ data.name }}</strong>
                        </div>
                    </template>
                </Column>

                <template v-for="pengali in listPengali" :key="pengali.id">
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-center items-center gap-2">
                                <strong class="text-base">{{ data.product?.[pengali.id].idr }}</strong>
                                <strong class="text-base" :class="data.product?.[pengali.id].idr < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[pengali.id].idr < 0 ? `(${formatCurrency(data.product?.[pengali.id].idr * -1)})` : formatCurrency(data.product?.[pengali.id].idr)
                                }}</strong>
                            </div>
                        </template>
                    </Column>
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-center items-center gap-2">
                                <strong class="text-base" :class="data.product?.[pengali.id].usd < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[pengali.id].usd < 0 ? `(${formatCurrency(data.product?.[pengali.id].usd * -1)})` : formatCurrency(data.product?.[pengali.id].usd)
                                }}</strong>
                                <strong class="text-base">{{ data.product?.[pengali.id].usd }}</strong>
                            </div>
                        </template>
                    </Column>
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-center items-center gap-2">
                                <strong class="text-base" :class="data.product?.[pengali.id].idrCpoPlus < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[pengali.id].idrCpoPlus < 0 ? `(${formatCurrency(data.product?.[pengali.id].idrCpoPlus * -1)})` : formatCurrency(data.product?.[pengali.id].idrCpoPlus)
                                }}</strong>
                            </div>
                        </template>
                    </Column>
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-center items-center gap-2">
                                <strong class="text-base" :class="data.product?.[pengali.id].usdCpoPlus < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[pengali.id].usdCpoPlus < 0 ? `(${formatCurrency(data.product?.[pengali.id].usdCpoPlus * -1)})` : formatCurrency(data.product?.[pengali.id].usdCpoPlus)
                                }}</strong>
                            </div>
                        </template>
                    </Column>
                </template>
            </DataTable>
        </div>
        <div class="flex w-full">
            <DataTable :value="listSimulasi4" :sortOrder="-1" showGridlines rowGroupMode="subheader" groupRowsBy="analisa" sortField="analisa" sortMode="single" dataKey="analisa" class="w-full">
                <template #empty>
                    <div class="flex w-full items-center justify-center">
                        <span>-- Data tidak tersedia --</span>
                    </div>
                </template>
                <template #loading> Loading customers data. Please wait. </template>

                <ColumnGroup type="header">
                    <Row>
                        <Column :colspan="2" :rowspan="2" headerStyle="background-color:#0b2838">
                            <template #header>
                                <div class="w-full flex flex-col items-center justify-center font-bold text-white">
                                    <span>ANALISA POTENSI LABA (RUGI)</span>
                                </div>
                            </template>
                        </Column>
                        <Column :colspan="1" :rowspan="2" headerStyle="background-color:#6E0B0C">
                            <template #header>
                                <div class="w-full flex flex-col items-center justify-center font-bold text-white">
                                    <span>TANPA DMO ($)</span>
                                </div>
                            </template>
                        </Column>
                        <Column :colspan="2 * listPengali.length" headerStyle="background-color:#6E0B0C">
                            <template #header>
                                <div class="w-full flex flex-col items-center justify-center font-bold text-white">
                                    <span>DENGAN DMO ($)</span>
                                </div>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <template v-for="pengali in listPengali" :key="pengali.id">
                            <Column :colspan="1" headerStyle="background-color:#0b2838">
                                <template #header>
                                    <div class="text-center w-full flex justify-center font-bold text-white">
                                        <span>{{ pengali.name }}</span>
                                    </div>
                                </template>
                            </Column>
                        </template>
                    </Row>
                </ColumnGroup>
                <Column field="name" style="background-color: #ecee81; min-width: 13rem">
                    <template #body="{ data }">
                        <div class="flex justify-between items-center gap-2">
                            <strong class="text-base">{{ data.analisa }}</strong>
                        </div>
                    </template>
                </Column>
                <Column field="name" style="min-width: 13rem">
                    <template #body="{ data }">
                        <div class="flex justify-between items-center gap-2">
                            <strong class="text-base">{{ data.name }}</strong>
                        </div>
                    </template>
                </Column>

                <Column field="name">
                    <template #body="{ data }">
                        <div class="flex justify-center items-center gap-2">
                            <strong class="text-base" :class="data.tanpaDMO < 0 ? 'text-red-500' : ''">{{ data.tanpaDMO < 0 ? `(${formatCurrency(data.tanpaDMO * -1)})` : formatCurrency(data.tanpaDMO) }}</strong>
                        </div>
                    </template>
                </Column>
                <template v-for="pengali in listPengali" :key="pengali.id">
                    <Column field="name">
                        <template #body="{ data }">
                            <div class="flex justify-center items-center gap-2">
                                <strong class="text-base" :class="data.product?.[pengali.id].value < 0 ? 'text-red-500' : ''">{{
                                    data.product?.[pengali.id].value < 0 ? `(${formatCurrency(data.product?.[pengali.id].value * -1)})` : formatCurrency(data.product?.[pengali.id].value)
                                }}</strong>
                            </div>
                        </template>
                    </Column>
                </template>
            </DataTable>
        </div>
    </div>
</template>
