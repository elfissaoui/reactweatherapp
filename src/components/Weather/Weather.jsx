import styles from "./Weather.module.scss";

import { Card } from "react-bootstrap";
import PositionSvg from "../Svgs/PositionSvg";

import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import SpeedoMeter from "../Svgs/SpeedoMeter";
import Humidity from "../Svgs/Humidity";

import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import LightRain from "../Svgs/LightRain";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Switch } from "@mui/material";
import Cloudy from "../Svgs/Cloudy";
import Rainy from "../Svgs/Rainy";
import Sunny from "../Svgs/Sunny";
import SunnyRainy from "../Svgs/SunnyRainy";
import Windy from "../Svgs/Windy";
import Thunder from "../Svgs/Thunder";

export const Weather = () => {
  const weather = useSelector(({ weather }) => weather);

  const displayIcon = () => {
    const number = weather.weather.icon.substring(0, 2);
    console.log(number);
    switch (number) {
      case "02":
        return <Sunny width="250px" height="250px" />;
      case "03":
      case "04":
        return <Cloudy width="250px" height="250px" />;
      case "10":
        return <SunnyRainy width="250px" height="250px" />;
      case "11":
        return <Thunder width="250px" height="250px" />;
      case "50":
        return <Windy width="250px" height="250px" />;
      case "09":
        return <Rainy width="250px" height="250px" />;
      default:
        return (
          <img
            width="250px"
            height="250px"
            src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`}
          ></img>
        );
    }
  };

  return (
    <>
      <Card className={styles.container}>
        {/*JSON.stringify(weather)*/}

        {weather.isLoaded ? (
          <Card.Body>
            <Card.Title>
              {weather.name} ,{weather.sys.country}
              <PositionSvg color={"rgba(255,255,255,0.7)"} />
              <div className={styles.date}>
                <div>
                  <Moment format={"llll"} />
                </div>
                <div>
                  <Time width="15px" height="15px" />
                </div>
              </div>
            </Card.Title>
            <Switch />
            <Card.Text as={"div"} className={styles.weather_infos}>
              <div>
                {displayIcon()}

                {/*<DefaultWeather width="250px" height="250px" />*/}
              </div>
              <div className={styles.temperature}>
                <div>{weather.main.feels_like}°C</div>
                <div>
                  <Thermometer />
                </div>
              </div>
              <div>
                Good Morning {weather.name}
                <div className={styles.separator} />
              </div>

              <div className={styles.infos}>
                <div className={styles.border_right}>
                  <div>
                    <DefaultWeather color={"#fff"} width="25px" height="25px" />
                  </div>
                  <div>SUNRISE</div>
                  <div>
                    <Moment unix={true} format={"hh:mm"}>
                      {weather.sys.sunrise}
                    </Moment>
                  </div>
                </div>
                <div className={styles.border_right}>
                  <div>
                    <Wind />
                  </div>
                  <div>WIND</div>
                  <div>{weather.wind.speed}m/s</div>
                </div>
                <div className={styles.border_right}>
                  <div>
                    <SpeedoMeter color={"#fff"} />
                  </div>
                  <div>Speedometer</div>
                  <div> {weather.main.pressure}</div>
                </div>
                <div className={styles.border_right}>
                  <div>
                    <Humidity color={"#fff"} />
                  </div>
                  <div>humidity</div>
                  <div>{weather.main.humidity}</div>
                </div>
                <div>
                  <div>
                    <Thermometer color={"#fff"} width="25px" height="25px" />
                  </div>
                  <div>TEMPERATURE</div>
                  <div>{weather.main.temp_max}°C</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title>Please choose your city</Card.Title>{" "}
          </Card.Body>
        )}
      </Card>
    </>
  );
};
