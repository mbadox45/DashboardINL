import { valueColorIntCondition, valueColorPersenCondition } from '@/controller/dummyController';

export const revenue = () => {
    const name = 'Revenue (in IDR BN)';
    const value = `<div class="flex gap-2 items-center ${valueColorPersenCondition(30)}">
        <span class="font-bold text-2xl">${30}%</span>
    </div>`;
    // 0-35 red 36-70 amber 71-100 green
    const versus = `<div class="text-xs flex flex-col w-full mt-3">
    <span class="text-red-600 font-bold">Pendapatan : 60</span>
    <span class="text-amber-600 font-bold">RKAP December 2024 : 200</span>
    </div>`;
    const color = 'text-red-500';
    const icon = '/images/icon/financial/revenue.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const grossProfitMargin = () => {
    const name = 'Gross Profit Margin (in IDR BN)';
    const value = `<div class="flex gap-2 items-center ${valueColorIntCondition(79.5)}">
        <span class="font-bold text-2xl">${79.5} (YTD)</span>
    </div>`;
    // Buat Pengecekan Untuk Perbandingan Dengan Data Sebelumnya, Untuk Ganti Warna & Icon
    const versus = `<div class="text-xs flex flex-col w-full mt-3">
    <div class="flex gap-2 text-green-600"><i class="pi pi-sort-up-fill"></i><span class="font-bold">Laba Kotor : 11.8</span></div>
    <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold">GPM : 4.85 %</span></div>
    </div>`;
    const color = 'text-amber-500';
    const icon = '/images/icon/financial/gross-profit.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const ebitdaMargin = () => {
    const name = 'EBITDA Margin (in IDR BN)';
    const value = `<div class="flex gap-2 items-center ${valueColorIntCondition(16.82)}">
        <span class="font-bold text-2xl">${16.82} (YTD)</span>
    </div>`;
    // Jika nilai sekarang > nilai bulan lalu,  warna jadi green 600 dan icon up, kalo sama jadi warna amber icon strip
    const versus = `<div class="text-xs flex flex-col w-full mt-3">
    <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>EBITDA</span> <span>: </span><span>6.59</span></span></div>
    <div class="flex gap-2 text-red-600"><i class="pi pi-sort-down-fill"></i><span class="font-bold flex gap-3"><span>EBITDA (%)</span> <span>: </span><span>2.71%</span></span></div>
    </div>`;
    const color = 'text-amber-500';
    const icon = '/images/icon/financial/ebitda.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
