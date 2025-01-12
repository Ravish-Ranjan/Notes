import { Box, CircularProgress, Typography } from "@mui/material";
function Progress(props) {
    return (
        <Box
            className="grid place-items-center"
            style={{ position: "relative" }}
        >
            <CircularProgress variant="determinate" {...props} />
            <Box
                className="grid place-items-center"
                style={{ position: "absolute" }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "text.secondary" }}
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}
export default Progress;
