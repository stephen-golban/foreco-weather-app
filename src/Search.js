import React, { useState, useEffect } from 'react';
import requests from './requests';
import './BodyStyles.css';
import './Search.css';
import axios from './axios';
import { useStateValue } from './StateProvider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


function Search() {
   const [{}, dispatch] = useStateValue();
   const [location, setLocation] = useState("");
   const [foreDaily, setForeDaily] = useState([]);
   const [wData, setWData] = useState([]);
   const [localTime, setLocalTime] = useState("");
   const [query, setQuery] = useState("");
   const [searchLocation, setSearchLocation] = useState("");
   const [autoLocations, setAutoLocations] = useState([]);

   useEffect(() => {
        
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
   },[ dispatch, location, localTime, wData, foreDaily])
    
    useEffect(() => {
        if(searchLocation !== ""){
            const searchWeather = async () => {
                    document.querySelector(".loader__body").style.display = "flex";
                setTimeout(() => {
                    document.querySelector(".loader__body").style.display = "none";
                }, 2000);
        
                // gets inserted location details {lat and long} so I can use it to get Climacell data for specified coordinates
                
                fetch(`${requests.fetchLocation}&q=${searchLocation}`,{
                    "async": true,
                    "crossDomain": true,
                    "method": "GET",
                })
                .then(response => response.json())
                .then(data => {
                    let lat = data[0].lat;
                    let long = data[0].lon;
                    setLocation(data[0].display_name);
                    
                    async function fetchData() {
                        // gets the timezone that the lat and long coordinates gives 
                        fetch(`${requests.fetchTimezone}&lat=${lat}&long=${long}`)
                        .then(res=> res.json())
                        .then(data => {
                            dispatch({
                                type:"SET_USER_TIME",
                                item: new Date(data.date_time).toLocaleString('ro-RO', {hour:"numeric"}),
                            })
                            
                            setLocalTime(new Date(data.date_time).toLocaleString('ro-RO', {weekday: "long", month:"long", day: "numeric", year: "numeric",hour: "numeric", minute: "numeric"}))
                        });
                        
                        // gets searchedLocation weather conditions and forecast
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
                            weatherCode: request1.data.weather_code.value,
                            moon: request1.data.moon_phase.value,
                        }
                        setWData(WeatherRes);
                        setForeDaily(request2.data.slice(0,5));
                        dispatch({
                            type:"SET_HOURLY_ARRAY",
                            item: request3.data
                        });
                        
                        return {
                            request1,
                            request2,
                            request3
                        }
                    }
                    fetchData();
                })   
            }
            if(searchLocation !== "" || searchLocation !== null){
                searchWeather();
            }
        }
    },[searchLocation, dispatch])
                  
    useEffect(() => {
        if(query !== "") {
            const delayDebounceFn = setTimeout(() => {
        
                const searchLocations = () => {
                  fetch(`${requests.fetchLocation}&q=${query}`,{
                      "async": true,
                      "crossDomain": true,
                      "method": "GET",
                  })
                  .then(response => response.json())
                  .then(data => {
                      setAutoLocations(data);
                  })
              }
              searchLocations();
              }, 500)
             
              return () => clearTimeout(delayDebounceFn);
        }
        
      }, [query])
   
      
         
      
    return(
        <>
        <div className="loader__body" style={{display: "none"}}>
            <img src="backgrounds/loader.svg" alt="faass" className="loader"/>
        </div>
        <div className="search__case">
            <h1 onClick={() => window.location.reload(false)}>Foreco</h1>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={autoLocations}
                getOptionLabel={option => option.display_name}
                onChange={(e,v) => setSearchLocation(v.display_name)}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Caută ..."
                    InputProps={{ ...params.InputProps, type: 'search', style: {color: "white"}}}
                />
                )}
            />
        </div>
        </>
    )
        
}

export default Search
