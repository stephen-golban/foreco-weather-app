import React from 'react';
import './CurrentInfo.css';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useStateValue } from './StateProvider';
import Circle from 'react-circle';



function CurrentInfo() {
    const [{ weatherData }] = useStateValue();
   
    return (
        <div className="current__infoContainer">
            <div className="current__info">
            <h1>Detaliile Zilei</h1>
            <div className="day__details__container">
                <div className="item__info">
                    <div className="part">
                        <p>Ziua</p>
                        <span>Temperatura maximă va fi {Math.floor(weatherData.temp)}&deg;</span>
                    </div>
                    <div className="part">
                        <p>Noaptea</p>
                        <span>Temperatura minimă va fi {Math.floor(weatherData.temp - 6)}&deg;</span>
                    </div>
                </div>
                <div className="item__info">
                    <div className="part">
                        <p>Răsărit</p>
                        <span>
                            <Brightness7Icon/>
                            {new Date(weatherData.sunrise).toLocaleString("en-EN", {hour : "numeric", minute: "numeric"})}    
                        </span>    
                    </div>
                    <div className="part">
                        <p>Apus</p>
                        <span>
                            <Brightness4Icon/>
                            {new Date(weatherData.sunset).toLocaleString("en-EN", {hour : "numeric", minute: "numeric"})}    
                        </span>    
                    </div>
                </div>
                <div className="item__info">
                        <p>Faza Lunii</p>
                        {
                            weatherData.moon === "new" ?
                                <img src={`assets/moonIcons/new_moon.png`} alt="moon"/>: 
                            weatherData.moon === "waxing_crescent" ? 
                                <img src={`assets/moonIcons/waxing_crescent.png`} alt="moon"/> : 
                            weatherData.moon === "first_quarter" ? 
                                <img src={`assets/moonIcons/first_quarter.png`} alt="moon"/> :
                            weatherData.moon === "waxing_gibbous" ? 
                                <img src={`assets/moonIcons/waxing_gibbous.png`} alt="moon"/>:
                            weatherData.moon === "full" ? 
                                <img src={`assets/moonIcons/full_moon.png`} alt="moon"/> :
                            weatherData.moon === "waning_gibbous" ? 
                                <img src={`assets/moonIcons/waning_gibbous.png`} alt="moon"/> :
                            weatherData.moon === "last_quarter" ? 
                                <img src={`assets/moonIcons/last_quarter.png`} alt="moon"/> :
                            weatherData.moon === "waning_crescent" ? 
                                <img src={`assets/moonIcons/waning_crescent.png`} alt="moon"/> :
                                <img src={`assets/moonIcons/full_moon.png`} alt="moon"/> 
                        }
                        {
                            weatherData.moon === "new" ?
                                "Lună nouă" : 
                            weatherData.moon === "waxing_crescent" ? 
                                "Semilună crescândă" : 
                            weatherData.moon === "first_quarter" ? 
                                "Primul sfert de lună" :
                            weatherData.moon === "waxing_gibbous" ? 
                                "Creșterea lunii gibbous" :
                            weatherData.moon === "full" ?  
                                "Lună plină" :
                            weatherData.moon === "waning_gibbous" ? 
                                "lună gibboasă în scădere" :
                            weatherData.moon === "last_quarter" ?  
                                "Ultimul sfert de lună":
                            weatherData.moon === "waning_crescent" ?  
                                "Semilună în scădere":
                                "Lună"
                        }
                    </div>
                    <div className="item__info">
                        <div className="part__row">
                            <div className="part">
                                <p>Precipitații</p>
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    size={100} // Number: Defines the size of the circle.
                                    lineWidth={20} // Number: Defines the thickness of the circle's stroke. 
                                    progress={Math.floor(weatherData.precipitation)} // Number: Update to change the progress and percentage.
                                    progressColor="dodgerblue"  // String: Color of "progress" portion of circle.
                                    bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                                    textColor="white" // String: Color of percentage text color.
                                    textStyle={{ 
                                        font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                                    }}
                                    percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                />
                            </div>
                            <div className="part">
                                <p>Umiditate</p>
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    size={100} // Number: Defines the size of the circle.
                                    lineWidth={20} // Number: Defines the thickness of the circle's stroke. 
                                    progress={Math.floor(weatherData.humidity)} // Number: Update to change the progress and percentage.
                                    progressColor="dodgerblue"  // String: Color of "progress" portion of circle.
                                    bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                                    textColor="white" // String: Color of percentage text color.
                                    textStyle={{ 
                                        font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                                    }}
                                    percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="last_graph">
                <div className="part__row">
                    <div className="last__part">
                        <p>Calitatea aerului</p>
                        <span>
                            { 
                                weatherData.quality === "Good" ?
                                    "Bună" :
                                weatherData.quality === "Moderate" ?
                                    "Moderată" :
                                weatherData.quality === "Unhealthy for sensitive groups" && weatherData.quality === "Unhealthy" ?
                                    "Nesănătoasă" :
                                    weatherData.quality === "Very Unhealthy" ?
                                    "Foarte nesănătoasă" :
                                weatherData.quality === "Hazardous" ?
                                    "Riscantă" :
                                    "Nedeterminată"
                            }
                        </span>
                    </div>
                </div>
                <div className="part__row">
                    <div className="last__part">
                        <p>Vânt</p>
                        <span>
                        {
                            weatherData.windSpeed} km/h {
                            (weatherData.windSpeed>11.25 && weatherData.windSpeed<33.75) ?
                            "NNE" :
                            (weatherData.windSpeed>33.75 && weatherData.windSpeed<56.25) ?
                            "ENE":
                            (weatherData.windSpeed>56.25 && weatherData.windSpeed<78.75) ?
                            "E":
                            (weatherData.windSpeed>78.75 && weatherData.windSpeed<101.25) ?
                            "ESE":
                            (weatherData.windSpeed>101.25 && weatherData.windSpeed<123.75) ?
                            "ESE":
                            (weatherData.windSpeed>123.75 && weatherData.windSpeed<146.25) ?
                            "SE":
                            (weatherData.windSpeed>146.25 && weatherData.windSpeed<168.75) ?
                            "SSE":
                            (weatherData.windSpeed>168.75 && weatherData.windSpeed<191.25) ?
                            "S":
                            (weatherData.windSpeed>191.25 && weatherData.windSpeed<213.75) ?
                            "SSW":
                            (weatherData.windSpeed>213.75 && weatherData.windSpeed<236.25) ?
                            "SW":
                            (weatherData.windSpeed>236.25 && weatherData.windSpeed<258.75) ?
                            "WSW":
                            (weatherData.windSpeed>258.75 && weatherData.windSpeed<281.25) ?
                            "W":
                            (weatherData.windSpeed>281.25 && weatherData.windSpeed<303.75) ?
                            "WNW":
                            (weatherData.windSpeed>303.75 && weatherData.windSpeed<326.25) ?
                            "NW":
                            (weatherData.windSpeed>326.25 && weatherData.windSpeed<348.75) ?
                            "NNW":
                            "N"
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentInfo
