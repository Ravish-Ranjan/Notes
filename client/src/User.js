import { useEffect, useState, createContext } from "react";
import Cookies from "js-cookie";
import Load from "./Assets/Loading";

const UserContext = createContext();

function UserProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const url = "/users/issignin";

    const updateData = (newData) => {
        setData(newData);
        localStorage.setItem("cache", JSON.stringify(newData));
    };

    useEffect(() => {
        const jwt = Cookies.get("uuid");
        const cache = JSON.parse(localStorage.getItem("cache") || "null");

        if (!jwt && cache) {
            updateData(null);
        } else if (jwt && !cache) {
            Cookies.remove("uuid");
        } else if (cache?.signin) {
            setData(cache);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                // console.log(response);
                if (!response.ok) {
                    const result = await response.json().catch(() => null);
                    setErr(result?.msg || "An unknown error occurred");
                    return;
                }

                const result = await response.json();
                updateData(result);
            } catch (err) {
                setErr(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading)
        return (
            <UserContext.Provider value={{ data, updateData }}>
                <div className="h-dvh grid place-items-center">
                    <Load />
                </div>
            </UserContext.Provider>
        );

    if (err)
        return (
            <UserContext.Provider value={{ data, updateData }}>
                <div className="error">
                    <p>{err}</p>
                </div>
            </UserContext.Provider>
        );

    return (
        <UserContext.Provider value={{ data, updateData }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
