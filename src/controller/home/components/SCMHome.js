export const avgCPOKpbn = () => {
    const name = 'Avg CPO KPBN';
    const colspan = null;
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.8vw] text-green-600">IDR 12,633/Kg</span>
        <span class="font-bold text-[0.8vw] text-amber-600">USD 842.2/Ton</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col w-full">
    <span class="text-[0.5vw] text-cyan-500 font-bold">31 December 2024</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Jisdor : 15,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const incomingCpo = () => {
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

export const outstandingCPo = () => {
    const name = 'Outstanding CPO (in Ton)';
    const colspan = 'col-span-2';
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex items-center w-full gap-2">
        <div class="w-1/2">
            <span class="text-green-500 text-[1vw] font-bold">9,000,000</span>
        </div>
        <div class="grid grid-cols-2 gap-3 w-full">
            <div class="flex flex-col w-full">
                <span class="text-[0.6vw] text-amber-500 font-extrabold w-full text-right">300,000</span>
                <div class="text-[0.5vw] text-cyan-500 flex gap-2 justify-between font-bold">
                    <span class="text-indigo-300">PT JAYA SEMPURNA</span>
                    <span>31 Dec 2024</span>
                </div>
            </div>
            <div class="flex flex-col w-full">
                <span class="text-[0.6vw] text-amber-500 font-extrabold w-full text-right">300,000</span>
                <div class="text-[0.5vw] text-cyan-500 flex gap-2 justify-between font-bold">
                    <span class="text-indigo-300">PT SALMAN jAYA</span>
                    <span>31 Dec 2024</span>
                </div>
            </div>
            <div class="flex flex-col w-full">
                <span class="text-[0.6vw] text-amber-500 font-extrabold w-full text-right">300,000</span>
                <div class="text-[0.5vw] text-cyan-500 flex gap-2 justify-between font-bold">
                    <span class="text-indigo-300">PT SALMAN SEMPURNA</span>
                    <span>31 Dec 2024</span>
                </div>
            </div>
            <div class="flex flex-col w-full">
                <span class="text-[0.6vw] text-amber-500 font-extrabold w-full text-right">300,000</span>
                <div class="text-[0.5vw] text-cyan-500 flex gap-2 justify-between font-bold">
                    <span class="text-indigo-300">PT SEMPURNA JAYA</span>
                    <span>31 Dec 2024</span>
                </div>
            </div>
        </div>
        <div class="w-[5%]">
        </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const saldoPe = () => {
    const name = 'Saldo PE';
    const colspan = null;
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

export const transaction = () => {
    const name = 'Transaction Dashboard';
    const colspan = null;
    const value = null;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex h-full justify-center w-full">
    <span class="text-[0.8vw] text-cyan-500 text-center font-bold">Direct to Transaction Dashboard</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/scm/application.png';
    const link = '/test';

    return { colspan: colspan, name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
