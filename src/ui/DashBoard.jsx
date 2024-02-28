import { useContext } from "react";
import { LocationContext } from "../store/LocationContext";
import { IoChevronBackCircle } from 'react-icons/io5'
import CardWrapper from "./CardWrapper";

export default function DashBoard(){

    const { location } = useContext(LocationContext);

    const region = location.split(',')[1].trim();
    const place = location.split(',')[0].trim();

    return(
        <div id="dashboard" className="custom-scrollbar">
            <div id="head">
                <p id="back-btn"> <IoChevronBackCircle/> </p>
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