import { useEffect, useState } from "react";
import { ProvinceCard } from "../components/ProvinceCard";
import { ProvinceSidebar } from "../components/ProvinceSidebar";
import { Map } from "../components/Map";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

import axios from "axios";
import { ProvinceData } from "@/types/province";

import WIAxCIT from "/WIAxCIT.svg";

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
  const [provinceData, setProvinceData] = useState<{}>(null);
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

    axios
      .get("/data/provincesData.json")
      .then((response: any) => {
        setProvinceData(response.data);
      })
      .catch((error: any) =>
        console.error("Error loading the province data data:", error)
      );
  }, []);

  const handleProvinceClick = (province: string) => {
    setSelectedProvince(province);
  };

  const handleCloseSidebar = () => {
    setSelectedProvince(null);
  };

  const getProvinceData = () => {
    return provinceData[selectedProvince];
  };

  return (
    <div className="min-h-screen">
      {geoJsonData && (
        <Map
          geoJsonData={geoJsonData}
          onProvinceClick={handleProvinceClick}
          schools={selectedProvince ? getProvinceData()["schools"] : null}
        />
      )}
      {selectedProvince && (
        <ProvinceSidebar
          province={selectedProvince || ""}
          provinceData={getProvinceData()}
          isOpen={!!selectedProvince}
          onClose={handleCloseSidebar}
        />
      )}
      <div className="absolute -top-5 right-10 z-10">
        <img src={WIAxCIT} alt="WIAxCIT" className="w-[25vw] h-auto" />
      </div>
    </div>
  );
};

export default Index;
