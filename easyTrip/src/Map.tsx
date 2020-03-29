import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import { Marker } from './Marker';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IMapProps extends RouteComponentProps{
  // zoom: number
  // center: number
}

export const SimpleMap = (props: IMapProps) => {

  const renderMarkers = (lat:number,lng:number) =>{
    return <Marker 
            lat={lat}
            lng={lng} />
  }

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
        <div style={{ height: '100%', width: '100%' }}>
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

export default withRouter(SimpleMap)