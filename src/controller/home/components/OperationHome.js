import { valueColorPersenCondition } from '@/controller/dummyController';

export const cpoOlahVsRKAP = () => {
    const name = 'CPO Olah vs RKAP vs Utility (in Kg)';
    const value = `<div class="flex gap-2 items-center w-full h-full">
        <span class="font-bold w-full flex flex-col ${valueColorPersenCondition(16.8)}"><span class="text-4xl">${16.8}%</span><small class="text-xs">RKAP</small></span>
        <span class="font-bold w-full flex flex-col ${valueColorPersenCondition(13.8)}"><span class="text-4xl">${13.8}%</span><small class="text-xs">Utility</small></span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="text-xs flex flex-col gap-3 w-full h-full">
    <span class="items-center rounded-xl w-full font-bold bg-black flex py-2 px-3"><span class="text-green-500 w-full">CPO Olah</span><span class="border-b pb-1 border-neutral-900 text-lg"> 8,860,560</span> </span>
    <span class="items-center rounded-xl w-full font-bold bg-black flex py-2 px-3"><span class="text-green-500 w-full">RKAP</span><span class="border-b pb-1 border-neutral-900 text-lg"> 52,800,000</span> </span>
    <span class="items-center rounded-xl w-full font-bold bg-black flex py-2 px-3"><span class="text-green-500 w-full">Utility</span><span class="border-b pb-1 border-neutral-900 text-lg"> 66,000,000</span> </span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/operation/development.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const laporanProduksi = () => {
    const name = 'Laporan Produksi (in Kg)';
    const value = null;
    const versus = [
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
    ];
    //ganti warna red 500 jika nilai minus
    const color = 'text-green-500';
    const icon = null;
    const link = '/test';
    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
