
import './App.css'
import "./fonts/Mulish-VariableFont_wght.ttf"
import ShortWeather from './components/ShortWeather/ShortWeather'
import LongWeather from './components/LongWeather/LongWeather'

import { useEffect, useState } from 'react';
import fetchPlaces from './services/FetchPlaces'
import fetchWeather from './services/FetchWeather'

function App() {

    //https://basmilius.github.io/weather-icons/index-fill.html

    const [placesNames, setPlacesNames] = useState<string[]>([]);
    const [placesCodes, setPlacesCodes] = useState<string[]>([]);
    const [place, setPlace] = useState<string>("");
    const [weatherData, setWeatherData] = useState<JSON>();

    // //const test: string[] = ["orange", "apple", "banana", "peach", "pineapple", "grape", "kiwi", "mango", "melon", "papaya", "pear", "plum", "pomegranate", "raspberry", "strawberry", "watermelon", "blueberry", "blackberry", "coconut", "fig", "guava", "lychee", "tangerine", "clementine", "nectarine", "apricot", "cherry"];
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // useEffect(() => {
    //     getPlaces();
    //     console.log("Fetching places...");
    // }, []);

    // const getPlaces = async () => {
    //     try {
    //         const Response = await fetchPlaces();
    //         setPlacesNames(Response.filteredNames);
    //         setPlacesCodes(Response.filteredCodes);
    //         //console.log(Response.filteredNames);
    //         //console.log(Response.filteredCodes);
    //         console.log("Places fetched successfully");
    //     } catch (error) {
    //         console.error("Error fetching places:", error);
    //     }
    // }

    const changeHandler = (event) => {
        const inputValue = event.target.value;
        setPlace(inputValue);

        if (!inputValue) {
            setSuggestions([]);
            hideSuggestionsBox();
            return;
        }

        const matchedSuggestions = placesNames.filter(item =>
            item.toLowerCase().startsWith(inputValue.toLowerCase())
        );

        setSuggestions(matchedSuggestions);

        if (matchedSuggestions.length > 0) {
            showSuggestionsBox();
        } else {
            hideSuggestionsBox();
        }
    };

    const showSuggestionsBox = () => {
        const suggestionElements = document.getElementsByClassName('searchSuggestion');
        if (suggestionElements.length > 0) {
            (suggestionElements[0] as HTMLElement).style.visibility = 'visible';
        }
    };

    const hideSuggestionsBox = () => {
        const suggestionElements = document.getElementsByClassName('searchSuggestion');
        if (suggestionElements.length > 0) {
            (suggestionElements[0] as HTMLElement).style.visibility = 'hidden';
        }
    };

    const activation = () => {
        if (!place) return;

        const CodeIndex = placesNames.findIndex(name => name === place);

        fetchWeather(placesCodes[CodeIndex])
            .then((data) => {
                //console.log(data.forecastTimestamps);
                setWeatherData(data.forecastTimestamps);
                // Here you can handle the weather data as needed
            })
            .catch((error) => {
                console.error("Error fetching weather:", error);
            });
    }

    // const selectSuggestion = (event) => {
    //     const selectedSuggestion = event.target.innerText;
    //     //console.log("Selected suggestion:", selectedSuggestion);
    //     setPlace(selectedSuggestion);
    //     setSuggestions([]);
    //     const suggestionElements = document.getElementsByClassName('searchSuggestion');
    //     if (suggestionElements.length > 0) {
    //         (suggestionElements[0] as HTMLElement).style.visibility = 'hidden';
    //     }
    // }

  return (
    <div>
        <div className='searchContainer'>
            <input type="text" className='searchInput' value={place} onChange={(e)=>changeHandler(e)} placeholder="Search for a place" />
            <button className='searchConfirm' onClick={activation}>Search</button>
            <div className='searchSuggestion'>
                {/* {
                    suggestions.map((suggestion, i) => (
                        <p onClick={selectSuggestion} id={`suggestion${i + 1}`} className='suggestion' key={i}>{suggestion}</p>
                    ))
                } */}
            </div>
        </div>
        
        <div className='weatherContainer'>
            {/* <ShortWeather weather={weatherData}/>
            <LongWeather weather={weatherData}/> */}
            <ShortWeather/>
            <LongWeather/>
        </div>

    </div>
  )
}

export default App
