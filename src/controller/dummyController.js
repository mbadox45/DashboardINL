// import * as CryptoJS from 'crypto-js';

export const valueToBilion = (val) => {
    return (Number(val) / 1000000000).toFixed(2);
};

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
        result = 'text-green-500';
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
