import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const PeopleMap = ({ departamentos, usersByState }) => {
  const departamentosWithUserCount = departamentos.map((depto, index) => ({
    ...depto,
    userCount: usersByState[index] || 0,
  }));
  return (
    <>
      <div className="card">
        <div className="card-body">
          <MapContainer
            center={[-32.522779, -55.765835]}
            zoom={7}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "calc(60vh)" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {departamentosWithUserCount.map(
              ({ id, latitud, longitud, nombre, userCount }) => (
                <Marker key={id} position={[latitud, longitud]}>
                  <Popup>
                    Total censados en {nombre}: {userCount}
                  </Popup>
                </Marker>
              )
            )}
          </MapContainer>
        </div>
      </div>
    </>
  );
};
export default PeopleMap;
