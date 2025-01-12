import { useContext, useEffect, useState, lazy } from "react";
import "../font.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../User";
import { Button, Box, TextField, Typography, Alert, Link } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const VisibilityIcon = lazy(() => import("@mui/icons-material/Visibility"));

const Form = ({ showerror, setError, setSeverity }) => {
    const [visi, setVisi] = useState(false);
    const { updateData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/users/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                // console.log(response);
                setError(`Error: error logging in`);
                setSeverity("error");
                showerror();
                return;
            }
            const result = await response.json();
            updateData(result);
            // console.log(result);
            navigator("/");
        } catch (err) {
            setError(`Error: ${err.message}`);
            setSeverity("error");
            showerror();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{ width: "600px", maxWidth: "90%", padding: "20px" }}
            className=" shadow-2xl grid"
        >
            <Typography
                variant="span"
                className="robofont-300 w-full text-center text-3xl font-semibold text-blue-500"
            >
                Log In
            </Typography>
            <Box className="">
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    className="text-xs"
                />
                <div className="w-full flex justify-between items-center h-fit">
                    <TextField
                        label="Password"
                        name="password"
                        type={visi ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        onClick={() => setVisi((is) => !is)}
                        title={visi ? "Show Password" : "Hide Password"}
                    >
                        {visi ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                </div>
            </Box>
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
                    LogIn
                </Button>
            </Box>
        </Box>
    );
};

function Onboarding() {
    const { data } = useContext(UserContext);
    const navigate = useNavigate();
    const [err, setError] = useState("  ");
    const [show, setShow] = useState(false);
    const [severity, setSeverity] = useState("success");

    const showerror = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };
    const params = {
        showerror,
        setError,
        setSeverity,
    };
    useEffect(() => {
        if (data && data.signin) {
            navigate("/");
        }
    }, [data, navigate]);

    if (!data || data.signin) return null;
    return (
        <div
            className="flex flex-col justify-center items-center h-screen w-screen gap-2"
            style={{ position: "reletive" }}
        >
            <Form {...params} />
            <Link href="/signup">Don't have an Account?</Link>

            <Alert
                severity={severity}
                color={severity}
                // variant="outlined
                onClose={() => {
                    setShow(false);
                }}
                style={{
                    position: "absolute",
                    top: "1vw",
                    right: "1vw",
                    display: show ? "flex" : "none",
                }}
            >
                {err}
            </Alert>
        </div>
    );
}

export default Onboarding;

// export default Form;
