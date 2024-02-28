import { createContext, useState } from "react";

export const LocationContext = createContext({
    location: '',
    changeLocation: ()=>{}
})

export default function LocationContextProvider({children}){
    
    const[locationState,setLocationState] = useState('Bhiwandi, Maharashtra');
    
    function changeLocation(location){
        setLocationState(location);
    }

    const ctxValue = {
        location: locationState,
        changeLocation
    }

    return(
        <LocationContext.Provider value={ctxValue}>
            {children}
        </LocationContext.Provider>
    )
}