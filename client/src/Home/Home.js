import { UserContext } from "../User";
import { NavContext } from "../Nav";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Bottomnav from "../Components/Bottomnav";
import Notes from "./Notes";
import Noteform from "./Noteform";
import Cookies from "js-cookie";

function Home() {
    const { data } = useContext(UserContext);
    const { value, setValue } = useContext(NavContext);
    const [open, setOpen] = useState(false);
    const [note, setnote] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove("uuid");
        window.location.reload();
        return;
    };

    useEffect(() => {
        if (data && !data.signin) {
            navigate("/signin");
            return;
        }
    }, [data, data.signin, navigate]);

    return (
        <div
            className="flex flex-col justify-start items-center h-dvh w-dvw bg-gray-200"
            style={{ position: "relative" }}
        >
            <div className="flex justify-between items-center w-full pr-2">
                <Typography variant="h5" color="initial" className="p-4 w-full">
                    Hi, {data.signin ? data.user.name : "Guest"}
                </Typography>
                <Button
                    variant="text"
                    color="default"
                    className=""
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>
            <Notes note={note} setNote={setnote} />
            <Bottomnav
                {...{ value, setValue }}
                handleAdd={() => setOpen(true)}
            />
            <Noteform
                open={open}
                handleClose={() => setOpen(false)}
                setNote={setnote}
            />
        </div>
    );
}
export default Home;
