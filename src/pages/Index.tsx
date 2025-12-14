import React, { useState, useEffect, Suspense } from "react";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import axios from "axios";

const ProvinceSidebar = React.lazy(() =>
  import("../components/ProvinceSidebar").then((module) => ({
    default: module.ProvinceSidebar,
  }))
);
const Map = React.lazy(() =>
  import("../components/Map").then((module) => ({ default: module.Map }))
);

const WIAxCIT = "/WIAxCIT.svg";

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
  const [provinceData, setProvinceData] = useState<any>(null);
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [availableYears, setAvailableYears] = useState<string[]>([]);

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
        // Extract available years from the data
        const years = Object.keys(response.data).sort(
          (a, b) => Number(b) - Number(a)
        );
        setAvailableYears(years);
        if (years.length > 0) {
          setSelectedYear(years[0]); // Default to most recent year
        }
      })
      .catch((error: any) =>
        console.error("Error loading the province data:", error)
      );
  }, []);

  const handleProvinceClick = (province: string) => {
    setSelectedProvince(province);
  };

  const handleCloseSidebar = () => {
    setSelectedProvince(null);
  };

  const getProvinceData = () => {
    if (!provinceData || !selectedYear || !selectedProvince) return null;
    return provinceData[selectedYear]?.[selectedProvince];
  };

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading map...</div>}>
        {geoJsonData && (
          <Map
            geoJsonData={geoJsonData}
            onProvinceClick={handleProvinceClick}
            schools={
              selectedProvince && getProvinceData()
                ? getProvinceData()["schools"]
                : null
            }
          />
        )}
      </Suspense>
      <Suspense fallback={<div>Loading sidebar...</div>}>
        {selectedProvince && getProvinceData() && (
          <ProvinceSidebar
            province={selectedProvince || ""}
            provinceData={getProvinceData()}
            isOpen={!!selectedProvince}
            onClose={handleCloseSidebar}
            selectedYear={selectedYear}
            availableYears={availableYears}
            onYearChange={setSelectedYear}
          />
        )}
      </Suspense>
      <div className="absolute z-10 top-0 left-2 sm:top-5 sm:right-10 sm:left-auto">
        <img
          src={WIAxCIT}
          alt="WIAxCIT"
          className="lg:w-[25vw] w-[65vw]  h-auto"
        />
      </div>
    </div>
  );
};

export default Index;
