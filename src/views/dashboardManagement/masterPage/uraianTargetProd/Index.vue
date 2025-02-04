<script setup>
import uraianTargetProdMasterController from '@/controller/getApiFromThisApp/master/uraianTargetProdMasterController';
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
    nama: null
});

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await uraianTargetProdMasterController.getAll();
        listTable.value = data;
    } catch (error) {
        listTable.value = [];
    }
};

const showDrawer = async (data) => {
    try {
        drawerCond.value = true;
        messages.value = [];
        console.log(data);
        if (data != null) {
            const response = await uraianTargetProdMasterController.getByID(data.id);
            const history = response.history;
            const list = [];
            for (let i = 0; i < history.length; i++) {
                let from,
                    to = null;
                if (history[i].changes.length == 0) {
                    from = null;
                    to = null;
                } else {
                    from = history[i].changes.nama.old;
                    to = history[i].changes.nama.new;
                }
                list.push({
                    action: history[i].action,
                    user_name: history[i].user_name,
                    date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
                    changes:
                        from == null && to == null
                            ? []
                            : [
                                  { icon: 'pi pi-arrow-up text-red-500', name: from },
                                  { icon: 'pi pi-arrow-down text-green-500', name: to }
                              ]
                });
            }
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.nama = data.nama;
            console.log(formData.value);
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.nama = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.nama = null;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.nama = null;
};

const submitData = async () => {
    console.log(statusForm.value, formData.value);
    if (!formData.value.nama) {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    } else {
        if (statusForm.value == 'add') {
            const response = await uraianTargetProdMasterController.addPost(formData.value);
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
            const response = await uraianTargetProdMasterController.updatePost(formData.value.id, formData.value);
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

const filteredList = computed(() => {
    return listTable.value.filter((item) => item.nama.toLowerCase().includes(search.value.toLowerCase()));
});
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-5xl">Uraian Target Produksi</span>
            <button @click="showDrawer(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2">
                <i class="pi pi-plus"></i>
                <span>Tambah Uraian</span>
            </button>
        </div>
        <Drawer v-model:visible="drawerCond" position="right" class="!w-full md:!w-[30rem]">
            <template #header>
                <span class="text-[1vw] font-bold">Form Uraian</span>
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
                    <label for="nama">Nama <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.nama" placeholder="Input Nama" />
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
                                        <span class="text-[0.6vw] flex flex-row-reverse gap-2 items-center justify-end" v-for="(change, indexes) in item.changes" :key="indexes"
                                            ><i :class="change.icon" style="font-size: 0.5vw"></i><span class="font-bold">{{ change.name }}</span></span
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
                    <span class="text-xl font-bold w-full">List Uraian</span>
                    <InputGroup>
                        <InputText placeholder="Cari" v-model="search" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <ScrollPanel style="width: 100%; height: 32vw">
                    <div class="flex flex-col gap-6">
                        <div class="min-h-[7rem] w-full bg-black rounded-xl p-5 text-white flex gap-3 items-center" v-for="(item, index) in filteredList" :key="index">
                            <i class="pi pi-paperclip p-3 rounded-xl bg-gray-900" style="font-size: 2vw"></i>
                            <div class="flex flex-col w-full items-start gap-3">
                                <span class="text-[0.9vw]">{{ item.nama }}</span>
                            </div>
                            <button @click="showDrawer(item)" class="py-3 px-3 justify-center px-3 flex items-center bg-amber-500 transition-all duration-300 hover:bg-amber-600 shadow rounded-lg text-white font-bold">
                                <i class="pi pi-pencil"></i>
                            </button>
                        </div>
                    </div>
                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>
