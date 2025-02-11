<script setup>
import ActualIncomingSupplyChain from '@/views/dashboard/report/scm/components/ActualIncomingSupplyChain.vue';
import OutstandingSupplyChain from '@/views/dashboard/report/scm/components/OutstandingSupplyChain.vue';
import SaldoPeSupplyChain from '@/views/dashboard/report/scm/components/SaldoPeSupplyChain.vue';
import StokBulkSupplyChain from '@/views/dashboard/report/scm/components/StokBulkSupplyChain.vue';
import StokCpoSupplyChain from '@/views/dashboard/report/scm/components/StokCpoSupplyChain.vue';
import StokRitelSupplyChain from '@/views/dashboard/report/scm/components/StokRitelSupplyChain.vue';
import { defineProps } from 'vue';

const props = defineProps({
    stokbulk: {
        type: Object,
        default: () => ({})
    },
    stokritel: {
        type: Object,
        default: () => ({})
    },
    actualincoming: {
        type: Object,
        default: () => ({})
    },
    outstanding: {
        type: Object,
        default: () => ({})
    },
    saldope: {
        type: Object,
        default: () => ({})
    },
    stokcpo: {
        type: Object,
        default: () => ({})
    },
    formPush: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <stok-cpo-supply-chain :datas="stokcpo" :formPush="formPush" />
        <stok-bulk-supply-chain :datas="stokbulk" :formPush="formPush" />
        <stok-ritel-supply-chain :datas="stokritel" :formPush="formPush" />
        <actual-incoming-supply-chain :datas="actualincoming" :formPush="formPush" />
        <outstanding-supply-chain :datas="outstanding" :formPush="formPush" />
        <saldo-pe-supply-chain :datas="saldope" :formPush="formPush" />
    </div>
</template>
