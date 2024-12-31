export const avgCPOKpbn = () => {
    const name = 'Avg CPO KPBN';
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.6vw] text-green-600">Rp 12,633/Kg</span>
        <span class="font-bold text-[0.6vw] text-amber-600">USD 842.2/Ton</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col w-full mt-3">
    <span class="text-[0.5vw] text-cyan-500 font-bold">31 December 2024</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Jisdor : 15,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const incomingCpo = () => {
    const name = 'Actual Incoming CPO';
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.6vw] text-green-600">Value : 45,000,000</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col w-full mt-3">
    <span class="text-[0.5vw] text-cyan-500 font-bold">31 December 2024</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Qty : 3,000</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Harga : Rp 15,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const outstandingCPo = () => {
    const name = 'Outstanding CPO';
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.6vw] text-green-600">Value : 45,000,000</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col w-full mt-3">
    <span class="text-[0.5vw] text-cyan-500 font-bold">Kontrak : CONTRACT-123-/VIII/2024</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Supplier : PT JAYA SEMPURNA</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Qty : 3000</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Harga : Rp 15,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const saldoPe = () => {
    const name = 'Saldo PE';
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.6vw] text-green-600">Sisa Saldo : 4,000</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col w-full mt-3">
    <span class="text-[0.5vw] text-cyan-500 font-bold">Saldo Awal : 10,000</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Pengiriman : Rp 6,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const stock = () => {
    const name = 'Stock';
    const value = `<div class="flex justify-between gap-2 items-center">
        <span class="font-bold text-[0.6vw] text-green-600">Sisa Saldo : 4,000</span>
    </div>`;
    // Jika Pendapatan > RKAP warna jadi green 600, sesuai kan periode
    const versus = [
        `<div class="flex flex-col w-full mt-3">
    <span class="text-[0.5vw] text-cyan-500 font-bold">Saldo Awal : 10,000</span>
    <span class="text-[0.5vw] text-cyan-500 font-bold">Pengiriman : Rp 6,000</span>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = null;
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
