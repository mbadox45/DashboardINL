<script setup>
import { formatCurrency } from '@/controller/dummyController';
import dmoSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/dmoSicalRspController';
import { FilterMatchMode } from '@primevue/core/api';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const listTable = ref([]);
const search = ref('');
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());

let count = ref(0);

const formData = ref({
    id: null,
    date: null,
    value: null,
    remark: null
});

const initFilters = () => {
    search.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadData();
});

const loadData = async () => {
    try {
        const list = [];
        const data = await dmoSicalRspController.getAll();
        for (let i = 0; i < data.length; i++) {
            list.push({
                id: data[i].id,
                date: moment(data[i].date).format('DD MMM YYYY'),
                value: data[i].id,
                remark: data[i].remark
            });
        }
        listTable.value = list;
    } catch (error) {
        listTable.value = [];
    }
};

const showDrawer = async (data) => {
    try {
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const response = await dmoSicalRspController.getByID(data.id);
            console.log(response);
            const history = response.history;
            const list = [];
            for (let i = 0; i < history.length; i++) {
                let from,
                    to = null;
                // if (history[i].changes.length == 0) {
                //     from = null;
                //     to = null;
                // } else {
                //     from = history[i].changes.name.old;
                //     to = history[i].changes.name.new;
                // }
                list.push({
                    action: history[i].action,
                    user_name: history[i].user_name,
                    date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
                    changes: from == null && to == null ? [] : []
                });
            }
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.date = moment(data.date, 'DD MMM YYYY').toDate();
            formData.value.value = Number(data.value);
            formData.value.remark = data.remark;
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.date = null;
            formData.value.value = null;
            formData.value.remark = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.date = null;
        formData.value.value = null;
        formData.value.remark = null;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.date = null;
    formData.value.value = null;
    formData.value.remark = null;
};

const submitData = async () => {
    if (formData.value.date != null && formData.value.value != null && formData.value.remark != null) {
        const form = {
            id: formData.value.id,
            date: moment(formData.value.date).format('YYYY-MM-DD'),
            value: formData.value.value,
            remark: formData.value.remark
        };
        if (statusForm.value == 'add') {
            const response = await dmoSicalRspController.addPost(form);
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
            const response = await dmoSicalRspController.updatePost(formData.value.id, form);
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
    } else {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    }
};
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-3xl">Master DMO</span>
            <button @click="showDrawer(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2">
                <i class="pi pi-plus"></i>
                <span>Add Component</span>
            </button>
        </div>
        <Drawer v-model:visible="drawerCond" position="right" class="!w-full md:!w-[30rem]">
            <template #header>
                <span class="text-[1vw] font-bold">Form Component</span>
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
                    <label for="name">Tanggal <small class="text-red-500 font-bold">*</small></label>
                    <DatePicker v-model="formData.date" dateFormat="yy-mm-dd" :maxDate="maxDate" showIcon placeholder="Please input tanggal" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="name">Nilai DMO <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.value" placeholder="Please input Value" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="name">Remarks <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.remark" placeholder="Please input Remarks" />
                </div>
                <div class="flex flex-row-reverse w-full gap-3 mt-5">
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
                    <span class="text-xl font-bold w-full">List Component</span>
                    <InputGroup>
                        <InputText placeholder="Search Components" v-model="search['global'].value" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <DataTable v-model:filters="search" :value="listTable" showGridlines paginator :rows="10" dataKey="period" :globalFilterFields="['date', 'value', 'remark']">
                    <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="text-center w-full flex justify-center font-bold">
                                <span>Tanggal</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ data.date }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="text-center w-full flex justify-center font-bold">
                                <span>Nilai DMO</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ formatCurrency(Number(data.value).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="text-center w-full flex justify-center font-bold">
                                <span>Remarks</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center text-center">
                                <span>{{ data.remark }}</span>
                            </div>
                        </template>
                    </Column>

                    <Column field="id" style="width: 5%; font-size: 0.7vw">
                        <template #body="{ data }">
                            <div class="flex justify-center items center">
                                <button @click="showDrawer(data)" class="p-3 border rounded-full flex bg-gray-200 justify-center items-center hover:bg-amber-300 shadow-md transition-all duration-300">
                                    <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                </button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
