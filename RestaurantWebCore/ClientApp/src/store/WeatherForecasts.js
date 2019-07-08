const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const requestTablesType = 'REQUEST_TABLE';
const receiveTablesType = 'RECEIVE_TABLE';
const initialState = { tables: [], forecasts: [], isLoading: false };

export const actionCreators = {
  requestWeatherForecasts: startDateIndex => async (dispatch, getState) => {    
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestWeatherForecastsType, startDateIndex });

    const url = `api/SampleData/Forecasts?startDateIndex=${startDateIndex}`;
    const response = await fetch(url);
    const forecasts = await response.json();

    dispatch({ type: receiveWeatherForecastsType, startDateIndex, forecasts });
  },

  requestTables: () => async (dispatch, getState) => {
      dispatch({ type: requestTablesType });

      const url = `api/SampleData/Tables`;
      const response = await fetch(url);
      const tables = await response.json();

      dispatch({ type: receiveTablesType, tables });
  }

};

export const reducer = (state = initialState, action) => {
 

  if (action.type === requestWeatherForecastsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true
    };
  }

  if (action.type === receiveWeatherForecastsType) {
    return {
      ...state,
        startDateIndex: action.startDateIndex,
        forecasts: action.forecasts,
      isLoading: false
    };
  }

  if (action.type === requestTablesType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true
    };
  }

  if (action.type === receiveTablesType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
        tables: [...state.tables, ...action.tables],
      isLoading: false
    };
  }


  return state;
};
