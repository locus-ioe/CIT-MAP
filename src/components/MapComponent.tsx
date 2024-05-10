import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, GeoJSON as LeafletGeoJSON, LeafletMouseEvent } from "leaflet";

// Define the types for the incoming props
interface School {
  id: number;
  name: string;
}

interface MapComponentProps {
  geoJsonData: GeoJSON.FeatureCollection;
  onProvinceClick: (provinceName: string) => void;
  schools: School[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  geoJsonData,
  onProvinceClick,
  schools,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const highlightFeature = (event: LeafletMouseEvent) => {
    const layer = event.target as LeafletGeoJSON;
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });
  };

  const resetHighlight = (event: LeafletMouseEvent) => {
    const layer = event.target as LeafletGeoJSON;
    layer.setStyle({
      weight: 2,
      color: "#3388ff",
      dashArray: "",
      fillOpacity: 0.5,
    });
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: LeafletGeoJSON) => {
    layer.on({
      click: () => {
        if (layer && layer.getBounds) {
          const bounds = layer.getBounds();
          const center = bounds.getCenter(); // Get center of the clicked province
          setSelectedPosition(center); // Store the center position for the popup
          if (feature.properties && feature.properties.name) {
            setSelectedProvince(feature.properties.name); // Store the province name
            onProvinceClick(feature.properties.name); // Trigger the callback to get schools data
          }
        }
      },
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

  return (
    <MapContainer
      center={[28.3949, 84.124]}
      zoom={8}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          onEachFeature={onEachFeature}
          style={{
            weight: 2,
            color: "#3388ff",
            fillColor: "#ff7800",
            fillOpacity: 0.5,
          }}
        />
      )}
      {/* Render the popup if a province is selected */}
      {selectedPosition && (
        <Popup
          position={selectedPosition}
          eventHandlers={{
            remove: () => setSelectedPosition(null), // Set null when the popup is closed
          }}
        >
          <div>
            <h2>{selectedProvince}</h2>
            <p>Schools in {selectedProvince}:</p>
            <ul>
              {schools.length > 0 ? (
                schools.map((school) => <li key={school.id}>{school.name}</li>)
              ) : (
                <li>No schools found.</li>
              )}
            </ul>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MapComponent;
