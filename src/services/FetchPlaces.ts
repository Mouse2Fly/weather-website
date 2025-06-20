const fetchPlaces = async () => {
    const response = await fetch(`https://proxy.corsfix.com/?https://api.meteo.lt/v1/places/LT`);
    const data = await response.json();

    if (!data) {
        throw new Error(`Error fetching places`);
    }

    return data;

}

export default fetchPlaces;