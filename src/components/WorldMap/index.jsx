import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CityContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Button from "../Button";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// Set map bounds.
// Allow scroll over the international date line, so users can comfortably zoom into locations near the date line.
const corner1 = L.latLng(-90, -180);
const corner2 = L.latLng(90, 180);
const bounds = L.latLngBounds(corner1, corner2);

L.Marker.prototype.options.icon = DefaultIcon;

export default function WorldMap() {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  const { cities } = useCities();

  const [mapLat, mapLng] = useUrlPosition();

  const {
    isLoading,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  // keep current map position (sync magnisim tool)
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // get geo location from useGeolocation hook
  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "isLoading" : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
        maxBounds={bounds}
        maxBoundsViscosity="1.0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <img src={city.imgUrl} alt={city.country} />
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);

  // No need UI view, then return null
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  // Click the map to show a marker at your detected location

  useMapEvents({
    click(e) {
      const {
        latlng: { lat, lng },
      } = e;

      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}
