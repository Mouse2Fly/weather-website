import './ShortWeather.css';

const ShortWeather = () => { // short term weather component


    return (
        <div className="shortContainer">
            {/* <h2 className='boxDate'>Today</h2>
            <h1 className='boxTemp'>25°C</h1>
            <p className='boxCondition'>Cloudy</p>
            <p className='boxHumidity'>Humidity: 21%</p>
            <p className='boxSpeed'>Wind Speed: 2 m/s</p> */}

            <div className='mainWeather'></div>
            <div className='timedWeather'></div>
            <div className='extraWeather'></div>
                
        </div>
    )


}

export default ShortWeather;