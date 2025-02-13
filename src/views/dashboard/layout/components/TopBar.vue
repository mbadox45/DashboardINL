<script setup>
import mataUangKursController from '@/controller/getApiFromThisApp/kurs/mataUangKursController';
import pmgMasterController from '@/controller/getApiFromThisApp/master/pmgMasterController';
import packagingController from '@/controller/getApiFromThisApp/packaging/packagingController';
import moment from 'moment';
import { defineProps, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const icon = ref(null);
const showMenu = ref(true);
const visibleTop = ref(false);
const router = useRouter();
const route = useRoute();

const selectedRegion = ref(1);
const selectedMataUang = ref(1);
const selectedPackaging = ref(1);
const listPmg = ref([]);
const listMatauang = ref([]);
const listPackaging = ref([]);
const routeName = ref(route.name);

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let day = today.getDate();
const maxDate = ref(new Date());
const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
// const beforeDate = ref('2023-01-01');
// const now = ref('2024-01-31');
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);
const getToken = ref(localStorage.getItem('usertoken'));

const { onDateChange } = defineProps({
    onDateChange: Function // Make sure `onDateChange` is a function passed from the parent
});

onMounted(() => {
    maxDate.value.setDate(day);
    maxDate.value.setMonth(month);
    maxDate.value.setFullYear(year);
    loadData();
});

const loadData = async () => {
    const thisDateNow = moment().format('YYYY-MM-DD');
    const dateLocalStorage = localStorage.getItem('dateFilter');
    // console.log(dateLocalStorage);
    if (dateLocalStorage != null) {
        if (!moment(thisDateNow).isSame(moment(dateLocalStorage), 'day')) {
            localStorage.removeItem('formData');
            localStorage.setItem('dateFilter', thisDateNow);
            // console.log('Tanggal berbeda!');
        }
    } else {
        localStorage.setItem('dateFilter', thisDateNow);
    }

    const dataLocal = localStorage.getItem('formData');
    // console.log(dataLocal);
    if (dataLocal != null) {
        const parsedData = JSON.parse(dataLocal);
        selectedRegion.value = parsedData.pmg;
        selectedMataUang.value = parsedData.mataUang;
        selectedPackaging.value = parsedData.packaging;
        dates.value = [moment(parsedData.beforeDate).toDate(), moment(parsedData.now).toDate()];
    }

    await loadPmg();
    await loadCurrency();
    await loadPackaging();
    await tokenChecker();
};

const loadPmg = async () => {
    const response = await pmgMasterController.getAll();
    listPmg.value = response;
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

const loadPackaging = async () => {
    const response = await packagingController.getAll();
    listPackaging.value = response;
};

const test = () => {
    visibleTop.value = true;
};

const changeDate = () => {
    const list = dates.value;
    let start, end;
    const listdate = [];

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

    const form = {
        beforeDate: start,
        now: end,
        pmg: selectedRegion.value,
        mataUang: selectedMataUang.value,
        packaging: selectedPackaging.value
    };

    beforeDate.value = start;
    now.value = end;
    dates.value = listdate;

    // Check if onDateChange is a function before calling it
    if (typeof onDateChange === 'function') {
        localStorage.setItem('formData', JSON.stringify(form));
        onDateChange(form);
        loadData();
        visibleTop.value = false;
    } else {
        visibleTop.value = false;
        console.error('onDateChange is not a function or is undefined');
    }
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate();
    return date;
};

const goToLogin = () => {
    const token = getToken.value;
    if (token != null) {
        // window.location.replace(`${URL_WEB}dashboard`);
        router.push('/dashboard');
    } else {
        window.open('http://36.92.181.10:8585/', '_blank');
    }
};

const goBack = () => {
    router.back();
};

// Token Checker
const tokenChecker = async () => {
    const token = localStorage.getItem('usertoken');
    if (token != null) {
        const tokenData = parseJwt(token);
        const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds

        if (Date.now() > expirationTime) {
            // Token has expired, remove it from localStorage
            localStorage.removeItem('usertoken');
            localStorage.removeItem('payload');
            localStorage.removeItem('roles');
            console.log('expired');
            setTimeout(function () {
                router.push('/');
            }, 1000);
        }
        // else {
        //     console.log('Token activated');
        // }
    }
    // else {
    //     console.log('Nothing Token');
    // }
};

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
};
</script>

<template>
    <div class="relative text-white">
        <div class="justify-start px-4 fixed w-1/2 z-20">
            <button class="bg-amber-500 px-3 py-4 rounded-b-xl hover:bg-amber-600 transition-all duration-300" @click="test">
                <div class="p-1 bg-white rounded-lg animate-pulse">
                    <img src="/images/inl.png" alt="PT INL" width="60px" class="" />
                </div>
                <!-- <i ref="icon" :class="`pi ${showMenu == true ? 'pi-chevron-down' : 'pi-chevron-up'}`" style="font-size: 0.7vw"></i> -->
            </button>
        </div>
        <Drawer v-model:visible="visibleTop" class="!w-full md:!w-[30rem]" style="background-color: black; border: none">
            <template #header>
                <div class="flex flex-col text-white">
                    <span class="font-extrabold text-xl">INL EDGE</span>
                    <small class="text-[8px] uppercase text-gray-500 font-extrabold"> Empowering Decisions & Growth Excellence </small>
                </div>
            </template>
            <template #footer>
                <div class="flex flex-col gap-5">
                    <button
                        v-if="routeName == 'detail'"
                        @click="goBack"
                        class="pl-5 pr-10 hover:pr-5 py-3 border-2 w-full flex justify-between items-center gap-3 font-bold bg-amber-600 text-white rounded-full hover:bg-white hover:text-amber-600 uppercase shadow-none hover:shadow-sm shadow-gray-800 transition-all duration-300"
                    >
                        <span>Back</span>
                        <i class="pi pi-undo"></i>
                    </button>
                    <button
                        @click="goToLogin"
                        class="pl-5 pr-10 hover:pr-5 py-3 border-2 w-full flex justify-between items-center gap-3 font-bold bg-gray-950 text-white rounded-full hover:bg-white hover:text-black uppercase shadow-none hover:shadow-sm shadow-gray-800 transition-all duration-300"
                    >
                        <span v-if="getToken != null">Admin Dashboard</span>
                        <span v-else>Login</span>
                        <i class="pi pi-sign-in"></i>
                    </button>
                    <div class="flex gap-2 justify-center border-t-2 pt-3 text-white font-mono">
                        <span class="text-[0.7vw] text-teal-600 font-bold">Software Developer Team</span>
                        <span class="text-[0.7vw]">-</span>
                        <span class="text-[0.7vw]">PT Industri Nabati Lestari</span>
                    </div>
                </div>
            </template>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-2 border border-gray-900 p-4 rounded-xl">
                    <div class="flex flex-col gap-1">
                        <label for="PMG" class="text-[0.6vw]">Select by PMG</label>
                        <Select v-model="selectedRegion" :options="listPmg" optionLabel="nama" optionValue="id" placeholder="Pilih PMG" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="PMG" class="text-[0.6vw]">Select by Mata Uang</label>
                        <Select v-model="selectedMataUang" :options="listMatauang" optionLabel="name" optionValue="id" placeholder="Pilih Mata Uang" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="packaging" class="text-[0.6vw]">Select by Packaging</label>
                        <Select v-model="selectedPackaging" :options="listPackaging" optionLabel="nama" optionValue="id" placeholder="Pilih Packaging" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="PMG" class="text-[0.6vw]">Select by PMG</label>
                        <DatePicker v-model="dates" selectionMode="range" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" :maxDate="maxDate" placeholder="Select Date Range" class="w-full" style="background-color: black" />
                    </div>
                    <button class="w-full p-3 rounded-lg bg-white shadow-none hover:bg-gray-300 hover:shadow transition-all duration-700 text-black flex gap-3 items-center justify-center" @click="changeDate">
                        <i class="pi pi-search" style="font-size: 12px"></i>
                        <span class="text-[0.6vw] font-bold">Submit</span>
                    </button>
                </div>
            </div>
        </Drawer>
    </div>
</template>
