import logo from '../logo.svg';
import '../App.css';
import {useEffect, useState} from "react";
import {projectApi} from "../api/projectApi";

export default function App() {
    const [appointments, setAppointments] = useState([])
    const [patientIds, setPatientIds] = useState([])

    async function fetchAppointmentsData() {
        const {entry} = await projectApi.getAppointments();
        setAppointments(entry)
    }

    useEffect(() => {
        fetchAppointmentsData();
    }, [])

    useEffect(() => {
        patientIds.length > 0 && console.log("patientIds:", patientIds)
    }, [patientIds])

    useEffect(() => {
        const patients = []
        if (appointments.length > 0) {
            appointments.forEach((data) => {
                const participant = data.resource.participant ??= null;
                participant && participant.forEach((data) => {
                    const reference = data?.actor?.reference;
                    if (reference && reference.includes("Patient")) {
                        patients.push(reference.slice(8))
                    }
                })
            })
        }
        const patientsList = []
        new Set(patients).forEach(p => patientsList.push(p))
        setPatientIds(patientsList)
    }, [appointments])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

            </header>
        </div>
    );
}
