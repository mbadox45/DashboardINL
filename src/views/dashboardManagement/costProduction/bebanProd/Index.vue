<script setup>
import { formatCurrency } from '@/controller/dummyController';
import bebanProdCpoOlahController from '@/controller/getApiFromThisApp/cpoOlah/bebanProdCpoOlahController';
import pmgMasterController from '@/controller/getApiFromThisApp/master/pmgMasterController';
import uraianBebanProdMasterController from '@/controller/getApiFromThisApp/master/uraianBebanProdMasterController';
import { FilterMatchMode } from '@primevue/core/api';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const optionPage = ref(0);

const listTable = ref([]);
const totalTable = ref({ cpoOlah: 0, totalCost: 0, totalHargaSatuan: 0 });
const search = ref();
const expandedRows = ref([]);

const selectedPmg = ref(1);
const pmg = ref([]);
const listUraian = ref([]);

const op = ref();

const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);

const initFilters = () => {
    search.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();

let count = ref(0);

const formData = ref({
    id: null,
    uraian_id: null,
    pmg_id: null,
    tanggal: moment().format('YYYY-MM-DD'),
    value: null
});

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        // Change Picker
        const form = {
            idPmg: selectedPmg.value,
            tanggalAwal: beforeDate.value,
            tanggalAkhir: now.value
        };
        const data = await bebanProdCpoOlahController.loadTable(form);
        listTable.value = data.data;
        totalTable.value = {
            cpoOlah: data.cpoOlah,
            totalCost: data.totalCost,
            totalHargaSatuan: data.totalHargaSatuan
        };

        // get Select Option
        const loadPMG = await pmgMasterController.getAll();
        const uraian = await uraianBebanProdMasterController.getAll();
        listUraian.value = uraian;
        pmg.value = loadPMG;
    } catch (error) {
        listTable.value = [];
        totalTable.value = {
            cpoOlah: 0,
            totalCost: 0,
            totalHargaSatuan: 0
        };
    }
};

const toggle = async (event) => {
    op.value.toggle(event);
};

const changeDate = async () => {
    const list = dates.value;
    const listdate = [];
    let start, end;

    if (list != null) {
        if (list.length > 1) {
            start = moment(list[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
            const lastDayOfMonth = moment(list[0], 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD');
            end = moment(list[1] === null ? lastDayOfMonth : list[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
        } else {
            start = beforeDate.value;
            end = now.value;
        }
    } else {
        start = beforeDate.value;
        end = now.value;
    }
    listdate.push(convertDate(start), convertDate(end));

    beforeDate.value = start;
    now.value = end;
    dates.value = listdate;

    await loadData();
    await toggle();
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate();
    return date;
};

const showDrawer = async (data, mainData) => {
    try {
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const response = await bebanProdCpoOlahController.getByID(data.id);
            const history = response.history;
            const list = [];
            for (let i = 0; i < history.length; i++) {
                let fromValue,
                    toValue,
                    fromTanggal,
                    toTanggal = null;
                if (history[i].changes.length == 0) {
                    fromValue = null;
                    toValue = null;
                    fromTanggal = null;
                    toTanggal = null;
                } else {
                    fromValue = history[i].changes.value == null ? null : history[i].changes.value.old;
                    toValue = history[i].changes.value == null ? null : history[i].changes.value.new;
                    fromTanggal = history[i].changes.tanggal == null ? null : history[i].changes.tanggal.old;
                    toTanggal = history[i].changes.tanggal == null ? null : history[i].changes.tanggal.new;
                }
                list.push({
                    action: history[i].action,
                    user_name: history[i].user_name,
                    date: moment(history[i].created_at).format('DD MMM YYYY - HH:mm:ss'),
                    changesLokasi:
                        fromValue == null && toValue == null
                            ? []
                            : [
                                  { icon: 'pi pi-arrow-up text-red-500', name: fromValue },
                                  { icon: 'pi pi-arrow-down text-green-500', name: toValue }
                              ],
                    changesNama:
                        fromTanggal == null && toTanggal == null
                            ? []
                            : [
                                  { icon: 'pi pi-arrow-up text-red-500', name: fromTanggal },
                                  { icon: 'pi pi-arrow-down text-green-500', name: toTanggal }
                              ]
                });
            }
            const uraian = listUraian.value.find((item) => item.nama == mainData.uraian);
            const listPmg = pmg.value.find((item) => item.nama == mainData.pmg);
            logFile.value = list;
            formData.value.id = data.id;
            formData.value.uraian_id = uraian.id;
            formData.value.pmg_id = listPmg.id;
            formData.value.tanggal = data.tanggal;
            formData.value.value = data.value;
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.uraian_id = null;
            formData.value.pmg_id = null;
            formData.value.tanggal = moment().format('YYYY-MM-DD');
            formData.value.value = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.uraian_id = null;
        formData.value.pmg_id = null;
        formData.value.tanggal = moment().format('YYYY-MM-DD');
        formData.value.value = null;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    messages.value = [];
    formData.value.uraian_id = null;
    formData.value.pmg_id = null;
    formData.value.tanggal = moment().format('YYYY-MM-DD');
    formData.value.value = null;
};

const submitData = async () => {
    if (!formData.value.pmg_id || !formData.value.tanggal || !formData.value.uraian_id || !formData.value.value) {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    } else {
        formData.value.tanggal = moment(formData.value.tanggal).format('YYYY-MM-DD');
        if (statusForm.value == 'add') {
            const response = await bebanProdCpoOlahController.addPost(formData.value);
            if (response.status == true) {
                messages.value = [{ severity: 'success', content: 'Data berhasil di tambahkan', id: count.value++, icon: 'pi-check-circle' }];
                loadingSave.value = true;
                setTimeout(function () {
                    loadData();
                    drawerCond.value = false;
                    loadingSave.value = false;
                }, timeResponse.value);
            } else {
                messages.value = [{ severity: 'error', content: response.msg, id: count.value++, icon: 'pi-times-circle' }];
            }
        } else {
            const response = await bebanProdCpoOlahController.updatePost(formData.value.id, formData.value);
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
                messages.value = [{ severity: 'error', content: response.msg, id: count.value++, icon: 'pi-times-circle' }];
            }
        }
    }
};
</script>

<template>
    <div class="flex flex-col w-full gap-8">
        <div class="flex gap-2 items-center justify-between w-full font-bold">
            <span class="text-5xl">Cost Production Beban Produksi</span>
            <button @click="showDrawer(null)" class="px-4 py-2 font-bold items-center shadow-lg hover:shadow-none transition-all duration-300 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full flex gap-2">
                <i class="pi pi-plus"></i>
                <span>Add Data</span>
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
                    <label for="date">Uraian <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.uraian_id" filter :options="listUraian" optionLabel="nama" optionValue="id" placeholder="Select a Description" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">PMG <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.pmg_id" :options="pmg" optionLabel="nama" optionValue="id" placeholder="Select a Region" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Tanggal <small class="text-red-500 font-bold">*</small></label>
                    <DatePicker v-model="formData.tanggal" dateFormat="yy-mm-dd" showIcon placeholder="Please input Date" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="date">Biaya Produksi (Rp) <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.value" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-row-reverse w-full gap-3 mt-3">
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
        <Popover ref="op">
            <div class="flex flex-col items-center gap-4 w-[25rem] py-2">
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex flex-col gap-1 w-full items-start">
                        <label for="pmg" class="text-[0.8vw]">Select by PMG</label>
                        <Select v-model="selectedPmg" :options="pmg" optionLabel="nama" optionValue="id" placeholder="Select a Region" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1 w-full items-start">
                        <label for="pmg" class="text-[0.8vw]">Select by Period</label>
                        <DatePicker v-model="dates" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Select Date Range" class="w-full" />
                    </div>
                </div>
                <Divider />
                <button @click="changeDate" class="py-2 px-6 w-full flex gap-3 items-center justify-center rounded-lg shadow shadow-gray-700 hover:bg-cyan-600 transition-all duration-300 text-white bg-cyan-500">
                    <i class="pi pi-verified" style="font-size: 0.8vw"></i><span class="text-[0.8vw]">Submit</span>
                </button>
            </div>
        </Popover>
        <Card>
            <template #title>
                <div class="flex gap-5 items-center mb-5">
                    <div class="flex items-center justify-between gap-3 w-full">
                        <button @click="toggle" class="py-2 px-3 text-black text-[0.8vw] flex gap-3 items-center bg-pink-200 shadow-md rounded-lg shadow-gray-200 font-bold hover:bg-pink-300 transition-all duration-300">
                            <i class="pi pi-calendar" style="font-size: 0.8vw"></i><span>Select Data</span>
                        </button>
                        <Chip :label="`${moment(beforeDate).format('DD MMM YYYY')} - ${moment(now).format('DD MMM YYYY')}`" icon="pi pi-calendar" style="font-size: 0.6vw" class="font-bold" />
                    </div>
                    <InputGroup>
                        <InputText placeholder="Search Components" v-model="search['global'].value" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <DataTable
                    v-model:filters="search"
                    v-model:expandedRows="expandedRows"
                    showGridlines
                    :value="listTable"
                    paginator
                    :rows="10"
                    dataKey="uraian"
                    :globalFilterFields="['uraian', 'totalValue', 'hargaSatuan']"
                    tableStyle="min-width: 50rem"
                >
                    <template #empty>
                        <div class="flex w-full justify-center">
                            <span class="text-red-500 font-bold">Data tidak tersedia, silahkan select data di periode lain. </span>
                        </div>
                    </template>
                    <Column expander style="width: 5%" />
                    <Column field="uraian" sortable header="Uraian" style="width: 25%"></Column>
                    <Column field="pmg" sortable header="PMG" style="width: 5%">
                        <template #body="{ data }">
                            <div class="flex w-full justify-start text-sm font-bold">
                                <span>{{ data.pmg }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="totalValue" sortable header="Biaya Produksi" style="width: 25%">
                        <template #body="{ data }">
                            <div class="flex w-full justify-end text-sm font-bold">
                                <span>{{ formatCurrency(data.totalValue.toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="hargaSatuan" sortable header="Rp/Kg CPO Olah" style="width: 25%">
                        <template #body="{ data }">
                            <div class="flex w-full justify-end text-sm font-bold">
                                <span>{{ formatCurrency(data.hargaSatuan.toFixed(2)) }}</span>
                            </div>
                        </template></Column
                    >
                    <ColumnGroup type="footer">
                        <Row>
                            <Column footer="Total Cost Production:" :colspan="3" footerStyle="text-align:right" />
                            <Column :footer="formatCurrency(totalTable.totalCost.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white;" />
                            <Column :footer="formatCurrency(totalTable.totalHargaSatuan.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white;" />
                        </Row>
                        <Row>
                            <Column footer="CPO Olah:" :colspan="4" footerStyle="text-align:right" />
                            <Column :footer="formatCurrency(totalTable.cpoOlah.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white;" />
                        </Row>
                    </ColumnGroup>
                    <template #expansion="{ data: mainRow }">
                        <div class="px-4">
                            <DataTable :value="mainRow.details" showGridlines dataKey="id" paginator :rows="5">
                                <template #empty> No items production found. </template>
                                <Column field="tanggal" sortable header="Tanggal" style="width: 25%">
                                    <template #body="{ data: subRow }">
                                        <div class="flex w-full text-sm font-bold">
                                            <span>{{ moment(subRow.tanggal).format('DD MMM YYYY') }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="value" sortable header="Biaya Produksi" style="width: 25%">
                                    <template #body="{ data: subRow }">
                                        <div class="flex w-full justify-end text-sm font-bold">
                                            <span>{{ formatCurrency(Number(subRow.value).toFixed(2)) }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="hargaSatuan" sortable header="Harga Satuan" style="width: 25%">
                                    <template #body="{ data: subRow }">
                                        <div class="flex w-full justify-end text-sm font-bold">
                                            <span>{{ formatCurrency(subRow.hargaSatuan.toFixed(2)) }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="hargaSatuan" style="width: 5%">
                                    <template #body="{ data: subRow }">
                                        <div class="flex w-full justify-center items-center text-sm font-bold">
                                            <button @click="showDrawer(subRow, mainRow)" class="p-3 border rounded-full flex justify-center items-center hover:bg-amber-300 shadow-md transition-all duration-300">
                                                <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                            </button>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
