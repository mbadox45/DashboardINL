import verifyService from '@/api/http/verifyService';

class verifyAuthController {
    getUser = async (id, headers) => {
        try {
            const response = await verifyService.getUser(id, headers);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };

    getAkses = async (headers) => {
        try {
            const response = await verifyService.getAkses(headers);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
}

export default new verifyAuthController();
