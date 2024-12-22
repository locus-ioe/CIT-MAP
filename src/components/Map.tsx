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
  const isMobile = useIsMobile();

  const styles = {
    default: {
      weight: 2,
      color: "#4ca6a6",
      fillOpacity: 0.3,
    },
    highlight: {
      weight: 5,
      color: "#2DD4BFaa",
      fillOpacity: 0.5,
    },
  };

  const highlightFeature = (event: LeafletMouseEvent) => {
    const layer = event.target as LeafletGeoJSON;
    layer.setStyle(styles.highlight);
  };

  const resetHighlight = (event: LeafletMouseEvent) => {
    const layer = event.target as LeafletGeoJSON;
    layer.setStyle(styles.default);
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: LeafletGeoJSON) => {
    layer.on({
      click: () => {
        if (feature.properties && feature.properties.name) {
          onProvinceClick(feature.properties.name);
        }
      },
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

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
          style={styles.default}
        />
      )}
    </MapContainer>
  );
};
