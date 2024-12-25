<script setup>
import { useLayout } from '@/views/dashboard/layout/components/layout';
import { onMounted } from 'vue';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();

onMounted(() => {
    toggleDarkMode();
});
</script>

<template>
    <div class="fixed flex justify-between gap-3 w-full px-10 py-4 bg-neutral-950 z-30 border-b-2 border-white">
        <div class="flex gap-8 items-center w-full">
            <router-link to="/" class="flex items-center gap-8">
                <img src="/images/inl.png" alt="PT INL" width="65px" />
                <div class="flex flex-col">
                    <span class="font-bold text-xl">INL EDGE</span>
                    <small class="text-xs uppercase text-gray-500 font-bold">Empowering Decisions & Growth Excellence</small>
                </div>
            </router-link>
        </div>

        <div class="flex">
            <button class="flex items-center justify-center w-[40px] h-[40px] bg-white text-black hover:rotate-180 hover:bg-transparent hover:text-white transition-all duration-700 rounded-full" @click="toggleMenu">
                <i class="pi pi-bars text-3xl font-bold"></i>
            </button>
            <!-- <div class="flex">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div> -->

            <!-- <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button> -->

            <!-- <div class="flex">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div> -->
        </div>
    </div>
</template>
