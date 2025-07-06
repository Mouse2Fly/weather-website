
import './App.css'
import "./fonts/Mulish-VariableFont_wght.ttf"
import ShortWeather from './components/ShortWeather/ShortWeather'
import LongWeather from './components/LongWeather/LongWeather'
import SearchBar from './components/SearchBar/SearchBar'

function App() {

    //https://basmilius.github.io/weather-icons/index-fill.html

  return (
    <div>
        <SearchBar />
        
        <div className='weatherContainer'>
            <ShortWeather />
            <LongWeather />
        </div>

    </div>
  )
}

export default App
