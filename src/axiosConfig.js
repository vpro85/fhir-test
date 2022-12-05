import Axios from "axios";

const instance = Axios.create({
    headers: {
        'Content-Type': 'application/fhir+xml',
    },
    withCredentials: false,
    responseType: "json",
    maxRedirects: 10,
});

export default instance;