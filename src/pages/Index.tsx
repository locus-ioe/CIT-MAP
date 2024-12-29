import { useEffect, useState } from "react";
import { ProvinceCard } from "../components/ProvinceCard";
import { ProvinceSidebar } from "../components/ProvinceSidebar";
import { Map } from "../components/Map";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

import axios from "axios";
import { ProvinceData } from "@/types/province";

import WIAxCIT from "/WIAxCIT.svg";
import { useParams } from "react-router-dom";

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
  const { year } = useParams();

  console.log(year);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [provinceData, setProvinceData] = useState<{}>(null);
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>(null);

  useEffect(() => {
    axios
      .get("maps/nepal-with-provinces.geojson")
      .then((response: any) => {
        setGeoJsonData(response.data);
      })
      .catch((error: any) =>
        console.error("Error loading the GeoJSON data:", error)
      );


  }, []);

  /**
   * Fetching the details of the particular year CIT
   */
  useEffect(() => {
    const fetchDetails = async () => {
      axios
        .get(`/data/${year}.json`)
        .then((response: any) => {
          setProvinceData(response.data);
        })
        .catch((error: any) =>
          console.error("Error loading the province data data:", error)
        );
    };

    fetchDetails();
  }, [year]);

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
