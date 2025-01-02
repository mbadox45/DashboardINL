import { valueColorIntCondition, valueColorPersenCondition } from '@/controller/dummyController';

// const links = '/detail-dashboard?component=';

export const revenue = () => {
    const name = 'Revenue (in IDR BN)';
    const value = `<div class="flex gap-2 items-center ${valueColorPersenCondition(30)}">
        <span class="font-bold text-[0.9vw]">${30}%</span>
    </div>`;
    // 0-35 red 36-70 amber 71-100 green
    const versus = `<div class="flex flex-col w-full mt-3">
    <span class="text-[0.5vw] text-red-600 font-bold">Pendapatan : 60</span>
    <span class="text-[0.5vw] text-green-600 font-bold">RKAP December 2024 : 200</span>
    </div>`;
    const color = 'text-red-500';
    const icon = '/images/icon/financial/revenue.png';
    const link = `revenue`;

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const grossProfitMargin = () => {
    const name = 'Gross Profit Margin (in IDR BN)';
    const value = `<div class="flex gap-2 items-center ${valueColorIntCondition(79.5)}">
        <span class="font-bold text-[0.9vw]">${79.5} (YTD)</span>
    </div>`;
    // Buat Pengecekan Untuk Perbandingan Dengan Data Sebelumnya, Untuk Ganti Warna & Icon
    const versus = `<div class="flex flex-col w-full mt-3">
    <div class="flex gap-2 text-[0.5vw] items-center text-green-600"><i class="pi pi-sort-up-fill" style="font-size:0.5vw"></i><span class="font-bold">Laba Kotor : 11.8</span></div>
    <div class="flex gap-2 text-[0.5vw] items-center text-red-600"><i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i><span class="font-bold">GPM : 4.85 %</span></div>
    </div>`;
    const color = 'text-amber-500';
    const icon = '/images/icon/financial/gross-profit.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const ebitdaMargin = () => {
    const name = 'EBITDA Margin (in IDR BN)';
    const value = `<div class="flex gap-2 items-center ${valueColorIntCondition(16.82)}">
        <span class="font-bold text-[0.9vw]">${16.82} (YTD)</span>
    </div>`;
    // Jika nilai sekarang > nilai bulan lalu,  warna jadi green 600 dan icon up, kalo sama jadi warna amber icon strip
    const versus = `<div class="text-xs flex flex-col w-full mt-3">
    <div class="flex gap-2 text-[0.5vw] items-center text-red-600"><i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i><span class="font-bold flex gap-3"><span>EBITDA</span> <span>: </span><span>6.59</span></span></div>
    <div class="flex gap-2 text-[0.5vw] items-center text-red-600"><i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i><span class="font-bold flex gap-3"><span>EBITDA (%)</span> <span>: </span><span>2.71%</span></span></div>
    </div>`;
    const color = 'text-amber-500';
    const icon = '/images/icon/financial/ebitda.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const netProfitMargin = () => {
    const name = 'NET Profit Margin (in IDR BN)';
    const value = `<div class="flex gap-2 items-center ${valueColorIntCondition(-23.34)}">
        <span class="font-bold text-[0.9vw]">${-23.34} (YTD)</span>
    </div>`;
    // Jika nilai positif warna jadi green 600 dan icon up
    const versus = `<div class="text-xs flex flex-col w-full mt-3">
    <div class="flex gap-2 text-[0.5vw] items-center text-red-600"><i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i><span class="font-bold flex gap-3"><span>Laba Bersih</span> <span>: </span><span>-9.16</span></span></div>
    <div class="flex gap-2 text-[0.5vw] items-center text-red-600"><i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i><span class="font-bold flex gap-3"><span>NPM (%)</span> <span>: </span><span>-0.05%</span></span></div>
    </div>`;
    const color = 'text-red-500';
    const icon = '/images/icon/financial/net-profit.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const cashBalance = () => {
    const name = 'Cash Balance (in IDR BN)';
    const value = `<div class="flex gap-2 items-center text-green-500">
    <span class="font-bold text-[1.2vw]">${535}</span>
    <i class="pi pi-sort-up-fill" style="font-size:1vw;" />
    </div>`;
    //sesuaikan periode
    const versus = `<div class=" text-[0.5vw] flex flex-col w-full mt-3">
    <span class="text-cyan-500 font-bold">s/d December 2024</span>
    </div>`;
    //ganti warna red 500 jika nilai sekarang < dari nilai bulan sebelumnya, kalo sama warna amber, tambahin icon up atau icon strip
    const color = 'text-green-500';
    const icon = '/images/icon/financial/balance.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const cashFlowMovement = () => {
    const name = 'Cash Flow Movement (in IDR BN)';
    const value = `<div class="flex gap-2 items-center text-green-500">
        <span class="font-bold text-[0.9vw]">${185.17}</span>
    </div>`;
    const versus = `<div class="text-[0.5vw] flex gap-3 w-full mt-3">
        <div class="flex flex-col w-full">
            <div class="flex gap-1 text-green-600 w-full items-center">
                <i class="pi pi-sort-up-fill" style="font-size:0.5vw"></i>
                <div class="font-bold flex w-full">
                    <span class="w-full">CFO in</span>
                    <div class="w-full flex gap-2"><span class="">:</span><span class="">457.8</span></div>
                </div>
            </div>
            <div class="flex gap-1 text-red-600 w-full items-center">
                <i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i>
                <div class="font-bold flex w-full">
                    <span class="w-full">CFO Out</span>
                    <div class="w-full flex gap-2"><span class="">:</span><span class="">-164.38</span></div>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="flex gap-1 text-red-600 w-full items-center">
                <i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i>
                <div class="font-bold flex w-full">
                    <span class="w-1/2">CFI</span>
                    <div class="w-full flex gap-2"><span class="">:</span><span class="">-93.86</span></div>
                </div>
            </div>
            <div class="flex gap-1 text-red-600 w-full items-center">
                <i class="pi pi-sort-down-fill" style="font-size:0.5vw"></i>
                <div class="font-bold flex w-full">
                    <span class="w-1/2">CFF</span>
                    <div class="w-full flex gap-2"><span class="">:</span><span class="">-14.39</span></div>
                </div>
            </div>
        </div>
    </div>`;
    //ganti warna red 500 jika nilai minus
    const color = 'text-green-500';
    const icon = null;
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const cfiPaySchedule = () => {
    const name = 'CFI Pay Schedule (in IDR BN)';
    const value = `<div class="flex gap-2 items-center text-amber-500">
        <span class="font-bold text-[0.9vw]">${134.87}</span>
    </div>`;
    const versus = `<div class="text-[0.5vw] flex flex-col w-full mt-3">
    <table class="text-amber-600 mb-2">
        <thead>
            <tr>
                <th class="border border-black bg-black py-[0.5px] px-1 text-left">Pekerjaan Bangunan...</th>
                <th class="border border-black py-[0.5px]">5</th>
                <th class="border border-black py-[0.5px] text-cyan-500">2 Dec 2024</th>
            </tr>
            <tr>
                <th class="border border-black bg-black py-[0.5px] px-1 text-left">Licensor Biodiesel...</th>
                <th class="border border-black py-[0.5px]">81.9</th>
                <th class="border border-black py-[0.5px] text-cyan-500">1 Jan 2025</th>
            </tr>
        </thead>
    </table>
    </div>`;
    const color = 'text-amber-500';
    const icon = null;
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const cffPaySchedule = () => {
    const name = 'CFF Pay Schedule (in IDR BN)';
    const value = `<div class="flex gap-2 items-center text-amber-500">
    <span class="font-bold text-[1.2vw]">${14.2}</span>
    <i class="pi pi-sort" style="font-size:1vw;" />
    </div>`;
    const versus = `<div class="text-[0.5vw] flex flex-col w-full mt-3">
    <span class="text-cyan-500 font-bold">s/d December 2024</span>
    </div>`;
    //ganti warna red 500 jika nilai sekarang < dari nilai bulan sebelumnya, kalo sama warna amber, tambahin icon up atau icon strip
    const color = 'text-amber-500';
    const icon = '/images/icon/financial/loan-payment.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
