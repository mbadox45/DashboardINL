import dataSdmAPI from '@/api/thisAPI/sdm/dataSdmAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';

export default new (class dataSdmController {
    addPost = async (form) => {
        try {
            const response = await dataSdmAPI.addPost(form);
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
            const response = await dataSdmAPI.updatePost(id, form);
            const load = response.data;
            // console.log(load);
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
            const response = await dataSdmAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await dataSdmAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByPeriod = async (form) => {
        try {
            const response = await dataSdmAPI.getByPeriod(form);
            const load = response.data;
            // console.log(load);
            const data = load.data;
            // const list = data.map((item) => ({
            //     id: item.id,
            //     nilai: item.nilai,
            //     tanggal: item.tanggal,
            //     uraian_id: item.uraian_id,
            //     uraian: item.uraian
            // }));
            // console.log(list);
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
