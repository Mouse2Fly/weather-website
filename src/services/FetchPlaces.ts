const fetchPlaces = async () => {
    const response = await fetch(`https://proxy.corsfix.com/?https://api.meteo.lt/v1/places`);
    const data = await response.json();

    if (!data) {
        throw new Error(`Error fetching places`);
    }

    const filteredCodes: string[] = []
    const filteredNames: string[] = []

    for (let i = 0; i < data.length; i++) { // Filter only places in Lithuania
        if (data[i].countryCode === "LT") { // There are also data from Latvia and Estonia
            filteredCodes.push(data[i].code);
        }
    }

    for (let i = 0; i < data.length; i++) { // Filter only places in Lithuania
        if (data[i].countryCode === "LT") { // There are also data from Latvia and Estonia
            filteredNames.push(data[i].name);
        }
    }

    return { filteredCodes, filteredNames };

}

export default fetchPlaces;