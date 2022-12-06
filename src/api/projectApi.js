import axios from "../axiosConfig"
import config from "../config";
import ENUMS from "../constants/appEnums";
import HttpUtil from "../utils/httpUtils";

export const projectApi = {
    getAppointments: async (count = 50) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.APPOINTMENTS_GET, {
                ...HttpUtil.httpHeaders,
                params: {
                    _count: count
                }
            })
            if (response.status === 200) return response.data;
            throw new Error(`Response status code ${response.status}`);
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    },
    getPatient: async (id) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.PATIENT_GET + "/" + id, {
                ...HttpUtil.httpHeaders,
            })
            if (response.status === 200) return response.data;
            throw new Error(`Response status code ${response.status}`);
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
}