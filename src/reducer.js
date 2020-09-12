export const initialState = {
    userTime: "",
    userLocation: "",
    userTimestamp: "",
    icon: "",
    translatedWCode: "",
    weatherData: [],
    forecastDaily: [],
    forecastHourly: [],
    hourlyArray: [],
};
const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA' :
            return { 
                ...state,
                weatherData: action.item
            };
        case 'SET_HOURLY_ARRAY' :
            return {
                ...state,
                hourlyArray: action.item
            }
        case 'SET_FORECAST_DAILY' :
            return { 
                ...state,
                forecastDaily: action.item
            };
        case 'SET_FORECAST_HOURLY' :
            return { 
                ...state,
                forecastHourly: action.item
            };
        case 'SET_ICON' :
            return { 
                ...state,
                icon: action.item
            };
        case 'SET_TRANSLATEDW' :
            return { 
                ...state,
                translatedWCode: action.item
            };
        case 'SET_LOCATION' :
            return { 
                ...state,
                userLocation: action.item
            };
        case 'SET_USER_TIMESTAMP' :
                return { 
                    ...state,
                    userTimestamp: action.item
                };
        case 'SET_USER_TIME':
            return { 
                ...state,
                userTime: action.item
            };
            
        default :
        return state;
    }
}
export default reducer;