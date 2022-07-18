import React from 'react'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps';

const Map = () => {

    return (
        <GoogleMap
            defaultZoom={4}
            defaultCenter={{ lat: 30.7658752, lng: 76.906496 }}
        >
        </GoogleMap>
    )

}

const MapComponent = withScriptjs(withGoogleMap(Map))

export default () => (
    <>
        <MapComponent

            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0y2S4-iE2rHkYdyAsglz_qirv0UtpF1s&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh`, width: '100%' , position :"absolute" , "top" : "40px" }} />}
            mapElement={<div style={{ height: `100%` }} />}
        // <Marker></Marker>

        />
    </>
)

