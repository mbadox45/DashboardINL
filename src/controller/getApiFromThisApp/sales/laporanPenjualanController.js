import laporanPenjualanAPI from '@/api/thisAPI/sales/laporanPenjualanAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';

export default new (class laporanPenjualanController {
    addPost = async (form) => {
        try {
            const response = await laporanPenjualanAPI.addPost(form);
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
    updatePost = async (id, form) => {
        try {
            const response = await laporanPenjualanAPI.updatePost(id, form);
            const load = response.data;
            console.log(load);
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
            const response = await laporanPenjualanAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await laporanPenjualanAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    // getByJenis = async (jenis) => {
    //     try {
    //         const response = await targetPenjualanAPI.getByJenis(jenis);
    //         const load = response.data;
    //         const data = load.data;
    //         return data;
    //     } catch (error) {
    //         return null;
    //     }
    // };
    getByPeriod = async (form) => {
        try {
            const response = await laporanPenjualanAPI.getByPeriod(form);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    loadTable = async (form) => {
        try {
            const response = await this.getByPeriod(form);
            // const
            if (response != null) {
                const list = response;
                return list;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };
})();
