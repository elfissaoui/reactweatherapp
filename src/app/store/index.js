import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from "../../feature/weather/WeatherSlice";

export const store = configureStore({
  reducer: {
    weather: WeatherSlice,
  },
});
