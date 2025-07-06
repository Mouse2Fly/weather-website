import { useState, useEffect } from 'react'
import fetchPlaces from '../../services/FetchPlaces'
import fetchWeather from '../../services/FetchWeather'
import "./SearchBar.css"

const SearchBar = () => {

    const [placesNames, setPlacesNames] = useState<string[]>([]);
    const [placesCodes, setPlacesCodes] = useState<string[]>([]);
    const [placeCode, setPlaceCode] = useState<string>("");

    const test: string[] = ["orange", "apple", "banana", "peach", "pineapple", "grape", "kiwi", "mango", "melon", "papaya", "pear", "plum", "pomegranate", "raspberry", "strawberry", "watermelon", "blueberry", "blackberry", "coconut", "fig", "guava", "lychee", "tangerine", "clementine", "nectarine", "apricot", "cherry"];
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // useEffect(() => {
    //     getPlaces();
    //     console.log("Fetching places...");
    // }, []);

    const getPlaces = async () => {
        try {
            const Response = await fetchPlaces();
            setPlacesNames(Response.filteredNames);
            setPlacesCodes(Response.filteredCodes);
            //console.log(Response.filteredNames);
            //console.log(Response.filteredCodes);
            console.log("Places fetched successfully");
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    }

    const changeHandler = async (event) => {
        setPlaceCode(event.target.value);
        //setSuggestions([]);
        //console.log(suggestions)
        console.log("Input value changed: " + event.target.value);
        //fetchHandled(event.target.value);
        // for (let i = 0; i < placesNames.length; i++) {
        //     if (placesNames[i].toLowerCase().includes(event.target.value.toLowerCase())) {
        //         setTest((prev) => {
        //             const newTest = [...prev];
        //             newTest[i] = placesNames[i];
        //             return newTest;
        //         });
        //     }
        // }
        //const gap: string[] = [];
        for (let i = 0; i < test.length; i++) {
            if (test[i].toLowerCase().startsWith(event.target.value.toLowerCase()) && test[i].toLowerCase().includes(event.target.value.toLowerCase())) {
                if (suggestions.includes(test[i])) {
                    continue;
                }
                //gap.push(test[i]);

                setSuggestions(suggestions => [...suggestions, test[i]]);

                //console.log("gap: ");
                //console.log(gap);
                //console.log("Suggestions loop: " + i);
                //console.log(suggestions)
                
            }
            else {
                if(suggestions.includes(test[i])) {
                    setSuggestions(suggestions => suggestions.filter(suggestion => suggestion !== test[i]));
                }
            }
        }
        //setSuggestions(gap)
        console.log(suggestions)

        if (suggestions.length > 0) {
            const suggestionElements = document.getElementsByClassName('searchSuggestion');
            if (suggestionElements.length > 0) {
                (suggestionElements[0] as HTMLElement).style.visibility = 'visible';
            }
        }

        if (event.target.value === "") {
            setSuggestions([]);
            const suggestionElements = document.getElementsByClassName('searchSuggestion');
            if (suggestionElements.length > 0) {
                (suggestionElements[0] as HTMLElement).style.visibility = 'hidden';
            }
        }
    };

    // const fetchHandled = (typedData: string) => {
    //     console.log("fetchHandled called with: " + typedData);
    //     for (let i = 0; i < test.length; i++) {
    //         if (test[i].toLowerCase().startsWith(typedData.toLowerCase())) {
    //             if (suggestions.includes(test[i])) {
    //                 continue;
    //             }
    //             const gap: string[] = [];
    //             gap.push(test[i]);
    //             console.log("gap: ");
    //             console.log(gap);
    //             setSuggestions(gap);
    //             console.log("Suggestions loop: " + i);
    //             console.log(suggestions)
                
    //         }
    //     }
    // }

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

    const selectSuggestion = (event) => {
        const selectedSuggestion = event.target.innerText;
        //console.log("Selected suggestion:", selectedSuggestion);
        setPlaceCode(selectedSuggestion);
        setSuggestions([]);
        const suggestionElements = document.getElementsByClassName('searchSuggestion');
        if (suggestionElements.length > 0) {
            (suggestionElements[0] as HTMLElement).style.visibility = 'hidden';
        }
    }

    return (
        <div className='searchContainer'>
            <input type="text" className='searchInput' value={placeCode} onChange={(e)=>changeHandler(e)} placeholder="Search for a place" />
            <button className='searchConfirm' onClick={activation}>Search</button>
            <div className='searchSuggestion'>
                {
                    suggestions.map((suggestion, i) => (
                        <p onClick={selectSuggestion} id={`suggestion${i + 1}`} className='suggestion' key={i}>{suggestion}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchBar;