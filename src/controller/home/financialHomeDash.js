export default new (class FinancialHomeDashboard {
    cardFinancial() {
        const list = [
            {
                name: 'Revenue (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-red-500">
                    <span class="font-bold text-2xl">${30}%</span>
                </div>`,
                // 0-35 red 36-70 amber 71-100 green
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <span class="text-red-600 font-bold">Pendapatan : 60</span>
                <span class="text-amber-600 font-bold">RKAP December 2024 : 200</span>
                </div>`,
                color: 'text-red-500',
                icon: '/images/icon/financial/revenue.png',
                link: '/test'
            },
            {
                name: 'Gross Profit Margin (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-amber-500">
                    <span class="font-bold text-2xl">${79.5} (YTD)</span>
                </div>`,
                // Buat Pengecekan Untuk Perbandingan Dengan Data Sebelumnya, Untuk Ganti Warna & Icon
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-green-600"><i class="pi pi-sort-up-fill"></i><span class="font-bold">Laba Kotor : 11.8</span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold">GPM : 4.85 %</span></div>
                </div>`,
                color: 'text-amber-500',
                icon: '/images/icon/financial/gross-profit.png',
                link: '/test'
            },
            {
                name: 'EBITDA Margin (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-amber-500">
                    <span class="font-bold text-2xl">${16.82} (YTD)</span>
                </div>`,
                // Jika nilai sekarang > nilai bulan lalu,  warna jadi green 600 dan icon up, kalo sama jadi warna amber icon strip
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>EBITDA</span> <span>: </span><span>6.59</span></span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>EBITDA (%)</span> <span>: </span><span>2.71%</span></span></div>
                </div>`,
                color: 'text-amber-500',
                icon: '/images/icon/financial/ebitda.png',
                link: '/test'
            },
            {
                name: 'NET Profit Margin (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-red-500">
                    <span class="font-bold text-2xl">${-23.34} (YTD)</span>
                </div>`,
                // Jika nilai positif warna jadi green 600 dan icon up
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>Laba Bersih</span> <span>: </span><span>-9.16</span></span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>NPM (%)</span> <span>: </span><span>-0.05%</span></span></div>
                </div>`,
                color: 'text-red-500',
                icon: '/images/icon/financial/net-profit.png',
                link: '/test'
            },
            {
                name: 'Cash Balance (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-green-500">
                <span class="font-bold text-2xl">${535}</span>
                <i class="pi pi-sort-up-fill" style="font-size:15px;" />
                </div>`,
                //sesuaikan periode
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <span class="text-cyan-500 font-bold">December 2024</span>
                </div>`,
                //ganti warna red 500 jika nilai sekarang < dari nilai bulan sebelumnya, kalo sama warna amber, tambahin icon up atau icon strip
                color: 'text-green-500',
                icon: '/images/icon/financial/balance.png',
                link: '/test'
            },
            {
                name: 'Cash Flow Movement (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-green-500">
                    <span class="font-bold text-2xl">${185.17}</span>
                </div>`,
                versus: `<div class="text-xs flex gap-3 w-full mt-3">
                    <div class="flex flex-col w-full">
                        <div class="flex gap-1 text-green-600 w-full">
                            <i class="pi pi-sort-up-fill"></i>
                            <div class="font-bold flex w-full">
                                <span class="w-full">CFO in</span>
                                <div class="w-full flex gap-2"><span class="">:</span><span class="">457.8</span></div>
                            </div>
                        </div>
                        <div class="flex gap-1 text-red-600 w-full">
                            <i class="pi pi-sort-down-fill"></i>
                            <div class="font-bold flex w-full">
                                <span class="w-full">CFO Out</span>
                                <div class="w-full flex gap-2"><span class="">:</span><span class="">-164.38</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <div class="flex gap-1 text-red-600 w-full">
                            <i class="pi pi-sort-down-fill"></i>
                            <div class="font-bold flex w-full">
                                <span class="w-1/2">CFI</span>
                                <div class="w-full flex gap-2"><span class="">:</span><span class="">-93.86</span></div>
                            </div>
                        </div>
                        <div class="flex gap-1 text-red-600 w-full">
                            <i class="pi pi-sort-down-fill"></i>
                            <div class="font-bold flex w-full">
                                <span class="w-1/2">CFF</span>
                                <div class="w-full flex gap-2"><span class="">:</span><span class="">-14.39</span></div>
                            </div>
                        </div>
                    </div>
                </div>`,
                //ganti warna red 500 jika nilai minus
                color: 'text-green-500',
                icon: null,
                link: '/test'
            },
            {
                name: 'CFI Pay Schedule (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-amber-500">
                    <span class="font-bold text-2xl">${134.87}</span>
                </div>`,
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <table class="text-amber-600 mb-2">
                    <thead>
                        <tr style="font-size:9px">
                            <th class="border border-black bg-black py-1 px-1 text-left">Kontraktor EPC PMG-2 by ETI</th>
                            <th class="border border-black py-1">47.97</th>
                            <th class="border border-black py-1 text-cyan-500">Desember 2024</th>
                        </tr>
                        <tr style="font-size:9px">
                            <th class="border border-black bg-black py-1 px-1 text-left">Pekerjaan Bangunan Perusahaan</th>
                            <th class="border border-black py-1">5</th>
                            <th class="border border-black py-1 text-cyan-500">Desember 2024</th>
                        </tr>
                        <tr style="font-size:9px">
                            <th class="border border-black bg-black py-1 px-1 text-left">Licensor Biodiesel by Desment Tech..</th>
                            <th class="border border-black py-1">81.9</th>
                            <th class="border border-black py-1 text-cyan-500">Desember 2024</th>
                        </tr>
                    </thead>
                </table>
                </div>`,
                color: 'text-amber-500',
                icon: null,
                link: '/test'
            },
            {
                name: 'CFF Pay Schedule (in IDR BN)',
                value: `<div class="flex gap-2 items-center text-amber-500">
                <span class="font-bold text-2xl">${14.2}</span>
                <i class="pi pi-sort" style="font-size:15px;" />
                </div>`,
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <span class="text-cyan-500 font-bold">December 2024</span>
                </div>`,
                //ganti warna red 500 jika nilai sekarang < dari nilai bulan sebelumnya, kalo sama warna amber, tambahin icon up atau icon strip
                color: 'text-amber-500',
                icon: '/images/icon/financial/loan-payment.png',
                link: '/test'
            }
        ];
        return list;
    }
    cardOperational() {
        const list = [
            {
                name: 'Revenue (in IDR BN)',
                value: '30%',
                // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <span class="text-red-600 font-bold">Pendapatan : 30</span>
                <span class="text-amber-600 font-bold">RKAP December 2024 : 100</span>
                </div>`,
                color: 'text-red-500',
                link: '/test'
            },
            {
                name: 'Gross Profit Margin (in IDR BN)',
                value: '79.5 (YTD)',
                // Buat Pengecekan Untuk Perbandingan Dengan Data Sebelumnya, Untuk Ganti Warna & Icon
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-green-600"><i class="pi pi-sort-up-fill"></i><span class="font-bold">Laba Kotor : 11.8</span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold">GPM : 4.85 %</span></div>
                </div>`,
                color: 'text-amber-500',
                link: '/test'
            },
            {
                name: 'EBITDA Margin (in IDR BN)',
                value: '16.82 (YTD)',
                // Jika nilai sekarang > nilai bulan lalu, warna jadi green 600 dan icon up
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>EBITDA</span> <span>: </span><span>6.59</span></span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>EBITDA (%)</span> <span>: </span><span>2.71%</span></span></div>
                </div>`,
                color: 'text-amber-500',
                link: '/test'
            },
            {
                name: 'NET Profit Margin (in IDR BN)',
                value: '-23.34 (YTD)',
                // Jika nilai positif warna jadi green 600 dan icon up
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>Laba Bersih</span> <span>: </span><span>-9.16</span></span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>NPM (%)</span> <span>: </span><span>-0.05%</span></span></div>
                </div>`,
                color: 'text-red-500',
                link: '/test'
            },
            {
                name: 'Cash Balance (in IDR BN)',
                value: '535',
                //sesuaikan periode
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <span class="text-cyan-500 font-bold">December 2024</span>
                </div>`,
                //ganti warna red 500 jika nilai sekarang < dari nilai bulan sebelumnya, tambahin icon up
                color: 'text-green-500',
                link: '/test'
            },
            {
                name: 'Cash Flow Movement (in IDR BN)',
                value: '185.17',
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-green-600"><i class="pi pi-sort-up-fill"></i><span class="font-bold flex gap-3"><span>CFO in</span> <span>: </span><span>457.8</span></span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>CFO out</span> <span>: </span><span>-164.38</span></span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>CFI</span> <span>: </span><span>-93.86</span></span></div>
                <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>CFF</span> <span>: </span><span>-14.39</span></span></div>
                </div>`,
                //ganti warna red 500 jika nilai minus
                color: 'text-green-500',
                link: '/test'
            },
            {
                name: 'CFI Pay Schedule (in IDR BN)',
                value: '134.87',
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <div class="flex gap-2 text-amber-600"><span class="font-bold flex gap-3"><span>Kontraktor EPC ...</span> <span>: </span><span>47.97</span></span></div>
                <div class="flex gap-2 text-amber-600"><span class="font-bold flex gap-3"><span>Pekerjaan Bang ...</span> <span>: </span><span>5</span></span></div>
                <div class="flex gap-2 text-amber-600"><span class="font-bold flex gap-3"><span>Licensor Biodi ...</span> <span>: </span><span>81.9</span></span></div>
                </div>`,
                color: 'text-amber-500',
                link: '/test'
            },
            {
                name: 'CFF Pay Schedule (in IDR BN)',
                value: '14.2',
                versus: `<div class="text-xs flex flex-col w-full mt-3">
                <span class="text-cyan-500 font-bold">December 2024</span>
                </div>`,
                //jika nilai lebih besar dari bulan sebelumnya, ganti warna red 500
                color: 'text-green-500',
                link: '/test'
            }
        ];
        return list;
    }
})();
