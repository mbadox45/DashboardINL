<script setup>
import moment from 'moment';
import { ref } from 'vue';

const beforeDate = ref(moment().format('YYYY-MM-01'));
const now = ref(moment().format('YYYY-MM-DD'));
const dates = ref([moment(beforeDate.value).toDate(), moment(now.value).toDate()]);

const changeDate = () => {
    const list = dates.value;
    const listdate = [];
    let start, end;

    if (list != null) {
        if (list.length > 1) {
            start = moment(list[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
            end = moment(list[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
        } else {
            start = beforeDate.value;
            end = now.value;
        }
    } else {
        start = beforeDate.value;
        end = now.value;
    }
    listdate.push(convertDate(start), convertDate(end));
    console.log(listdate);
};

const convertDate = (dateString) => {
    const date = moment(dateString).toDate(); // Konversi ke objek Date
    return date; // Formatkan menjadi string sesuai permintaan
};
</script>

<template>
    <div class="flex gap-4 w-full">
        <div class="grid grid-cols-5 gap-4 w-full">
            <div class="col-span-2">
                <div class="flex gap-7 rounded-xl p-5 border-[2px] border-yellow-500 shadow-2xl items-center">
                    <div class="flex flex-col gap-3 w-full">
                        <span class="text-2xl uppercase font-bold">Executive Dashboard</span>
                        <span class="font-bold uppercase text-gray-400 text-sm">PT Industri Nabati Lestari</span>
                        <div class="flex gap-3 w-full mt-5">
                            <DatePicker v-model="dates" selectionMode="multiple" showIcon iconDisplay="input" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Please input periode" class="w-full" />
                            <Button label="Change" @click="changeDate" />
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <Image src="/images/inl.png" alt="Image" width="250" />
                    </div>
                </div>
            </div>
            <div class="col-span-3 bg-red-200 rounded-xl p-3 shadow-2xl">
                <span>Test</span>
            </div>
        </div>
    </div>
</template>
