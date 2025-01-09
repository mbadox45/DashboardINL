<script setup>
import { hargaRetailData } from '@/controller/report/FinancialReport';
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
        bulky.value = await hargaRetailData();
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
    <div class="flex flex-col p-3 bg-slate-800 rounded-xl shadow-4 w-full gap-5 mt-12">
        <div class="font-semibold border-round flex gap-2 items-center text-pink-600">
            <div class="w-full">
                <span class="">Harga Satuan Retail Hari ini</span>
            </div>
            <div class="w-1/7">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-percentage text-red-500"></i>
                    </InputGroupAddon>
                    <InputNumber v-model="gpm" placeholder="GPM Value" :min="0" :max="100" class="" />
                    <Button icon="pi pi-save" severity="info" @click="loadProduct" />
                </InputGroup>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <!-- Tabel Header -->
            <div class="grid grid-cols-4 bg-pink-700 text-white font-bold text-sm rounded-t-lg">
                <div class="h-full flex items-center justify-center"><span>Produk</span></div>
                <div class="h-full border-l-2 border-slate-800 pb-0">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 text-center">Massa</div>
                        <div class="bg-red-200 border-1 border-pink-700 text-pink-700 text-center">Rp/Kg</div>
                        <div class="bg-blue-200 border-1 border-pink-700 text-pink-700 text-center">USD/Ton</div>
                    </div>
                </div>
                <div class="h-full border-l-2 border-slate-800 pb-0">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 text-center">Box</div>
                        <div class="bg-red-200 border-1 border-pink-700 text-pink-700 text-center">Rp/Box</div>
                        <div class="bg-blue-200 border-1 border-pink-700 text-pink-700 text-center">USD/Box</div>
                    </div>
                </div>
                <div class="h-full border-l-2 border-slate-800 pb-0">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 text-center">Box+PPN</div>
                        <div class="bg-red-200 border-1 border-pink-700 text-pink-700 text-center">Rp/Box</div>
                        <div class="bg-blue-200 border-1 border-pink-700 text-pink-700 text-center">USD/Box</div>
                    </div>
                </div>
            </div>
            <!-- Tabel Body -->
            <div class="py-0 flex flex-col" v-for="(item, index) in bulky" :key="index">
                <div :class="index == bulky.length - 1 ? 'border-b-2 rounded-b-lg' : ''" class="grid grid-cols-4 px-2 text-xs border-l-2 border-r-2 border-pink-700">
                    <div class="h-full border-r-2 border-slate-600 flex items-center font-bold font-italic py-2">
                        <span>{{ item.produk }}</span>
                    </div>
                    <div class="h-full items-center grid grid-cols-2 gap-8 font-bold font-italic py-2 px-6">
                        <div class="flex justify-between">
                            <span>Rp</span><span>{{ item.spotIdr }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>USD</span><span>{{ item.spotUsd }}</span>
                        </div>
                    </div>
                    <div class="h-full border-l-2 border-slate-600 items-center grid grid-cols-2 gap-8 font-bold font-italic py-2 px-6">
                        <div class="flex justify-between">
                            <span>Rp</span><span>{{ item.invIdr }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>USD</span><span>{{ item.invUsd }}</span>
                        </div>
                    </div>
                    <div class="h-full border-l-2 border-slate-600 items-center grid grid-cols-2 gap-8 font-bold font-italic py-2 px-6">
                        <div class="flex justify-between">
                            <span>Rp</span><span>{{ item.invIdr }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>USD</span><span>{{ item.invUsd }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
