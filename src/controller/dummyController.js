// import * as CryptoJS from 'crypto-js';

export const valueColorPersenCondition = (val) => {
    let result = '';
    if (val <= 35) {
        result = 'text-red-500';
    } else if (val > 35 && val <= 70) {
        result = 'text-amber-500';
    } else {
        result = 'text-green-500';
    }
    return result;
};

export const valueColorIntCondition = (val) => {
    let result = '';
    if (val < 0) {
        result = 'text-red-500';
    } else {
        result = 'text-amber-500';
    }
    return result;
};

// // Encrypt Router
// export const secretKey = 'mysecretkey';

// // Fungsi untuk mengenkripsi teks
// export const encryptQuery = (query) => {
//     return CryptoJS.AES.encrypt(query, secretKey).toString();
// };

// // Fungsi untuk mendekripsi teks
// export const decryptQuery = (encryptedQuery) => {
//     const bytes = CryptoJS.AES.decrypt(encryptedQuery, secretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
// };
