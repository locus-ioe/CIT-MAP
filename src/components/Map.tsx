import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, GeoJSON as LeafletGeoJSON, LeafletMouseEvent } from "leaflet";
import { useIsMobile } from "..//hooks/use-mobile";
import { SchoolInfo } from "@/types/province";
import L from "leaflet";

interface MapProps {
  geoJsonData: GeoJSON.FeatureCollection;
  onProvinceClick: (provinceName: string) => void;
  schools?: SchoolInfo[];
}

export const Map: React.FC<MapProps> = ({
  geoJsonData,
  onProvinceClick,
  schools,
}) => {
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

  const customIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={[28.3949, 84.124]}
      zoom={isMobile ? 7 : 8}
      style={{ height: "100vh", width: "100%", zIndex: "10" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Custom Zoom Control */}
      <CustomZoomControl />

      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          onEachFeature={onEachFeature}
          style={styles.default}
        />
      )}

      {schools &&
        schools.map((school, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(school.coordinates.lat),
              lng: parseFloat(school.coordinates.lng),
            }}
            icon={customIcon}
          >
            <Popup>
              <div className="text-center">
                <strong className="text-teal-500 text-sm">{school.name}</strong>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

const CustomZoomControl = () => {
  const map = useMap();

  React.useEffect(() => {
    // Add zoom control in the top-right position
    const zoomControl = L.control.zoom({
      position: "bottomright",
    });

    // Add the zoom control to the map
    zoomControl.addTo(map);

    // Cleanup on component unmount
    return () => {
      map.removeControl(zoomControl);
    };
  }, [map]);

  return null;
};
