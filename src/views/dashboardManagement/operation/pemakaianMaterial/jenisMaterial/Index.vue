<script setup>
import { condFunction, conditions, kategoriMaterial } from '@/controller/getApiFromThisApp/dummy/variableDummy';
import jenisLaporanMaterialController from '@/controller/getApiFromThisApp/laporanMaterial/jenisLaporanMaterialController';
import { computed, onMounted, ref } from 'vue';

const listTable = ref([]);
const search = ref('');
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const listCondition = ref(conditions);
const kategori = ref(kategoriMaterial);

let count = ref(0);

const formData = ref({
    id: null,
    name: null,
    condition_olah: null,
    items: [{ id: null, name: null, kategori: null }]
});

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await jenisLaporanMaterialController.loadTable();
        listTable.value = data;
    } catch (error) {
        listTable.value = [];
    }
};

const showDrawer = async (data) => {
    try {
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const response = await jenisLaporanMaterialController.getByID(data.id);
            const history = response.history;
            const list = [];
            // for (let i = 0; i < history.length; i++) {
            //     let fromLokasi,
            //         toLokasi,
            //         fromNama,
            //         toNama = null;
            //     // if (history[i].changes.length == 0) {
            //     //     fromLokasi = null;
            //     //     toLokasi = null;
            //     //     fromNama = null;
            //     //     toNama = null;
            //     // } else {
            //     //     fromLokasi = history[i].changes.lokasi == null ? null : history[i].changes.lokasi.old;
            //     //     toLokasi = history[i].changes.lokasi == null ? null : history[i].changes.lokasi.new;
            //     //     fromNama = history[i].changes.nama == null ? null : history[i].changes.nama.old;
            //     //     toNama = history[i].changes.nama == null ? null : history[i].changes.nama.new;
            //     // }
            //     list.push({
            //         action: history[i].action,
            //         user_name: history[i].user_name,
            //         date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
            //         changesLokasi: fromLokasi == null && toLokasi == null ? [] : []
            //     });
            // }
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.name = data.name;
            formData.value.condition_olah = data.condition_olah;
            const item = data.items;
            const listItem = [];
            for (let i = 0; i < item.length; i++) {
                listItem.push({
                    id: item[i].id,
                    name: item[i].name,
                    kategori: item[i].kategori
                });
            }
            formData.value.items = listItem;
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.name = null;
            formData.value.condition_olah = null;
            formData.value.items = [{ id: null, name: null, kategori: null }];
            statusForm.value = 'add';
        }
    } catch (error) {
        formData.value.id = null;
        formData.value.name = null;
        formData.value.condition_olah = null;
        formData.value.items = [{ id: null, name: null, kategori: null }];
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.name = null;
    formData.value.condition_olah = null;
    formData.value.items = [{ id: null, name: null, kategori: null }];
};

const addItems = () => {
    formData.value.items.push({ id: null, name: null, kategori: null });
};

const removeItems = (index) => {
    formData.value.items.splice(index, 1); // Remove the form at the specified index
};

const submitData = async () => {
    if (!formData.value.name || !formData.value.condition_olah) {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    } else {
        const response = await jenisLaporanMaterialController.postData(formData.value, statusForm.value);
        if (response.severity == 'success') {
            loadingSave.value = true;
            setTimeout(function () {
                loadData();
                drawerCond.value = false;
                loadingSave.value = false;
            }, timeResponse.value);
        }
        messages.value = [{ severity: response.severity, content: response.content, id: count.value++, icon: response.icon }];
    }
};

const filteredList = computed(() => {
    return listTable.value.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()));
});
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-3xl">Master Jenis Material</span>
            <button @click="showDrawer(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2">
                <i class="pi pi-plus"></i>
                <span>Add Component</span>
            </button>
        </div>
        <Drawer v-model:visible="drawerCond" position="right" class="!w-full md:!w-[30rem]">
            <template #header>
                <div class="flex flex-col gap-3">
                    <span class="text-[1vw] font-bold">Form Component</span>
                    <transition-group name="p-message" tag="div" class="flex flex-col w-full">
                        <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity" class="mt-4 w-full"><i :class="`pi ${msg.icon}`"></i> {{ msg.content }}</Message>
                    </transition-group>
                </div>
            </template>
            <template #footer>
                <div class="flex w-full justify-end pt-3 border-t">
                    <span class="text-[0.7vw]"><span class="text-red-500 font-bold text-[1vw]">*</span> Wajib di Isi</span>
                </div>
            </template>
            <div class="flex flex-col gap-4 text-[1vw]">
                <div class="flex flex-col gap-1">
                    <label for="nama">Nama <small class="text-red-500 font-bold">*</small></label>
                    <InputText type="text" v-model="formData.name" placeholder="Please input Name" size="small" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="nama">Kondisi Olah <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.condition_olah" :options="listCondition" optionLabel="name" size="small" optionValue="id" placeholder="Select a Condition" class="w-full" />
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex gap-3 items-center justify-between">
                        <span class="font-bold">Items</span>
                        <button @click="addItems" class="flex gap-2 px-3 py-1 shadow bg-cyan-600 rounded-lg items-center font-bold hover:bg-cyan-700 text-white transition-all duration-300">
                            <i class="pi pi-plus" style="font-size: 0.8vw"></i><span>Add item</span>
                        </button>
                    </div>
                    <div class="flex flex-col gap-2 p-4 border rounded-lg" v-for="(items, index) in formData.items" :key="index">
                        <div class="flex flex-col gap-1">
                            <label for="nama">Nama Item <small class="text-red-500 font-bold">*</small></label>
                            <InputText type="text" v-model="items.name" placeholder="Please input Name" size="small" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="nama">Kategori Item <small class="text-red-500 font-bold">*</small></label>
                            <Select v-model="items.kategori" :options="kategori" optionLabel="name" optionValue="id" size="small" placeholder="Select a Condition" class="w-full" />
                        </div>
                        <button v-if="index && statusForm == 'add'" @click="removeItems(index)" class="flex gap-2 px-3 py-2 shadow bg-red-600 justify-center rounded-lg items-center font-bold hover:bg-red-700 text-white transition-all duration-300">
                            <i class="pi pi-times" style="font-size: 0.8vw"></i><span>Remove Item</span>
                        </button>
                    </div>
                </div>
                <div class="flex flex-row-reverse w-full gap-3">
                    <button @click="refreshForm" class="px-3 py-2 w-full border rounded-lg hover:shadow-md hover:shadow-black transition-all duration-300 shadow-sm shadow-black flex items-center gap-2 justify-center">
                        <i class="pi pi-refresh"></i><span>Reset</span>
                    </button>
                    <button
                        @click="submitData"
                        :disabled="loadingSave == true ? true : false"
                        :class="loadingSave == true ? 'opacity-50' : 'opacity-100'"
                        class="px-3 py-2 w-full border rounded-lg border-transparent hover:shadow-md hover:shadow-black hover:bg-emerald-800 transition-all duration-300 shadow-sm text-white shadow-black flex items-center gap-2 justify-center bg-emerald-700"
                    >
                        <i class="pi pi-save"></i><span>{{ loadingSave == true ? 'Saving..' : 'Save' }}</span>
                    </button>
                </div>
                <span class="mt-3 px-3" v-if="statusForm == 'edit'">Log Activity</span>
                <ScrollPanel v-if="statusForm == 'edit'" style="width: 100%; height: 22rem">
                    <div class="flex flex-col gap-2 w-full p-3">
                        <div class="flex flex-col pb-2 px-2" v-for="(item, index) in logFile" :key="index" :class="index < logFile.length ? 'border-b' : 'border-none'">
                            <div class="flex items-center w-full gap-5">
                                <i class="pi pi-user p-3 bg-pink-500 text-white rounded-full" style="font-size: 0.8vw"></i>
                                <div class="flex flex-col gap-1 w-full">
                                    <span class="text-[0.8vw] font-bold">{{ item.user_name }}</span>
                                    <div class="flex items-center gap-3">
                                        <i class="pi pi-clock" style="font-size: 0.5vw"></i>
                                        <span class="text-[0.5vw]">{{ item.date }}</span>
                                    </div>
                                </div>
                                <div class="w-full flex flex-col items-end gap-1">
                                    <small class="uppercase text-[0.6vw] font-bold p-2 rounded-full bg-slate-200">{{ item.action }}</small>
                                    <div class="flex flex-col items-end">
                                        <span class="text-[0.6vw] flex flex-row-reverse gap-2 items-center justify-end" v-for="(change, indexes) in item.changesLokasi" :key="indexes"
                                            ><span class="font-light">(Lokasi)</span><i :class="change.icon" style="font-size: 0.5vw"></i><span class="font-bold">{{ change.name }}</span></span
                                        >
                                        <span class="text-[0.6vw] flex flex-row-reverse gap-2 items-center justify-end" v-for="(change, indexes) in item.changesNama" :key="indexes"
                                            ><span class="font-light">(Nama)</span><i :class="change.icon" style="font-size: 0.5vw"></i><span class="font-bold">{{ change.name }}</span></span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollPanel>
            </div>
        </Drawer>
        <Card>
            <template #title>
                <div class="flex gap-2 items-center mb-5">
                    <span class="text-xl font-bold w-full">List Component</span>
                    <InputGroup>
                        <InputText placeholder="Search Components" v-model="search" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <ScrollPanel style="width: 100%; height: 35vw">
                    <div class="flex flex-col w-full gap-3">
                        <Panel v-for="(item, index) in filteredList" :key="index" toggleable :collapsed="true" class="w-full">
                            <template #header>
                                <div class="flex items-center gap-3">
                                    <button @click="showDrawer(item)" class="p-3 border rounded-lg flex bg-gray-200 justify-center items-center hover:bg-amber-300 shadow-md transition-all duration-300">
                                        <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                    </button>
                                    <div class="flex flex-col items-start">
                                        <span class="text-[0.9vw] font-bold italic">{{ item.name }}</span>
                                        <small class="px-2 py-1 text-[0.6vw] flex items-center rounded-full bg-gray-200 shadow font-bold">{{ condFunction(item.condition_olah) }}</small>
                                    </div>
                                </div>
                            </template>
                            <DataTable :value="item.items" showGridlines class="mt-4">
                                <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                                    <template #header>
                                        <div class="flex w-full justify-start">
                                            <span>Name</span>
                                        </div>
                                    </template>
                                    <template #body="{ data }">
                                        <div class="flex w-full justify-start text-center">
                                            <span>{{ data.name }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="kategori" sortable style="width: 25%; font-size: 0.7vw">
                                    <template #header>
                                        <div class="flex w-full justify-start">
                                            <span>Kategori</span>
                                        </div>
                                    </template>
                                    <template #body="{ data }">
                                        <div class="flex w-full justify-start">
                                            <span class="capitalize">{{ data.kategori }}</span>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </Panel>
                    </div>
                </ScrollPanel>
                <!-- <div class="flex flex-col gap-3">
                    <div class="min-h-[7rem] w-full bg-black rounded-xl p-5 text-white flex gap-3 items-center" v-for="(item, index) in filteredList" :key="index">
                        <img src="/images/master/water-filter.png" alt="PMG" width="80vw" />
                        <div class="flex flex-col w-full items-start gap-3">
                            <span class="text-[1.4vw]">{{ item.nama }}</span>
                            <div class="flex gap-2 w-full">
                                <button @click="showDrawer(item)" class="py-2 px-3 flex items-center bg-amber-500 transition-all duration-300 hover:bg-amber-600 shadow rounded-lg text-white font-bold"><i class="pi pi-pencil"></i></button>
                                <div class="flex gap-2 px-3 items-center w-full bg-white rounded-lg">
                                    <i class="pi pi-map-marker text-amber-500" style="font-size: 0.6vw"></i>
                                    <span class="text-[0.7vw] text-black font-bold">{{ item.lokasi }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </template>
        </Card>
    </div>
</template>
