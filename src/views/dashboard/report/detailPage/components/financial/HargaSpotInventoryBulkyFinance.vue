<script setup>
import { formatCurrency } from '@/controller/dummyController';
import { defineProps, onMounted, ref, watch } from 'vue';

const props = defineProps({
    sell: {
        type: Array,
        default: () => []
    }
});

const bulky = ref([]);
const loadingData = ref(false);
const gpm = ref(0);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    loadingData.value = true;
    try {
        await dataCalculate();
        // bulky.value = await hargaBulkyData();
        loadingData.value = false;
    } catch (error) {
        bulky.value = [];
        loadingData.value = false;
    }
};

const dataCalculate = async () => {
    const response = props.sell;
    const list = [];
    const percent = gpm.value;
    if (response != null && response.length > 0) {
        for (let i = 0; i < response.length; i++) {
            const invRp = percent == 0 ? Number(response[i].invRp) : Number(response[i].invRp) == 0 ? 0 : (Number(response[i].invRp) * percent) / 100 + Number(response[i].invRp);
            const invUsd = percent == 0 ? Number(response[i].invUsd) : Number(response[i].invUsd) == 0 ? 0 : (Number(response[i].invUsd) * percent) / 100 + Number(response[i].invUsd);
            const spotRp = percent == 0 ? Number(response[i].spotRp) : Number(response[i].spotRp) == 0 ? 0 : (Number(response[i].spotRp) * percent) / 100 + Number(response[i].spotRp);
            const spotUsd = percent == 0 ? Number(response[i].spotUsd) : Number(response[i].spotUsd) == 0 ? 0 : (Number(response[i].spotUsd) * percent) / 100 + Number(response[i].spotUsd);
            list.push({
                id_product: response[i].id_product,
                produk: response[i].produk,
                invRp: invRp,
                invUsd: invUsd,
                spotRp: spotRp,
                spotUsd: spotUsd
            });
        }
    }
    // console.log(list);
    bulky.value = list;
};

const dataRefresh = async () => {
    gpm.value = 0;
    await dataCalculate();
};

watch(() => props.sell, loadData, { immediate: true });
</script>

<template>
    <div class="min-h-screen flex flex-col gap-3">
        <span class="w-full text-center uppercase font-bold text-xl font-serif">Harga Satuan Bulky Hari ini</span>
        <div class="flex flex-col p-7 bg-slate-800 rounded-xl shadow-4 w-full gap-5 mt-12">
            <div class="font-semibold border-round flex gap-2 items-center text-pink-300">
                <div class="w-full">
                    <span class="font-bold text-sm">*Nilai GPM% dapat diubah sesuai kebutuhan</span>
                </div>
                <div class="w-1/7">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-percentage text-red-500"></i>
                        </InputGroupAddon>
                        <InputNumber v-model="gpm" placeholder="GPM Value" :min="0" :max="100" class="" />
                        <Button icon="pi pi-save" severity="info" @click="dataCalculate" />
                        <Button icon="pi pi-refresh" severity="warn" @click="dataRefresh" />
                    </InputGroup>
                </div>
            </div>
            <DataTable :value="bulky" showGridlines tableStyle="min-width: 50rem;">
                <ColumnGroup type="header" style="background-color: black">
                    <Row style="background-color: black">
                        <Column :rowspan="3" headerStyle="background-color: #810541; color:white;">
                            <template #header>
                                <div class="flex w-full justify-center text-center">
                                    <span>Product</span>
                                </div>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <Column :colspan="2" headerStyle="background-color: #810541; color:white;">
                            <template #header>
                                <div class="flex w-full justify-center text-center">
                                    <span>Spot</span>
                                </div>
                            </template>
                        </Column>
                        <Column :colspan="2" headerStyle="background-color: #810541; color:white;">
                            <template #header>
                                <div class="flex w-full justify-center text-center">
                                    <span>Inventory</span>
                                </div>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <Column sortable field="lastYearSale" headerStyle="background-color: #FFDDCA; color:#810541;">
                            <template #header>
                                <div class="flex w-full justify-center text-center">
                                    <span>Rp/Kg</span>
                                </div>
                            </template>
                        </Column>
                        <Column sortable field="thisYearSale" headerStyle="background-color: #CCFFFF; color:#810541;">
                            <template #header>
                                <div class="flex w-full justify-center text-center">
                                    <span>USD/Ton</span>
                                </div>
                            </template>
                        </Column>
                        <Column sortable field="lastYearSale" headerStyle="background-color: #FFDDCA; color:#810541;">
                            <template #header>
                                <div class="flex w-full justify-center text-center">
                                    <span>Rp/Kg</span>
                                </div>
                            </template>
                        </Column>
                        <Column sortable field="thisYearSale" headerStyle="background-color: #CCFFFF; color:#810541;">
                            <template #header>
                                <div class="flex w-full justify-center text-center">
                                    <span>USD/Ton</span>
                                </div>
                            </template>
                        </Column>
                    </Row>
                </ColumnGroup>
                <Column field="produk" bodyStyle="background-color: #25383C; color:white;">
                    <template #body="{ data }">
                        <span class="text-sm font-bold">{{ data.produk }}</span>
                    </template>
                </Column>
                <Column field="spotRp" bodyStyle="background-color: #25383C; color:white;">
                    <template #body="{ data }">
                        <div class="flex w-full font-bold justify-between">
                            <span class="text-sm">Rp</span>
                            <span class="text-sm">{{ formatCurrency(Number(data.spotRp).toFixed(2)) }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="spotUsd" bodyStyle="background-color: #25383C; color:white;">
                    <template #body="{ data }">
                        <div class="flex w-full font-bold justify-between">
                            <span class="text-sm">USD</span>
                            <span class="text-sm">{{ formatCurrency(Number(data.spotUsd).toFixed(2)) }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="invRp" bodyStyle="background-color: #25383C; color:white;">
                    <template #body="{ data }">
                        <div class="flex w-full font-bold justify-between">
                            <span class="text-sm">Rp</span>
                            <span class="text-sm">{{ formatCurrency(Number(data.invRp).toFixed(2)) }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="invUsd" bodyStyle="background-color: #25383C; color:white;">
                    <template #body="{ data }">
                        <div class="flex w-full font-bold justify-between">
                            <span class="text-sm">USD</span>
                            <span class="text-sm">{{ formatCurrency(Number(data.invUsd).toFixed(2)) }}</span>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
