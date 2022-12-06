import React, {useEffect, useState} from 'react';
import {projectApi} from "../api/projectApi";
import PatientsList from "../components/patientsList";

const Patients = () => {
    const [sortedPatientsList, setSortedPatientsList] = useState([])

    async function fetchAppointmentsData() {
        const {entry} = await projectApi.getAppointments();
        return entry;
    }

    function getPatientIds(appointments) {
        const patients = []
        if (appointments.length > 0) {
            appointments.forEach((data) => {
                const participant = data.resource.participant ??= null;
                participant && participant.forEach((data) => {
                    const reference = data?.actor?.reference;
                    if (reference && reference.includes("Patient")) {
                        const id = reference.slice(8)
                        !isNaN(id) && patients.push(Number(id))
                    }
                })
            })
        }
        const patientsList = [];
        new Set(patients).forEach(p => patientsList.push(p));
        return patientsList;
    }

    async function fetchPatientData(id) {
        const entry = await projectApi.getPatient(id);
        return entry
    }

    const processPatientEntry = (id, patient) => {
        const processedEntry = {
            id,
            name: patient?.name[0]?.text || `${patient.name[0].given.join(' ')} ${patient.name[0].family}`,
            gender: patient.gender,
            birthDate: patient.birthDate,
        }
        return processedEntry
    }

    async function makePatientsList() {
        const appointments = await fetchAppointmentsData();
        const patientIds = getPatientIds(appointments);
        const patientList = [];
        for (const id of patientIds) {
            let patientData = await fetchPatientData(id);
            patientData = processPatientEntry(id, patientData);
            patientList.push(patientData)
        }
        console.log("patientList", patientList)
        patientList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setSortedPatientsList(patientList);
        return patientList;
    }

    useEffect(() => {
        makePatientsList();
    }, [])

    return (
        <div>
            <PatientsList sortedPatientsList={sortedPatientsList}/>
        </div>
    );
};

export default Patients;