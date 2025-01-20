<script setup>
import { formatCurrency } from '@/controller/dummyController';
import productMasterController from '@/controller/getApiFromThisApp/master/productMasterController';
import productStorageScmController from '@/controller/getApiFromThisApp/supplyChain/productStorageScmController';
import retailStockScmController from '@/controller/getApiFromThisApp/supplyChain/stock/retailStockScmController';
import { FilterMatchMode } from '@primevue/core/api';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const listTable = ref([]);
const search = ref('');
const drawerCond = ref(false);
const messages = ref([]);
const statusForm = ref('add');
const timeResponse = ref(3000);
const loadingSave = ref(false);
const logFile = ref([]);
const listTanki = ref([]);
const listProduk = ref([]);
const listTotal = ref([]);
const totalData = ref({ totalQty: 0, totalTon: 0 });

const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
// const beforeDate = ref('2024-01-01');
// const now = ref('2024-02-28');
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);

let count = ref(0);
const op = ref();

const formData = ref({
    id: null,
    warehouse_id: null,
    id_ritel: null,
    tanggal: moment().format('YYYY-MM-DD'),
    qty: null,
    umur: null,
    remarks: null
});

const initFilters = () => {
    search.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters();

onMounted(() => {
    loadData();
});

const loadData = async () => {
    try {
        const form = {
            tanggalAwal: beforeDate.value,
            tanggalAkhir: now.value
        };
        const data = await retailStockScmController.loadTable(form);
        listTable.value = data.data;
        const total = data.total;

        if (data.data != null) {
            listTotal.value = total.products;
            totalData.value = { totalQty: total.totalQty, totalTon: total.totalTon };
        } else {
            listTotal.value = null;
            totalData.value = { totalQty: 0, totalTon: 0 };
        }

        await loadTanki();
        await loadProduk();
    } catch (error) {
        listTable.value = [];
    }
};

const loadTanki = async () => {
    const produk = await productStorageScmController.getByJenis('warehouse');
    const list = [];
    for (let i = 0; i < produk.length; i++) {
        list.push({
            id: produk[i].id,
            name: produk[i].name
        });
    }
    listTanki.value = list;
};

const loadProduk = async () => {
    const produk = await productMasterController.getAll();
    const jenis = produk.filter((item) => item.jenis.toLowerCase().includes('ritel'));
    listProduk.value = jenis;
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

const showDrawer = async (data) => {
    try {
        if (data != null) {
            drawerCond.value = true;
            messages.value = [];
            const response = await retailStockScmController.getByID(data.id);
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
            formData.value.warehouse_id = data.warehouse_id;
            formData.value.id_ritel = data.id_ritel;
            formData.value.tanggal = data.tanggal;
            formData.value.remarks = data.remarks;
            formData.value.umur = Number(data.umur);
            formData.value.qty = Number(data.qty);
            statusForm.value = 'edit';
        } else {
            router.push('/scm/stock/retail/create');
            logFile.value = [];
            formData.value.id = null;
            formData.value.warehouse_id = null;
            formData.value.id_ritel = null;
            formData.value.tanggal = moment().format('YYYY-MM-DD');
            formData.value.remarks = null;
            formData.value.umur = null;
            formData.value.qty = null;
            statusForm.value = 'add';
        }
    } catch (error) {
        router.push('/scm/stock/retail/create');
        messages.value = [];
        drawerCond.value = true;
        logFile.value = [];
        formData.value.id = null;
        formData.value.warehouse_id = null;
        formData.value.id_ritel = null;
        formData.value.tanggal = moment().format('YYYY-MM-DD');
        formData.value.remarks = null;
        formData.value.umur = null;
        formData.value.qty = null;
        statusForm.value = 'add';
    }
};

const refreshForm = () => {
    formData.value.warehouse_id = null;
    formData.value.id_ritel = null;
    formData.value.tanggal = moment().format('YYYY-MM-DD');
    formData.value.remarks = null;
    formData.value.umur = null;
    formData.value.qty = null;
};

const submitData = async () => {
    if (!formData.value.id_ritel || !formData.value.tanggal || !formData.value.remarks || !formData.value.umur || !formData.value.qty || !formData.value.warehouse_id) {
        messages.value = [{ severity: 'warn', content: 'Harap di data lengkapi !', id: count.value++, icon: 'pi-exclamation-triangle' }];
    } else {
        if (statusForm.value == 'add') {
            const response = await retailStockScmController.addPost(formData.value);
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
            const response = await retailStockScmController.updatePost(formData.value.id, formData.value);
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
            <span class="text-3xl">Stock Retail</span>
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
                    <DatePicker v-model="formData.tanggal" dateFormat="yy-mm-dd" showIcon placeholder="Please input Date" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="tanki">Tanki <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.warehouse_id" :options="listTanki" optionLabel="name" optionValue="id" placeholder="Select a Type" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="produk">Produk <small class="text-red-500 font-bold">*</small></label>
                    <Select v-model="formData.id_ritel" :options="listProduk" optionLabel="name" optionValue="id" placeholder="Select a Type" class="w-full" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="umur">Umur <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.umur" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="qty">Quantity <small class="text-red-500 font-bold">*</small></label>
                    <InputNumber v-model="formData.qty" inputId="minmaxfraction" placeholder="1,000,000" :minFractionDigits="0" :maxFractionDigits="2" fluid />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="remarks">Remarks <small class="text-red-500 font-bold">*</small></label>
                    <InputText v-model="formData.remarks" placeholder="Please input Remarks" />
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
        <Popover ref="op">
            <div class="flex flex-col items-center gap-4 w-[25rem] py-2">
                <div class="flex flex-col gap-2 w-full">
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
                <div class="flex gap-2 items-center mb-5">
                    <div class="flex items-center justify-between gap-3 w-full">
                        <button @click="toggle" class="py-2 px-3 text-black text-[0.8vw] flex gap-3 items-center bg-pink-200 shadow-md rounded-lg shadow-gray-200 font-bold hover:bg-pink-300 transition-all duration-300">
                            <i class="pi pi-calendar" style="font-size: 0.8vw"></i><span>Select Data</span>
                        </button>
                        <Chip :label="`${moment(beforeDate).format('DD MMM YYYY')} - ${moment(now).format('DD MMM YYYY')}`" icon="pi pi-calendar" style="font-size: 0.6vw" class="font-bold" />
                    </div>
                    <!-- <InputGroup>
                        <InputText placeholder="Search Components" v-model="search['global'].value" />
                        <InputGroupAddon>
                            <i class="pi pi-search" />
                        </InputGroupAddon>
                    </InputGroup> -->
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-2 gap-4">
                    <Panel v-if="listTable.length > 0">
                        <template #header>
                            <span class="font-bold">Total Stock</span>
                        </template>
                        <DataTable :value="listTotal" showGridlines>
                            <ColumnGroup type="footer">
                                <Row>
                                    <Column footer="TOTAL :" footerStyle="text-align:right; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency(Number(totalData.totalQty).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency(Number(totalData.totalTon).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                </Row>
                            </ColumnGroup>
                            <Column field="product_name" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>Product</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full items-center gap-2 justify-start">
                                        <div class="p-3 border rounded-full flex bg-gray-200 justify-center items-center text-black">
                                            <i class="pi pi-clipboard" style="font-size: 0.6vw"></i>
                                        </div>
                                        <span>{{ data.product_name }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column field="totalQty" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>Ctn</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full justify-end">
                                        <span>{{ formatCurrency(Number(data.totalQty).toFixed(2)) }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column field="totalTon" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>MT</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full justify-end">
                                        <span>{{ formatCurrency(Number(data.totalTon).toFixed(2)) }}</span>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </Panel>
                    <Panel v-for="(item, index) in listTable" :key="index">
                        <template #header>
                            <span>{{ item.warehouseName }}</span>
                        </template>
                        <DataTable :value="item.detail" showGridlines>
                            <ColumnGroup type="footer">
                                <Row>
                                    <Column footer="TOTAL :" :colspan="2" footerStyle="text-align:right; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency(Number(item.warehouseQty).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency(Number(item.warehouseTon).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency(Number(item.warehousePallet).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                </Row>
                                <Row>
                                    <Column footer="Kapasitas WH :" :colspan="2" footerStyle="text-align:right; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency((Number(item.warehouseCapacity) * 55).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency((Number(item.warehouseCapacity) * 55 * 0.010864).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                    <Column :footer="formatCurrency(Number(item.warehouseCapacity).toFixed(2))" footerStyle="text-align:right; background-color:black; color:white; font-size:0.6vw;" />
                                </Row>
                            </ColumnGroup>
                            <Column field="product.name" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>Product</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full items-center gap-2 justify-start">
                                        <button @click="showDrawer(data)" class="p-3 border rounded-full flex bg-gray-200 justify-center items-center hover:bg-amber-300 shadow-md transition-all duration-300">
                                            <i class="pi pi-pencil" style="font-size: 0.6vw"></i>
                                        </button>
                                        <span>{{ data.product.name }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column field="tanggal" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>Tanggal</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full justify-center">
                                        <span>{{ moment(data.tanggal).format('DD MMM YYYY') }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column field="qty" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>Ctn</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full justify-end">
                                        <span>{{ formatCurrency(Number(data.qty).toFixed(2)) }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column field="qtyTon" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>MT</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full justify-end">
                                        <span>{{ formatCurrency(Number(data.qtyTon).toFixed(2)) }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column field="qtyPallet" sortable style="width: 15%; font-size: 0.6vw">
                                <template #header>
                                    <div class="flex w-full justify-center">
                                        <span>Pallet</span>
                                    </div>
                                </template>
                                <template #body="{ data }">
                                    <div class="flex w-full justify-end">
                                        <span>{{ formatCurrency(Number(data.qtyPallet).toFixed(2)) }}</span>
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </Panel>
                </div>
                <!-- <DataTable :value="listTable" v-model:filters="search" showGridlines paginator :rows="10" dataKey="period" :globalFilterFields="['tanki.lokasi.name', 'product.name', 'tanki.name', 'tanki.kapasitas', 'remarks']">
                    <Column field="tanggal" sortable style="width: 15%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Tanggal</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ moment(data.tanggal).format('DD MMM YYYY') }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="tanki.lokasi.name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Lokasi</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ data.tanki.lokasi.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="product.name" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Produk</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-center">
                                <span>{{ data.product.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="tanki.name" sortable style="width: 10%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>No Tanki</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-start">
                                <span class="capitalize">{{ data.tanki.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="tanki.kapasitas" sortable style="width: 10%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Kapasitas</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.tanki.kapasitas).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="qty" sortable style="width: 10%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Stock</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.qty).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="space" sortable style="width: 10%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Space</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.space).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="umur" sortable style="width: 10%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Umur</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-end">
                                <span class="capitalize">{{ formatCurrency(Number(data.umur).toFixed(2)) }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="remarks" sortable style="width: 25%; font-size: 0.7vw">
                        <template #header>
                            <div class="flex w-full justify-center">
                                <span>Remark</span>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex w-full justify-start">
                                <span class="capitalize">{{ data.remarks }}</span>
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
                </DataTable> -->
            </template>
        </Card>
    </div>
</template>
