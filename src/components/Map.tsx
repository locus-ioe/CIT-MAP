import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, GeoJSON as LeafletGeoJSON, LeafletMouseEvent } from "leaflet";
import { useIsMobile } from "..//hooks/use-mobile";

interface MapProps {
  geoJsonData: GeoJSON.FeatureCollection;
  onProvinceClick: (provinceName: string) => void;
}

export const Map: React.FC<MapProps> = ({ geoJsonData, onProvinceClick }) => {
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const isMobile = useIsMobile();

  const onEachFeature = (feature: GeoJSON.Feature, layer: LeafletGeoJSON) => {
    layer.on({
      click: () => {
        if (layer && layer.getBounds) {
          const bounds = layer.getBounds();
          const center = bounds.getCenter(); // Get center of the clicked province
          setSelectedPosition(center); // Store the center position for the popup
          if (feature.properties && feature.properties.name) {
            onProvinceClick(feature.properties.name); // Trigger the callback to get schools data
          }
        }
      },
    });
  };

  console.log(isMobile);
  return (
    <MapContainer
      center={[28.3949, 84.124]}
      zoom={isMobile ? 7 : 8}
      style={{ height: "100vh", width: "100%", zIndex: "10" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          onEachFeature={onEachFeature}
          style={{
            weight: 2,
            color: "#3388ff",
            fillColor: "#00a3a3",
            fillOpacity: 0.1,
          }}
        />
      )}
    </MapContainer>
  );
};
