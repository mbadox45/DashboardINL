export const menuAllAccess = () => {
    const result = [
        {
            label: 'Home',
            items: [
                { label: 'Main Dashboard', icon: 'pi pi-fw pi-objects-column', to: '/' },
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }
            ]
        },
        {
            label: 'Finance',
            items: [
                {
                    label: 'Kurs',
                    icon: 'pi pi-euro',
                    items: [
                        { label: 'Kurs', to: '/finance/kurs' },
                        { label: 'Mata Uang', to: '/finance/kurs/mata-uang' }
                    ]
                },
                { label: 'CPO KPBN', icon: 'pi pi-truck', to: '/finance/cpo-kpbn' },
                { label: 'Harga', icon: 'pi pi-ticket', to: '/finance/harga' },
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
                    icon: 'pi pi-hourglass',
                    items: [
                        { label: 'Cash Flow Schedule', to: '/finance/cash-flow-schedule' },
                        { label: 'Kategori', to: '/finance/cash-flow-schedule/kategori' },
                        { label: 'Pay Status', to: '/finance/cash-flow-schedule/pay-status' }
                    ]
                },
                { label: 'Profitability', icon: 'pi pi-chart-line', to: '/finance/profitability' },
                { label: 'Beban Produksi', icon: 'pi pi-bullseye', to: '/cost-prod/beban-prod' }
            ]
        },
        {
            label: 'Operation',
            items: [
                { label: 'Target Produksi', icon: 'pi pi-server', to: '/cost-prod/target-prod' },
                {
                    label: 'Laporan Produksi',
                    icon: 'pi pi-fw pi-id-card',
                    items: [
                        { label: 'Jenis Produksi', to: '/master/jenis-produksi' },
                        { label: 'Laporan', to: '/operation/laporan-produksi' }
                    ]
                },
                {
                    label: 'Laporan Material',
                    icon: 'pi pi-fw pi-building',
                    items: [
                        { label: 'Jenis Material', to: '/master/jenis-material' },
                        { label: 'Norma', to: '/operation/norma-material' },
                        { label: 'Laporan', to: '/operation/laporan-material' }
                    ]
                },
                {
                    label: 'Packaging',
                    icon: 'pi pi-fw pi-box',
                    items: [
                        { label: 'Packaging', to: '/operation/packaging' },
                        { label: 'Uraian Target Packaging', to: '/operation/packaging/uraian-target' },
                        { label: 'Target Packaging', to: '/operation/packaging/target' },
                        { label: 'Jenis Laporan', to: '/operation/packaging/jenis-laporan' },
                        { label: 'Laporan Packaging', to: '/operation/packaging/laporan-packaging' }
                    ]
                }
            ]
        },
        {
            label: 'Sales',
            items: [
                { label: 'Uraian Target Penjualan', icon: 'pi pi-fw pi-list-check', to: '/sales/uraian-target-penjualan' },
                { label: 'Target Penjualan', icon: 'pi pi-fw pi-lightbulb', to: '/sales/target-penjualan' },
                { label: 'Laporan Penjualan', icon: 'pi pi-fw pi-gauge', to: '/sales/laporan-penjualan' },
                { label: 'Levy Duty & M. Routers', icon: 'pi pi-fw pi-briefcase', to: '/sales/levy-duty-proportion-cost' }
            ]
        },
        {
            label: 'Supply Chain',
            items: [
                { label: 'Source CPO', icon: 'pi pi-fw pi-building-columns', to: '/scm/source-cpo' },
                { label: 'Target Incoming', icon: 'pi pi-fw pi-thumbtack', to: '/scm/target-incoming' },
                { label: 'Incoming CPO', icon: 'pi pi-fw pi-tag', to: '/scm/incoming-cpo' },
                { label: 'Saldo PE', icon: 'pi pi-fw pi-shop', to: '/scm/saldo-pe' },
                { label: 'Outstanding CPO', icon: 'pi pi-fw pi-cart-arrow-down', to: '/scm/outstanding-cpo' },
                {
                    label: 'Stock',
                    icon: 'pi pi-fw pi-warehouse',
                    items: [
                        { label: 'CPO', to: '/scm/stock/cpo' },
                        { label: 'Bulk', to: '/scm/stock/bulk' },
                        { label: 'Retail', to: '/scm/stock/retail' }
                    ]
                }
            ]
        },
        {
            label: 'Master',
            items: [
                { label: 'PMG Master', icon: 'pi pi-fw pi-building-columns', to: '/master/pmg' },
                {
                    label: 'Produk',
                    icon: 'pi pi-fw pi-book',
                    items: [
                        { label: 'Produk', to: '/master/produk' },
                        { label: 'Produk Storage', to: '/master/produk-storage' }
                    ]
                },
                {
                    label: 'Uraian Master',
                    icon: 'pi pi-fw pi-hammer',
                    items: [
                        { label: 'Beban Produksi', to: '/master/uraian/beban-produksi' },
                        { label: 'Target Produksi', to: '/master/uraian/target-produksi' }
                    ]
                },
                { label: 'Lokasi', icon: 'pi pi-fw pi-map-marker', to: '/master/lokasi' },
                {
                    label: 'Partner',
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                        { label: 'Supplier', to: '/master/partner/supplier' },
                        { label: 'Customer', to: '/master/partner/customer' }
                    ]
                }
            ]
        }
    ];
    return result;
};
