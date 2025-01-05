<script setup>
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Components
import GrossProfitDetailFinance from '@/views/dashboard/report/detailPage/components/financial/GrossProfitDetailFinance.vue';
import RevenueDetailFinance from '@/views/dashboard/report/detailPage/components/financial/RevenueDetailFinance.vue';

const route = useRoute();
const router = useRouter();
const routeName = ref('');

const toast = useToast();

const items = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            router.push('/fileupload');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/';
        }
    }
]);

onMounted(() => {
    funcCondition();
});

const funcCondition = () => {
    const query = route.query.component;
    if (query == null || query == '') {
        router.push({ path: '/not-found' });
    } else {
        routeName.value = query;
        console.log(query);
    }
};
</script>

<template>
    <div class="bg-black w-full min-h-[30rem] p-6 rounded-xl">
        <revenue-detail-finance v-if="routeName == 'revenue'" />
        <gross-profit-detail-finance v-if="routeName == 'gross-profit'" />
        <SpeedDial :model="items" :radius="120" type="quarter-circle" direction="up-left" :style="{ position: 'fixed', right: '3vw', bottom: '3vw' }" />
    </div>
</template>
