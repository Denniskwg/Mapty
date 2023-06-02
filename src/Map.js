import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"

const customIcon = L.icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MyMarker = props => {
  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }
  return <Marker ref={initMarker} {...props}/>
}

function Map() {
  const [position, setPosition] = useState([]);
  const [popupOpen, setPopupOpen] = useState(true);

  useEffect(()=>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("could not get your location");
    }

  }, []);

  function success (pos) {
    console.log(pos);
    const { latitude, longitude } = pos.coords;
    setPosition([latitude, longitude]);
  };

  function error(err){
    alert("Couldn't get your location");
  };
  console.log(position);
  return (
    <div>
    {position.length > 0 && (
      <MapContainer center={position} zoom={15} style={{ height: '50vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />
      <Marker position={ position } icon={customIcon}>
        <Popup open={popupOpen} autoClose={false}>You are here</Popup>
      </Marker>
      </MapContainer>
    )}
    </div>
  );
}

export default Map;
