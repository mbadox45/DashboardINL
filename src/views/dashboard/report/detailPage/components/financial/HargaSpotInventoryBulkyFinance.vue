<script setup>
import { hargaBulkyData } from '@/controller/report/FinancialReport';
import { onMounted, ref } from 'vue';

const props = defineProps({
    sell: {
        type: Array,
        default: () => {}
    }
});

const bulky = ref([]);
const loadingData = ref(false);

const loadData = async () => {
    loadingData.value = true;
    try {
        bulky.value = await hargaBulkyData();
        loadingData.value = false;
    } catch (error) {
        bulky.value = [];
        loadingData.value = false;
    }
};
onMounted(() => {
    loadData();
});
</script>

<template>
    <div class="flex flex-col p-4 bg-slate-800 shadow-4 w-full gap-5">
        <div class="font-semibold border-round flex flex-column md:flex-row md:justify-content-between gap-2 md:align-items-center text-red-600">
            <div class="w-full md:w-3">
                <div class="p-inputgroup p-fluid">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-percentage text-red-500"></i>
                    </span>
                    <InputNumber v-model="gpm" placeholder="GPM Value" :min="0" :max="100" class="" />
                    <Button icon="pi pi-save" severity="danger" @click="loadProduct" />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 md:gap-4 w-full">
            <span class="font-italic font-bold text-pink-700 uppercase text-center">Bulky</span>
            <!-- Tabel Header -->
            <div class="grid grid-cols-3 bg-pink-700 text-white font-bold text-sm rounded-t-lg overflow-hidden">
                <div class="col-4 h-full flex items-center justify-center"><span>Category</span></div>
                <div class="col-4 h-full border-l-2 border-slate-800 pb-0">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 text-center">Spot</div>
                        <div class="bg-red-200 border-1 border-pink-700 text-pink-700 text-center">Rp/Kg</div>
                        <div class="bg-blue-200 border-1 border-pink-700 text-pink-700 text-center">USD/Ton</div>
                    </div>
                </div>
                <div class="col-4 h-full border-l-2 border-slate-800 pb-0">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 text-center">Inventory</div>
                        <div class="bg-red-200 border-1 border-pink-700 text-pink-700 text-center">Rp/Kg</div>
                        <div class="bg-blue-200 border-1 border-pink-700 text-pink-700 text-center">USD/Ton</div>
                    </div>
                </div>
            </div>
            <!-- Tabel Body -->
            <div v-if="!loadingData && bulky.length" class="border border-slate-800 rounded-b-lg overflow-hidden">
                <div v-for="(item, index) in bulky" :key="index" class="grid grid-cols-3 border-b border-slate-800 last:border-none">
                    <div class="col-4 h-full flex items-center justify-center">{{ item.produk }}</div>
                    <div class="col-4 h-full border-l-2 border-slate-800 grid grid-cols-2">
                        <div class="text-center">{{ item.spotIdr }}</div>
                        <div class="text-center">{{ item.spotUsd }}</div>
                    </div>
                    <div class="col-4 h-full border-l-2 border-slate-800 grid grid-cols-2">
                        <div class="text-center">{{ item.invIdr }}</div>
                        <div class="text-center">{{ item.invUsd }}</div>
                    </div>
                </div>
            </div>
            <div v-else-if="loadingData" class="text-center text-gray-500 mt-4">Loading data...</div>
            <div v-else class="text-center text-gray-500 mt-4">No data available</div>
        </div>
    </div>
</template>
