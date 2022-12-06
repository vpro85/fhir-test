import Error from "../pages/Error";
import Patients from "../pages/Patients";


export const publicRoutes = [
    {path: "/patients", component: Patients, exact: true},
    {path: "/error", component: Error, exact: true},
]