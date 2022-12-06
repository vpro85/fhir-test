import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context";
import {projectApi} from "../api/projectApi";

const Patients = () => {
    const {isLoading} = useContext(AppContext)
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
        <div>
            <h1>Patients List</h1>
            {patientIds.map((p) => <div>{p}</div>)}
        </div>
    );
};

export default Patients;