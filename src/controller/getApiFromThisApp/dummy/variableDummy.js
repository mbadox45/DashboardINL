export const conditions = [
    { name: 'Difference', id: 'difference' },
    { name: 'SUM', id: 'sum' },
    { name: 'Use Higher', id: 'use_higher' },
    { name: 'Use Lower', id: 'use_lower' }
];

export const kategori = [
    { name: 'Bahan Olah', id: 'bahan_olah' },
    { name: 'Produk Hasil', id: 'produk_hasil' },
    { name: 'Others', id: 'others' }
];

export const jenisTable = [
    { name: 'Default', id: 'default' },
    { name: 'Get All', id: 'getAll' }
];

export const bulanKalendar = [
    { name: 'January', id: 1 },
    { name: 'February', id: 2 },
    { name: 'March', id: 3 },
    { name: 'April', id: 4 },
    { name: 'Mei', id: 5 },
    { name: 'Juny', id: 6 },
    { name: 'July', id: 7 },
    { name: 'August', id: 8 },
    { name: 'September', id: 9 },
    { name: 'October', id: 10 },
    { name: 'November', id: 11 },
    { name: 'December', id: 12 }
];

export const kategoriMaterial = [
    { name: 'Incoming', id: 'incoming' },
    { name: 'Outgoing', id: 'outgoing' },
    { name: 'Proportion', id: 'proportion' },
    { name: 'Others', id: 'others' }
];

export const listStatus = [
    { name: 'Aktif', id: 1 },
    { name: 'Non Aktif', id: 0 }
];

export const jenisProduk = [
    { name: 'Retail', id: 'ritel' },
    { name: 'Bulk', id: 'bulk' }
];

export const condFunction = (data) => {
    return data
        .replace(/_/g, ' ') // Ganti underscore dengan spasi
        .toLowerCase() // Ubah ke huruf kecil
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
