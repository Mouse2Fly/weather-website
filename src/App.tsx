//import axios from "axios";
import React from 'react'
import { useState } from 'react'
 import fetchPlaces from './services/FetchPlaces'
 import fetchWeather from './services/FetchWeather'
import './App.css'

function App() {

    const [places, setPlaces] = useState<JSON[]>([]);
    const [placeCode, setPlaceCode] = useState("");

    const getPlaces = async () => {
        try {
            //const Response = await axios.get("/weather")
            //setPlaces(Response.data);
            const Response: JSON[] = await fetchPlaces();
            //console.log(Response);
            setPlaces(Response);
            console.log(places);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    }
    const onChangeHandler = (event) => {
        setPlaceCode(event.target.value);
};

    const activation = () => {
        if (!placeCode) return;

        fetchWeather(placeCode)
            .then((data) => {
                console.log(data.forecastTimestamps);
                // Here you can handle the weather data as needed
            })
            .catch((error) => {
                console.error("Error fetching weather:", error);
            });
    }
    

  return (
    <div>
        <button onClick={getPlaces}>Get Places</button>

        <input type="text" value={placeCode} onChange={onChangeHandler} placeholder="Search for a place" />
        <button onClick={activation}>Search</button>

    </div>
  )
}

export default App
