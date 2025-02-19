<script setup>
import { formatCurrency } from '@/controller/dummyController';
import saldoPeScmController from '@/controller/getApiFromThisApp/supplyChain/saldoPeScmController';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const listTable = ref([]);
const listAllTable = ref([]);
const search = ref(null);
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const dataLatest = ref({ saldo_awal: null, saldo_pakai: null, saldo_tersedia: null, tanggal: moment().format('DD MMMM YYYY') });

const beforeDate = ref(moment().subtract(30, 'days').format('YYYY-MM-DD')); // 30 hari ke belakang
const now = ref(moment().format('YYYY-MM-DD')); // Tanggal hari ini

let count = ref(0);

const formData = ref({
    id: null,
    tanggal: moment().format('YYYY-MM-DD'),
    saldo_awal: null,
    saldo_pakai: null
});

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await saldoPeScmController.getAll();

        listTable.value = data;
        listAllTable.value = data;
        const sortedData = data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        const lastDate = sortedData[0];
        console.log(lastDate);
        if (lastDate != null) {
            dataLatest.value = {
                saldo_awal: formatCurrency(Number(lastDate.saldo_awal).toFixed(2)),
                saldo_pakai: formatCurrency(Number(lastDate.saldo_pakai).toFixed(2)),
                saldo_tersedia: formatCurrency(Number(lastDate.saldo_tersedia).toFixed(2)),
                tanggal: moment(lastDate.tanggal).format('DD MMMM YYYY')
            };
        }
    } catch (error) {
        listTable.value = [];
        listAllTable.value = [];
        dataLatest.value = { saldo_awal: null, saldo_pakai: null, saldo_tersedia: null, tanggal: moment().format('DD MMMM YYYY') };
    }
};

const changeDate = (cond) => {
    if (cond == 'search') {
        const list = search.value; // Nilai pencarian (array tanggal)
        let start, end;

        if (list && list.length > 1) {
            start = moment(list[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
            end = moment(list[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
        } else {
            start = beforeDate.value;
            end = now.value;
        }

        // Filter data berdasarkan rentang tanggal
        listTable.value = list ? listAllTable.value.filter((item) => item.tanggal >= start && item.tanggal <= end) : listAllTable.value;
    } else {
        listTable.value = listAllTable.value;
        search.value = null;
    }
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate();
    return date;
};

const filterData = () => {
    const list = listAllTable.value;
};

const showDrawer = async (data) => {
    try {
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const response = await saldoPeScmController.getByID(data.id);
            const history = response.history;
            const list = [];
            for (let i = 0; i < history.length; i++) {
                let from,
                    to = null;
                // if (history[i].changes.length == 0) {
                //     from = null;
                //     to = null;
                // } else {
                //     from = history[i].changes.tanggal.old;
                //     to = history[i].changes.tanggal.new;
                // }
                const items = [];
                // const items = [{ icon: 'pi pi-arrow-up text-red-500', name: from }, { icon: 'pi pi-arrow-down text-green-500', name: to }]
                list.push({
                    action: history[i].action,
                    user_name: history[i].user_name,
                    date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
                    changes: from == null && to == null ? [] : items
                });
            }
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.saldo_awal = Number(data.saldo_awal);
            formData.value.saldo_pakai = Number(data.saldo_pakai);
            formData.value.tanggal = moment(data.tanggal).format('YYYY-MM-DD');
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.saldo_awal = null;
            formData.value.saldo_pakai = null;
            formData.value.tanggal = moment().format('YYYY-MM-DD');
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.saldo_awal = null;
        formData.value.saldo_pakai = null;
        formData.value.tanggal = moment().format('YYYY-MM-DD');
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.saldo_awal = null;
    formData.value.saldo_pakai = null;
    formData.value.tanggal = moment().format('YYYY-MM-DD');
};

const submitData = async () => {
    if (formData.value.saldo_awal == null || formData.value.saldo_pakai == null || !formData.value.tanggal) {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    } else {
        formData.value.tanggal = moment(formData.value.tanggal).format('YYYY-MM-DD');
        if (statusForm.value == 'add') {
            const response = await saldoPeScmController.addPost(formData.value);
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
            // console.log(formData.value);
            const response = await saldoPeScmController.updatePost(formData.value.id, formData.value);
            // const load = response.data;
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
            <span class="text-3xl">Riwayat Saldo PE</span>
            <button @click="showDrawer(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2">
                <i class="pi pi-plus"></i>
                <span>Tambah Data</span>
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
                    <label for="tanggal">Tanggal <small class="text-red-500 font-bold">*</small></label>
                    <DatePicker v-model="formData.tanggal" dateFormat="yy-mm-dd" showIcon placeholder="Please input Date" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="awal">Saldo Awal <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.saldo_awal" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="pakai">Saldo Terpakai <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.saldo_pakai" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
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
                <div class="flex flex-col gap-1 w-full">
                    <div class="flex gap-2 items-center mb-5">
                        <span class="text-xl font-bold w-full">List Saldo</span>
                        <InputGroup>
                            <DatePicker v-model="search" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-full" />
                            <InputGroupAddon class="cursor-pointer" @click="changeDate('search')">
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputGroupAddon class="cursor-pointer" @click="changeDate('refresh')">
                                <i class="pi pi-refresh" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div class="flex justify-end w-full">
                        <div class="flex w-2/3 gap-5 p-3 rounded-md bg-gray-50 items-center">
                            <div class="flex flex-col w-full text-right text-pink-700">
                                <small class="w-full text-xs">Update Saldo Terakhir</small>
                                <span class="font-bold">{{ dataLatest.tanggal }}</span>
                            </div>
                            <div class="flex flex-col w-full text-right text-black">
                                <span class="font-bold text-md text-cyan-600">{{ dataLatest.saldo_awal }}</span>
                                <small class="text-xs text-cyan-500">Saldo Awal</small>
                            </div>
                            <div class="flex flex-col w-full text-right text-black">
                                <span class="font-bold text-md text-cyan-600">{{ dataLatest.saldo_pakai }}</span>
                                <small class="text-xs text-cyan-500">Saldo Terpakai</small>
                            </div>
                            <div class="flex flex-col w-full text-right text-black">
                                <span class="font-bold text-md text-cyan-600">{{ dataLatest.saldo_tersedia }}</span>
                                <small class="text-xs text-cyan-500">Saldo Tersedia</small>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #content>
                <DataTable :value="listTable" showGridlines paginator :rows="10">
                    <Column field="tanggal" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Tanggal</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ moment(data.tanggal).format('DD MMM YYYY') }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="saldo_awal" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Saldo Awal</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span>{{ formatCurrency(Number(data.saldo_awal).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="saldo_pakai" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Saldo Terpakai</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span>{{ formatCurrency(Number(data.saldo_pakai).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="saldo_tersedia" sortable style="width: 25%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
                        <template #header>
                            <div class="flex w-full justify-center text-black">
                                <span>Saldo Tersedia</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span>{{ formatCurrency(Number(data.saldo_tersedia).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="id" style="width: 5%; font-size: 0.7vw" headerStyle="background-color:rgb(251 207 232)">
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
