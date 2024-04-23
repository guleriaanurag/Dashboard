import { useContext } from "react";
import { LocationContext } from "../store/LocationContext";
import { IoChevronBackCircle,IoChevronForwardCircle } from 'react-icons/io5'
import CardWrapper from "./CardWrapper";
import { StatsMenuContext } from "../store/StatsMenuContextProvider";

export default function DashBoard(){

    const { location } = useContext(LocationContext);

    const region = location.split(',')[1].trim();
    const place = location.split(',')[0].trim();

    const { menuIsOpen,toggleMenu } = useContext(StatsMenuContext);

    const btnStyle = {
        position: "absolute",
        right: '10px',
        top: '10px'
    }

    return(
        <div id="dashboard" className="custom-scrollbar" style={{width: menuIsOpen ? '50vw' : '0vw'}}>
            <div id="head">
                <p 
                    id="back-btn"
                    onClick={toggleMenu}
                    style={menuIsOpen ? {} : btnStyle}
                >         
                    {menuIsOpen ? <IoChevronForwardCircle /> : <IoChevronBackCircle/>}
                </p>
                <div>
                    <p id="region">{region}</p>
                    <h2>{place},</h2>
                    <p style={{fontWeight: 600, marginTop: '10px'}}>Select Facility</p>
                    <p style={{color: 'grey',fontSize: 'smaller',fontStyle:'italicnpm'}}>to view details</p>
                </div>
            </div>
            <CardWrapper />
        </div>
    );
}