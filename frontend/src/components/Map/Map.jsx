import {Loader} from '@googlemaps/js-api-loader';
import {useEffect} from 'react';
import './Map.scss'

const Map = () => {
  let map = document.getElementById('map');
  // debugger;

  const loader = new Loader({
    apiKey: "AIzaSyCndfOG0KYhZcmRF_nqN73s6yq6yzpwMck",
    version: "weekly",
    libraries: ["places"]
  });

  const mapOptions = {
    center: {
      lat: 41,
      lng: 286
    },
    zoom: 8
  };


  loader.load().then((google) => {
    new google.maps.Map(map, mapOptions)
  })
  
  return(
    <>
      <h1>Check</h1>
    </>
  )
}

export default Map

