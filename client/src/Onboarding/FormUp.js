import { useState, useContext, lazy,useEffect } from "react";
import "../font.css";
import { Button, TextField, Box, Typography } from "@mui/material";
import { UserContext } from "../User";
import { useNavigate } from "react-router-dom";
import { Alert, Link } from "@mui/material";
const VisibilityOffIcon = lazy(() =>
    import("@mui/icons-material/VisibilityOff")
);
const VisibilityIcon = lazy(() => import("@mui/icons-material/Visibility"));
const Form = ({ showerror, setError, setSeverity }) => {
    const [visi, setVisi] = useState(false);
    const { updateData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
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
            const response = await fetch("/users/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                // console.log(response);
                setError(`Error: error signin up`);
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
                Sign Up
            </Typography>
            <Box className="">
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    className="text-xs"
                />
                <div className="flex gap-2">
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
                </div>
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    className="text-xs"
                />
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
                    Create Account
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
            <Link href="/signin">Already have an Account?</Link>

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
