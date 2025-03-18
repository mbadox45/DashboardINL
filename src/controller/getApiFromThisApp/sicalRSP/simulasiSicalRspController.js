import simulasiRspAPI from '@/api/thisAPI/sicalRSP/simulasiRspAPI';
import { msg_error, msg_success, msg_warning } from '@/controller/getApiFromThisApp/dummy/notificationDummy';
import kursController from '@/controller/getApiFromThisApp/kurs/kursController';
import utilisasiSicalRspController from '@/controller/getApiFromThisApp/sicalRSP/utilisasiSicalRspController';

export default new (class simulasiSicalRspController {
    addPost = async (form) => {
        try {
            const response = await simulasiRspAPI.addPost(form);
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
            const response = await simulasiRspAPI.updatePost(id, form);
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
            const response = await simulasiRspAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
    getByID = async (id) => {
        try {
            const response = await simulasiRspAPI.getByID(id);
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };

    loadTable = async (form) => {
        try {
            const list = [];
            const allSimulation = await this.getAll();
            const utilisasi = await utilisasiSicalRspController.getAll();
            const kurs = await kursController.getByLatest(form);
            let nilaiKurs = 0;
            if (kurs != null) {
                nilaiKurs = kurs.value;
            }
            const listSimulasi = [];
            if (allSimulation != null) {
                for (let i = 0; i < allSimulation.length; i++) {
                    const cost = allSimulation[i].cost;
                    for (let j = 0; j < cost.length; j++) {
                        const util = utilisasi == null ? null : utilisasi.find((item) => item.id == cost[j].id_utilisasi);
                        const utilName = utilisasi == null ? null : util.name;
                        listSimulasi.push({
                            id: cost[j].id,
                            master_cost: cost[j].master_cost.name,
                            valueIdr: Number(cost[j].value),
                            valueUsd: nilaiKurs == 0 ? 0 : (Number(cost[j].value) / Number(nilaiKurs)) * 1000,
                            utilisasi: utilName,
                            id_utilisasi: cost[j].id_utilisasi
                        });
                    }
                }
            }
            if (utilisasi != null) {
                for (let util = 0; util < utilisasi.length; util++) {
                    const simulasi = listSimulasi.filter((item) => item.id);
                }
            }
            return list;
        } catch (error) {
            return null;
        }
    };

    simulationCalc = async () => {
        try {
            const response = await simulasiRspAPI.getAll();
            const load = response.data;
            const data = load.data;
            return data;
        } catch (error) {
            return null;
        }
    };
})();
