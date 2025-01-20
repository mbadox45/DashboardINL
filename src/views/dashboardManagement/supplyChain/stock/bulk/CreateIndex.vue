<script setup>
import { URL_WEB } from '@/api/http/dataVariable';
import pmgMasterController from '@/controller/getApiFromThisApp/master/pmgMasterController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import productStorageScmController from '@/controller/getApiFromThisApp/supplyChain/productStorageScmController';
import bulkStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/bulkStockScmController';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const messages = ref([]);
const tanggal = ref(moment().format('YYYY-MM-DD'));
const maxDate = ref(moment().format('YYYY-MM-DD'));
const listJenis = ref([]);
const listProduk = ref([]);
const listPmg = ref([]);
const jenis = ref(null);
const pmg = ref(null);
const loadings = ref(false);
const setTime = ref(3000);

const formData = ref([]);
let count = ref(0);

onMounted(() => {
    loadData();
});

const loadData = async () => {
    // PMG
    const dataPmg = await pmgMasterController.getAll();
    listPmg.value = dataPmg;

    // await loadJenis();
    await loadProduk();
};

const loadJenis = async () => {
    try {
        const response = await productStorageScmController.getByJenis('tanki');
        const list = [];
        for (let i = 0; i < response.length; i++) {
            list.push({
                tanki_id: response[i].id,
                item_produksi: response[i].name,
                id_bulky: jenis.value,
                tanggal: tanggal.value,
                qty: null,
                umur: null,
                remarks: null
            });
        }
        formData.value = list;
    } catch (error) {
        formData.value = [];
    }
};

const loadProduk = async () => {
    const response = await productMasterController.getAll();
    const produk = response.filter((item) => item.jenis.toLowerCase().includes('bulk'));
    listProduk.value = produk;
};

const resetForm = () => {
    formData.value = [];
    jenis.value = null;
    tanggal.value = moment().format('YYYY-MM-DD');
};

const postData = async (cond) => {
    if (cond == 'back') {
        window.location.replace(`${URL_WEB}scm/stock/bulk`);
    } else {
        loadings.value = true;
        console.log(formData.value);
        const response = await bulkStockScmController.postData(formData.value);
        messages.value = [{ severity: response.severity, content: response.content, id: count.value++, icon: response.icon }];
        if (response.severity == 'success') {
            setTimeout(function () {
                loadings.value = false;
                window.location.replace(`${URL_WEB}scm/stock/bulk`);
            }, setTime.value);
        } else {
            loadings.value = false;
        }
    }
};
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-3xl">Form Data (Stock Bulky)</span>
            <div class="flex gap-3">
                <button
                    @click="postData('save')"
                    :disabled="loadings == true ? true : false"
                    :class="loadings == true ? 'opacity-20' : 'opacity-100'"
                    class="px-4 py-2 text-[1vw] font-bold items-center shadow hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2"
                >
                    <i class="pi pi-save" style="font-size: 1vw"></i>
                    <span>{{ loadings == true ? 'Saving ...' : 'Save' }}</span>
                </button>
                <button
                    @click="resetForm"
                    :disabled="loadings == true ? true : false"
                    :class="loadings == true ? 'opacity-20' : 'opacity-100'"
                    class="px-4 py-2 text-[1vw] font-bold items-center shadow hover:shadow-none transition-all duration-300 bg-gray-200 hover:bg-gray-300 text-black rounded-full flex gap-2"
                >
                    <i class="pi pi-refresh" style="font-size: 1vw"></i>
                    <span>Reset</span>
                </button>
                <button
                    @click="postData('back')"
                    :disabled="loadings == true ? true : false"
                    :class="loadings == true ? 'opacity-20' : 'opacity-100'"
                    class="px-4 py-2 text-[1vw] font-bold items-center shadow hover:shadow-none transition-all duration-300 bg-red-600 hover:bg-red-700 text-white rounded-full flex gap-2"
                >
                    <i class="pi pi-times" style="font-size: 1vw"></i>
                    <span>Batal</span>
                </button>
            </div>
        </div>
        <Card>
            <template #header>
                <div class="px-5">
                    <transition-group name="p-message" tag="div" class="flex flex-col">
                        <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity" class="mt-4"><i :class="`pi ${msg.icon}`"></i> {{ msg.content }}</Message>
                    </transition-group>
                </div>
            </template>
            <template #content>
                <div v-if="loadings == true" class="h-[34vw] flex w-full items-center justify-center">
                    <ProgressSpinner />
                </div>
                <div v-else class="flex flex-col gap-4 text-[1vw]">
                    <div class="flex gap-3 w-full">
                        <div class="flex flex-col gap-1 w-full">
                            <label for="date" class="font-bold">Tanggal <small class="text-red-500 font-bold">*</small></label>
                            <DatePicker v-model="tanggal" dateFormat="yy-mm-dd" showIcon placeholder="Please input Date" />
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="date" class="font-bold">Produk <small class="text-red-500 font-bold">*</small></label>
                            <Select v-model="jenis" filter :options="listProduk" optionLabel="name" optionValue="id" placeholder="Select a Product" class="w-full" @change="loadJenis" />
                        </div>
                    </div>
                    <Divider align="left" type="solid"><b>Form Item</b></Divider>
                    <ScrollPanel style="width: 100%; height: 32rem">
                        <div class="grid grid-cols-2 gap-3">
                            <div class="flex flex-col gap-3 p-3 rounded-xl border" v-for="(item, index) in formData" :key="index">
                                <label for="date" class="font-bold">{{ item.item_produksi }} <small class="text-red-500 font-bold">*</small></label>
                                <div class="flex flex-col gap-1 text-[0.8vw]">
                                    <label for="test">Quantity</label>
                                    <InputNumber v-model="item.qty" inputId="minmaxfraction" placeholder="1,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                                </div>
                                <div class="flex flex-col gap-1 text-[0.8vw]">
                                    <label for="test">Umur</label>
                                    <InputNumber v-model="item.umur" inputId="minmaxfraction" placeholder="1,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                                </div>
                                <div class="flex flex-col gap-1 text-[0.8vw]">
                                    <label for="test">Remarks</label>
                                    <InputText v-model="item.remarks" placeholder="Please input Remarks" />
                                </div>
                            </div>
                        </div>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>
