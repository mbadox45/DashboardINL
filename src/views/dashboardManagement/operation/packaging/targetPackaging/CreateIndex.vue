<script setup>
import jenisLaporanPackagingController from '@/controller/getApiFromThisApp/packaging/jenisLaporanPackagingController';
import laporanPackagingController from '@/controller/getApiFromThisApp/packaging/laporanPackagingController';
import packagingController from '@/controller/getApiFromThisApp/packaging/packagingController';
import uraianPackagingController from '@/controller/getApiFromThisApp/packaging/uraianPackagingController';
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
const pmg = ref(null);
const loadings = ref(false);
const setTime = ref(3000);

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());

const formData = ref([]);
let count = ref(0);

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadData();
});

const loadData = async () => {
    await loadJenis();
    // PMG
    const dataPmg = await packagingController.getAll();
    listPmg.value = dataPmg;

    await loadForm();
};

const loadJenis = async () => {
    try {
        const response = await jenisLaporanPackagingController.getAll();
        const list = [];
        for (let i = 0; i < response.length; i++) {
            const items = response[i].item_packaging;
            list.push({
                id: response[i].id,
                name: `${response[i].name}`
            });
        }
        listJenis.value = list;
    } catch (error) {
        listJenis.value = [];
    }
};

const loadForm = async () => {
    try {
        const response = await uraianPackagingController.getAll();
        const list = [];
        for (let i = 0; i < response.length; i++) {
            list.push({
                item_packaging_id: response[i].id,
                item_produksi: response[i].nama,
                packaging_id: pmg.value,
                tanggal: tanggal.value,
                value: null
            });
        }
        formData.value = list;
    } catch (error) {
        const list = [];
        formData.value = list;
    }
};

const resetForm = () => {
    formData.value = [];
    jenis.value = null;
    pmg.value = null;
    tanggal.value = moment().format('YYYY-MM-01');
};

const postData = async (cond) => {
    if (cond == 'back') {
        router.push('/operation/packaging/target');
    } else {
        loadings.value = true;
        const form = [];
        const list = formData.value;
        for (let i = 0; i < list.length; i++) {
            form.push({
                item_packaging_id: list[i].item_packaging_id,
                item_produksi: list[i].item_produksi,
                packaging_id: pmg.value,
                tanggal: moment(tanggal.value).format('YYYY-MM-01'),
                value: list[i].value
            });
        }
        const response = await laporanPackagingController.postData(form);
        messages.value = [{ severity: response.severity, content: response.content, id: count.value++, icon: response.icon }];
        if (response.severity == 'success') {
            setTimeout(function () {
                loadings.value = false;
                // window.location.replace(`${URL_WEB}operation/laporan-produksi`);
                router.push('/operation/packaging/target');
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
            <span class="text-3xl">Form Data (Target Packaging)</span>
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
                            <DatePicker v-model="tanggal" dateFormat="yy-mm" :maxDate="maxDate" view="month" showIcon placeholder="Please input Date" />
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="date" class="font-bold">Lokasi Packaging <small class="text-red-500 font-bold">*</small></label>
                            <Select v-model="pmg" filter :options="listPmg" optionLabel="nama" optionValue="id" placeholder="Select a Location" class="w-full" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="date" class="font-bold">Jenis <small class="text-red-500 font-bold">*</small></label>
                        <Select v-model="jenis" filter :options="listJenis" optionLabel="name" optionValue="id" placeholder="Select a Description" class="w-full" />
                    </div>
                    <Divider align="left" type="solid"><b>Form Item</b></Divider>
                    <ScrollPanel style="width: 100%; height: 22rem">
                        <div class="grid grid-cols-2 gap-3">
                            <div class="flex flex-col gap-1" v-for="(item, index) in formData" :key="index">
                                <label for="date" class="font-bold">{{ item.item_produksi }} <small class="text-red-500 font-bold">*</small></label>
                                <InputNumber v-model="item.value" inputId="minmaxfraction" placeholder="1,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                            </div>
                        </div>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>
