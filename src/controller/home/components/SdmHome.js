export const sdm = () => {
    const name = 'SDM';
    const colspan = 'col-span-2';
    const value = null;
    const versus = [
        `<div class="flex flex-col w-full gap-1 h-full justify-between py-2 px-2">
    <div class="flex gap-1 w-full bg-black p-3 rounded-lg">
        <div class="flex gap-4 w-full items-center font-bold">
            <img src="/images/icon/sdm/man.png" alt="Male" class="w-[3vw] h-[3vw]"/>
            <div class="flex flex-col text-blue-500">
                <span class="text-[1.4vw]">100</span>
                <span class="text-[0.8vw] text-gray-400">Pria</span>
            </div>
        </div>
        <div class="flex gap-4 w-full items-center font-bold">
            <div class="flex flex-col items-center w-full text-green-500">
                <span class="text-[0.8vw] text-gray-400">Total</span>
                <span class="text-[1.4vw]">200</span>
            </div>
        </div>
        <div class="flex flex-row-reverse gap-4 w-full items-center font-bold">
            <img src="/images/icon/sdm/woman.png" alt="Female" class="w-[3vw] h-[3vw]"/>
            <div class="flex flex-col text-pink-500">
                <span class="text-[1.4vw]">100</span>
                <span class="text-[0.8vw] text-gray-400">Wanita</span>
            </div>
        </div>
    </div>
    <div class="flex gap-2 w-full items-center text-[0.8vw] font-bold text-amber-500">
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
