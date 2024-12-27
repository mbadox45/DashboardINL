import { valueColorIntCondition, valueColorPersenCondition } from '@/controller/dummyController';

export default new (class HomeDashboard {
    cardFinancial() {
        const list = [
            {
                name: 'Revenue (in IDR BN)',
                value: `<div class="flex gap-2 items-center ${valueColorPersenCondition(30)}">
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
                value: `<div class="flex gap-2 items-center ${valueColorIntCondition(79.5)}">
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
                value: `<div class="flex gap-2 items-center ${valueColorIntCondition(16.82)}">
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
                value: `<div class="flex gap-2 items-center ${valueColorIntCondition(-23.34)}">
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
                name: 'CPO Olah vs RKAP vs Utility (in Kg)',
                value: `<div class="flex gap-2 items-center w-full h-full">
                    <span class="font-bold w-full flex flex-col ${valueColorPersenCondition(16.8)}"><span class="text-4xl">${16.8}%</span><small class="text-xs">RKAP</small></span>
                    <span class="font-bold w-full flex flex-col ${valueColorPersenCondition(13.8)}"><span class="text-4xl">${13.8}%</span><small class="text-xs">Utility</small></span>
                </div>`,
                // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
                versus: [
                    `<div class="text-xs flex flex-col gap-3 w-full h-full">
                <span class="items-center rounded-xl w-full font-bold bg-black flex py-2 px-3"><span class="text-green-500 w-full">CPO Olah</span><span class="border-b pb-1 border-neutral-900 text-lg"> 8,860,560</span> </span>
                <span class="items-center rounded-xl w-full font-bold bg-black flex py-2 px-3"><span class="text-green-500 w-full">RKAP</span><span class="border-b pb-1 border-neutral-900 text-lg"> 52,800,000</span> </span>
                <span class="items-center rounded-xl w-full font-bold bg-black flex py-2 px-3"><span class="text-green-500 w-full">Utility</span><span class="border-b pb-1 border-neutral-900 text-lg"> 66,000,000</span> </span>
                </div>`
                ],
                color: 'text-red-500',
                icon: '/images/icon/operation/development.png',
                link: '/test'
            },
            {
                name: 'Laporan Produksi (in Kg)',
                value: null,
                versus: [
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-2xl font-bold text-green-500">Refinery</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-[9px]">CPO Olah</span>
                                    <span class="text-md font-bold">8,860,560</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col items-end bg-black">
                                    <span class="text-md font-bold">8,860,560</span>
                                    <span class="text-[9px]">RBDPO Produksi</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col items-end bg-black">
                                    <span class="text-md font-bold">407,178</span>
                                    <span class="text-[9px]">PFAD Produksi</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 justify-start h-full">
                            <div class="px-3 py-2 flex flex-col font-bold items-end bg-cyan-500 text-black rounded-xl">
                                <span class="text-md">95,858</span>
                                <span class="text-[9px]">Losses</span>
                            </div>
                            <div class="px-3 py-2 flex flex-col font-bold items-end bg-cyan-500 text-black rounded-xl">
                                <span class="text-md">0.68%</span>
                                <span class="text-[9px]">Losses (%)</span>
                            </div>
                        </div>
                    </div>`,
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-2xl font-bold text-green-500">Fraksinasi IV 56</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-[9px]">RBDPO Olah IV 56 Produksi</span>
                                    <span class="text-md font-bold">0</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">0</span>
                                        <span class="text-[9px]">RBD Olein</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${0}%</span>
                                    </div>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">0</span>
                                        <span class="text-[9px]">RBD Stearin</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${0}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`,
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-2xl font-bold text-green-500">Fraksinasi IV 57</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-[9px]">RBDPO Olah IV 57 Produksi</span>
                                    <span class="text-md font-bold">60,502</span>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">45,478</span>
                                        <span class="text-[9px]">RBD Olein</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${75.17}%</span>
                                    </div>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">15,024</span>
                                        <span class="text-[9px]">RBD Stearin</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${24.83}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`,
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-2xl font-bold text-green-500">Fraksinasi IV 58</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-[9px]">RBDPO Olah IV 58 Produksi</span>
                                    <span class="text-md font-bold">9,586,794</span>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">6,754,208</span>
                                        <span class="text-[9px]">RBD Olein</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${70.45}%</span>
                                    </div>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">2,832,586</span>
                                        <span class="text-[9px]">RBD Stearin</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${29.55}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`,
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-2xl font-bold text-green-500">Fraksinasi IV 60</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-[9px]">RBDPO Olah IV 60 Produksi</span>
                                    <span class="text-md font-bold">0</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">0</span>
                                        <span class="text-[9px]">RBD Olein</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${0}%</span>
                                    </div>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                                    <div class="flex flex-col items-end">
                                        <span class="text-md font-bold">0</span>
                                        <span class="text-[9px]">RBD Stearin</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-[9px]">Rendement</span>
                                        <span class="text-md font-bold">${0}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                ],
                //ganti warna red 500 jika nilai minus
                color: 'text-green-500',
                icon: null,
                link: '/test'
            },
            {
                name: 'Pemakaian Material',
                value: null,
                // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
                versus: [
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-xl font-bold text-green-500">Gas Consumption (mmbtu)</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Total Pemakaian</span>
                                    <span class="text-md font-bold">24,425.6156</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Incoming</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${27225.9735}</span>
                                        <span class="text-[9px]">Base on INL</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${24425.6156}</span>
                                        <span class="text-[9px]">Base on Pertagas</span>
                                    </div>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Outgoing</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${2278.1309}</span>
                                        <span class="text-[9px]">HP Boiler Refinery</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${22147.4847}</span>
                                        <span class="text-[9px]">MP Boiler 1, 2</span>
                                    </div>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Selisih</span>
                                    <span class="text-md font-bold">0</span>
                                </div>
                            </div>
                        </div>
                    </div>`,
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-xl font-bold text-green-500">Steam Consumption (Kg)</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Total Pemakaian</span>
                                    <span class="text-md font-bold">4,958,690</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Incoming</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${4958690}</span>
                                        <span class="text-[9px]">Incoming</span>
                                    </div>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Outgoing</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${3303100}</span>
                                        <span class="text-[9px]">Refinery</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${924200}</span>
                                        <span class="text-[9px]">Fractionation</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${730790}</span>
                                        <span class="text-[9px]">Others</span>
                                    </div>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Selisih</span>
                                    <span class="text-md font-bold">0</span>
                                </div>
                            </div>
                        </div>
                    </div>`,
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-xl font-bold text-green-500">Water Consumption (m³)</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Total Pemakaian</span>
                                    <span class="text-md font-bold">4,958,690</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Incoming</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${16670}</span>
                                        <span class="text-[9px]">from KINRA</span>
                                    </div>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Outgoing</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${1635}</span>
                                        <span class="text-[9px]">Softener Prod. (Ref)</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${908}</span>
                                        <span class="text-[9px]">Softener Prod. (Fract)</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${7285}</span>
                                        <span class="text-[9px]">RO Prod.</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${6842}</span>
                                        <span class="text-[9px]">Others</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${4231}</span>
                                        <span class="text-[9px]">Waste Water (Effluent)</span>
                                    </div>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Selisih</span>
                                    <span class="text-md font-bold">0</span>
                                </div>
                            </div>
                        </div>
                    </div>`,
                    `<div class="w-full flex items-end gap-2 mt-2">
                        <div class="flex flex-col w-full gap-2">
                            <span class="text-xl font-bold text-green-500">Power Consumption (kWh)</span>
                            <div class="grid grid-cols-2 gap-2 text-amber-500">
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Total Pemakaian</span>
                                    <span class="text-md font-bold">438,400</span>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Incoming</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${438400}</span>
                                        <span class="text-[9px]">PLN</span>
                                    </div>
                                </div>
                                <div class="py-2 px-3 rounded-xl flex flex-col gap-1 bg-black">
                                    <span class="text-[9px]">Outgoing</span>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${98300}</span>
                                        <span class="text-[9px]">Refinery</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${75031}</span>
                                        <span class="text-[9px]">Fractionation</span>
                                    </div>
                                    <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                                        <span class="text-sm font-bold">${6290}</span>
                                        <span class="text-[9px]">Others</span>
                                    </div>
                                </div>
                                <div class="col-span-2 py-2 px-3 rounded-xl flex items-center justify-between bg-black">
                                    <span class="font-bold text-xs uppercase ">Selisih</span>
                                    <span class="text-md font-bold">258779</span>
                                </div>
                            </div>
                        </div>
                    </div>`
                ],
                color: 'text-red-500',
                icon: null,
                link: '/test'
            }
        ];
        return list;
    }
})();
