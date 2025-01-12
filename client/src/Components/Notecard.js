import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import Delete from "@mui/icons-material/DeleteOutlineRounded";
import EditNote from "../Home/Editnote";

function getTimeFormat(time) {
    const date = new Date(time);
    let hours = String(date.getHours());
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const curDate = date.toDateString();
    if (hours > 12) {
        hours -= 12;
        return `${hours}:${minutes} PM - ${curDate}`;
    }
    return `${hours}:${minutes} AM - ${curDate}`;
}

function abr(str) {
    let short = str.substring(0, 15);
    if (short !== str) {
        short += "...";
    }
    return short;
}

function getRandHue() {
    return Math.floor(Math.random() * 360);
}

function Note({ title, createdAt, updatedAt, body, _id, setDel, setNote }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/notes/del", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ noteid: _id }),
            });
            if (!response.ok) {
                // console.log(response);
                return;
            }
            await response.json();
            // console.log(result);
            setDel((note) => !note);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Card
                className="flex-grow flex-shrink-1 w-96 bg-white cursor-pointer"
                style={{ backgroundColor: `hsl(${getRandHue()}, 50%, 90%)` }}
            >
                <CardContent>
                    <div
                        className="flex justify-between items-center"
                        onClick={() => setOpen((open) => !open)}
                    >
                        <Typography variant="h6" color="initial">
                            {abr(title)}
                        </Typography>
                        <Typography variant="caption" color="ternary">
                            {getTimeFormat(updatedAt)}
                        </Typography>
                    </div>

                    <Box className="flex justify-between gap-2 items-center">
                        <Typography variant="body1" className="text-gray-600">
                            {body.substring(0, 40)}
                        </Typography>
                        <Button
                            color="default"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            <Delete className="text-red-500" />
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <EditNote
                _id={_id}
                title={title}
                body={body}
                open={open}
                setOpen={setOpen}
                setNote={setNote}
            />
        </>
    );
}
export default Note;
