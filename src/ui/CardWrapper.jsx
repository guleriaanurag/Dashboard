import DataCard from "../components/DataCard";
import { Energy_Data, Diesel_Data, Air_Data, Water_Data } from '../assets/data'

export default function (){
    return (
        <div id="card-wrapper">
            <DataCard name={Energy_Data.name} type={Energy_Data.type} data={Energy_Data.data}/>
            <DataCard name={Diesel_Data.name} type={Diesel_Data.type} data={Diesel_Data.data}/>
            <DataCard name={Air_Data.name} type={Air_Data.type} data={Air_Data.data}/>
            <DataCard name={Water_Data.name} type={Water_Data.type} data={Water_Data.data}/>
        </div>
    );
}