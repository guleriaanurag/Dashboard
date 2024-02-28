import { AiOutlineThunderbolt } from 'react-icons/ai'
import { FaWind } from 'react-icons/fa'
import { IoWaterOutline , IoChevronForwardOutline } from 'react-icons/io5'

export default function DataCard({name,type,data}){
    let icon;
    switch(type){
        case "Energy":
            icon = <AiOutlineThunderbolt className='icon energy-icon'/>
            break;
        case "Diesel":
            icon = <AiOutlineThunderbolt className='icon diesel-icon'/>
            break;
        case "Air":
            icon = <FaWind className='icon wind-icon'/>
            break;
        case "Water":
            icon = <IoWaterOutline className='icon water-icon'/>
            break;
        default:
            icon = <AiOutlineThunderbolt className='icon energy-icon'/>
            break;
    }
    
    return (
        <div className="card">
            <div className='card-header'>
                <div className='card-info'>
                    {icon}
                    <div>
                        <p className="card-name">{name.split(" ")[0]}</p>
                        <p className="card-name">{name.split(" ")[1]}</p>
                    </div>
                </div>
                <IoChevronForwardOutline className='forward-btn'/>
            </div>
            <div className='data-wrapper'>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <p className='data-key'>
                            {key}
                        </p>
                        <p className='data-value'>
                            <span>{value.value}</span>
                            <sup>{value.unit}</sup>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}