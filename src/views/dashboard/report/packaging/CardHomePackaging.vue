<script setup>
import LaporanPackaging from '@/views/dashboard/report/packaging/components/LaporanPackaging.vue';
import { defineProps } from 'vue';

const props = defineProps({
    laporanpackaging: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="w-full">
        <laporan-packaging :datas="laporanpackaging" />
    </div>
</template>
