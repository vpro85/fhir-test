import logo from '../logo.svg';
import '../App.css';
import {useEffect, useState} from "react";
import {projectApi} from "../api/projectApi";

export default function App() {
    const [appointments, setAppointments] = useState([])

    async function fetchAppointmentsData() {
        const {entry} = await projectApi.getAppointments();
        setAppointments(entry)

    };
    useEffect(() => {
        fetchAppointmentsData();
    }, [])

    useEffect(() => {
        console.log("appointments", appointments)
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
