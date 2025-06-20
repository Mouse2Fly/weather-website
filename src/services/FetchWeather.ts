const fetchWeather = async (placeCode: string) => {
    const response = await fetch(`https://proxy.corsfix.com/?https://api.meteo.lt/v1/places/${placeCode}/forecasts/long-term`);
    const data = await response.json();

    if (!data) {
        throw new Error(`Error fetching places`);
    }

    return data;

}

export default fetchWeather;