export const menuAllAccess = () => {
    const result = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
        },
        {
            label: 'Finance',
            items: [
                {
                    label: 'Cash Flow Movement',
                    icon: 'pi pi-dollar',
                    items: [
                        { label: 'Cash Flow Schedule', to: '/finance/cash-flow-movement' },
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
                }
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
                        { label: 'Master', to: '/master/jenis-produksi' },
                        { label: 'Laporan', to: '/operation/laporan-produksi' }
                    ]
                },
                { label: 'Pemakaian Material', icon: 'pi pi-fw pi-inbox', to: '/operation/pemakaian-material' }
            ]
        },
        {
            label: 'Master',
            items: [
                { label: 'PMG Master', icon: 'pi pi-fw pi-building-columns', to: '/master/pmg' },
                {
                    label: 'Uraian Master',
                    icon: 'pi pi-fw pi-hammer',
                    items: [
                        { label: 'Beban Produksi', to: '/master/uraian/beban-produksi' },
                        { label: 'Target Produksi', to: '/master/uraian/target-produksi' }
                    ]
                },
                { label: 'Jenis Material', icon: 'pi pi-fw pi-box', to: '/master/jenis-material' }
            ]
        }
    ];
    return result;
};
