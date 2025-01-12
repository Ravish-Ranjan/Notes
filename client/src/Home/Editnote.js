import { Modal, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function EditNote({ _id, title, body, style, open, setOpen, setNote }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: title,
        body: body,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/notes/upt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    newtitle: formData.title,
                    newbody: formData.body,
                    noteid: _id,
                    newgroup: "",
                }),
            });
            if (!response.ok) {
                // console.log(response);
                return;
            }
            await response.json();
            // console.log(result);
            handleClose();
            setNote((note) => !note);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClose = () => setOpen((open) => !open);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="top-1/2 left-1/2 rounded-lg grid gap-4 bg-white p-2"
                style={{
                    position: "absolute",
                    maxWidth: "95%",
                    width: "700px",
                    transform: "translate(-50%,-50%)",
                }}
            >
                <div className="flex justify-between">
                    <TextField
                        label=""
                        value={formData.title}
                        name="title"
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button color="default" onClick={handleClose}>
                        <CloseRoundedIcon />
                    </Button>
                </div>

                <TextField
                    label="Body"
                    value={formData.body}
                    name="body"
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={10}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        Edit Note
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
export default EditNote;
