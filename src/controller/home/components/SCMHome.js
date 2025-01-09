export const balanceStockCPO = () => {
    const name = 'Balance Stock CPO (in Ton)';
    const colspan = null;
    const value = `<div class="flex flex-col">
        <span class="font-bold text-[0.7vw] text-green-600">1,000</span>
        <span class="font-bold text-[0.5vw] text-cyan-600">31 Dec 2024</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex gap-2 w-full">
    <div class="text-[0.5vw] flex flex-col-reverse items-end w-full text-cyan-500 font-bold"><span>CPO in</span><span class="text-amber-500">3,000</span></div>
    <div class="text-[0.5vw] flex flex-col-reverse items-end w-full text-cyan-500 font-bold"><span>CPO feed</span><span class="text-amber-500">2,000</span></div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/scm/silo.png';
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const stockBulky = () => {
    const name = 'Balance Stock Bulky (in Ton)';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">RBDPO</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Teori</span><span class="text-amber-500 text-[0.7vw]">3,318</span></div>
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">1,937</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">PFAD</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Teori</span><span class="text-amber-500 text-[0.7vw]">508</span></div>
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">510</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">Stearin</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Teori</span><span class="text-amber-500 text-[0.7vw]">2,572</span></div>
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">2,832</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">Olein IV 56</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Teori</span><span class="text-amber-500 text-[0.7vw]">-531</span></div>
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">4,891</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">Olein IV 57</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Teori</span><span class="text-amber-500 text-[0.7vw]">1,810</span></div>
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">0</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">Olein IV 58</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Teori</span><span class="text-amber-500 text-[0.7vw]">2,286</span></div>
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">940</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">Olein IV 60</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Teori</span><span class="text-amber-500 text-[0.7vw]">-47</span></div>
            <div class="text-[0.5vw] flex justify-between items-center gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">0</span></div>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const stockRetail = () => {
    const name = 'Balance Stock Retail (in ??)';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP Salvaco 1 L</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">137</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP Salvaco 2 L</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">102</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP Nusakita 1 L</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP Nusakita 2 L</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP INL 900 mL</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP INL 1800 mL</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">PP INL 250 mL</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">PP INL 450 mL</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">PP INL 900 mL</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP Minyakita 1 L</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[0.8vw] text-green-600">SP Minyakita 2 L</span>
        <div class="flex flex-col gap-1 w-full">
            <div class="text-[0.5vw] flex flex-col-reverse justify-between items-end gap-2 rounded-xl bg-black py-1 px-2 text-cyan-500 font-bold"><span>Aktual</span><span class="text-amber-500 text-[0.7vw]">40</span></div>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const actualIncommingCPO = () => {
    const name = 'Actual Incoming CPO';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col gap-2 w-full">
        <div class="w-full flex flex-col items-end font-bold"><span class="text-[0.7vw] text-amber-500">601,167,461.00</span><div class="text-[0.5vw] flex justify-between w-full"><span class="text-white font-normal w-full text-end">09 Jan 2025</span><span class="text-cyan-500 w-full text-right">Total</span></div></div>
        <div class="flex gap-1">
            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold bg-black p-2 rounded-lg"><span class="text-[0.4vw]">QTY (in Tons)</span><span class="text-amber-500 text-[0.6vw]">48,380.00</span></div>
            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold bg-black p-2 rounded-lg"><span class="text-[0.4vw]">Price (in IDR)</span><span class="text-amber-500 text-[0.6vw]">12,425.95</span></div>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/scm/on-time.png';
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
