<script setup>
import mataUangKursController from '@/controller/getApiFromThisApp/kurs/mataUangKursController';
import jenisLaporanProduksiController from '@/controller/getApiFromThisApp/laporanProduksi/jenisLaporanProduksiController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import levyRoutersPenjualanController from '@/controller/getApiFromThisApp/sales/levyRoutersPenjualanController';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// import {}
// import lev

const router = useRouter();

const messages = ref([]);
const tanggal = ref(moment().format('YYYY-MM-DD'));
// const maxDate = ref(moment().format('YYYY-MM-DD'));
const listJenis = ref([]);
const jenisProduksi = ref([]);
const listMatauang = ref([]);
const jenis = ref(null);
const pmg = ref(null);
const loadings = ref(false);
const setTime = ref(3000);
const listProduct = ref([]);

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
    // await loadProduct();
    // PMG
    await loadCurrency();
};

const loadCurrency = async () => {
    const loadMataUang = await mataUangKursController.getAll();
    const list = [];
    for (let i = 0; i < loadMataUang.length; i++) {
        list.push({
            id: loadMataUang[i].id,
            name: `${loadMataUang[i].symbol}_${loadMataUang[i].name} - ${loadMataUang[i].remark}`
        });
    }
    listMatauang.value = list;
};

const loadProduct = async () => {
    const response = await productMasterController.getAll();
    const produk = response.filter((item) => item.jenis == 'bulk');
    listProduct.value = produk;
    const list = [];

    if (!tanggal.value || !pmg.value) return;

    const form = {
        idMataUang: pmg.value,
        tanggalAwal: moment(tanggal.value).format('YYYY-MM-DD'),
        tanggalAkhir: moment(tanggal.value).format('YYYY-MM-DD')
    };
    const responseLevyReuters = await levyRoutersPenjualanController.pengecekanDataUpdate(form);
    // console.log(responseLevyReuters);
    if (responseLevyReuters != null) {
        for (let i = 0; i < produk.length; i++) {
            const levy = responseLevyReuters.find((item) => item.id_bulky == produk[i].id && item.id_mata_uang == pmg.value && item.type == 'levy');
            const reuters = responseLevyReuters.find((item) => item.id_bulky == produk[i].id && item.id_mata_uang == pmg.value && item.type == 'reuters');
            // console.log(levy, reuters);
            list.push({
                idLevy: levy == null ? null : levy.id,
                idRouters: reuters == null ? null : reuters.id,
                id_bulky: produk[i].id,
                item_produksi: produk[i].name,
                id_mata_uang: pmg.value,
                tanggal: tanggal.value,
                nilaiLevy: levy == null ? null : levy.nilai,
                nilaiRouters: reuters == null ? null : reuters.nilai,
                statusLevy: levy == null ? 'add' : 'update',
                statusRouters: reuters == null ? 'add' : 'update'
            });
        }
    } else {
        for (let i = 0; i < produk.length; i++) {
            list.push({
                idLevy: null,
                idRouters: null,
                id_bulky: produk[i].id,
                item_produksi: produk[i].name,
                id_mata_uang: pmg.value,
                tanggal: tanggal.value,
                nilaiLevy: null,
                nilaiRouters: null,
                statusLevy: 'add',
                statusRouters: 'add'
            });
        }
    }
    formData.value = list;
};

const loadJenis = async () => {
    try {
        const response = await jenisLaporanProduksiController.getAll();
        const listItems = [];
        const list = [];
        for (let i = 0; i < response.length; i++) {
            const items = response[i].item_produksi;
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

const resetForm = () => {
    formData.value = [];
    jenis.value = null;
    pmg.value = null;
    tanggal.value = moment().format('YYYY-MM-DD');
};

const postData = async (cond) => {
    if (cond == 'back') {
        router.push('/sales/levy-duty-proportion-cost');
        // window.location.replace(`${URL_WEB}operation/laporan-produksi`);
    } else {
        loadings.value = true;
        const form = [];
        const list = formData.value;
        for (let i = 0; i < list.length; i++) {
            form.push({
                idLevy: list[i].idLevy,
                idRouters: list[i].idRouters,
                id_bulky: list[i].id_bulky,
                item_produksi: list[i].item_produksi,
                id_mata_uang: pmg.value,
                tanggal: moment(tanggal.value).format('YYYY-MM-DD'),
                nilaiLevy: list[i].nilaiLevy,
                nilaiRouters: list[i].nilaiRouters,
                statusLevy: list[i].statusLevy,
                statusRouters: list[i].statusRouters
            });
        }
        const response = await levyRoutersPenjualanController.postData(formData.value);
        messages.value = [{ severity: response.severity, content: response.content, id: count.value++, icon: response.icon }];
        if (response.severity == 'success') {
            setTimeout(function () {
                loadings.value = false;
                router.push('/sales/levy-duty-proportion-cost');
                // window.location.replace(`${URL_WEB}operation/laporan-produksi`);
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
            <span class="text-3xl">Form Data (Levy Duty & Market Routers)</span>
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
                            <DatePicker v-model="tanggal" dateFormat="yy-mm-dd" :maxDate="maxDate" showIcon placeholder="Please input Date" @update:modelValue="loadProduct" />
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="date" class="font-bold">Mata Uang <small class="text-red-500 font-bold">*</small></label>
                            <Select v-model="pmg" filter :options="listMatauang" optionLabel="name" optionValue="id" placeholder="Pilih Mata Uang" class="w-full" @change="loadProduct" />
                        </div>
                    </div>
                    <!-- <div class="flex flex-col gap-1">
                        <label for="date" class="font-bold">Jenis <small class="text-red-500 font-bold">*</small></label>
                        <Select v-model="jenis" filter :options="listJenis" optionLabel="name" optionValue="id" placeholder="Select a Description" class="w-full" @change="loadForm" />
                    </div> -->
                    <Divider align="left" type="solid"><b>Form Item</b></Divider>
                    <ScrollPanel style="width: 100%; height: 22rem">
                        <div class="grid grid-cols-2 gap-3">
                            <!-- <div class="flex flex-col gap-3" v-for="(item, index) in formData" :key="index">

                            </div> -->
                            <div class="flex flex-col gap-1 p-3 border rounded-xl" v-for="(item, index) in formData" :key="index">
                                <label for="date" class="font-bold">{{ item.item_produksi }} <small class="text-red-500 font-bold">*</small></label>
                                <div class="flex gap-3">
                                    <div class="flex flex-col gap-1 w-full">
                                        <label for="date" class="font-bold">Levy Duty <small class="text-red-500 font-bold">*</small></label>
                                        <InputNumber v-model="item.nilaiLevy" inputId="minmaxfraction" placeholder="1,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                                    </div>
                                    <div class="flex flex-col gap-1 w-full">
                                        <label for="date" class="font-bold">Market Routers <small class="text-red-500 font-bold">*</small></label>
                                        <InputNumber v-model="item.nilaiRouters" inputId="minmaxfraction" placeholder="1,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollPanel>
                </div>
            </template>
        </Card>
    </div>
</template>
