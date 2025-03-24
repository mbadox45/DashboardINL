export default new (class dataMenu {
    home = () => {
        return {
            label: 'Home',
            items: [
                { label: 'Main Dashboard', icon: 'pi pi-fw pi-objects-column', to: '/' },
                { label: 'Home', icon: 'pi pi-fw pi-home', to: '/dashboard' }
            ]
        };
    };
    direksi = () => {
        return {
            label: 'Direksi',
            items: [
                { label: 'Simulation Calculator', icon: 'pi pi-fw pi-calculator', to: '/director/simulation-calculator' },
                {
                    label: 'Master',
                    icon: 'pi pi-fw pi-table',
                    items: [
                        { label: 'Cost', to: '/director/master/cost' },
                        { label: 'Pengali', to: '/director/master/pengali' },
                        { label: 'Utilisasi', to: '/director/master/utilisasi' },
                        { label: 'DMO', to: '/director/master/dmo' }
                    ]
                }
            ]
        };
    };
    finance = () => {
        return {
            label: 'Finance',
            items: [
                {
                    label: 'Kurs',
                    icon: 'pi pi-arrow-right-arrow-left',
                    items: [
                        { label: 'Mata Uang', to: '/finance/kurs/mata-uang' },
                        { label: 'Kurs', to: '/finance/kurs' }
                    ]
                },
                { label: 'CPO KPBN', icon: 'pi pi-chart-bar', to: '/finance/cpo-kpbn' },
                {
                    label: 'Harga Inventory',
                    icon: 'pi pi-tags',
                    to: '/finance/harga/inventory'
                },
                {
                    label: 'Cash Flow Movement',
                    icon: 'pi pi-dollar',
                    items: [
                        { label: 'Cash Flow Movement & Cash Balance', to: '/finance/cash-flow-movement' },
                        { label: 'Kategori', to: '/finance/cash-flow-movement/kategori' }
                    ]
                },
                {
                    label: 'Cash Flow Schedule',
                    icon: 'pi pi-calendar-clock',
                    items: [
                        { label: 'Cash Flow Schedule', to: '/finance/cash-flow-schedule' },
                        { label: 'Kategori', to: '/finance/cash-flow-schedule/kategori' },
                        { label: 'Pay Status', to: '/finance/cash-flow-schedule/pay-status' }
                    ]
                },
                { label: 'Profitability', icon: 'pi pi-chart-line', to: '/finance/profitability' },
                {
                    label: 'Beban Produksi',
                    icon: 'pi pi pi-receipt',
                    items: [
                        { label: 'Uraian Beban Produksi', to: '/master/uraian/beban-produksi' },
                        { label: 'Beban Produksi', to: '/cost-prod/beban-prod' }
                    ]
                }
            ]
        };
    };
    operation = () => {
        return {
            label: 'Operation',
            items: [
                {
                    label: 'Target Produksi',
                    icon: 'pi pi-fw pi-bullseye',
                    items: [
                        { label: 'Uraian Target Produksi', to: '/master/uraian/target-produksi' },
                        { label: 'Target Produksi', to: '/cost-prod/target-prod' }
                    ]
                },
                {
                    label: 'Laporan Produksi',
                    icon: 'pi pi-fw pi-cog',
                    items: [
                        { label: 'Jenis Laporan', to: '/master/jenis-produksi' },
                        { label: 'Laporan', to: '/operation/laporan-produksi' }
                    ]
                },
                {
                    label: 'Laporan Material',
                    icon: 'pi pi-fw pi-list-check',
                    items: [
                        { label: 'Jenis Laporan', to: '/master/jenis-material' },
                        { label: 'Norma Material', to: '/operation/norma-material' },
                        { label: 'Laporan', to: '/operation/laporan-material' }
                    ]
                },
                {
                    label: 'Target Packaging',
                    icon: 'pi pi-fw pi-bullseye',
                    items: [
                        { label: 'Uraian Target Packaging', to: '/operation/packaging/uraian-target' },
                        { label: 'Target Packaging', to: '/operation/packaging/target' }
                    ]
                },
                {
                    label: 'Laporan Packaging',
                    icon: 'pi pi-fw pi-box',
                    items: [
                        { label: 'Jenis Laporan', to: '/operation/packaging/jenis-laporan' },
                        { label: 'Laporan', to: '/operation/packaging/laporan-packaging' }
                    ]
                }
            ]
        };
    };
    sales = () => {
        return {
            label: 'Sales',
            items: [
                {
                    label: 'Harga Spot',
                    icon: 'pi pi-tags',
                    to: '/finance/harga/spot'
                },
                {
                    label: 'Target Penjualan',
                    icon: 'pi pi-fw pi-bullseye',
                    items: [
                        { label: 'Uraian Target Penjualan', to: '/sales/uraian-target-penjualan' },
                        { label: 'Target Penjualan', to: '/sales/target-penjualan' }
                    ]
                },
                { label: 'Laporan Penjualan', icon: 'pi pi-fw pi-shop', to: '/sales/laporan-penjualan' },
                { label: 'Levy Duty & M. Routers', icon: 'pi pi-fw pi-shopping-bag', to: '/sales/levy-duty-proportion-cost' }
            ]
        };
    };
    sourcing = () => {
        return {
            label: 'Sourcing CPO',
            items: [
                { icon: 'pi pi-fw pi-asterisk', label: 'Source CPO', to: '/scm/source-cpo' },
                { icon: 'pi pi-fw pi-bullseye', label: 'Target Incoming CPO', to: '/scm/target-incoming' },
                { icon: 'pi pi-fw pi-arrow-down-right', label: 'Incoming CPO', to: '/scm/incoming-cpo' },
                { icon: 'pi pi-fw pi-arrow-up-right', label: 'Outstanding CPO', to: '/scm/outstanding-cpo' }
            ]
        };
    };
    scm = () => {
        return {
            label: 'Supply Chain',
            items: [
                // {
                //     label: 'CPO',
                //     icon: 'pi pi-fw pi-bullseye',
                //     items: [
                //         { label: 'Source CPO', to: '/scm/source-cpo' },
                //         { label: 'Target Incoming CPO', to: '/scm/target-incoming' },
                //         { label: 'Incoming CPO', to: '/scm/incoming-cpo' },
                //         { label: 'Outstanding CPO', to: '/scm/outstanding-cpo' }
                //     ]
                // },
                { label: 'Saldo PE', icon: 'pi pi-fw pi-arrow-down-left-and-arrow-up-right-to-center', to: '/scm/saldo-pe' },
                {
                    label: 'Stok',
                    icon: 'pi pi-fw pi-warehouse',
                    items: [
                        { label: 'CPO', to: '/scm/stock/cpo' },
                        { label: 'Bulk', to: '/scm/stock/bulk' },
                        { label: 'Retail', to: '/scm/stock/retail' }
                    ]
                }
            ]
        };
    };
    sdm = () => {
        return {
            label: 'SDM',
            items: [
                { label: 'Uraian', icon: 'pi pi-fw pi-bookmark-fill', to: '/sdm/uraian' },
                { label: 'Data SDM', icon: 'pi pi-fw pi-user', to: '/sdm/data-sdm' }
            ]
        };
    };
    master = () => {
        return {
            label: 'Master',
            items: [
                { label: 'PMG Master', icon: 'pi pi-fw pi-building', to: '/master/pmg' },
                { label: 'Packaging Master', icon: 'pi pi-fw pi-warehouse', to: '/operation/packaging' },
                { label: 'Produk', icon: 'pi pi-fw pi-box', to: '/master/produk' },
                { label: 'Stok Penyimpanan', icon: 'pi pi-fw pi-database', to: '/master/produk-storage' },
                {
                    label: 'Partner',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        { label: 'Supplier', to: '/master/partner/supplier' },
                        { label: 'Customer', to: '/master/partner/customer' }
                    ]
                },
                { label: 'Lokasi', icon: 'pi pi-fw pi-map-marker', to: '/master/lokasi' }
            ]
        };
    };
})();
