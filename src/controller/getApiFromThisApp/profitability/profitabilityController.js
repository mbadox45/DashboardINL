import profitabilityAPI from '@/api/thisAPI/profitability/profitabilityAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import moment from 'moment';

export default new (class profitabilityController {
    addPost = async (form) => {
        try {
            const response = await profitabilityAPI.addPost(form);
            const load = response.data;
            if (load.success == true) {
                return msg_success;
            } else {
                return msg_warning;
            }
        } catch (error) {
            if (error.status == 400) {
                return {
                    status: false,
                    code: 400,
                    msg: `Data sudah tersedia untuk periode ${moment(form.tanggal).format('MMMM YYYY')}.`
                };
            } else {
                return msg_error;
            }
        }
    };
    updatePost = async (id, form) => {
        try {
            const response = await profitabilityAPI.updatePost(id, form);
            const load = response.data;
            if (load.success == true) {
                return msg_success;
            } else {
                return msg_warning;
            }
        } catch (error) {
            return msg_error;
        }
    };
    getAll = async () => {
        try {
            const response = await profitabilityAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await profitabilityAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await profitabilityAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadToExportTable = async (form) => {
        try {
            const list = [];
            const response = await this.getByPeriod(form);
            if (response != null) {
                const lastYear = response.lastYear;
                if (lastYear != null) {
                    const months = lastYear.months;
                    for (let i = 0; i < months.length; i++) {
                        const details = months[i].details;
                        for (let j = 0; j < details.length; j++) {
                            list.push({
                                name: details[j].name,
                                bulan: moment(months[i].month, 'M').format('MMMM'),
                                tahun: lastYear.year,
                                value: Number(details[j].value)
                            });
                        }
                    }
                }

                const thisYear = response.thisYear;
                if (thisYear != null) {
                    const months = thisYear.months;
                    for (let i = 0; i < months.length; i++) {
                        const details = months[i].details;
                        for (let j = 0; j < details.length; j++) {
                            list.push({
                                name: details[j].name,
                                bulan: moment(months[i].month, 'M').format('MMMM'),
                                tahun: thisYear.year,
                                value: Number(details[j].value)
                            });
                        }
                    }
                }
            }
            return list;
        } catch (error) {
            return [];
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            const years = moment(form.tanggalAwal).format('YYYY');
            if (response != null) {
                const list = [];
                // Last Year
                // const bulan = bulanKalendar;
                const lastYear = response.lastYear;
                const thisYear = response.thisYear;

                list.push({ name: `Last Year ${Number(years) - 1}`, items: lastYear.months }, { name: `This Year ${Number(years)}`, items: thisYear.months });
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
    postData = async (form) => {
        try {
            let msg = { severity: '', content: '', icon: '' };
            const list = form;
            let kondisi;
            if (form.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].kategori_id != null && list[i].tanggal != null && list[i].value != null) {
                        if (i < list.length - 1) {
                            continue;
                        }
                        kondisi = true;
                    } else {
                        msg = { severity: 'warn', content: `Harap dilengkapi terlebih dahulu`, icon: 'pi-exclamation-triangle' };
                        kondisi = false;
                        break;
                    }
                }
                if (kondisi == true) {
                    for (let i = 0; i < list.length; i++) {
                        await this.addPost(list[i]);
                    }
                    msg = { severity: 'success', content: 'Data berhasil di tambahkan', icon: 'pi-check-circle' };
                    return msg;
                } else {
                    return msg;
                }
            } else {
                msg = { severity: 'warn', content: `Harap dilengkapi terlebih dahulu`, icon: 'pi-exclamation-triangle' };
                return msg;
            }
        } catch (error) {
            return { severity: 'error', content: 'Proses gagal, silahkan hubungi tim IT', icon: 'pi-times-circle' };
        }
    };
})();
