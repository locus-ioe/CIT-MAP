import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, GeoJSON as LeafletGeoJSON, LeafletMouseEvent } from "leaflet";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import imagesData from "../../public/data/images.json";

interface School {
  id: number;
  name: string;
}

interface MapComponentProps {
  geoJsonData: GeoJSON.FeatureCollection;
  onProvinceClick: (provinceName: string) => void;
  schools: School[];
}

interface Province {
  [schoolName: string]: string[];
}

interface ImageData {
  [provinceName: string]: Province;
}

const MapComponent: React.FC<MapComponentProps> = ({
  geoJsonData,
  onProvinceClick,
  schools,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showCarousel, setShowCarousel] = useState(false);

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

  const handleSchoolClick = (school: School) => {
    if (selectedProvince) {
      const images =
        (imagesData as ImageData)[selectedProvince]?.[school.name] || [];

      setSelectedImages(images);
    }

    setSelectedSchool(school);
    setShowCarousel(true);
  };

  const renderCarousel = () => {
    if (!selectedSchool || selectedImages.length === 0) return null;


    console.log(selectedImages);
    
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, // Enables automatic slide transition
      autoplaySpeed: 3000, // Time in milliseconds between slides
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 pb-12 max-w-3xl w-full relative">
          <button
            onClick={() => setShowCarousel(false)}
            className="absolute top-4 right-4 text-red-500 text-lg font-bold px-3 py-1 rounded-full"
          >
            X
          </button>
          <h2 className="text-xl font-bold text-center mb-4">
            {selectedSchool.name}
          </h2>
          <Slider {...settings}>
            {selectedImages.map((src, index) => (
              <div key={index} className="w-full h-96">
                <img
                  src={`/images/${selectedProvince}/${selectedSchool.name}/${src}`}
                  alt={`Slide ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };

  return (
    <>
      {showCarousel ? (
        renderCarousel()
      ) : (
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
                  schools.map((school, index) => (
                    <button
                      key={index}
                      onClick={() => handleSchoolClick(school)}
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
      )}
    </>
  );
};

export default MapComponent;
