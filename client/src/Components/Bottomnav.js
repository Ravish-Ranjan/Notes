import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Bottomnav({ handleAdd }) {
    return (
        <Box
            className="absolute bottom-0 shadow-2xl w-dvw h-14 flex justify-around align-top bg-white p-1"
            style={{ boxShadow: "0 -1px .5rem #00000055" }}
        >
            <button
                className="border-none bg-blue-500 rounded-full aspect-square"
                onClick={handleAdd}
                label="Add Note"
                style={{ height: "95%" }}
            >
                <AddIcon className="w-full text-white h-10" />
            </button>
        </Box>
    );
}
