import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons in many setups (CDN workaround)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const iceCreamBoatIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + "/ice-cream-boat.png",
  iconSize: [50, 50],       // You can tweak these dimensions
  iconAnchor: [25, 25],     // Adjust anchor so the boat “sits” right
  popupAnchor: [0, -45],    // Where popup opens relative to icon
});


function App() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

useEffect(() => {
  const locationRef = ref(db, "boats/boat1/location");
  onValue(locationRef, (snapshot) => {
    const data = snapshot.val();
    if (data?.latitude && data?.longitude) {
      setLocation({ latitude: data.latitude, longitude: data.longitude });
    }
  });
}, []);


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {location ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap'
            url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
          />

          <Marker 
            position={[location.latitude, location.longitude]} 
            icon={iceCreamBoatIcon}
          >
            <Popup>Ice Cream Boat is here</Popup>
          </Marker>

        </MapContainer>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading ice cream boat location...</p>
      )}
    </div>
  );
}

export default App;
