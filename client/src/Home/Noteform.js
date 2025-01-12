import { Box, Modal, TextField, Button } from "@mui/material";
import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const style = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    maxWidth: "95%",
    width: "700px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
};

function Noteform({ open, handleClose, setNote }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        group: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title.trim() === "" || formData.body.trim() === "") {
            return;
        }
        try {
            setLoading(true);
            const response = await fetch("/notes/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                // console.log(response);
                return;
            }
            await response.json();
            // console.log(result);
            handleClose();
            setFormData({ title: "", body: "", group: "" });
            setNote((note) => !note);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style} className="top-1/2 left-1/2 rounded-lg grid gap-4">
                <div className="flex justify-between">
                    <TextField
                        label="Note title"
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
                        Add Note
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
export default Noteform;
