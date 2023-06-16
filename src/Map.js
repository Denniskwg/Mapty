import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIconPng from "./images/marker-icon.png";
import RoutingMachine from './routingmachine';
import axios from 'axios';
import UserForm from './userform';

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

function Map(props) {
  const [visible, setVisible] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const [position, setPosition] = useState([]);
  const marker = useRef(null);
   const [formData, setFormData] = useState({
	        name: '',
	        type: 'cycling',
	        weight: '',
	        speed: 8,
	      });

  const [showForm, setShowForm] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }

  useEffect(()=> {
    if (navigator.geolocation && props.create){
      navigator.geolocation.getCurrentPosition(success, error);
    }
    setPosition(props.position);
    setMapKey((prevKey) => prevKey + 1);
  }, [props.position, props.create]);

  function success (pos) {
    const { latitude, longitude } = pos.coords;
    setPosition([[latitude, longitude], []]);
  };

  function error(err){
    alert("Couldn't get your location");
  };

  const handleMapClick = (e) => {
    if (props.create) {
      console.log(e.latlng);
      setPosition(prev=>{
	const arr = [];
	const arr2 = [];
	arr.push(prev[0]);
	arr2.push(e.latlng.lat);
        arr2.push(e.latlng.lng);
	arr.push(arr2);
        return arr;
      });
      setShowForm(true);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validateData()) {
      addWorkout();
    }
    setShowForm(false);
  }

  function validateData() {
    let check1 = true;
    let check2 = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        check1 = false;
      }
    });
    if (position.length == 2) {
	check2 = true;
    }
    return (check1 && check2);
  }

  const addWorkout = async () => {
    console.log(props.id);
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const response = await axios.post("http://localhost:8000/v1/workouts/", {
        name: formData.name,
	type: formData.type,
	coords_start: position[0],
	coords_end: position[1],
	date: formattedDate,
	user_id: props.id,
	});

      console.log(response.data);
    } catch (error){
      console.error(error);
    }
  }

  return (
    <div style={{position: 'relative'}}> 
      {position.length > 0 && (
      <div style={{position: 'relative'}}>
      <MapContainer key={mapKey} center={position[0]} zoom={15} style={{ height: '50vh', width: '100%' }} whenReady={()=>{
	setTimeout(()=>{
          if (props.create) {
	    marker.current.openPopup();
	  }
	  }, 1000);
	setTimeout(()=>{
	  if (props.create) {
            setVisible(false);
	  }
	}, 10000);
      }}>
        <TileLayer
	  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	  attribution="Map data &copy; OpenStreetMap contributors"
	/>
	{props.create && <Marker ref={marker} position={ position[0] } icon={customIcon}>
	  <Popup autoOpen position={ position[0] }>You are here</Popup>
	</Marker>}
	{props.create && visible && <CustomTooltip content="Click on the map to select location" position="top"></CustomTooltip>}
	{position.length > 1 && <RoutingMachine start={position[0]} end={position[1]}/>}
	<MapClickHandler />
      </MapContainer>
      </div>
      )}
      {showForm && <UserForm submit={handleSubmit} data={formData} change={handleChange} setShowForm={setShowForm}/>}
    </div>
  );
};

function CustomTooltip({ content, position }) {
  return (
    <div className={`custom-tooltip ${position}`}>
      <div className="custom-tooltip-content">{content}</div>
    </div>
);
};

export default Map;
