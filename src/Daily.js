import React from 'react';
import './Daily.css';
import { useStateValue } from './StateProvider';

function Daily() {
  const [{ userTime, forecastDaily }] = useStateValue();

  let type = userTime >= "06" && userTime <= "19" ? "day" : "night";
  return (
        <div className="daily">
        {forecastDaily.map((day) => (
          <div className="day" key={Math.random()}>
            <div className="date">
              {
                new Date(day.observation_time.value).toLocaleString("ro-RO", {weekday: "long"}) === new Date().toLocaleString("ro-RO", {weekday: "long"}) ? 
                      "Astăzi" + " " + new Date().toLocaleString("ro-RO", {day: "numeric"}): 
                new Date(day.observation_time.value).toLocaleString("ro-RO", {weekday: "long", day: "numeric"}) 
              }
            </div>
            <div className="part">
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
  )
}

export default Daily
