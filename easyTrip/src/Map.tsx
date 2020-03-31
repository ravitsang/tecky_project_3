import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react'
import { Marker } from './Marker';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IAttraction } from './attraction/state';
import { getAllAttractions } from './attraction/actions';
import { useSelector } from 'react-redux';
import { IRootState } from './store';

interface IMapProps extends RouteComponentProps {
  // zoom: number
  // center: number
  attractions: IAttraction[]
}

export const SimpleMap = (props: IMapProps) => {

  const attractions = useSelector((state: IRootState) => state.attraction.attractions);
  const renderMarkers = (attraction: IAttraction) => {
    // console.log(attraction);
    return <Marker
      lat={attraction.lat}
      lng={attraction.lng}
      color={'Red'}
      name={attraction.name}
      key={`scheduleItem_${attraction.id}`}
    />
  }

  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

  const [center, setCenter] = useState({ lat: 22.396427, lng: 114.109497 });
  const [zoom, setZoom] = useState(11);


  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => {
        }}
        options={getMapOptions}
      >
        {attractions.map(attraction => (

          renderMarkers(attraction) 

        ))}
        {/* <Marker lat={'22.3018574'} lng={'114.1773471'} color={"Red"} name={'Hong Kong Museum of History'} /> */}
      </GoogleMapReact>
    </div>
  );
}

export default withRouter(SimpleMap)