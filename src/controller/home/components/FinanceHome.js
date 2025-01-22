import cashFlowMovementFinanceController from '@/controller/dashboardMain/finance/cashFlowMovementFinanceController';
import payScheduleFinanceController from '@/controller/dashboardMain/finance/payScheduleFinanceController';
import { formatCurrency, valueColorIntCondition, valueColorPersenCondition } from '@/controller/dummyController';
import financeHomeController from '@/controller/home/controllerHomePage/financeHomeController';
import moment from 'moment';

// const links = '/detail-dashboard?component=';

const form = {
    idPmg: 1,
    tanggalAwal: moment('2024-01-01').format('YYYY-MM-DD'),
    tanggalAkhir: moment('2024-02-28').format('YYYY-MM-DD')
};

export const revenue = async () => {
    const response = await financeHomeController.revenue(form);
    const name = 'Revenue (in IDR Bn)';
    const colspan = null;
    const value = null;
    // 0-35 red 36-70 amber 71-100 green
    const versus = `<div class="flex gap-1 items-center h-full">
        <div class="flex gap-2 items-center mb-3 ${valueColorPersenCondition(30)}">
            <span class="font-bold text-[2vw]">30%</span>
        </div>
        <div class="flex flex-col gap-1 w-full items-end">
            <div class="font-bold flex flex-col-reverse items-end">
                <span class="text-white text-[0.6vw]">Pendapatan</span>
                <span class="text-red-600 text-[0.8vw]">Rp 60</span>
            </div>
            <div class="font-bold flex flex-col-reverse items-end">
                <span class="text-white text-[0.6vw]">RKAP Des 2024</span>
                <span class="text-green-600 text-[0.8vw]">Rp 200</span>
            </div>
        </div>
    </div>`;
    const color = 'text-red-500';
    const icon = '/images/icon/financial/revenue.png';
    const link = `revenue`;

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const grossProfitMargin = () => {
    const name = 'Gross Profit Margin (in IDR Bn)';
    const colspan = null;
    const value = null;
    // Buat Pengecekan Untuk Perbandingan Dengan Data Sebelumnya, Untuk Ganti Warna & Icon
    const versus = `<div class="flex gap-1 items-center h-full mt-3">
        <div class="flex gap-2 items-center h-full ${valueColorIntCondition(79.5)}">
            <span class="font-bold text-[1vw]">79.5</span>
        </div>
        <div class="flex gap-1 w-full items-end">
            <div class="font-bold flex w-full flex-col-reverse items-center">
                <div class="flex gap-1 items-center text-green-600">
                    <i class="pi pi-sort-up-fill" style="0.6vw"></i>
                    <span class="text-[0.6vw]">Rp 1.2</span>
                </div>
                <span class="text-white text-[0.6vw]">Laba Kotor</span>
                <span class="text-green-600 text-[0.8vw]">Rp 11.8</span>
            </div>
            <div class="font-bold flex w-full flex-col-reverse items-center">
            <div class="flex gap-1 items-center text-red-600">
                    <i class="pi pi-sort-down-fill" style="0.6vw"></i>
                    <span class="text-[0.6vw]">-0.58%</span>
                </div>
                <span class="text-white text-[0.6vw]">GPM</span>
                <span class="text-red-600 text-[0.8vw]">4.85%</span>
            </div>
        </div>
    </div>`;
    const color = 'text-amber-500';
    const icon = '/images/icon/financial/gross-profit.png';
    const link = 'gross-profit';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const ebitdaMargin = () => {
    const name = 'EBITDA Margin (in IDR Bn)';
    const colspan = null;
    const value = null;
    // Jika nilai sekarang > nilai bulan lalu,  warna jadi green 600 dan icon up, kalo sama jadi warna amber icon strip
    const versus = `<div class="flex gap-1 items-center h-full mt-3">
        <div class="flex gap-2 items-center h-full ${valueColorIntCondition(16.82)}">
            <span class="font-bold text-[1vw]">16.82</span>
        </div>
        <div class="flex gap-1 w-full items-end">
            <div class="font-bold flex w-full flex-col-reverse items-center">
                <div class="flex gap-1 items-center text-green-600">
                    <i class="pi pi-sort-up-fill" style="0.6vw"></i>
                    <span class="text-[0.6vw]">Rp 8.26</span>
                </div>
                <span class="text-white text-[0.6vw]">EBITDA</span>
                <span class="text-green-600 text-[0.8vw]">Rp 6.59</span>
            </div>
            <div class="font-bold flex w-full flex-col-reverse items-center">
            <div class="flex gap-1 items-center text-green-600">
                    <i class="pi pi-sort-up-fill" style="0.6vw"></i>
                    <span class="text-[0.6vw]">3.57%</span>
                </div>
                <span class="text-white text-[0.6vw]">EBITDA%</span>
                <span class="text-green-600 text-[0.8vw]">2.71%</span>
            </div>
        </div>
    </div>`;
    const color = 'text-amber-500';
    const icon = '/images/icon/financial/ebitda.png';
    const link = 'ebitda-margin';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const netProfitMargin = () => {
    const name = 'NET Profit Margin (in IDR Bn)';
    const colspan = null;
    const value = null;
    // Jika nilai positif warna jadi green 600 dan icon up
    const versus = `<div class="flex gap-1 items-center h-full mt-3">
        <div class="flex gap-2 items-center h-full ${valueColorIntCondition(-23.34)}">
            <span class="font-bold text-[1vw]">-23.34</span>
        </div>
        <div class="flex gap-1 w-full items-end">
            <div class="font-bold flex w-full flex-col-reverse items-center">
                <div class="flex gap-1 items-center text-red-600">
                    <i class="pi pi-sort-down-fill" style="0.6vw"></i>
                    <span class="text-[0.6vw]">Rp -9.16</span>
                </div>
                <span class="text-white text-[0.6vw]">Laba Bersih</span>
                <span class="text-red-600 text-[0.8vw]">Rp -14.23</span>
            </div>
            <div class="font-bold flex w-full flex-col-reverse items-center">
            <div class="flex gap-1 items-center text-red-600">
                    <i class="pi pi-sort-down-fill" style="0.6vw"></i>
                    <span class="text-[0.6vw]">-0.05%</span>
                </div>
                <span class="text-white text-[0.6vw]">NPM%</span>
                <span class="text-red-600 text-[0.8vw]">-0.07%</span>
            </div>
        </div>
    </div>`;
    const color = 'text-red-500';
    const icon = '/images/icon/financial/net-profit.png';
    const link = 'net-profit-margin';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const cashBalance = async () => {
    const response = await cashFlowMovementFinanceController.cardBagianCashBalance(form);
    const nilai = response.cash;
    const name = 'Cash Balance (in IDR Bn)';
    const colspan = null;
    const value = `<div class="flex gap-2 items-center text-green-500 ">
    <span class="font-bold text-[1.5vw]">${nilai}</span>
    <i class="pi pi-sort-${response.status}-fill" style="font-size:1vw;" />
    </div>`;
    //sesuaikan periode
    const versus = `<div class=" text-[0.8vw] flex flex-col w-full mt-3">
    <span class="text-cyan-500 font-bold">s/d ${response.period}</span>
    </div>`;
    //ganti warna red 500 jika nilai sekarang < dari nilai bulan sebelumnya, kalo sama warna amber, tambahin icon up atau icon strip
    const color = 'text-green-500';
    const icon = '/images/icon/financial/balance.png';
    const link = 'cash-balance';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const cashFlowMovement = () => {
    const name = 'Cash Flow Movement (in IDR Bn)';
    const colspan = null;
    const value = `<div class="flex gap-2 items-center text-green-500">
        <span class="font-bold text-[1.2vw]">${185.17}</span>
    </div>`;
    const versus = `<div class="text-[0.8vw] flex gap-3 w-full mt-3">
        <div class="flex flex-col w-full">
            <div class="flex gap-1 text-green-600 w-full items-center">
                <i class="pi pi-sort-up-fill" style="font-size:0.8vw"></i>
                <div class="font-bold flex w-full">
                    <span class="w-full">CFO in</span>
                    <div class="w-full flex gap-2"><span class="">:</span><span class="">457.8</span></div>
                </div>
            </div>
            <div class="flex gap-1 text-red-600 w-full items-center">
                <i class="pi pi-sort-down-fill" style="font-size:0.8vw"></i>
                <div class="font-bold flex w-full">
                    <span class="w-full">CFO Out</span>
                    <div class="w-full flex gap-2"><span class="">:</span><span class="">-164.38</span></div>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="flex gap-1 text-red-600 w-full items-center">
                <i class="pi pi-sort-down-fill" style="font-size:0.8vw"></i>
                <div class="font-bold flex w-full">
                    <span class="w-1/2">CFI</span>
                    <div class="w-full flex gap-2"><span class="">:</span><span class="">-93.86</span></div>
                </div>
            </div>
            <div class="flex gap-1 text-red-600 w-full items-center">
                <i class="pi pi-sort-down-fill" style="font-size:0.8vw"></i>
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
    const link = 'cash-flow-movement';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const cffPaySchedule = async () => {
    const response = await payScheduleFinanceController.cardBagian(form);
    const cff = response.cff / 1000000000;
    const cfi = response.cfi / 1000000000;
    const date = response.period;
    const name = 'Pay Schedule (in IDR Bn)';
    const colspan = null;
    const value = null;
    const versus = `<div class="flex gap-1 w-full h-full">
        <div class="flex flex-col gap-1 p-2 rounded-xl bg-black w-full">
            <div class="flex gap-2 justify-between items-center">
                <span class="font-bold text-[0.9vw]">CFF</span>
                <span class="text-cyan-500 font-bold text-[0.7vw]">s/d ${date}</span>
            </div>
            <div class="flex gap-2 items-center text-amber-500">
                <span class="font-bold text-[1.2vw]">${formatCurrency(cff.toFixed(2))}</span>
                <i class="pi pi-sort" style="font-size:0.8vw;"></i>
            </div>
        </div>
        <div class="flex flex-col gap-1 p-2 rounded-xl bg-black w-full">
            <div class="flex gap-2 justify-between items-center">
                <span class="font-bold text-[0.9vw]">CFI</span>
            </div>
            <div class="flex gap-2 items-center text-amber-500">
                <span class="font-bold text-[1.2vw]">${formatCurrency(cfi.toFixed(2))}</span>
            </div>
        </div>
    </div>
    `;
    //ganti warna red 500 jika nilai sekarang < dari nilai bulan sebelumnya, kalo sama warna amber, tambahin icon up atau icon strip
    const color = 'text-amber-500';
    const icon = null;
    const link = 'cff-pay-schedule';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const hargaSpotInventoryBulky = () => {
    const name = 'Harga Spot & Inv. Bulky';
    const colspan = 'col-span-2';
    const value = null;
    const versus = [
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">PFAD</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">10,423</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">686</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/MT)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">10,641</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">701</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/MT)</span>
                </div>
            </div>
        </div>
    </div>`,
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">RBDPO</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">12,867</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">847</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/MT)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">13,000</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">856</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/MT)</span>
                </div>
            </div>
        </div>
    </div>`,
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">RBD Stearin</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">12,867</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">847</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/MT)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">13,000</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">856</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/MT)</span>
                </div>
            </div>
        </div>
    </div>`,
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">RBD Olein</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">12,867</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">847</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/MT)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1  w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">13,000</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Kg)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">856</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/MT)</span>
                </div>
            </div>
        </div>
    </div>`
    ];
    const color = 'text-amber-500';
    const icon = null;
    const link = 'harga-spot-inventory-bulky';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const hargaSpotInventoryRetail = () => {
    const name = 'Harga Spot & Inv. Retail';
    const colspan = 'col-span-2';
    const value = null;
    const versus = [
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">Minyakita 1 Ltr</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">13,499</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">161,983</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/Box)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">13,499</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">161,983</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/Box)</span>
                </div>
            </div>
        </div>
    </div>`,
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">Salvaco 1 Ltr</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">14,216</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">170,591</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/Box)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">14,216</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">170,591</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/Box)</span>
                </div>
            </div>
        </div>
    </div>`,
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">Nusakita 1 Ltr</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">13,499</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">161,983</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/Box)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">13,499</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">161,983</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/Box)</span>
                </div>
            </div>
        </div>
    </div>`,
        `<div class="flex flex-col gap-1 p-2 bg-black rounded-xl w-full">
        <span class="font-bold text-[0.8vw] text-pink-400">INL 450 ML</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">14,216</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-amber-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">170,591</span>
                    <span class="text-[0.7vw] text-cyan-500">Spot (USD/Box)</span>
                </div>
            </div>
            <div class="flex flex-col gap-1 w-full">
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">14,216</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (Rp/Box)</span>
                </div>
                <div class="flex flex-col text-green-600 justify-between items-end w-full">
                    <span class="text-[0.8vw] font-bold">170,591</span>
                    <span class="text-[0.7vw] text-cyan-500">Inv. (USD/Box)</span>
                </div>
            </div>
        </div>
    </div>`
    ];
    const color = 'text-amber-500';
    const icon = null;
    const link = 'harga-spot-inventory-retail';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link, colspan: colspan };
};

export const transaction = () => {
    const name = 'Transaction Dashboard';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex h-full justify-center items-center w-full">
    <span class="text-[0.8vw] text-cyan-500 text-center font-bold">Direct to Transaction Dashboard</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/scm/application.png';
    const link = 'itf';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
