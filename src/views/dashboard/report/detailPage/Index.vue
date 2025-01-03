<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Components
import GrossProfitDetailFinance from '@/views/dashboard/report/detailPage/components/financial/GrossProfitDetailFinance.vue';
import RevenueDetailFinance from '@/views/dashboard/report/detailPage/components/financial/RevenueDetailFinance.vue';

const route = useRoute();
const router = useRouter();
const routeName = ref('');

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
        <gross-profit-detail-finance v-else />
    </div>
</template>
