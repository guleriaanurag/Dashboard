import { useContext, useState } from "react";
import { GeoJsonLayer, IconLayer } from 'deck.gl';
import { LocationContext } from "../store/LocationContext";
import { DeckGL } from "deck.gl";
import INDIA_STATES_DATA from '../assets/states_india.json';
import LOCATION_POINTS_DATA from '../assets/factory_points.json';
import { TbFocus2 } from 'react-icons/tb'

const INITIAL_VIEW_STATE = {
    altitude: 1.5,
    bearing: 38.593439709841554,
    height: 781,
    latitude: 21.09386207284039,
    longitude: 78.08995910232979,
    maxPitch: 60,
    maxZoom: 20,
    minPitch: 0,
    minZoom: 0,
    normalize: true,
    pitch: 60,
    position: [0, 0, 0],
    width: 1341,
    zoom: 4.775953349169205,
}

export default function DeckMap() {

    const { changeLocation } = useContext(LocationContext);
    const [selectedState, setSelectedState] = useState('Maharashtra');
    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

    const getBG = (feature) => {
        const color = [[255, 0, 0, 255], [255, 255, 255, 255],];
        if (selectedState === feature.properties.st_nm) {
            return color[0];
        }
        return color[1];
    }

    const getIconPosition = d => {
        const coordinates = d.geometry.coordinates;
        const state = (d.properties.name).split(',')[1].trim();
        let elevation = 35000;
        if (state === selectedState) {
            elevation = 75000;
        }
        return [coordinates[0], coordinates[1], elevation + 1];
    };


    const getExtrusionHeight = (feature) => {
        const elevationHeight = selectedState === feature.properties.st_nm ? 45000 : 0;
        return elevationHeight;
    }

    const handleMarkerClicked = (info) => {
        const state = (info.object.properties.name).split(',')[1].trim();
        changeLocation(info.object.properties.name);
        setSelectedState(prevState => {
            if (prevState !== state) {
                return state;
            }
            return prevState;
        });
        const coordinates = info.object.geometry.coordinates;
        setViewState(prevState => {
            return { 
                ...prevState, 
                latitude: coordinates[1], 
                longitude: coordinates[0], 
                zoom: 5.5, 
                bearing: 45,
            }
        })
    }

    function handleFocusReset() {
        setViewState(INITIAL_VIEW_STATE);
    }

    const layers = [
        new GeoJsonLayer({
            id: 'country-fill',
            data: INDIA_STATES_DATA,
            filled: true,
            extruded: true,
            getFillColor: getBG,
            getElevation: getExtrusionHeight,
            pickable: false
        }),
        new GeoJsonLayer({
            id: 'state-boundaries',
            data: INDIA_STATES_DATA,
            filled: false,
            stroked: true,
            pickable: false,
            lineWidthMinPixels: 1,
            getLineColor: [0, 0, 0, 50],
        }),
        new IconLayer({
            id: 'icon-layer',
            data: LOCATION_POINTS_DATA.features,
            iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
            iconMapping: {
                marker: {
                    x: 0,
                    y: 0,
                    width: 128,
                    height: 128,
                    anchorY: 64,
                    mask: false
                }
            },
            getIcon: d => 'marker',
            sizeScale: 9,
            getPosition: getIconPosition,
            getSize: d => 3,
            pickable: true,
            onClick: handleMarkerClicked,
        })
    ];

    return (
        <div style={{ position: 'relative', height: '100vh', width: '50vw', backgroundColor: 'rgb(196,192,190)' }}>
            {(viewState !== INITIAL_VIEW_STATE) && <button className="focus-btn" title={'Reset view'} onClick={handleFocusReset}><TbFocus2 /></button>}
            <DeckGL
                key={Math.floor(Math.random() * 10000)}
                initialViewState={viewState}
                controller={{ doubleClickZoom: false, touchRotate: false, scrollZoom: true }}
                layers={layers}
                style={
                    {
                        height: '100vh',
                        width: '100%',
                        filter: 'drop-shadow(1px 5px 15px black)'
                    }}
                getTooltip={({ object }) => object && {
                    html: `${(object.properties.name).split(',')[0] || null}`,
                    style: {
                        fontSize: '18px',
                        padding: '5px',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        opacity: '0.9'
                    }
                }}
            >
            </DeckGL>
        </div>
    );
}