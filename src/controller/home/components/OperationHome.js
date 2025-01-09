import { valueColorPersenCondition } from '@/controller/dummyController';

export const cpoOlahVsRKAP = () => {
    const name = 'CPO Olah vs RKAP vs Utility (in Kg)';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col h-full justify-between gap-3">
        <div class=" flex gap-2 items-center w-full h-full">
            <span class="font-bold w-full flex flex-col ${valueColorPersenCondition(16.8)}"><span class="text-[1.3vw]">${16.8}%</span><small class="text-[0.6vw]">RKAP</small></span>
            <span class="font-bold w-full flex flex-col ${valueColorPersenCondition(13.8)}"><span class="text-[1.3vw]">${13.8}%</span><small class="text-[0.6vw]">Utility</small></span>
        </div>
        <div class="flex flex-col gap-1 w-full h-full">
            <span class="items-center rounded-xl w-full font-bold bg-black flex py-1.5 px-3"><span class="text-green-500 w-full text-[0.5vw]">CPO Olah</span><span class="text-pink-600 text-[0.6vw]"> 8,860,560</span> </span>
            <span class="items-center rounded-xl w-full font-bold bg-black flex py-1.5 px-3"><span class="text-green-500 w-full text-[0.5vw]">RKAP</span><span class="text-pink-600 text-[0.6vw]"> 52,800,000</span> </span>
            <span class="items-center rounded-xl w-full font-bold bg-black flex py-1.5 px-3"><span class="text-green-500 w-full text-[0.5vw]">Utility</span><span class="text-pink-600 text-[0.6vw]"> 66,000,000</span> </span>
            <div class="flex gap-2 w-full">
                <div class="w-full p-2 flex flex-col items-end font-bold bg-black rounded-xl">
                    <span class="text-[0.6vw] text-amber-600">119,147,342,712</span>
                    <span class="text-[0.5vw] text-cyan-600">Cost Production</span>
                </div>
                <div class="w-full p-2 flex flex-col items-end font-bold bg-black rounded-xl">
                    <span class="text-[0.6vw] text-amber-600">13,446.93</span>
                    <span class="text-[0.5vw] text-cyan-600">Rp/Kg CPO Olah</span>
                </div>
            </div>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = 'cpo-olah-vs-rkap';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const pemakaianMaterial = () => {
    const name = 'Pemakaian Material';
    const value = null;
    const colspan = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Chemical Consumption</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Spent Bleaching Earth (BE)</span>
                        <span class="text-[0.6vw] font-bold">159,041</span>
                    </div>
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Detail</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">${130411}</span>
                            <span class="text-[0.5vw]">Bleaching Earth to Poram Spec</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">${0}</span>
                            <span class="text-[0.5vw]">Bleaching Earth to Branded Spec</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">${21.95}</span>
                            <span class="text-[0.5vw]">% Oil Content</span>
                        </div>
                    </div>
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Phosporic Acid</span>
                        <span class="text-[0.6vw] font-bold">5139</span>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Gas Consumption (mmbtu)</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Total Pemakaian</span>
                        <span class="text-[0.6vw] font-bold">24,425.6156</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Incoming</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">27,225.9735</span>
                            <span class="text-[0.5vw]">Base on INL</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">24,425.6156</span>
                            <span class="text-[0.5vw]">Base on Pertagas</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Outgoing</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">22,78.1309</span>
                            <span class="text-[0.5vw]">HP Boiler Refinery</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">22,147.484</span>
                            <span class="text-[0.5vw]">MP Boiler 1, 2</span>
                        </div>
                    </div>
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase">Selisih</span>
                        <span class="text-[0.6vw] font-bold">0</span>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Steam Consumption (Kg)</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Total Pemakaian</span>
                        <span class="text-[0.6vw] font-bold">4,958,690</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Incoming</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">4,958,690</span>
                            <span class="text-[0.5vw]">Incoming</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[9px]">Outgoing</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">3303100</span>
                            <span class="text-[0.5vw]">Refinery</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">924,200</span>
                            <span class="text-[0.5vw]">Fractionation</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">730,790</span>
                            <span class="text-[0.5vw]">Others</span>
                        </div>
                    </div>
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Selisih</span>
                        <span class="text-[0.6vw] font-bold">0</span>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Water Consumption (m³)</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Total Pemakaian</span>
                        <span class="text-[0.6vw] font-bold">4,958,690</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Incoming</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">16,670</span>
                            <span class="text-[0.5vw]">from KINRA</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Outgoing</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">1,635</span>
                            <span class="text-[0.5vw]">Softener Prod. (Ref)</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">908</span>
                            <span class="text-[0.5vw]">Softener Prod. (Fract)</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">7,285</span>
                            <span class="text-[0.5vw]">RO Prod.</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">6,842</span>
                            <span class="text-[0.5vw]">Others</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">4,231</span>
                            <span class="text-[0.5vw]">Waste Water (Effluent)</span>
                        </div>
                    </div>
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Selisih</span>
                        <span class="text-[0.6vw] font-bold">0</span>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Power Consumption (kWh)</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Total Pemakaian</span>
                        <span class="text-[0.6vw] font-bold">438,400</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Incoming</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">${438400}</span>
                            <span class="text-[0.5vw]">PLN</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 bg-black">
                        <span class="text-[0.5vw]">Outgoing</span>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">${98300}</span>
                            <span class="text-[0.5vw]">Refinery</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">${75031}</span>
                            <span class="text-[0.5vw]">Fractionation</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.6vw] font-bold">${6290}</span>
                            <span class="text-[0.5vw]">Others</span>
                        </div>
                    </div>
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw] uppercase ">Selisih</span>
                        <span class="text-[0.6vw] font-bold">258779</span>
                    </div>
                </div>
            </div>
        </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const laporanProduksi = () => {
    const name = 'Laporan Produksi (in Kg)';
    const value = null;
    const colspan = null;
    const versus = [
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Refinery</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw]">CPO Olah</span>
                        <span class="text-[0.6vw] font-bold">8,860,560</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col items-end bg-black">
                        <span class="text-[0.6vw] font-bold">8,860,560</span>
                        <span class="text-[0.5vw]">RBDPO Produksi</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col items-end bg-black">
                        <span class="text-[0.6vw] font-bold">407,178</span>
                        <span class="text-[0.5vw]">PFAD Produksi</span>
                    </div>
                </div>
                <div class="flex flex-col gap-3 justify-start h-full">
                    <div class="px-3 py-1 flex flex-row-reverse justify-between w-full font-bold items-end bg-cyan-500 text-black rounded-xl">
                        <span class="text-[0.6vw]">95,858</span>
                        <span class="text-[0.5vw]">Losses</span>
                    </div>
                    <div class="px-3 py-1 flex flex-row-reverse justify-between w-full font-bold items-end bg-cyan-500 text-black rounded-xl">
                        <span class="text-[0.6vw]">0.68%</span>
                        <span class="text-[0.5vw]">Losses (%)</span>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Fraksinasi IV 56</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw]">RBDPO Olah IV 56 Produksi</span>
                        <span class="text-[0.6vw] font-bold">0</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">0</span>
                            <span class="text-[0.5vw]">RBD Olein</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${0}%</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">0</span>
                            <span class="text-[0.5vw]">RBD Stearin</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${0}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Fraksinasi IV 57</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw]">RBDPO Olah IV 57 Produksi</span>
                        <span class="text-[0.6vw] font-bold">60,502</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">45,478</span>
                            <span class="text-[0.5vw]">RBD Olein</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${75.17}%</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">15,024</span>
                            <span class="text-[0.5vw]">RBD Stearin</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${24.83}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Fraksinasi IV 58</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw]">RBDPO Olah IV 58 Produksi</span>
                        <span class="text-[0.6vw] font-bold">9,586,794</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">6,754,208</span>
                            <span class="text-[0.5vw]">RBD Olein</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${70.45}%</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">2,832,586</span>
                            <span class="text-[0.5vw]">RBD Stearin</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${29.55}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        `<div class="w-full flex items-end gap-2 mt-2">
            <div class="flex flex-col w-full gap-2">
                <span class="text-[0.8vw] font-bold text-green-500">Fraksinasi IV 60</span>
                <div class="grid grid-cols-2 gap-2 text-amber-500">
                    <div class="col-span-2 py-[0.9px] px-3 rounded-xl flex items-center justify-between bg-black">
                        <span class="font-bold text-[0.5vw]">RBDPO Olah IV 60 Produksi</span>
                        <span class="text-[0.6vw] font-bold">0</span>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">0</span>
                            <span class="text-[0.5vw]">RBD Olein</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${0}%</span>
                        </div>
                    </div>
                    <div class="py-[0.9px] px-3 rounded-xl flex flex-col gap-1 items-end bg-black">
                        <div class="flex flex-col items-end">
                            <span class="text-[0.6vw] font-bold">0</span>
                            <span class="text-[0.5vw]">RBD Stearin</span>
                        </div>
                        <div class="flex flex-row-reverse items-center justify-between border-t border-neutral-800 w-full text-cyan-500">
                            <span class="text-[0.5vw]">Rendement</span>
                            <span class="text-[0.6vw] font-bold">${0}%</span>
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
    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const packagingPerformance = () => {
    const name = 'Packaging';
    const value = null;
    const colspan = 'col-span-2';
    const versus = [
        `<div class="flex flex-col w-full gap-2 h-full justify-between py-2 px-2">
    <div class="flex gap-1 w-full bg-black p-3 rounded-lg">
        <div class="flex gap-4 w-full items-center font-bold">
            <img src="/images/icon/sdm/man.png" alt="Male" class="w-[3vw] h-[3vw]"/>
            <div class="flex flex-col text-blue-500">
                <span class="text-[1vw]">100</span>
                <span class="text-[0.5vw] text-gray-400">Pria</span>
            </div>
        </div>
        <div class="flex gap-4 w-full items-center font-bold">
            <div class="flex flex-col items-center w-full text-green-500">
                <span class="text-[0.6vw] text-gray-400">Total</span>
                <span class="text-[1vw]">200</span>
            </div>
        </div>
        <div class="flex flex-row-reverse gap-4 w-full items-center font-bold">
            <img src="/images/icon/sdm/woman.png" alt="Female" class="w-[3vw] h-[3vw]"/>
            <div class="flex flex-col text-pink-500">
                <span class="text-[1vw]">100</span>
                <span class="text-[0.5vw] text-gray-400">Wanita</span>
            </div>
        </div>
    </div>
    <div class="flex gap-2 w-full items-center text-[0.5vw] font-bold text-amber-500">
        <span class="w-full">Tetap: 100</span>
        <span class="w-full">Tidak Tetap: 100</span>
        <span class="w-full">Safe Manhours: 500,000,000</span>
    </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
