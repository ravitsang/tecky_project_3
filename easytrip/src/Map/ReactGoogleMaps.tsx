import React, { useCallback } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { MarkerClusterComponent } from './MarkerClusterer';
import { Spinner } from 'reactstrap';



const { API_KEY } = process.env;

declare global {
    interface Window { google: { maps: { ControlPosition: { RIGHT_CENTER: '' } } }; }
}

const google = window.google //= window.google ? window.google : {}


const options = {
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER // ,
        // ...otherOptions
    }
}

export function ReactGoogleMaps() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY // ,
        // ...otherOptions
    })

    const renderMap = () => {
        // wrapping to a function is useful in case you want to access `window.google`
        // to eg. setup options or create latLng object, it won't be available otherwise
        // feel free to render directly if you don't need that
        const onLoad = useCallback(
            function onLoad(mapInstance) {
                // do something with map Instance
            }, []
        )
        return <GoogleMap
            options={options}
            onLoad={onLoad}
        >
            {
                <MarkerClusterComponent/>
            }
        </GoogleMap>
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() : <Spinner />
}