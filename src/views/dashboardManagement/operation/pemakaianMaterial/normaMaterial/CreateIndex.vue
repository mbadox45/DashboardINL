<script setup>
import jenisLaporanMaterialController from '@/controller/getApiFromThisApp/laporanMaterial/jenisLaporanMaterialController';
import normaLaporanMaterialController from '@/controller/getApiFromThisApp/laporanMaterial/normaLaporanMaterialController';
import pmgMasterController from '@/controller/getApiFromThisApp/master/pmgMasterController';
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
    await loadJenis();
    // PMG
    const dataPmg = await pmgMasterController.getAll();
    listPmg.value = dataPmg;
};

const loadJenis = async () => {
    try {
        const response = await jenisLaporanMaterialController.getAll();
        const listItems = [];
        const list = [];
        for (let i = 0; i < response.length; i++) {
            const items = response[i].items;
            list.push({
                id: response[i].id,
                name: `${response[i].name}`
            });
            for (let j = 0; j < items.length; j++) {
                listItems.push({
                    id: items[j].id,
                    jenis_id: response[i].id,
                    name: `${items[j].name}`
                });
            }
        }
        listJenis.value = list;
        jenisProduksi.value = listItems;
    } catch (error) {
        listJenis.value = [];
        jenisProduksi.value = [];
    }
};

const loadForm = () => {
    const listProd = jenisProduksi.value.filter((item) => item.jenis_id == jenis.value);
    const list = [];
    for (let i = 0; i < listProd.length; i++) {
        list.push({
            item_material_id: listProd[i].id,
            item_produksi: listProd[i].name,
            pmg_id: pmg.value,
            tanggal: moment(tanggal.value).format('YYYY-MM-01'),
            qty: null,
            satuan: null
        });
    }
    formData.value = list;
};

const resetForm = () => {
    formData.value = [];
    jenis.value = null;
    pmg.value = null;
    tanggal.value = moment().format('YYYY-MM-01');
};

const postData = async (cond) => {
    if (cond == 'back') {
        router.push('/operation/norma-material/');
        // window.location.replace(`${URL_WEB}operation/norma-material`);
    } else {
        loadings.value = true;
        const form = [];
        const list = formData.value;
        for (let i = 0; i < list.length; i++) {
            form.push({
                item_material_id: list[i].item_material_id,
                item_produksi: list[i].item_produksi,
                pmg_id: pmg.value,
                tanggal: moment(tanggal.value).format('YYYY-MM-01'),
                qty: list[i].qty,
                satuan: list[i].satuan
            });
        }
        const response = await normaLaporanMaterialController.postData(form);
        messages.value = [{ severity: response.severity, content: response.content, id: count.value++, icon: response.icon }];
        if (response.severity == 'success') {
            setTimeout(function () {
                loadings.value = false;
                router.push('/operation/norma-material/');
                // window.location.replace(`${URL_WEB}operation/norma-material`);
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
            <span class="text-3xl">Form Data (Norma Material)</span>
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
                            <DatePicker v-model="tanggal" :maxDate="maxDate" showIcon view="month" dateFormat="yy-mm" placeholder="Please input period" />
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="pmg" class="font-bold">PMG <small class="text-red-500 font-bold">*</small></label>
                            <Select v-model="pmg" filter :options="listPmg" optionLabel="nama" optionValue="id" placeholder="Pilih PMG" class="w-full" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="jenis" class="font-bold">Material <small class="text-red-500 font-bold">*</small></label>
                        <Select v-model="jenis" filter :options="listJenis" optionLabel="name" optionValue="id" placeholder="Pilih Material" class="w-full" @change="loadForm" />
                    </div>
                    <Divider align="left" type="solid"><b>Form Item</b></Divider>
                    <ScrollPanel style="width: 100%; height: 22rem">
                        <div class="grid grid-cols-2 gap-8">
                            <div class="flex flex-col gap-3 p-2" v-for="(item, index) in formData" :key="index">
                                <div class="flex flex-col gap-1">
                                    <label for="test" class="font-bold">{{ item.item_produksi }} <small class="text-red-500 font-bold">*</small></label>
                                    <InputNumber v-model="item.qty" inputId="minmaxfraction" placeholder="1,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <label for="satuan" class="font-bold">Satuan <small class="text-red-500 font-bold">*</small></label>
                                    <InputText type="text" v-model="item.satuan" placeholder="Please input Satuan" size="small" />
                                </div>
                            </div>
                        </div>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>
