import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import axios from 'axios';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

const App: React.FC = () => {
    const [schools, setSchools] = useState<any[]>([]);
    const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

    useEffect(() => {
        // Load GeoJSON data
        axios.get('maps/nepal-with-provinces.geojson')
            .then((response : any) => setGeoJsonData(response.data))
            .catch((error:any) => console.error('Error loading the GeoJSON data:', error));
    }, []);

    const handleProvinceClick = (provinceName: string) => {
        console.log("Fetching schools for:", provinceName);
        axios.get('data/schools.json')
            .then((response:any) => {
                const provinceData = response.data.Provinces.find(
                    (p: { name: string; schools: any[] }) => p.name === provinceName
                );
                console.log("Found schools:", provinceData ? provinceData.schools : "No schools found");
                setSchools(provinceData ? provinceData.schools : []);
            })
            .catch((error:any) => console.error('Error fetching schools data:', error));
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            {geoJsonData && (
                <MapComponent 
                    geoJsonData={geoJsonData} 
                    onProvinceClick={handleProvinceClick} 
                    schools={schools} 
                />
            )}
        </div>
    );
};

export default App;
