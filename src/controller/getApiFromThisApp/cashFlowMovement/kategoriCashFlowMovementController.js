import kategoriCashFlowMovementAPI from '@/api/thisAPI/cashFlowMovement/kategoriCashFlowMovementAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';

export default new (class kategoriCashFlowMovementController {
    addPost = async (form) => {
        try {
            const response = await kategoriCashFlowMovementAPI.addPost(form);
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
            const response = await kategoriCashFlowMovementAPI.updatePost(id, form);
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
            const response = await kategoriCashFlowMovementAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await kategoriCashFlowMovementAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
})();
