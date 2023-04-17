import {useState, useRef, useEffect} from 'react';
import './Map.scss'

const VenueMap = ({game}) => {
  const mapRef = useRef();
  const [map, setMap] = useState();
  const marker = useRef();
  const position = game.location;

  useEffect(() => {
    
    setMap(
      new window.google.maps.Map(mapRef.current,
        {
          center: position,
          zoom: 15,
          clickableI1cons: false,
          disableDefaultUI: true,
        }
      )
    );

    return () => {marker.current = null}
  }, [game]);

  useEffect(() => {
    
    marker.current = new window.google.maps.Marker({
      position: position,
      map: map
    });
  }, [map])


  return(
    <div ref={mapRef} id="map"></div>
  )
}

export default VenueMap

