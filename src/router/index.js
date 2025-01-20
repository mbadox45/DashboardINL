// import AppLayout from '@/layout/AppLayout.vue';
import AppLayouts from '@/views/dashboard/layout/Index.vue';
import DashManagement from '@/views/dashboardManagement/layout/Index.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayouts,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/dashboard/report/home/Index.vue')
                }
            ]
        },
        {
            path: '/detail-dashboard',
            name: 'detail',
            component: () => import('@/views/dashboard/report/detailPage/Index.vue')
            // meta: {
            //     guestOnly: true
            // }
        },
        {
            path: '/',
            component: DashManagement,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/dashboardManagement/home/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true
                    }
                },
                // Finance
                {
                    path: '/finance/kurs',
                    name: 'kurs',
                    component: () => import('@/views/dashboardManagement/finance/kurs/kurs/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/kurs/mata-uang',
                    name: 'kurs-mata-uang',
                    component: () => import('@/views/dashboardManagement/finance/kurs/mataUangKurs/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-movement',
                    name: 'cost-flow-movement',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowMovement/cashFlowMovement/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-movement/kategori',
                    name: 'cost-flow-movement-kategori',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowMovement/kategori/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-schedule',
                    name: 'cost-flow-schedule',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowSchedule/cashFlow/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-schedule/kategori',
                    name: 'cost-flow-schedule-kategori',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowSchedule/kategori/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-schedule/pay-status',
                    name: 'cost-flow-schedule-pay-status',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowSchedule/payStatus/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/profitability',
                    name: 'profitability',
                    component: () => import('@/views/dashboardManagement/finance/profitability/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cpo-kpbn',
                    name: 'cpo-kpbn',
                    component: () => import('@/views/dashboardManagement/finance/cpoKpbn/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                // Operation
                {
                    path: '/cost-prod/beban-prod',
                    name: 'cost-beban-prod',
                    component: () => import('@/views/dashboardManagement/costProduction/bebanProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/cost-prod/target-prod',
                    name: 'cost-target-prod',
                    component: () => import('@/views/dashboardManagement/costProduction/targetProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/laporan-produksi',
                    name: 'laporan-produksi',
                    component: () => import('@/views/dashboardManagement/operation/laporanProduksi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/laporan-produksi/create',
                    name: 'laporan-produksi-create',
                    component: () => import('@/views/dashboardManagement/operation/laporanProduksi/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/jenis-produksi',
                    name: 'jenis-produksi',
                    component: () => import('@/views/dashboardManagement/operation/jenisLaporanProduksi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/jenis-material',
                    name: 'jenis-material',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/jenisMaterial/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/norma-material',
                    name: 'norma-material',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/normaMaterial/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/norma-material/create',
                    name: 'norma-material-create',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/normaMaterial/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/laporan-material',
                    name: 'laporan-material',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/laporanMaterial/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },

                // Supply Chain
                {
                    path: '/scm/source-cpo',
                    name: 'source-cpo',
                    component: () => import('@/views/dashboardManagement/supplyChain/sourceCpo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/target-incoming',
                    name: 'target-incoming',
                    component: () => import('@/views/dashboardManagement/supplyChain/targetIncoming/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/incoming-cpo',
                    name: 'incoming-cpo',
                    component: () => import('@/views/dashboardManagement/supplyChain/incomingCpo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/saldo-pe',
                    name: 'saldo-pe',
                    component: () => import('@/views/dashboardManagement/supplyChain/saldoPe/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/outstanding-cpo',
                    name: 'outstanding-cpo',
                    component: () => import('@/views/dashboardManagement/supplyChain/outstandingCpo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },

                // Master Data
                {
                    path: '/master/produk',
                    name: 'produk',
                    component: () => import('@/views/dashboardManagement/masterPage/produk/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                        // finance: true,
                        // operation: true,
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/lokasi',
                    name: 'lokasi',
                    component: () => import('@/views/dashboardManagement/masterPage/lokasi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                        // finance: true,
                        // operation: true,
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/pmg',
                    name: 'pmg',
                    component: () => import('@/views/dashboardManagement/masterPage/pmg/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                        // finance: true,
                        // operation: true,
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/uraian/beban-produksi',
                    name: 'uraian-beban-produksi',
                    component: () => import('@/views/dashboardManagement/masterPage/uraianBebanProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                        // finance: true,
                        // operation: true,
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/uraian/target-produksi',
                    name: 'uraian-target-produksi',
                    component: () => import('@/views/dashboardManagement/masterPage/uraianTargetProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                        // finance: true,
                        // operation: true,
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/partner/supplier',
                    name: 'partner-supplier',
                    component: () => import('@/views/dashboardManagement/masterPage/partner/supplier/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                        // finance: true,
                        // operation: true,
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                }
                // {
                //     path: '/master/partner/distributor',
                //     name: 'partner-distributor',
                //     component: () => import('@/views/dashboardManagement/masterPage/partner/distributor/Index.vue'),
                //     meta: {
                //         requiresAuth: true,
                //         allUser: true
                //         // finance: true,
                //         // operation: true,
                //         // sales: true,
                //         // scm: true,
                //         // sdm: true
                //     }
                // }
            ]
        },
        {
            path: '/verify/:id',
            name: 'verify',
            component: () => import('@/views/dashboardManagement/auth/Verify.vue'),
            meta: {
                guestOnly: true
            }
        },
        {
            path: '/tester',
            name: 'tester',
            component: () => import('@/views/dashboard/notfound/TestPage..vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound404',
            component: () => import('@/views/dashboard/notfound/NotFound.vue')
        }
        // {
        //     path: '/landing',
        //     name: 'landing',
        //     component: () => import('@/views/pages/Landing.vue')
        // },
        // {
        //     path: '/pages/notfound',
        //     name: 'notfound',
        //     component: () => import('@/views/pages/NotFound.vue')
        // },

        // {
        //     path: '/auth/login',
        //     name: 'login',
        //     component: () => import('@/views/pages/auth/Login.vue')
        // },
        // {
        //     path: '/auth/access',
        //     name: 'accessDenied',
        //     component: () => import('@/views/pages/auth/Access.vue')
        // },
        // {
        //     path: '/auth/error',
        //     name: 'error',
        //     component: () => import('@/views/pages/auth/Error.vue')
        // }
    ]
});

router.beforeEach((to, from, next) => {
    const tokens = localStorage.getItem('usertoken') != null;
    const roles = localStorage.getItem('roles');
    // console.log(roles);

    if (to.matched.some((route) => route.meta.requiresAuth)) {
        if (tokens) {
            if (roles == 'allUser') {
                if (to.matched.some((route) => route.meta.allUser)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'finance') {
                if (to.matched.some((route) => route.meta.finance)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'operation') {
                if (to.matched.some((route) => route.meta.operation)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'sales') {
                if (to.matched.some((route) => route.meta.sales)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'scm') {
                if (to.matched.some((route) => route.meta.scm)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else {
                if (to.matched.some((route) => route.meta.sdm)) {
                    next();
                } else {
                    next('/dashboard');
                }
            }
        } else {
            next('/');
        }
    } else if (to.matched.some((route) => route.meta.guestOnly)) {
        if (tokens) {
            if (roles == 'allUser') {
                next('/dashboard');
            } else if (roles == 'finance') {
                next('/dashboard');
            } else if (roles == 'logistik') {
                next('/dashboard');
            } else if (roles == 'operation') {
                next('/dashboard');
            } else if (roles == 'sales') {
                next('/dashboard');
            } else {
                next('/dashboard');
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
