import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import axios from 'axios';

const App = () => {
    const [schools, setSchools] = useState([]);
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        // Load GeoJSON data
        axios.get('maps/nepal-with-provinces.geojson')
            .then(response => setGeoJsonData(response.data))
            .catch(error => console.error('Error loading the GeoJSON data:', error));
    }, []);

    const handleProvinceClick = (provinceName) => {
        console.log("Fetching schools for:", provinceName);
        axios.get('data/schools.json')
            .then(response => {
                const provinceData = response.data.Provinces.find(p => p.name === provinceName);
                console.log("Found schools:", provinceData ? provinceData.schools : "No schools found");
                setSchools(provinceData ? provinceData.schools : []);
            })
            .catch(error => console.error('Error fetching schools data:', error));
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <MapComponent 
                geoJsonData={geoJsonData} 
                onProvinceClick={handleProvinceClick} 
                schools={schools} 
            />
        </div>
    );
};

export default App;
