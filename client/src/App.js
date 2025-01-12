import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormIn from "./Onboarding/FormIn";
import FormUp from "./Onboarding/FormUp";

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto Condensed", sans-serif',
        h1: { fontFamily: '"Roboto Condensed", sans-serif' },
        h2: { fontFamily: '"Roboto Condensed", sans-serif' },
        h3: { fontFamily: '"Roboto Condensed", sans-serif' },
        h4: { fontFamily: '"Roboto Condensed", sans-serif' },
        h5: { fontFamily: '"Roboto Condensed", sans-serif' },
        h6: { fontFamily: '"Roboto Condensed", sans-serif' },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/signin" element={<FormIn />} />
                <Route path="/signup" element={<FormUp />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
