<script setup>
import kategoriCashFlowScheduleController from '@/controller/getApiFromThisApp/cashFlowSchedule/kategoriCashFlowScheduleController';
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';

const listTable = ref([]);
const search = ref('');
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);

let count = ref(0);

const formData = ref({
    id: null,
    name: null
});

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await kategoriCashFlowScheduleController.getAll();
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
            const response = await kategoriCashFlowScheduleController.getByID(data.id);
            // console.log(response);
            const history = response;
            const list = [];
            for (let i = 0; i < history.length; i++) {
                let fromNama,
                    toNama = null;
                if (history[i].changes.length == 0) {
                    fromNama = null;
                    toNama = null;
                } else {
                    fromNama = history[i].changes.name == null ? null : history[i].changes.name.old;
                    toNama = history[i].changes.name == null ? null : history[i].changes.name.new;
                }
                console.log(history[i].action);
                list.push({
                    action: history[i].action,
                    user_name: history[i].user_name,
                    date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
                    changesNama:
                        fromNama == null && toNama == null
                            ? []
                            : [
                                  { icon: 'pi pi-arrow-up text-red-500', name: fromNama },
                                  { icon: 'pi pi-arrow-down text-green-500', name: toNama }
                              ]
                });
            }
            logFile.value = list;
            formData.value = {
                id: data.id,
                name: data.name
            };
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value = {
                id: null,
                name: null
            };
            statusForm.value = 'add';
        }
    } catch (error) {
        formData.value = {
            id: null,
            name: null
        };
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.name = null;
};

const filteredList = computed(() => {
    return listTable.value.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()));
});

const submitData = async () => {
    if (!formData.value.name) {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    } else {
        if (statusForm.value == 'add') {
            const response = await kategoriCashFlowScheduleController.addPost(formData.value);
            // const load = response.data;
            if (response.status == true) {
                messages.value = [{ severity: 'success', content: 'Data berhasil di tambahkan', id: count.value++, icon: 'pi-check-circle' }];
                loadingSave.value = true;
                setTimeout(function () {
                    loadData();
                    drawerCond.value = false;
                    loadingSave.value = false;
                }, timeResponse.value);
            } else {
                messages.value = [{ severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', id: count.value++, icon: 'pi-times-circle' }];
            }
        } else {
            console.log(formData.value);
            const response = await kategoriCashFlowScheduleController.updatePost(formData.value.id, formData.value);
            // const load = response.data;
            console.log(response);
            if (response.status == true) {
                messages.value = [{ severity: 'success', content: 'Data berhasil di simpan', id: count.value++, icon: 'pi-check-circle' }];
                loadingSave.value = true;
                setTimeout(function () {
                    loadData();
                    drawerCond.value = false;
                    loadingSave.value = false;
                }, timeResponse.value);
            } else {
                messages.value = [{ severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', id: count.value++, icon: 'pi-times-circle' }];
            }
        }
    }
};
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-3xl">Kategori Cash Flow Schedule</span>
            <button @click="showDrawer(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2">
                <i class="pi pi-plus"></i>
                <span>Tambah Kategori</span>
            </button>
        </div>
        <Drawer v-model:visible="drawerCond" position="right" class="!w-full md:!w-[30rem]">
            <template #header>
                <span class="text-[1vw] font-bold">Form Data</span>
            </template>
            <template #footer>
                <div class="flex w-full justify-end pt-3 border-t">
                    <span class="text-[0.7vw]"><span class="text-red-500 font-bold text-[1vw]">*</span> Wajib di Isi</span>
                </div>
            </template>
            <div class="flex flex-col gap-4">
                <transition-group name="p-message" tag="div" class="flex flex-col">
                    <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity" class="mt-4"><i :class="`pi ${msg.icon}`"></i> {{ msg.content }}</Message>
                </transition-group>
                <div class="flex flex-col gap-1">
                    <label for="nama">Kategori <small class="text-red-500 font-bold">*</small></label>
                    <InputText type="text" v-model="formData.name" placeholder="Silahkan Input Kategori" />
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
                    <span class="text-xl font-bold w-full">List Data</span>
                    <InputGroup>
                        <InputText placeholder="Cari" v-model="search" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <div class="flex flex-col gap-3">
                    <div class="flex gap-3 items-center p-3 shadow rounded-lg" v-for="(item, index) in filteredList" :key="index">
                        <i class="pi pi-paperclip px-3 py-3 bg-gray-200 rounded-lg"></i>
                        <span class="w-full text-[1.3vw] font-bold">{{ item.name }}</span>
                        <button @click="showDrawer(item)" class="p-3 border rounded-full flex bg-teal-200 justify-center items-center hover:bg-amber-300 shadow-md transition-all duration-300">
                            <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                        </button>
                    </div>
                    <!-- <div class="min-h-[7rem] w-full bg-black rounded-xl p-5 text-white flex gap-3 items-center" v-for="(item, index) in filteredList" :key="index">
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
                    </div> -->
                </div>
            </template>
        </Card>
    </div>
</template>
