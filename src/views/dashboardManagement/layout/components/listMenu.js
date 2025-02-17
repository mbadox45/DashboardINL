import dataMenu from '@/controller/dataMenu';

export const menuAllAccess = () => {
    const rolesUser = localStorage.getItem('roles');
    const result = [];

    if (rolesUser == 'allUser') {
        result.push(dataMenu.home(), dataMenu.finance(), dataMenu.operation(), dataMenu.sales(), dataMenu.scm(), dataMenu.sdm(), dataMenu.master());
    } else if (rolesUser == 'finance') {
        result.push(dataMenu.home(), dataMenu.finance(), dataMenu.master());
    } else if (rolesUser == 'operation') {
        result.push(dataMenu.home(), dataMenu.operation(), dataMenu.master());
    } else if (rolesUser == 'sales') {
        result.push(dataMenu.home(), dataMenu.sales(), dataMenu.master());
    } else if (rolesUser == 'scm') {
        result.push(dataMenu.home(), dataMenu.scm(), dataMenu.master());
    } else if (rolesUser == 'sdm') {
        result.push(dataMenu.home(), dataMenu.sdm(), dataMenu.master());
    } else {
        result.push(dataMenu.home());
    }

    return result;
};
