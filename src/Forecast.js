import React, { useState } from 'react';
import './Forecast.css';
import { useStateValue } from './StateProvider';
import RemoveIcon from '@material-ui/icons/Remove';


function Forecast({ setHourlyDate }) {
  const [{ userTime, forecastDaily, forecastHourly }] = useStateValue();
  const type = userTime >= "06" && userTime <= "19" ? "day" : "night";
  const dayarr = ["06","07","08","09","10","11","12","13","14","15","16","17","18","19"];
  const nightarr = ["20","21","22","23","00","01","02","03","04","05"];
  const [isActive1, setIsActive1] = useState("dodgerblue");
  const [isActive2, setIsActive2] = useState("");
  const [fadeAnim, setFadeAnim] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);


  const handleOnClick = (e) => {
    setHourlyDate(e.target.innerHTML);
    setFadeAnim(true);
    if (window.matchMedia("(max-width: 768px)").matches) {
        let selectedDiv = document.querySelector(".hourly__container");
        selectedDiv.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    
  }
  const scrollToEnd = () => {
    var elmnt = document.querySelector(".hourly");
    elmnt.scrollLeft += 500;
    setIsActive1("");
    setIsActive2("dodgerblue");
  }
  const scrollToStart = () => {
    var elmnt = document.querySelector(".hourly");
    elmnt.scrollLeft -= 500;
    setIsActive1("dodgerblue");
    setIsActive2("");
  }
  return (
      <div className="forecast__container">
            <div className="daily">
                {forecastDaily.map((day, i) => (
                    <div className={`day ${activeIndex === i ? 'day__active' : ''}`} key={i} onClick={e => {handleOnClick(e); setActiveIndex(i)}} >
                    <div className="day__date">
                        { 
                            new Date(day.observation_time.value).toLocaleString("ro-RO", {weekday: "long", day: "numeric"}) 
                        }
                    </div>
                    <div className="icon">
                        {
                            day.weather_code.value === "clear" || day.weather_code.value === "mostly_clear" ?
                            <img src={`assets/${type}.svg`} alt="Wicon"/> :
                            day.weather_code.value === "partly_cloudy" ?
                            <img src={`assets/cloudy-${type}-2.svg`} alt="Wicon"/> :
                            day.weather_code.value === "mostly_cloudy" ?
                            <img src={`assets/cloudy-${type}-3.svg`} alt="Wicon"/> :
                            day.weather_code.value === "cloudy" ?
                            <img src={`assets/cloudy.svg`} alt="Wicon"/> :
                            day.weather_code.value === "drizzle" ?
                            <img src={`assets/rainy-1.svg`} alt="Wicon"/> :
                            day.weather_code.value === "ice_pellets_heavy" || day.weather_code.value === "ice_pellets" || day.weather_code.value === "ice_pellets_light" ?
                                <img src={`assets/rainy-7.svg`} alt="Wicon"/> :
                                day.weather_code.value === "rain_heavy" ?
                                <img src={`assets/rainy-6.svg`} alt="Wicon"/> :
                                day.weather_code.value === "freezing_rain_heavy" || day.weather_code.value === "freezing_rain" || day.weather_code.value === "freezing_rain_light" || day.weather_code.value === "freezing_drizzle" ?
                                <img src={`assets/rainy-4.svg`} alt="Wicon"/> :
                                day.weather_code.value === "rain" ?
                                <img src={`assets/rainy-5.svg`} alt="Wicon"/>  :
                                day.weather_code.value === "rain_light" ?
                                <img src={`assets/rainy-3.svg`} alt="Wicon"/> :
                                day.weather_code.value === "tstorm" ?
                                <img src={`assets/thunder.svg`} alt="Wicon"/> :
                                day.weather_code.value === "snow" ?
                                <img src={`assets/snowy-5.svg`} alt="Wicon"/> :
                                day.weather_code.value === "snow_light" ?
                                <img src={`assets/snowy-4.svg`} alt="Wicon"/> :
                                day.weather_code.value === "flurries" ?
                                <img src={`assets/snowy-3.svg`} alt="Wicon"/> :
                                day.weather_code.value === "snow_heavy" ?
                                <img src={`assets/snowy-6.svg`} alt="Wicon"/> :
                                day.weather_code.value === "fog" || day.weather_code.value === "fog_light" ?
                                <img src={`assets/weather.svg`} alt="Wicon"/> :
                                <img src={`assets/weather.svg`} alt="Wicon"/> 
                            }
                    </div>
                    <div className="temp">
                        <div>{Math.floor(day.temp[1].max.value)}&deg;</div>
                        <div>{Math.floor(day.temp[0].min.value)}&deg;</div>
                    </div>
                    <div className="desc">
                    {
                        day.weather_code.value === "clear" ?
                        "Cer curat" :
                        day.weather_code.value === "partly_cloudy" || day.weather_code.value === "mostly_clear" ?
                        "Parțial înnourat" :
                        day.weather_code.value === "mostly_cloudy" ?
                        "Predominant înnourat" :
                        day.weather_code.value === "cloudy" ?
                        "Înnorat" :
                        day.weather_code.value === "drizzle" ?
                        "Ploaie măruntă" :
                        day.weather_code.value === "ice_pellets_heavy" || day.weather_code.value === "ice_pellets" || day.weather_code.value === "ice_pellets_light" ?
                        "Grindină" :
                        day.weather_code.value === "rain_heavy" ?
                        "Ploaie torenţială" :
                        day.weather_code.value === "freezing_rain_heavy" || day.weather_code.value === "freezing_rain" || day.weather_code.value === "freezing_rain_light" || day.weather_code.value === "freezing_drizzle" ?
                        "Ploaie rece" :
                        day.weather_code.value === "rain" ?
                        "Ploaie"  :
                        day.weather_code.value === "rain_light" ?
                        "Ploaie ușoară" :
                        day.weather_code.value === "tstorm" ?
                        "Furtună" :
                        day.weather_code.value === "snow" ?
                        "Zăpadă" :
                        day.weather_code.value === "snow_light" ?
                        "Zăpadă ușoară" :
                        day.weather_code.value === "flurries" ?
                        "Furtună de zăpadă" :
                        day.weather_code.value === "snow_heavy" ?
                        "Zăpadă grea" :
                        day.weather_code.value === "fog" || day.weather_code.value === "fog_light" ?
                        "Ceaţă" :
                        "Nedeterminat" 
                    }
                    </div>
                </div>
                ))}
            </div>
            <div className="hourly__container">
                <div className={`hourly ${fadeAnim ? 'fade' : ''}`} onAnimationEnd={() => setFadeAnim(false)}>
                    {forecastHourly.map((hour, i) => (
                        <div className="hour" key={i}>
                            <div className="icon">
                            {
                                hour.weather_code.value === "mostly_clear" && 
                                dayarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src="assets/day.svg" alt="lol"/> :
                                hour.weather_code.value === "mostly_clear" && 
                                nightarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src="assets/night.svg" alt="lol"/> :
                                hour.weather_code.value === "clear" && 
                                dayarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src="assets/day.svg" alt="lol"/> :
                                hour.weather_code.value === "clear" && 
                                nightarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src="assets/night.svg" alt="lol"/> :
                                hour.weather_code.value === "partly_cloudy" && 
                                dayarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src={`assets/cloudy-day-2.svg`} alt="lol"/> :
                                hour.weather_code.value === "partly_cloudy" && 
                                nightarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src={`assets/cloudy-night-2.svg`} alt="lol"/> :
                                hour.weather_code.value === "mostly_cloudy" && 
                                dayarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src={`assets/cloudy-day-2.svg`} alt="lol"/> :
                                hour.weather_code.value === "mostly_cloudy" && 
                                nightarr.indexOf(new Date(hour.observation_time.value).toLocaleString("ro-RO", {hour: "numeric"})) !== -1 ?
                                <img src={`assets/cloudy-night-2.svg`} alt="lol"/> :
                                hour.weather_code.value === "cloudy" ?
                                <img src={`assets/cloudy.svg`} alt="lol"/> :
                                hour.weather_code.value === "drizzle" ?
                                <img src={`assets/rainy-1.svg`} alt="lol"/> :
                                hour.weather_code.value === "ice_pellets_heavy" || hour.weather_code.value === "ice_pellets" || hour.weather_code.value === "ice_pellets_light" ?
                                <img src={`assets/rainy-7.svg`} alt="lol"/> :
                                hour.weather_code.value === "rain_heavy" ?
                                <img src={`assets/rainy-6.svg`} alt="lol"/> :
                                hour.weather_code.value === "freezing_rain_heavy" || hour.weather_code.value === "freezing_rain" || hour.weather_code.value === "freezing_rain_light" || hour.weather_code.value === "freezing_drizzle" ?
                                <img src={`assets/rainy-4.svg`} alt="lol"/> :
                                hour.weather_code.value === "rain" ?
                                <img src={`assets/rainy-5.svg`} alt="lol"/>  :
                                hour.weather_code.value === "rain_light" ?
                                <img src={`assets/rainy-3.svg`} alt="lol"/> :
                                hour.weather_code.value === "tstorm" ?
                                <img src={`assets/thunder.svg`} alt="lol"/> :
                                hour.weather_code.value === "snow" ?
                                <img src={`assets/snowy-5.svg`} alt="lol"/> :
                                hour.weather_code.value === "snow_light" ?
                                <img src={`assets/snowy-4.svg`} alt="lol"/> :
                                hour.weather_code.value === "flurries" ?
                                <img src={`assets/snowy-3.svg`} alt="lol"/> :
                                hour.weather_code.value === "snow_heavy" ?
                                <img src={`assets/snowy-6.svg`} alt="lol"/> :
                                hour.weather_code.value === "fog" || hour.weather_code.value === "fog_light" ?
                                <img src={`assets/weather.svg`} alt="lol"/> :
                                <img src={`assets/weather.svg`} alt="lol"/>  
                            }
                            </div>

                            <div className="temp">
                                {Math.floor(hour.temp.value)}&deg;
                            </div>
                            
                            <div className="desc">
                                {
                                    hour.weather_code.value === "clear" ?
                                    "Curat" :
                                    hour.weather_code.value === "partly_cloudy" || hour.weather_code.value === "mostly_clear" || hour.weather_code.value === "mostly_cloudy" || hour.weather_code.value === "cloudy"?
                                    "Înnorat" :
                                    hour.weather_code.value === "drizzle" ?
                                    "Ploaie măruntă" :
                                    hour.weather_code.value === "ice_pellets_heavy" || hour.weather_code.value === "ice_pellets" || hour.weather_code.value === "ice_pellets_light" ?
                                    "Grindină" :
                                    hour.weather_code.value === "rain_heavy" ?
                                    "Ploaie torenţială" :
                                    hour.weather_code.value === "freezing_rain_heavy" || hour.weather_code.value === "freezing_rain" || hour.weather_code.value === "freezing_rain_light" || hour.weather_code.value === "freezing_drizzle" || hour.weather_code.value === "rain" || hour.weather_code.value === "rain_light"?
                                    "Ploaie" :
                                    hour.weather_code.value === "tstorm" ?
                                    "Furtună" :
                                    hour.weather_code.value === "snow" || hour.weather_code.value === "snow_heavy" || hour.weather_code.value === "snow_light" || hour.weather_code.value === "flurries"?
                                    "Zăpadă" :
                                    hour.weather_code.value === "fog" || hour.weather_code.value === "fog_light" ?
                                    "Ceaţă" :
                                    "Nedeterminat" 
                                }
                            </div>
                            
                            <div className="precipitation">
                            &#x2602; {hour.precipitation_probability.value}%
                            </div>
                            <div className="hour__date">
                                {
                                    new Date(hour.observation_time.value).toLocaleString("en-EN", {hour: "numeric"})
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="skip__buttons">
                <RemoveIcon onClick={scrollToStart} style={{color:isActive1}}/>
                <RemoveIcon onClick={scrollToEnd} style={{color:isActive2}}/>
            </div>
        </div>
  )
}

export default Forecast
