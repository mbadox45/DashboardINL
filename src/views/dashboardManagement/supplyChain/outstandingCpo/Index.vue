<script setup>
import { formatCurrency } from '@/controller/dummyController';
import { jenisTable, listStatus } from '@/controller/getApiFromThisApp/dummy/variableDummy';
import supplierPartnerMasterController from '@/controller/getApiFromThisApp/master/supplierPartnerMasterController';
import outstandingCpoScmController from '@/controller/getApiFromThisApp/supplyChain/outstandingCpoScmController';
import { FilterMatchMode } from '@primevue/core/api';
import moment from 'moment';
import { onMounted, ref } from 'vue';

const listTable = ref([]);
const search = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const listSupplier = ref([]);
const jenis = ref('default');
const totalTable = ref({
    totalQty: 0,
    totalValue: 0
});

let count = ref(0);

const formData = ref({
    id: null,
    kontrak: null,
    supplier_id: null,
    qty: null,
    harga: null,
    status: 1
});

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const data = await outstandingCpoScmController.loadTable(jenis.value);
        listTable.value = data.data;
        totalTable.value = {
            totalQty: data.totalQty,
            totalValue: data.totalValue
        };
        const source = await supplierPartnerMasterController.getAll();
        listSupplier.value = source;
    } catch (error) {
        listTable.value = [];
        totalTable.value = {
            totalQty: 0,
            totalValue: 0
        };
    }
};

const showDrawer = async (data) => {
    try {
        drawerCond.value = true;
        messages.value = [];
        if (data != null) {
            const response = await outstandingCpoScmController.getByID(data.id);
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
            formData.value.kontrak = data.kontrak;
            formData.value.supplier_id = data.supplier_id;
            formData.value.qty = Number(data.qty);
            formData.value.harga = Number(data.harga);
            formData.value.status = data.status == true ? 1 : 0;
            statusForm.value = 'edit';
        } else {
            logFile.value = [];
            formData.value.id = null;
            formData.value.kontrak = null;
            formData.value.supplier_id = null;
            formData.value.qty = null;
            formData.value.harga = null;
            formData.value.status = 1;
            statusForm.value = 'add';
        }
    } catch (error) {
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.kontrak = null;
        formData.value.supplier_id = null;
        formData.value.qty = null;
        formData.value.harga = null;
        formData.value.status = 1;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.kontrak = null;
    formData.value.supplier_id = null;
    formData.value.qty = null;
    formData.value.harga = null;
    formData.value.status = 1;
};

const submitData = async () => {
    if (!formData.value.kontrak || !formData.value.supplier_id || formData.value.harga == null || !formData.value.qty == null) {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    } else {
        if (statusForm.value == 'add') {
            const response = await outstandingCpoScmController.addPost(formData.value);
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
            const response = await outstandingCpoScmController.updatePost(formData.value.id, formData.value);
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
            <span class="text-3xl">Outstanding CPO</span>
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
                    <label for="kontrak">Kontrak <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.kontrak" placeholder="Please input Contract" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="supplier_id">Supplier <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.supplier_id" :options="listSupplier" optionLabel="name" optionValue="id" placeholder="Select a Supplier" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="awal">Quantity <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.qty" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="pakai">Harga <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.harga" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1" v-if="statusForm == 'edit'">
                    <label for="supplier_id">Status <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.status" :options="listStatus" optionLabel="name" optionValue="id" placeholder="Select a Status" class="w-full" />
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
                    <InputGroup>
                        <InputGroupAddon>
                            <span class="text-[0.8vw]">Change Table</span>
                        </InputGroupAddon>
                        <Select v-model="jenis" :options="jenisTable" optionLabel="name" optionValue="id" size="small" placeholder="Select Data" class="w-full" @change="loadData" />
                    </InputGroup>
                    <div class="w-full"></div>
                    <InputGroup>
                        <DatePicker v-model="search['global'].value" dateFormat="yy-mm-dd" placeholder="Search by Date" size="small" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </template>
            <template #content>
                <DataTable v-model:filters="search" :value="listTable" showGridlines :globalFilterFields="['tanggal']" paginator :rows="10">
                    <Column field="supplier.name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Supplier</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-start">
                                <span>{{ data.supplier.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="kontrak" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Kontrak</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-start">
                                <span>{{ data.kontrak }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="harga" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Harga</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span>{{ formatCurrency(Number(data.harga).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="qty" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Quantity</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span>{{ formatCurrency(Number(data.qty).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="value" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Total</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span>{{ formatCurrency(Number(data.value).toFixed(2)) }}</span>
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
                    <ColumnGroup type="footer">
                        <Row>
                            <Column footer="Total :" :colspan="3" footerStyle="text-align:right; font-size:0.8vw;" />
                            <Column :footer="formatCurrency(totalTable.totalQty.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.8vw;" />
                            <Column :footer="formatCurrency(totalTable.totalValue.toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.8vw;" />
                            <Column footer="" footerStyle="text-align:right; background-color:black; color:white; font-size:0.8vw;" />
                        </Row>
                    </ColumnGroup>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
