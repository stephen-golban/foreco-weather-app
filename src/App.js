import React, { useEffect, useState} from 'react';
import './App.css';
import './BodyStyles.css';
import CurrentWeather from './CurrentWeather';
import Header from './Header';
import { useStateValue } from './StateProvider';
import Loader from './Loader';

function App() {
  const [{ weatherData, userTime }, dispatch] = useStateValue();
  const [wIcon, setWIcon] = useState("");
  const [romanianW, setRomanianW] = useState("");
  
  // changing the body background in dependece of the weather_code (weather)
  useEffect(() => {
    let type = userTime >= "06" && userTime <= "19" ? "day" : "night"
    if(weatherData.weatherCode === "tstorm") {
        document.body.style.backgroundImage = "url('/backgrounds/thunderstorm.jpg')";
        document.body.classList.add("bodySettings");
    } else if (weatherData.weatherCode === "freezing_rain_heavy" ||
               weatherData.weatherCode === "freezing_rain" ||
               weatherData.weatherCode === "freezing_rain_light" ||
               weatherData.weatherCode === "freezing_drizzle" ||
               weatherData.weatherCode === "rain_heavy" ||
               weatherData.weatherCode === "rain" ||
               weatherData.weatherCode === "rain_light" ||
               weatherData.weatherCode === "drizzle" ) {
        document.querySelector(".app").classList.add("animationRain");
        document.body.style.backgroundImage = `url(/backgrounds/overcast-${type}.jpg)`;
        document.body.classList.add("bodySettings");
    } else if (weatherData.weatherCode === "clear" && userTime >= "18" && userTime < "20") {
        document.body.style.backgroundImage = 'url(/backgrounds/dusk.jpg)';
        document.body.classList.add("bodySettings");
    } else if ( weatherData.weatherCode === "snow_heavy" ||
                weatherData.weatherCode === "snow" ||
                weatherData.weatherCode === "snow_light" ||
                weatherData.weatherCode === "flurries" ||
                weatherData.weatherCode === "ice_pellets_heavy" ||
                weatherData.weatherCode === "ice_pellets" ||
                weatherData.weatherCode === "ice_pellets_light" ) {
        document.querySelector(".app").classList.add("animationSnow");
        document.body.style.backgroundImage = `url(/backgrounds/overcast-${type}.jpg)`;
        document.body.classList.add("bodySettings");
    } else if (weatherData.weatherCode === "mostly_cloudy") {
        document.body.style.backgroundImage = `url(/backgrounds/overcast-${type}.jpg)`;
        document.body.classList.add("bodySettings");
    } else if ( weatherData.weatherCode === "partly_cloudy" ||
                weatherData.weatherCode === "cloudy" ||
                weatherData.weatherCode === "mostly_clear") {
        document.body.style.backgroundImage = `url(/backgrounds/cloudy-${type}.jpg)`;
        document.body.classList.add("bodySettings");
    } else if (weatherData.weatherCode === "clear" ) {
        document.body.style.backgroundImage = `url(/backgrounds/clear-${type}.jpg)`;
        document.body.classList.add("bodySettings");
    } else {
        document.body.style.backgroundColor = "#17315A";
        
    }

},[weatherData, userTime]);
useEffect(() => {
  let type = userTime >= "06" && userTime <= "19" ? "day" : "night";
  dispatch({
    type: "SET_ICON",
    item: wIcon
  })
  userTime >= "18" && userTime <= "20" && weatherData.weatherCode === "clear" ?
      setWIcon(`assets/cloudy-day-2.svg`) :
  userTime >= "18" && userTime <= "20" && weatherData.weatherCode === "mostly_clear" ?
      setWIcon(`assets/cloudy-day-2.svg`) :
  weatherData.weatherCode === "clear" || weatherData.weatherCode === "mostly_clear" ?
      setWIcon(`assets/${type}.svg`) :
  weatherData.weatherCode === "partly_cloudy" ?
      setWIcon(`assets/cloudy-${type}-2.svg`) :
  weatherData.weatherCode === "mostly_cloudy" ?
      setWIcon(`assets/cloudy-${type}-3.svg`) :
  weatherData.weatherCode === "cloudy" ?
      setWIcon(`assets/cloudy.svg`) :
  weatherData.weatherCode === "drizzle" ?
      setWIcon(`assets/rainy-1.svg`) :
  weatherData.weatherCode === "ice_pellets_heavy" || weatherData.weatherCode === "ice_pellets" || weatherData.weatherCode === "ice_pellets_light" ?
      setWIcon(`assets/rainy-7.svg`) :
  weatherData.weatherCode === "rain_heavy" ?
      setWIcon(`assets/rainy-6.svg`) :
  weatherData.weatherCode === "freezing_rain_heavy" || weatherData.weatherCode === "freezing_rain" || weatherData.weatherCode === "freezing_rain_light" || weatherData.weatherCode === "freezing_drizzle" ?
      setWIcon(`assets/rainy-4.svg`) :
  weatherData.weatherCode === "rain" ?
      setWIcon(`assets/rainy-5.svg`)  :
  weatherData.weatherCode === "rain_light" ?
      setWIcon(`assets/rainy-3.svg`) :
  weatherData.weatherCode === "tstorm" ?
      setWIcon(`assets/thunder.svg`) :
  weatherData.weatherCode === "snow" ?
      setWIcon(`assets/snowy-5.svg`) :
  weatherData.weatherCode === "snow_light" ?
      setWIcon(`assets/snowy-4.svg`) :
  weatherData.weatherCode === "flurries" ?
      setWIcon(`assets/snowy-3.svg`) :
  weatherData.weatherCode === "snow_heavy" ?
      setWIcon(`assets/snowy-6.svg`) :
  weatherData.weatherCode === "fog" || weatherData.weatherCode === "fog_light" ?
      setWIcon(`assets/weather.svg`) :
      setWIcon(`assets/weather.svg`) 
}, [weatherData,userTime, dispatch, wIcon]);

useEffect(() => {
    dispatch({
        type: "SET_TRANSLATEDW",
        item: romanianW
      })
    weatherData.weatherCode === "clear" ?
        setRomanianW("Cer curat") :
    weatherData.weatherCode === "partly_cloudy" || weatherData.weatherCode === "mostly_clear" ?
        setRomanianW("Parțial înnourat") :
    weatherData.weatherCode === "mostly_cloudy" ?
        setRomanianW("Predominant înnourat") :
    weatherData.weatherCode === "cloudy" ?
        setRomanianW("Înnorat") :
    weatherData.weatherCode === "drizzle" ?
        setRomanianW("Ploaie măruntă") :
    weatherData.weatherCode === "ice_pellets_heavy" || weatherData.weatherCode === "ice_pellets" || weatherData.weatherCode === "ice_pellets_light" ?
        setRomanianW("Grindină") :
    weatherData.weatherCode === "rain_heavy" ?
        setRomanianW("Ploaie torenţială") :
    weatherData.weatherCode === "freezing_rain_heavy" || weatherData.weatherCode === "freezing_rain" || weatherData.weatherCode === "freezing_rain_light" || weatherData.weatherCode === "freezing_drizzle" ?
        setRomanianW("Ploaie rece") :
    weatherData.weatherCode === "rain" ?
        setRomanianW("Ploaie")  :
    weatherData.weatherCode === "rain_light" ?
        setRomanianW("Ploaie ușoară") :
    weatherData.weatherCode === "tstorm" ?
        setRomanianW("Furtună") :
    weatherData.weatherCode === "snow" ?
        setRomanianW("Zăpadă") :
    weatherData.weatherCode === "snow_light" ?
        setRomanianW("Zăpadă ușoară") :
    weatherData.weatherCode === "flurries" ?
        setRomanianW("Furtună de zăpadă") :
    weatherData.weatherCode === "snow_heavy" ?
        setRomanianW("Zăpadă grea") :
    weatherData.weatherCode === "fog" || weatherData.weatherCode === "fog_light" ?
        setRomanianW("Ceaţă") :
        setRomanianW("") 
},[weatherData, dispatch, romanianW]);

  return (
    <div className="app">
      {userTime === "" ? <Loader/> : <Loader/> && <Header/>}
      <CurrentWeather/>
      <p className="footer">Făcut cu multă pasiune de <a href="https://stefan-golban.netlify.app" target="_blank" rel="noopener noreferrer">Golban Ştefan</a></p>
    </div>
  );
}

export default App;
