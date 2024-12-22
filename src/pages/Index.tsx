import { useEffect, useState } from "react";
import { ProvinceCard } from "../components/ProvinceCard";
import { ProvinceSidebar } from "../components/ProvinceSidebar";
import { Map } from "../components/Map";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

import axios from "axios";

const provinces = [
  "Koshi Pradesh",
  "Madhesh Pradesh",
  "Bagmati Pradesh",
  "Gandaki Pradesh",
  "Lumbini Pradesh",
  "Karnali Pradesh",
  "Sudurpashchim Pradesh",
];

const Index = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>(null);

  useEffect(() => {
    // Load GeoJSON data
    axios
      .get("maps/nepal-with-provinces.geojson")
      .then((response: any) => {
        setGeoJsonData(response.data);
      })
      .catch((error: any) =>
        console.error("Error loading the GeoJSON data:", error)
      );
  }, []);

  const handleProvinceClick = (province: string) => {
    setSelectedProvince(province);
  };

  const handleCloseSidebar = () => {
    setSelectedProvince(null);
  };

  return (
    <div className="min-h-screen">
      {geoJsonData && (
        <Map
          geoJsonData={geoJsonData}
          onProvinceClick={handleProvinceClick}
        />
      )}
      <ProvinceSidebar
        province={selectedProvince || ""}
        isOpen={!!selectedProvince}
        onClose={handleCloseSidebar}
      />
      <div className="absolute top-10 right-10 text-[#00a3a3] font-black text-5xl p-2 bg-opacity-75 z-10">
        Children In Technology
      </div>
    </div>
  );
};

export default Index;
