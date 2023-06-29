import L from "leaflet";
import React, { useEffect, useState, useRef } from 'react';
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import markerIconUrl from "./images/marker-icon.png";

let DefaultIcon = L.icon({
	iconUrl: markerIconUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const createRoutineMachineLayer = (props) => {

	const instance = L.Routing.control({
		waypoints: [
			L.latLng(props.start[0], props.start[1]),
			L.latLng(props.end[0], props.end[1])
		],
		router: L.Routing.mapbox('pk.eyJ1IjoiZGVubmlza3ciLCJhIjoiY2xoYnJiNjRqMDY3cDNtcDd5emQwdjY3ciJ9.UxYOlMmkZoYF3FzxiPSKoA'),
		lineOptions: {
			styles: [{ color: "#6FA1EC", weight: 4 }]
		},
		show: false,
		addWaypoints: false,
		routeWhileDragging: true,
		draggableWaypoints: false,
		fitSelectedRoutes: true,
		showAlternatives: false
	})

	return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);


function Router(props) {
  const [position, setPosition] = useState([]);
  const routeRef = useRef(null);

  useEffect(() => {
    setPosition([props.start, props.end]);
    if (routeRef.current) {
      routeRef.current.setWaypoints([
        L.latLng(props.start[0], props.start[1]),
        L.latLng(props.end[0], props.end[1])
      ]);
    }
  }, [props.start, props.end]);

  return (
    <>
      {position.length === 2 && <RoutingMachine ref={routeRef} start={position[0]} end={position[1]}/>}
    </>
  );
};
export default Router;
