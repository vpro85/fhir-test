import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context";
import {projectApi} from "../api/projectApi";
import PatientsList from "../components/patientsList";

const Patients = () => {
    const {isLoading} = useContext(AppContext)
    const [appointments, setAppointments] = useState([])
    const [patientIds, setPatientIds] = useState([])
    const [patientData, setPatientData] = useState([])
    const [isDataReceived, setIsDataReceived] = useState(false);

    async function fetchAppointmentsData() {

        const {entry} = await projectApi.getAppointments();
        setAppointments(entry)
    }

    const processPatientEntry = (patient) => {
        console.log("processPatientEntry:::patient", patient)
        debugger
        const processedEntry = {
            id: isNaN(patient.id) ? 999 : Number(patient.id),
            // TODO: process name
            name: patient?.name[0]?.text || "Unknown"
        }
        console.log("processPatientEntry:::processed patient", processedEntry)
        return processedEntry
    }

    async function fetchPatient(id) {
        console.log("fetchPatient:::start")
        const entry = await projectApi.getPatient(id);
        const processedEntry = processPatientEntry(entry)
        console.log("fetchPatient:::entry", entry)
        console.log("fetchPatient:::processedEntry", processedEntry)
        console.log("fetchPatient:::end")
        return processedEntry
    }

    useEffect(() => {
        console.log("useEffect:::[]:::start")
        fetchAppointmentsData();
        console.log("useEffect:::[]:::end")
    }, [])

    useEffect(() => {
        console.log("useEffect:::patientIds:::start")
        if (patientIds.length > 0) {
            setIsDataReceived(false)
            const pData = [];
            patientIds.forEach((pid) => {
                fetchPatient(pid).then(data => {
                    console.log("data", data)
                    pData.push(data)
                    console.log("useEffect:::patientIds:::pData", pData)
                    setPatientData(pData);
                });
            });
            setIsDataReceived(true);


            console.log("useEffect:::patientIds:::end")
        }
    }, [patientIds])

    useEffect(() => {
        console.log("useEffect:::appointments:::start")
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
        console.log("useEffect:::appointments:::end")
    }, [appointments])

    useEffect(()=>{
        console.log("useEffect:::patientData:::start")
        console.log("useEffect:::patientData", patientData)
        console.log("useEffect:::patientData:::end")

    }, [patientData])


    return (
        <div>
            <PatientsList sortedPatientsList={patientData}/>
        </div>
    );
};

export default Patients;