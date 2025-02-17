<script setup>
import { URL_WEB_Portal } from '@/api/http/dataVariable';
import verifyAuthController from '@/controller/getApiFromPortal/verifyAuthController';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const timeLoading = ref(3000);
const loadingPage = ref(true);
const statusCheck = ref('');
const statusCheck2 = ref('');

onMounted(() => {
    loadData();
});

const loadData = async () => {
    const token = route.query.token;

    if (token == null || token == '') {
        setTimeout(function () {
            window.close();
            loadings.value = false;
        }, time.value);
    } else {
        const tokenData = parseJwt(token);
        const expirationTime = tokenData.exp * 1000;
        if (Date.now() > expirationTime) {
            setTimeout(function () {
                loadingPage.value = false;
                // window.location.replace(`${URL_WEB_Portal}auth/login`);
                statusCheck2.value = 'Session anda berakhir, silahkan login kembali atau kembali ke halaman utama.';
                statusCheck.value = 'expired';
                // console.log('token expired');
            }, timeLoading.value);
        } else {
            const id = route.params.id;
            const tokens = localStorage.getItem('usertoken');
            console.log(tokens);
            if (tokens == null) {
                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const aksesApp = await verifyAuthController.getAkses(header);
                const cekAkses = aksesApp.find((item) => item.user_id == id);
                if (cekAkses != null) {
                    let roles;
                    if (cekAkses.level_akses >= 9) {
                        roles = 'allUser';
                    } else if (cekAkses.level_akses == 8) {
                        roles = 'finance';
                    } else if (cekAkses.level_akses == 7) {
                        roles = 'operation';
                    } else if (cekAkses.level_akses == 6) {
                        roles = 'sales';
                    } else if (cekAkses.level_akses == 5) {
                        roles = 'scm';
                    } else if (cekAkses.level_akses == 4) {
                        roles = 'sdm';
                    } else {
                        roles = 'viewer';
                    }

                    const user = cekAkses.user;
                    localStorage.setItem('roles', roles);
                    localStorage.setItem('usertoken', token);
                    localStorage.setItem('payload', JSON.stringify(user));
                    // Redirect to home
                    setTimeout(function () {
                        loadingPage.value = false;
                        statusCheck.value = 'masuk';
                        statusCheck2.value = 'Anda sudah bisa masuk ke INL Edge';
                        // console.log('Anda sudah bisa masuk ke INL Edge');
                    }, timeLoading.value);
                } else {
                    setTimeout(function () {
                        loadingPage.value = false;
                        statusCheck.value = 'gagal';
                        statusCheck2.value = 'Anda belum terdaftar di akses PortalApps';
                    }, timeLoading.value);
                    // console.log('Anda belum terdaftar di akses PortalApps');
                }
            } else {
                if (token == tokens) {
                    setTimeout(function () {
                        loadingPage.value = false;
                        statusCheck.value = 'masuk';
                        statusCheck2.value = 'Proses pengecekan berhasil, Silahkan tekan tombol di bawah untuk melanjutkan proses';
                        // console.log('Masih Bisa Masuk dengan Token Yang Sama');
                    }, timeLoading.value);
                } else {
                    setTimeout(function () {
                        loadingPage.value = false;
                        statusCheck.value = 'masuk';
                        statusCheck2.value = 'Proses pengecekan berhasil, Silahkan tekan tombol di bawah untuk melanjutkan proses';
                        // console.log('token sebelumnya :', tokens);
                        localStorage.setItem('usertoken', token);
                        // console.log('token up to date :', localStorage.getItem('usertoken'));
                        // console.log('Masih Bisa Masuk dengan Token Berbeda');
                    }, timeLoading.value);
                }
            }
        }
    }
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

const actionButton = () => {
    if (statusCheck.value == 'masuk') {
        router.push('/dashboard');
        // window.location.replace(`${URL_WEB}dashboard`);
    } else if (statusCheck.value == 'expired') {
        window.location.replace(`${URL_WEB_Portal}`);
    } else {
        window.close();
    }
};
</script>
<template>
    <div class="relative w-full h-screen flex flex-col gap-2 items-center justify-center">
        <div class="w-full flex flex-col items-center gap-1">
            <div class="flex gap-5">
                <ProgressSpinner v-if="loadingPage == true" />
                <div v-else>
                    <i class="pi pi-check-circle text-emerald-500 py-1" style="font-size: 5.5vw" v-if="statusCheck == 'masuk'"></i>
                    <i class="pi pi-times-circle text-red-500 py-1" style="font-size: 5.5vw" v-else></i>
                </div>
            </div>
            <div class="flex gap-5">
                <span class="text-[2vw] font-bold text-amber-600" v-if="loadingPage == true">Check Verification...</span>
                <div v-else>
                    <span class="text-[2vw] font-bold text-emerald-600" v-if="statusCheck == 'masuk'">Check Successful</span>
                    <span class="text-[2vw] font-bold text-red-600" v-else>Check Failed</span>
                </div>
            </div>
            <span class="py-2 px-3 bg-neutral-300 rounded-xl font-mono" v-if="loadingPage == false">{{ statusCheck2 }}</span>
            <div class="mt-3" v-if="loadingPage == false">
                <button v-if="statusCheck == 'masuk'" @click="actionButton" class="px-6 py-2 text-[1vw] bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">Go to Link</button>
                <div v-else-if="statusCheck == 'expired'" class="flex gap-3 items-center">
                    <button
                        @click="
                            () => {
                                router.push('/');
                            }
                        "
                        class="px-6 py-2 text-[1vw] bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        Go to Home
                    </button>
                    <button @click="actionButton" class="px-6 py-2 text-[1vw] bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">Go to PortalApps</button>
                </div>
                <button v-else @click="actionButton" class="px-6 py-2 text-[1vw] bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">Close this page</button>
            </div>
        </div>
        <div class="absolute bottom-0 w-full flex justify-center py-5 border-t-2">
            <span class="font-bold flex flex-col items-center"><span class="text-amber-600 text-[0.8vw] uppercase">Dashboard INL Edge</span><span class="text-gray-400">PT Industri Nabati Lestari</span></span>
        </div>
    </div>
</template>
