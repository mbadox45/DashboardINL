// import * as CryptoJS from 'crypto-js';

export const valueToBilion = (val) => {
    return (Number(val) / 1000000000).toFixed(2);
};

export const valueColorPersenCondition = (val) => {
    let result = '';
    if (val <= 35) {
        result = 'text-red-600';
    } else if (val > 35 && val <= 70) {
        result = 'text-amber-600';
    } else {
        result = 'text-green-600';
    }
    return result;
};

export const valueColorPerbandinganCondition = (val1, val2) => {
    const total = (Number(val1) - Number(val2)).toFixed(2);
    let result = 0;
    let color = '';
    let icon = '';
    if (Number(val1) < Number(val2)) {
        color = 'text-red-500';
        result = total * -1;
        icon = 'pi pi-sort-down-fill';
    } else if (Number(val2) == Number(val1)) {
        color = 'text-amber-500';
        result = total;
    } else {
        color = 'text-green-500';
        result = total;
        icon = 'pi pi-sort-up-fill';
    }
    return {
        color: color,
        result: result,
        icon: icon
    };
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

export const animatedValue = (start, end, duration, elementId) => {
    const stepTime = Math.abs(Math.floor(duration / Math.abs(end - start)));
    let current = start;
    const increment = start < end ? 1 : -1;

    const timer = setInterval(() => {
        current += increment;
        const element = document.getElementById(elementId);
        if (element) {
            element.innerText = `${current}%`; // Update DOM dengan nilai saat ini
        }
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
        }
    }, stepTime);
};

export const formatCurrency = (amount) => {
    let parts = amount.toString().split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts.join('.');
};

export const months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
];
