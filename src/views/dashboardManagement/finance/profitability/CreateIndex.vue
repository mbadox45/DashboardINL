<script setup>
// import pmgMasterController from '@/controller/getApiFromThisApp/master/pmgMasterController';
import kategoriProfitabilityController from '@/controller/getApiFromThisApp/profitability/kategoriProfitabilityController';
import profitabilityController from '@/controller/getApiFromThisApp/profitability/profitabilityController';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const messages = ref([]);
const tanggal = ref(moment().format('YYYY-MM-DD'));
const listJenis = ref([]);
const jenisProduksi = ref([]);
const listPmg = ref([]);
const jenis = ref(null);
// const pmg = ref(null);
const loadings = ref(false);
const setTime = ref(3000);

const formData = ref([]);
let count = ref(0);

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadData();
});

const loadData = async () => {
    // PMG
    // const dataPmg = await pmgMasterController.getAll();
    // listPmg.value = dataPmg;

    await loadJenis();
};

const loadJenis = async () => {
    try {
        const response = await kategoriProfitabilityController.getAll();
        const list = [];
        for (let i = 0; i < response.length; i++) {
            list.push({
                kategori_id: response[i].id,
                item_produksi: response[i].name,
                // pmg_id: pmg.value,
                tanggal: tanggal.value,
                value: null
            });
        }
        formData.value = list;
    } catch (error) {
        formData.value = [];
    }
};

const resetForm = () => {
    formData.value = [];
    jenis.value = null;
    // pmg.value = null;
    tanggal.value = moment().format('YYYY-MM-DD');
};

const postData = async (cond) => {
    if (cond == 'back') {
        router.push('/finance/profitability');
    } else {
        loadings.value = true;
        const form = [];
        const list = formData.value;
        for (let i = 0; i < list.length; i++) {
            form.push({
                kategori_id: list[i].kategori_id,
                item_produksi: list[i].item_produksi,
                tanggal: moment(tanggal.value).format('YYYY-MM-DD'),
                value: list[i].value
            });
        }
        const response = await profitabilityController.postData(form);
        messages.value = [{ severity: response.severity, content: response.content, id: count.value++, icon: response.icon }];
        if (response.severity == 'success') {
            setTimeout(function () {
                loadings.value = false;
                router.push('/finance/profitability');
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
            <span class="text-3xl">Form Data (Profitability)</span>
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
                    <span>Cancel</span>
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
                            <DatePicker v-model="tanggal" dateFormat="yy-mm-dd" :maxDate="maxDate" showIcon placeholder="Please input Date" />
                        </div>
                        <!-- <div class="flex flex-col gap-1 w-full">
                            <label for="date" class="font-bold">PMG <small class="text-red-500 font-bold">*</small></label>
                            <Select v-model="pmg" filter :options="listPmg" optionLabel="nama" optionValue="id" placeholder="Select a PMG" class="w-full" @change="loadJenis" />
                        </div> -->
                    </div>
                    <Divider align="left" type="solid"><b>Form Item</b></Divider>
                    <ScrollPanel style="width: 100%; height: 22rem">
                        <div class="grid grid-cols-2 gap-3">
                            <div class="flex flex-col gap-1" v-for="(item, index) in formData" :key="index">
                                <label for="date" class="font-bold">{{ item.item_produksi }} (IDR) <small class="text-red-500 font-bold">*</small></label>
                                <InputNumber v-model="item.value" inputId="minmaxfraction" placeholder="1,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                            </div>
                        </div>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>
