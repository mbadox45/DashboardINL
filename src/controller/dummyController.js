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
