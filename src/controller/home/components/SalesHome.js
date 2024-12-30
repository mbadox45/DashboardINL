export const UpdateHargaCPO = () => {
    const name = 'Harga CPO';
    const value = null;
    const versus = [
        `<div class="flex w-full gap-2 h-full items-center py-2 px-2">
    <div class="flex flex-col gap-3 w-full bg-black h-full p-3 rounded-lg">
        <span class="text-md">KPBN</span>
        <div class="flex flex-col gap-1">
            <span class="text-lg text-amber-500 font-bold">Rp. 14,646</span>
            <div class="text-[9px] text-red-500 font-bold flex items-center gap-2">
                <i class="text-[8px] pi pi-sort-down-fill" style="font-size:9px;"></i>
                <span>RP. -273</span>
            </div>
            <span class="text-xs text-cyan-500 font-bold">19 Desember 2024</span>
        </div>
    </div>
    <div class="flex flex-col gap-3 w-full bg-black h-full p-3 rounded-lg">
        <span class="text-md">MDEX</span>
        <div class="flex flex-col gap-1">
            <span class="text-lg text-amber-500 font-bold">RM. 4,700</span>
            <div class="text-[9px] text-red-500 font-bold flex items-center gap-2">
                <i class="text-[8px] pi pi-sort-down-fill" style="font-size:9px;"></i>
                <span>RM. -189</span>
            </div>
            <span class="text-xs text-cyan-500 font-bold">18 Desember 2024</span>
        </div>
    </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/sales/palm-oil.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const UpdateKursMataUang = () => {
    const name = 'Kurs to IDN';
    const value = null;
    const versus = [
        `<div class="flex w-full gap-2 h-full items-center py-2 px-2">
    <div class="flex flex-col gap-3 w-full bg-black h-full p-3 rounded-lg">
        <span class="text-md">USD to IDN</span>
        <div class="flex flex-col gap-1">
            <span class="text-lg text-amber-500 font-bold">Rp. 16,220</span>
            <div class="text-[9px] text-green-500 font-bold flex items-center gap-2">
                <i class="text-[8px] pi pi-sort-up-fill" style="font-size:9px;"></i>
                <span>RP. 137</span>
            </div>
            <span class="text-xs text-cyan-500 font-bold">19 Desember 2024</span>
        </div>
    </div>
    <div class="flex flex-col gap-3 w-full bg-black h-full p-3 rounded-lg">
        <span class="text-md">MYR to IDN</span>
        <div class="flex flex-col gap-1">
            <span class="text-lg text-amber-500 font-bold">RM. 3,590</span>
            <div class="text-[9px] text-red-500 font-bold flex items-center gap-2">
                <i class="text-[8px] pi pi-sort-down-fill" style="font-size:9px;"></i>
                <span>RM. -1</span>
            </div>
            <span class="text-xs text-cyan-500 font-bold">18 Desember 2024</span>
        </div>
    </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/sales/investmen.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};

export const UpdateVolume = () => {
    const name = 'Sales Volume - OLEIN (in Tons)';
    const value = 'col-span-2';
    const versus = [
        `<div class="flex w-full gap-2 h-full items-center py-2 px-2">
    <div class="flex flex-col gap-3 min-w-[250px] h-full py-3 pl-2">
        <span class="text-md h-full"></span>
        <div class="flex flex-col justify-center gap-1">
            <span class="text-md rounded-full py-1 px-3 items-center text-cyan-500 font-bold flex justify-between"><span>Current Potensial</span><span>(Real)</span></span>
            <span class="text-md rounded-full py-1 px-3 items-center text-lime-500 font-bold flex justify-between"><span>EBITDA Positive</span><span>(Target)</span></span>
            <span class="text-md rounded-full py-1 px-3 items-center text-indigo-500 font-bold flex justify-between"><span>Net Profit Positive</span><span>(Target)</span></span>
        </div>
    </div>
    <div class="flex flex-col items-end gap-3 w-full h-full py-3 rounded-lg">
        <span class="text-lg font-bold text-center w-full h-full">Retail</span>
        <div class="flex flex-col gap-1 items-end w-full">
            <span class="text-md rounded-full bg-black font-bold py-1 px-3 border w-full text-right text-cyan-500">2,000</span>
            <span class="text-md rounded-full bg-black font-bold py-1 px-3 border w-full text-right text-lime-500">2,000</span>
            <span class="text-md rounded-full bg-black font-bold py-1 px-3 border w-full text-right text-indigo-500">7,000</span>
        </div>
    </div>
    <div class="flex flex-col items-end gap-3 w-full h-full py-3 rounded-lg">
        <span class="text-lg font-bold text-center w-full h-full">Bulk</span>
        <div class="flex flex-col gap-1 items-end w-full">
            <span class="text-md rounded-full bg-black font-bold py-1 px-3 border w-full text-right text-cyan-500">22,000</span>
            <span class="text-md rounded-full bg-black font-bold py-1 px-3 border w-full text-right text-lime-500">35,000</span>
            <span class="text-md rounded-full bg-black font-bold py-1 px-3 border w-full text-right text-indigo-500">70,000</span>
        </div>
    </div>
    </div>`
    ];
    const color = 'text-red-500';
    const icon = '/images/icon/sales/customized.png';
    const link = '/test';

    return { name: name, value: value, versus: versus, color: color, icon: icon, link: link };
};
