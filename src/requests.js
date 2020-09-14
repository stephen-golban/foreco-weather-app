const CLIMA_KEY = "BzToU6ZzXbsmHpnF3gEPAWE1Kxfl41eP";
const Time_KEY = "4529396d10b141e2964dd551f2835d1b";
const Location_KEY = "f041d2e8af5efe";


const RealTime = [
    'temp',
    'feels_like',
    'humidity',
    'wind_speed',
    'wind_direction',
    'baro_pressure',
    'precipitation',
    'sunrise',
    'sunset',
    'visibility',
    'moon_phase',
    'weather_code',
    'epa_aqi',
    'epa_health_concern'
  ]
  const Forecast = [
        'temp',
        'precipitation',
        'precipitation_probability',
        'weather_code',
    ]

export default {
    fetchRealTime: `/realtime?unit_system=si&fields=${RealTime}&apikey=${CLIMA_KEY}`,
    fetchForecastDaily: `/forecast/daily?start_time=now&unit_system=si&fields=${Forecast}&apikey=${CLIMA_KEY}`,
    fetchForecastHourly: `/forecast/hourly?start_time=now&unit_system=si&fields=${Forecast}&apikey=${CLIMA_KEY}`,
    fetchTimezone: `https://api.ipgeolocation.io/timezone?apiKey=${Time_KEY}`,
    fetchLocation: `https://api.locationiq.com/v1/autocomplete.php?key=${Location_KEY}&format=json`,
    fetchCoords:`https://us1.locationiq.com/v1/reverse.php?key=${Location_KEY}&format=json`
}