export const balanceStockCPO = () => {
    const name = 'Stok CPO (dlm MT)';
    const colspan = null;
    const value = `<div class="flex flex-row-reverse justify-between items-center">
        <span class="font-bold text-[1.5vw] text-green-600">1,000</span>
        <span class="font-bold text-[0.8vw] text-cyan-600">31 Dec 2024</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex gap-2 w-full">
    <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold"><span class="text-[0.8vw]">CPO in</span><span class="text-amber-500 text-[1vw]">3,000</span></div>
    <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold"><span class="text-[0.8vw]">CPO feed</span><span class="text-amber-500 text-[1vw]">2,000</span></div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/scm/silo.png';
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const stockBulky = () => {
    const name = 'Stok Bulky (dlm MT)';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">RBDPO</span>
        <div class="flex flex-col items-end justify-center bg-black w-full h-full py-1 px-2 rounded-xl font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">1,937</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">PFAD</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">510</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">Stearin</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">2,832</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">Olein IV 56</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">4,891</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">Olein IV 57</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">0</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">Olein IV 58</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">940</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">Olein IV 60</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">0</span>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const stockRetail = () => {
    const name = 'Stok Ritel (dlm Box)';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP Salvaco 1 L</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">137</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP Salvaco 2 L</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">102</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP Nusakita 1 L</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP Nusakita 2 L</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP INL 900 mL</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP INL 1800 mL</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">PP INL 250 mL</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">PP INL 450 mL</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">PP INL 900 mL</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP Minyakita 1 L</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`,
        `<div class="flex w-full h-full justify-between items-center">
        <span class="font-bold w-full text-[1vw] text-pink-400">SP Minyakita 2 L</span>
        <div class="flex flex-col items-end justify-center rounded-xl w-full h-full bg-black py-1 px-2 font-bold">
            <span class="text-[0.8vw]">Aktual</span><span class="text-amber-500 text-[1.4vw]">40</span>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const actualIncommingCPO = () => {
    const name = 'Aktual CPO Masuk (dlm Kg)';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col gap-2 w-full">
        <div class="w-full flex flex-col items-end font-bold"><span class="text-[1vw] text-amber-500">601,167,461.00</span><div class="text-[0.6vw] flex justify-between w-full"><span class="text-white font-normal w-full text-end">09 Jan 2025</span><span class="text-cyan-500 w-full text-right">Total Harga</span></div></div>
        <div class="flex gap-1">
            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold bg-black p-2 rounded-lg"><span class="text-[0.6vw]">QTY (dlm Kg)</span><span class="text-amber-500 text-[0.9vw]">48,380.00</span></div>
            <div class="flex flex-col-reverse items-end w-full text-cyan-500 font-bold bg-black p-2 rounded-lg"><span class="text-[0.6vw]">Harga Satuan (dlm IDR)</span><span class="text-amber-500 text-[0.9vw]">12,425.95</span></div>
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/scm/on-time.png';
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
