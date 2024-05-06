import { createContext, useState } from "react";

export const StatsMenuContext = createContext({
    menuIsOpen: true,
    toggleMenu: ()=>{}
})

export default function StatsMenuContextProvider({children}){
    const[menuIsOpen,setMenuIsOpen] = useState(false);
    function toggleMenu(){
        setMenuIsOpen( prevState => !prevState);
    }

    const ctxValue = {
        menuIsOpen,
        toggleMenu
    }

    return (
        <StatsMenuContext.Provider value={ctxValue}>
            {children}
        </StatsMenuContext.Provider>
    );
}