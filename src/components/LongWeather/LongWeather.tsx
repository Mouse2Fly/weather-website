import './LongWeather.css';
//import weatherData from '../../services/long-term.json'; // import test data
import WeatherIcon from '../../utils/WeatherIcons';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

const LongWeather = ({ weatherData, longPrep, setLongPrep }) => { // long term weather component

    // TODO: figure out why the data of 9, 10, 12 days is showing and then repeats 12 day data 2 more times

    type daysWeather = {
        dayTemp: number;
        conditionCode: string;
        nightTemp: number;
        weekName: string;
        day: string;
    };

    const [weather, setWeather] = useState<daysWeather[]>([]);
    const [ready, setReady] = useState<boolean>(false);

    // let bool = true;
    let pastday: boolean = false;

    // week day | day time | night time
    // today | 12:00:00 | 23:00:00
    // rest of the week | 12:00:00 | 00:00:00

    const currentDayWeather = useCallback((fetchedTime: string[]) => {

        if (Number(fetchedTime[0]) > 12) { 
            pastday = true;
        }
    }, []);


    const otherDaysWeather = useCallback((fetchedDate: string[]) => {
        const weekDays: string[] = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];
        let currentDate: number = 0;
        let dayCycle: number = 0;

        let dataBox: daysWeather = {
            dayTemp: 0,
            conditionCode: "",
            nightTemp: 0,
            weekName: ""
        };
        let tempbox: number[] = []; 

        let weekName: string = "";
        let conditionCode: string = "";
        let dayTemp: number = 0;
        let nightTemp: number = 0;

        for (let i = 0; i < weatherData.forecastTimestamps.length; i++) {
            //console.log(weatherTest.forecastTimestamps[i])

            dayCycle++;

            const cycledDateTimeArray: string[] = weatherData.forecastTimestamps[i].forecastTimeUtc.split(" "); // 0: date, 1: time
            const cycledDateArray: string[] = cycledDateTimeArray[0].split("-"); // 0: year, 1: month, 2: day
            const cycledTimeArray: string[] = cycledDateTimeArray[1].split(":"); // 0: hour, 1: minute, 2: second

            const formatedDate = new Date(`${cycledDateArray[0]}-${cycledDateArray[1]}-${cycledDateArray[2]}T${cycledTimeArray[0]}:${cycledTimeArray[1]}:${cycledTimeArray[2]}`);

            if (currentDate === 7) {
                currentDate = 0;
                break;
            }

            if(cycledDateArray[1] === fetchedDate[1] && cycledDateArray[2] === fetchedDate[2] && Number(cycledTimeArray[0]) < 18) {
                continue;
            }

            if (cycledTimeArray[0] === "12" ){
                weekName = (weekDays[formatedDate.getDay()]);
                conditionCode = weatherData.forecastTimestamps[i].conditionCode;
            }

            if( Number(cycledTimeArray[0]) >= 6 && Number(cycledTimeArray[0]) <= 18) { // day time
                tempbox.push(weatherData.forecastTimestamps[i].airTemperature);
            }
            if( tempbox.length > 0 && (Number(cycledTimeArray[0]) === 18 )) { 
                let rounding: number = 0;
                for (let j = 0; j < tempbox.length; j++) {
                    rounding += tempbox[j];
                }
                rounding = Math.round(rounding / tempbox.length);
                tempbox = [];
                dayTemp = rounding;
            }

            if( Number(cycledTimeArray[0]) >= 18 && Number(cycledTimeArray[0]) <= 6) { // night time
                tempbox.push(weatherData.forecastTimestamps[i].airTemperature);
            }
            if( tempbox.length > 0 && (Number(cycledTimeArray[0]) === 6 )) { 
                let rounding: number = 0;
                for (let j = 0; j < tempbox.length; j++) {
                    rounding += tempbox[j];
                }
                rounding = Math.round(rounding / tempbox.length);
                tempbox = [];
                nightTemp = rounding;
            }

            // 6 - 18: DAY | 18 - 6 AM: NIGHT
            // day temp, day cond, night temp, week name,

            if( dayCycle === 23) {
                dataBox = {
                    dayTemp: dayTemp,
                    conditionCode: conditionCode,
                    nightTemp: nightTemp,
                    weekName: weekName,
                    day: cycledDateArray[2]
                };
                currentDate++;
                dayCycle = 0;

                console.log(dataBox);
                setWeather([...weather, dataBox]) // update weather state with new data
            }

        }
        setLongPrep(false); // set longPrep to false after processing
        setReady(true);
    }, [weatherData, weather]);

    if(ready == true){console.log(weather);}

    useEffect(() => {
        console.log(longPrep)
        console.log("LongWeather component mounted");
        if(longPrep == true){
            console.log("LongWeather component mounted2");
            const fetchedDateTimeArray: string[] = weatherData.forecastCreationTimeUtc.split(" "); // 0: date, 1: time
            const fetchedDateArray: string[] = fetchedDateTimeArray[0].split("-"); // 0: year, 1: month, 2: day
            const fetchedTimeArray: string[] = fetchedDateTimeArray[1].split(":"); // 0: hour, 1: minute, 2: second

            currentDayWeather(fetchedTimeArray);
            otherDaysWeather(fetchedDateArray);
        }
    }, [longPrep, currentDayWeather, otherDaysWeather, weatherData.forecastCreationTimeUtc]);


    // const date: Date = new Date(); // get current date
    

    return (
        <div className="longContainer">
{/* 
            {
                pastday ? 
                (
                    <div>
                        <h4>Šiandien</h4>
                        <WeatherIcon code={"01d"} alt="Weather Icon" />
                        <h4>{weatherData.forecastTimestamps[0].conditionCode}</h4>
                        <h4>{weatherData.forecastTimestamps[0].airTemperature}</h4>
                        <h4>{weatherData.forecastTimestamps[0].airTemperature}</h4>
                    </div>                    
                ) : 
                (
                    <div>
                        <h4>Šiandien</h4>
                        <WeatherIcon code={"01d"} alt="Weather Icon" />
                        <h4>{weatherData.forecastTimestamps[1].conditionCode}</h4>
                        <h4>{weatherData.forecastTimestamps[1].airTemperature}</h4>
                        <h4>{weatherData.forecastTimestamps[1].airTemperature}</h4>
                    </div> 
                )
            } */}
            {/* <div>
                <h4></h4>
                <h4></h4>
            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div> */}

        </div>
    )


}

export default LongWeather;