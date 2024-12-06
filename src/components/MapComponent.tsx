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
          maxWidth={250}
          maxHeight={250}
          position={selectedPosition}
          eventHandlers={{
            remove: () => setSelectedPosition(null), // Set null when the popup is closed
          }}
        >
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            {selectedProvince}
          </h1>
          <div className="space-y-2 pr-2">
            {schools.length > 0 ? (
              schools.map((school) => (
                <button
                  key={school.id}
                  onClick={() => {}} // Define the click handler
                  className="w-full text-left bg-blue-500 text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
                >
                  {school.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center">
                No schools found.
              </p>
            )}
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MapComponent;
