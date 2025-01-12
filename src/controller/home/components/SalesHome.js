import { pieChartApex } from '@/controller/chartStyle/radialBarDummy';

export const QtyPenjualanBulky = () => {
    const qty = [10000, 15000, 50000, 25000];
    const label = ['PFAD', 'RBDPO', 'RBD Stearin', 'RBD Olein'];
    const name = 'Qty Penjualan Bulky';
    const chartData = pieChartApex(label, qty); // Pass qty as an additional parameter
    const colspan = 'col-span-2';
    const value = null;
    const versus = [
        `<div class="flex w-full gap-2 h-full  items-center py-1 px-1">
    <div class="flex flex-col gap-2 w-full bg-black h-full py-2 px-3 rounded-lg">
        <div class="flex gap-2 justify-between items-center">
            <span class="text-[1.7vw] font-bold text-amber-500">50%</span>
            <span class="text-[0.5vw] font-bold text-white">s/d 31 Dec 2024</span>
        </div>
        <div class="flex gap-2 h-full">
            <div class="flex w-full flex-col-reverse items-end justify-center text-amber-500 font-bold"><span class="text-[0.5vw]">Real</span><span class="text-[0.8]">100,000</span></div>
            <div class="flex w-full flex-col-reverse items-end justify-center text-green-500 font-bold"><span class="text-[0.5vw]">RKAP</span><span class="text-[0.8]">200,000</span></div>
        </div>
    </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, qty: qty, options: chartData, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const QtyPenjualanRetail = () => {
    const qty = [10000, 15000, 50000, 25000];
    const label = ['PFAD', 'RBDPO', 'RBD Stearin', 'RBD Olein'];
    const name = 'Qty Penjualan Retail';
    const options = pieChartApex(label, qty);
    const colspan = 'col-span-2';
    const value = null;
    const versus = [
        `<div class="flex w-full gap-2 h-full  items-center py-1 px-1">
    <div class="flex flex-col gap-2 w-full bg-black h-full py-2 px-3 rounded-lg">
        <div class="flex gap-2 justify-between items-center">
            <span class="text-[1.7vw] font-bold text-amber-500">50%</span>
            <span class="text-[0.5vw] font-bold text-white">s/d 31 Dec 2024</span>
        </div>
        <div class="flex gap-2 h-full">
            <div class="flex w-full flex-col-reverse items-end justify-center text-amber-500 font-bold"><span class="text-[0.5vw]">Real</span><span class="text-[0.8]">100,000</span></div>
            <div class="flex w-full flex-col-reverse items-end justify-center text-green-500 font-bold"><span class="text-[0.5vw]">RKAP</span><span class="text-[0.8]">200,000</span></div>
        </div>
    </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, qty: qty, options: options, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const outstandingCPo = () => {
    const name = 'Outstanding CPO (in Ton)';
    const colspan = null;
    const options = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col items-end w-full gap-2">
        <span class="text-[0.8vw]">9,000,000</span>
        <div class="flex gap-1 w-full">
            <div class="flex flex-col w-full p-2 bg-black rounded-lg">
                <span class="text-[0.6vw] text-amber-500 font-extrabold w-full text-right">300,000</span>
                <div class="text-[0.4vw] text-cyan-500 flex gap-2 justify-end font-bold">
                    <span class="text-indigo-300">PT JAYA SEMPURNA</span>
                </div>
            </div>
            <div class="flex flex-col w-full p-2 bg-black rounded-lg">
                <span class="text-[0.6vw] text-amber-500 font-extrabold w-full text-right">300,000</span>
                <div class="text-[0.4vw] text-cyan-500 flex gap-2 justify-end font-bold">
                    <span class="text-indigo-300">PT SALMAN JAYA</span>
                </div>
            </div>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, options: options, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const saldoPe = () => {
    const name = 'Saldo PE';
    const colspan = null;
    const options = null;
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.9vw] text-amber-500">4,000</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col w-full">
    <span class="text-[0.5vw] text-green-500 font-bold">Saldo Awal : 10,000</span>
    <span class="text-[0.5vw] text-red-500 font-bold">Pengiriman : Rp 6,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/scm/import-export.png';
    const link = '/test';

    return { colspan: colspan, options: options, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const avgCPOKpbn = () => {
    const name = 'Avg CPO KPBN';
    const options = null;
    const colspan = null;
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.7vw] text-cyan-600">Average</span>
        <span class="font-bold text-[0.7vw] text-cyan-600">Today</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.9vw] text-amber-600">USD 842.2/Ton</span>
        <span class="font-bold text-[0.9vw] text-green-600">USD 842.2/Ton</span>
    </div>
    <div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.9vw] text-amber-600">IDR 12,633/Kg</span>
        <span class="font-bold text-[0.9vw] text-green-600">IDR 12,633/Kg</span>
    </div>
    <div class="flex flex-col items-center">
        <span class="text-[0.6vw] text-cyan-500 font-bold">31 Dec 2024</span>
        <span class="text-[0.6vw] text-cyan-500 font-bold">Jisdor : 15,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, options: options, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const proportionCost = () => {
    const name = 'Market Router & Levy Duty (USD)';
    const colspan = null;
    const options = null;
    const value = null;
    const versus = [
        `<div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
        <div class="flex justify-between">
            <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
            <span class="text-[0.6vw]">RBDPO</span>
        </div>
        <div class="flex flex-col">
            <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">965.00</span></div>
            <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">78.00</span></div>
        </div>
    </div>`,
        `<div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
            <div class="flex justify-between">
                <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
                <span class="text-[0.6vw]">RBD Stearin</span>
            </div>
            <div class="flex flex-col">
                <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">960.00</span></div>
                <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">64.00</span></div>
            </div>
        </div>`,
        `<div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
            <div class="flex justify-between">
                <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
                <span class="text-[0.6vw]">RBD Olein</span>
            </div>
            <div class="flex flex-col">
                <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">960.00</span></div>
                <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">82.00</span></div>
            </div>
        </div>`,
        `<div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
            <div class="flex justify-between">
                <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
                <span class="text-[0.6vw]">PFAD</span>
            </div>
            <div class="flex flex-col">
                <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">792.00</span></div>
                <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">85.00</span></div>
            </div>
        </div>`
        //     `<div class="flex w-full gap-2 h-full items-center py-1">
        // <div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
        //     <div class="flex justify-between">
        //         <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
        //         <span class="text-[0.6vw]">RBDPO</span>
        //     </div>
        //     <div class="flex flex-col">
        //         <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">965.00</span></div>
        //         <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">78.00</span></div>
        //     </div>
        // </div>
        // <div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
        //     <div class="flex justify-between">
        //         <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
        //         <span class="text-[0.6vw]">RBD Stearin</span>
        //     </div>
        //     <div class="flex flex-col">
        //         <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">960.00</span></div>
        //         <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">64.00</span></div>
        //     </div>
        // </div>
        // <div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
        //     <div class="flex justify-between">
        //         <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
        //         <span class="text-[0.6vw]">RBD Olein</span>
        //     </div>
        //     <div class="flex flex-col">
        //         <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">960.00</span></div>
        //         <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">82.00</span></div>
        //     </div>
        // </div>
        // <div class="flex flex-col gap-2 w-full bg-black h-full py-1 px-2 rounded-lg">
        //     <div class="flex justify-between">
        //         <img src="/images/icon/sales/palm-oil.png" alt="Palm Oil" width="20vw"/>
        //         <span class="text-[0.6vw]">PFAD</span>
        //     </div>
        //     <div class="flex flex-col">
        //         <div class="flex justify-between text-green-500 font-bold"><span class="text-[0.4vw]">M. Routers</span><span class="text-[0.5vw]">792.00</span></div>
        //         <div class="flex justify-between text-amber-500 font-bold"><span class="text-[0.4vw]">Levy Duty</span><span class="text-[0.5vw]">85.00</span></div>
        //     </div>
        // </div>
        // </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, options: options, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
