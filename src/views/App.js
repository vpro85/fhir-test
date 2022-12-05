import logo from '../logo.svg';
import '../App.css';
import {useEffect} from "react";
import {projectApi} from "../api/projectApi";

export default function App() {
    useEffect(() => {
        async function fetchData() {
            console.log("Start here!")
            const data = await projectApi.getAppointments();
            console.log(data);
        };
        fetchData();
    }, [])

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
