import Notecard from "../Components/Notecard";
import { useState, useEffect } from "react";

function Notes({ note, setNote }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null);
    const [del, setDel] = useState(true);
    const url = "/notes/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, { method: "POST" });
                if (!response.ok) {
                    const result = await response.json().catch(() => null);
                    setErr(result?.msg || "Failed to fetch notes");
                    return;
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setErr(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [note, del]);

    if (loading) return <div className="loading">Loading notes...</div>;
    if (err) return <div className="error">Error: {err}</div>;
    return (
        <div
            className="h-full p-4 rounded-xl flex flex-wrap content-start gap-2 justify-center bg-gray-100 overflow-auto pb-20"
            style={{ width: "95%" }}
        >
            {data === null ? (
                "No data available"
            ) : data.length === 0 ? (
                <span className="text-2xl h-full grid place-items-center">
                    No Notes found
                </span>
            ) : (
                data?.map((val, i) => (
                    <Notecard
                        {...val}
                        key={i}
                        setDel={setDel}
                        setNote={setNote}
                    />
                ))
            )}
        </div>
    );
}

export default Notes;
