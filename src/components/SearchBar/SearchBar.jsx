import { Button, Form } from "react-bootstrap";
import stylesSearch from "./SearchBar.module.scss";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PositionSvg from "../Svgs/PositionSvg";
import { useDispatch } from "react-redux";
import { resetData, setWeatherData } from "../../feature/weather/WeatherSlice";
export const SearchBar = () => {
  const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API;
  const [cities, setCities] = useState([]);
  const [unity, setUnity] = useState("metric");
  const dispatche = useDispatch();
  const [geoLocation, setGeoLocation] = useState(undefined);

  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  };
  const hasGeoLocation = () => {
    return navigator.geolocation;
  };

  useEffect(() => {
    if (hasGeoLocation()) {
      getGeoLocation();
    }
  }, []);

  useEffect(() => {
    if (hasGeoLocation()) {
      getData();
    }
  }, [geoLocation]);
  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`
    )
      .then((reponse) => reponse.json())
      .then((json) =>
        setCities(
          json.results?.map((data) => {
            const { city, country, lat, lon, formatted } = data;
            return { city, country, lat, lon, formatted };
          })
        )
      );
  };
  const getData = () => {
    if (geoLocation) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.long}&units=${unity}&appid=${WEATHER_API_KEY}`
      )
        .then((reponse) => reponse.json())
        .then((json) => {
          const { clouds, main, name, sys, weather, wind } = json;
          dispatche(setWeatherData({ clouds, main, name, sys, weather, wind }));
        });
    }
  };

  const HandleAutocompleteSelect = (e, value) => {
    if (value !== null) {
      const { lon, lat } = value;
      setGeoLocation({
        lat: lat,
        long: lon,
      });
    } else {
      dispatche(resetData());
    }
  };
  return (
    <>
      <Form>
        <Form.Group className={stylesSearch.searchContainer}>
          <Autocomplete
            clearOnBlur={false}
            onChange={HandleAutocompleteSelect}
            className={stylesSearch.searchInput}
            getOptionLabel={(option) => option.formatted}
            renderInput={(params) => (
              <TextField
                onChange={handleInputChange}
                {...params}
                label={"Enter your city...."}
              />
            )}
            options={cities}
          />
          {geoLocation !== undefined && (
            <Button
              variant="primary"
              onClick={() => getGeoLocation()}
              size="lg"
            >
              <PositionSvg color={"rgba(255,255,255,0.7)"} />
            </Button>
          )}
        </Form.Group>
      </Form>
    </>
  );
};
