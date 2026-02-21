import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "./LocationMarker";

export const MapPicker = ({ setLocation }: any) => {
  return (
    <MapContainer
      center={[13.7563, 100.5018]}
      zoom={13}
      style={{ height: "500px" }}
    >
     
      <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      <LocationMarker setLocation={setLocation} />
    </MapContainer>
  );
}