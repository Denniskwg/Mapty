import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIconPng from "./images/marker-icon.png";
import RoutingMachine from './routingmachine';
import UserForm from './userform';
import axios from 'axios';

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

function UserMap(props) {
   const [position, setPosition] = useState([]);
   const [mapKey, setMapKey] = useState(0);
   const [popupOpen, setPopupOpen] = useState(true);
   const marker = useRef(null);
   const [visible, setVisible] = useState(false);
   const [showForm, setShowForm] = useState(false);
   const [router, setRouter] = useState(false);
   const [formData, setFormData] = useState({
     name: '',
     type: 'cycling',
     weight: '',
     speed: 8,
   });

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }

  useEffect(()=> {
    if (navigator.geolocation && props.loadMap){
      navigator.geolocation.getCurrentPosition(success, error);
    }
    setMapKey((prevKey) => prevKey + 1);
    if (props.newPosition.length > 0) {
      setPosition(props.newPosition);
      setRouter(true);
    }
    if (props.newPosition.length === 0) {
      setRouter(false);
    }
    if (props.newPosition.length == 0 && props.loadMap) {
      setVisible(true);
    }
    if (props.newPosition.length === 2) {
      setVisible(false);
    }
    if (visible) {
      setTimeout(()=> {
        setVisible(false);
      }, 1000)
    }
  }, [props.loadMap, props.newPosition]);

  function success (pos) {
    const { latitude, longitude } = pos.coords;
    setPosition([[latitude, longitude], []]);
  };

  function error(err){
    alert("Couldn't get your location");
  };

  const handleMapClick = (e) => {
    if (!router) {
    setShowForm(true);
    setVisible(false);
    setPosition(prev=>{
      const arr = [];
      const arr2 = [];
      arr.push(prev[0]);
      arr2.push(e.latlng.lat);
      arr2.push(e.latlng.lng);
      arr.push(arr2);
      return arr;
    });
   }
  };
 
  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  }


  function handleSubmit(e) {
    e.preventDefault();
    if (validateData()) {
      setShowForm(false);
      setRouter(true);
      addWorkout();
      props.fetchData();
    }
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
	user_id: props.id.id,
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
      {visible && <CustomTooltip content="Click on the map to choose location" position="top"></CustomTooltip>}
      <MapContainer key={mapKey} center={position[0]} zoom={15} style={{ height: '50vh', width: '100%' }} whenReady={() => {
        setTimeout(() => {
	  if (props.loadMap) {
	    marker.current.openPopup();
	  }
        }, 1000);
      }}>
        <TileLayer
	  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	  attribution="Map data &copy; OpenStreetMap contributors"
	/>
        {props.loadMap && <Marker ref={marker} position={ position[0] } icon={customIcon}>
	  <Popup autoOpen position={ position[0] }>You are here</Popup>
	</Marker>}
	<MapClickHandler />
	{router && <RoutingMachine start={position[0]} end={position[1]}/>}
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


export default UserMap;
