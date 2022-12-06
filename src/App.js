import './App.css';
import {BrowserRouter} from "react-router-dom"
import {useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {AppContext} from "./context";

export default function App() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <AppContext.Provider value={
            {
                isLoading,
            }
        }>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AppContext.Provider>
    );
}
