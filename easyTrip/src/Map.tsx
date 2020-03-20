import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import { Marker } from './Marker';


export const SimpleMap = (props: any) => {
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

    const [center, setCenter] = useState({lat: 22.396427, lng: 114.109497 });
    const [zoom, setZoom] = useState(11);
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
          <Marker
            lat={22.321550}
            lng={114.171112}
            name="My Marker"
            color="red"
          />
        </GoogleMapReact>
      </div>
    );
}