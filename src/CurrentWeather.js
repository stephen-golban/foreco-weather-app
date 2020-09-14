import React, { useEffect, useState } from 'react';
import axios from './axios';
import './CurrentWeather.css';
import requests from './requests';
import { useStateValue } from './StateProvider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Forecast from './Forecast';
import Loader from './Loader';
import CurrentInfo from './CurrentInfo';

function CurrentWeather() {
    const [time, setTime] = useState("");
    const [{ userLocation, userTimestamp, icon, weatherData, translatedWCode, hourlyArray }, dispatch] = useStateValue();
    const [location, setLocation] = useState("");
    const [localTime, setLocalTime] = useState("");
    const [wData, setWData] = useState([]);
    const [foreDaily, setForeDaily] = useState([]);
    const [hourlyDate, setHourlyDate] = useState(new Date().toLocaleString("ro-RO", {weekday: "long", day: "numeric"}));

    useEffect(() => {
        
            dispatch({
                type:"SET_USER_TIME",
                item: time,
            })
            dispatch({
                type:"SET_LOCATION",
                item: location,
            })
            dispatch({
                type:"SET_USER_TIMESTAMP",
                item: localTime
            })
            dispatch({
                type:"SET_DATA",
                item: wData
            })
            dispatch({
                type:"SET_FORECAST_DAILY",
                item: foreDaily
            })
            
        
    },[time, dispatch, location, localTime, wData, foreDaily])

    useEffect(() => {
     
             dispatch({
                type:"SET_FORECAST_HOURLY",
                item: hourlyArray.filter((hour) => {
                    return new Date(hour.observation_time.value).toLocaleString("ro-RO", {weekday: "long", day: "numeric"}).includes(hourlyDate);
                })
            })
         
    },[hourlyArray, hourlyDate, dispatch])
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            
            async function fetchData() {
                const request1 = await axios.get(`${requests.fetchRealTime}&lat=${lat}&lon=${long}`);
                const request2 = await axios.get(`${requests.fetchForecastDaily}&lat=${lat}&lon=${long}`);
                const request3 = await axios.get(`${requests.fetchForecastHourly}&lat=${lat}&lon=${long}`);
    
                
                const WeatherRes = {
                    temp: request1.data.temp.value,
                    feels: request1.data.feels_like.value,
                    pressure: request1.data.baro_pressure.value,
                    visibility: request1.data.visibility.value,
                    humidity: request1.data.humidity.value,
                    windDir: request1.data.wind_direction.value,
                    windSpeed: request1.data.wind_speed.value,
                    precipitation: request1.data.precipitation.value,
                    sunrise: request1.data.sunrise.value,
                    sunset: request1.data.sunset.value,
                    moon: request1.data.moon_phase.value,
                    airQ: request1.data.epa_aqi.value,
                    quality: request1.data.epa_health_concern.value,
                    weatherCode: request1.data.weather_code.value,
                }
                console.log(request1);
                if(request1 !== null && request2 !== null && request3 !== null) {
                    setWData(WeatherRes);
                    setForeDaily(request2.data.slice(0,5));
                    dispatch({
                        type:"SET_HOURLY_ARRAY",
                        item: request3.data
                    })
                }

    
                setTime(new Date().toLocaleString("ro-RO", {hour: "numeric"}));
                setLocalTime(new Date().toLocaleString("ro-RO", {weekday: "long", month:"long", day: "numeric", year: "numeric",hour: "numeric", minute: "numeric"}));
                return {
                    request1,
                    request2,
                    request3
                };
            }
            async function fetchCoords() {
                await fetch(`${requests.fetchCoords}&lat=${lat}&lon=${long}`,{
                    "async": true,
                    "crossDomain": true,
                    "method": "GET",
                })
                .then(response => response.json())
                .then(data => {
                    setLocation(data.display_name);
                })
            }
            fetchCoords();
            fetchData();
        })
    }, [dispatch]);
    const handleScrollToWeatherInfo = () => {
        let selectedDiv = document.querySelector(".current__infoContainer");
        selectedDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
    return (
        <>
        {!userTimestamp || !userLocation || !weatherData ? (
            <Loader/>
        ): (
            <div className="container">
            <div className="currentWeather">
                <div className="part">
                    <div className="location__info">
                        <div>
                            {userLocation === undefined || userLocation === "" ? time : userLocation}
                        </div>
                        <div>
                            {userTimestamp === undefined || userTimestamp === "" ? localTime : userTimestamp}
                        </div>
                    </div>
                    <div className="weather__info">
                        <div className="weather">
                            <img src={icon} alt="weather"/>
                            <div>
                                {translatedWCode === undefined || translatedWCode === "" ? wData.weatherCode : translatedWCode}
                            </div>
                        </div>
                        <div className="temp">
                            {weatherData.temp === undefined ? Math.floor(wData.temp) : Math.floor(weatherData.temp)}&deg;
                            <div>Se simte ca {Math.floor(weatherData.feels)}&deg;</div>
                        </div>
                    </div>
                </div>
                <div className="few__info">
                    <div>
                         Umiditate: {Math.floor(weatherData.humidity)}% 
                    </div>
                    <div>
                         Vânt: {Math.floor(weatherData.windSpeed)}     
                    </div>
                    <div>
                        Precipitații: {Math.floor(weatherData.precipitation)} mm
                    </div>
                    <span onClick={handleScrollToWeatherInfo}>Vezi mai mult {<ArrowForwardIosIcon/>}</span>
                </div>
            </div>
            <Forecast setHourlyDate={setHourlyDate}/>
            <CurrentInfo/>
        </div>
        )}
        </>
    )
 
}

export default CurrentWeather
