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
const gpm = ref(5);

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
    <div class="flex flex-col p-3 bg-slate-800 rounded-xl shadow-4 w-full gap-5">
        <div class="font-semibold border-round flex gap-2 items-center text-red-600">
            <div class="w-full">
                <span class="">Harga Satuan Bulky</span>
            </div>
            <div class="w-1/7">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-percentage text-red-500"></i>
                    </InputGroupAddon>
                    <InputNumber v-model="gpm" placeholder="GPM Value" :min="0" :max="100" class="" />
                    <Button icon="pi pi-save" severity="danger" @click="loadProduct" />
                </InputGroup>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <!-- Tabel Header -->
            <div class="grid grid-cols-3 bg-pink-700 text-white font-bold text-sm rounded-t-lg">
                <div class="h-full flex items-center justify-center"><span>Category</span></div>
                <div class="h-full border-l-2 border-slate-800 pb-0">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 text-center">Spot</div>
                        <div class="bg-red-200 border-1 border-pink-700 text-pink-700 text-center">Rp/Kg</div>
                        <div class="bg-blue-200 border-1 border-pink-700 text-pink-700 text-center">USD/Ton</div>
                    </div>
                </div>
                <div class="h-full border-l-2 border-slate-800 pb-0">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 text-center">Inventory</div>
                        <div class="bg-red-200 border-1 border-pink-700 text-pink-700 text-center">Rp/Kg</div>
                        <div class="bg-blue-200 border-1 border-pink-700 text-pink-700 text-center">USD/Ton</div>
                    </div>
                </div>
            </div>
            <!-- Tabel Body -->
            <div class="py-0 flex flex-col" v-for="(item, index) in bulky" :key="index">
                <div :class="index == bulky.length - 1 ? 'border-b-2 rounded-b-lg' : ''" class="grid grid-cols-3 px-2 text-xs border-l-2 border-r-2 border-pink-700">
                    <div class="h-full border-r-2 border-slate-600 flex items-center font-bold font-italic py-2">
                        <span>{{ item.produk }}</span>
                    </div>
                    <div class="h-full items-center grid grid-cols-2 gap-2 font-bold font-italic py-2 px-5">
                        <div class="flex justify-between">
                            <span>Rp</span><span>{{ item.spotIdr }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>USD</span><span>{{ item.spotUsd }}</span>
                        </div>
                    </div>
                    <div class="h-full border-l-2 border-slate-600 items-center grid grid-cols-2 gap-2 font-bold font-italic py-2 px-5">
                        <div class="flex justify-between">
                            <span>Rp</span><span>{{ item.invIdr }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>USD</span><span>{{ item.invUsd }}</span>
                        </div>
                    </div>
                    <!-- <div v-for="(items, indexes) in item.items" :key="indexes" :class="indexes == 0 ? 'border-right-2' : ''" class="col-4 h-full border-gray-300 pb-0 pr-0 mr-0">
                        <div class="grid flex align-items-center font-semibold w-full mr-0 pr-0">
                            <div class="col-6 flex justify-content-between pr-0 gap-3">
                                <span>Rp.</span> <span>{{ formatCurrency(Number(items.value_idr).toFixed(0)) }}</span>
                            </div>
                            <div class="col-6 flex justify-content-between pr-0 gap-3">
                                <span>USD</span> <span>{{ formatCurrency(Number(items.value_usd).toFixed(0)) }}</span>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <!-- <div v-if="!loadingData && bulky.length" class="border border-pink-700 rounded-b-lg">
                <div v-for="(item, index) in bulky" :key="index" :class="index == (bulky.length - 1) ? 'border-b-2 border-round-bottom' : ''" class="grid grid-cols-3">
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
            <div v-else class="text-center text-gray-500 mt-4">No data available</div> -->
        </div>
    </div>
</template>
