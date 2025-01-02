<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
    funcCondition();
});

const funcCondition = () => {
    const query = route.query.component;
    if (query == null || query == '') {
        router.push({ path: '/not-found' });
    } else {
        console.log(query);
    }
};
</script>

<template>
    <div class="bg-black w-full min-h-[30rem] rounded-xl"></div>
</template>
