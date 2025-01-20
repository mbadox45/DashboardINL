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
                { label: 'Harga', icon: 'pi pi-truck', to: '/finance/harga' },
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
                { label: 'Profitability', icon: 'pi pi-chart-line', to: '/finance/profitability' }
            ]
        },
        {
            label: 'Operation',
            items: [
                {
                    label: 'Cost Production',
                    icon: 'pi pi-server',
                    items: [
                        { label: 'Beban Produksi', to: '/cost-prod/beban-prod' },
                        { label: 'Target Produksi', to: '/cost-prod/target-prod' }
                    ]
                },
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
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                        { label: 'Jenis Material', to: '/master/jenis-material' },
                        { label: 'Norma', to: '/operation/norma-material' },
                        { label: 'Laporan', to: '/operation/laporan-material' }
                    ]
                }
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
                { label: 'Produk', icon: 'pi pi-fw pi-building-columns', to: '/master/produk' },
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
                    icon: 'pi pi-fw pi-warehouse',
                    items: [
                        { label: 'Supplier', to: '/master/partner/supplier' }
                        // { label: 'Distributor', to: '/master/partner/distributor' }
                    ]
                }
            ]
        }
    ];
    return result;
};
