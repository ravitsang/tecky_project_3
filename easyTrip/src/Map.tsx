import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react'
import { Marker } from './Marker';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IAttraction } from './attraction/state';
import { useSelector } from 'react-redux';
import { IRootState } from './store';

interface IMapProps extends RouteComponentProps {
  zoom: number
  center: {lat:number,lng:number}
  attractions: IAttraction[]
}

export const SimpleMap = (props: IMapProps) => {

  const attractions = useSelector((state: IRootState) => state.attraction.attractions);
  const renderMarkers = (attraction: IAttraction) => {
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

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
        center={props.center}
        zoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => {
        }}
        options={getMapOptions}
      >
        {attractions.map(attraction => (

          renderMarkers(attraction) 

        ))}
      </GoogleMapReact>
    </div>
  );
}

export default withRouter(SimpleMap)