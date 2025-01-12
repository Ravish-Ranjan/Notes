import { useState, createContext } from "react";

const NavContext = createContext();

function NavProvider({ children }) {
    const [value, setValue] = useState(0);
    return (
        <NavContext.Provider value={{ value, setValue }}>
            {children}
        </NavContext.Provider>
    );
}

export { NavContext, NavProvider };
