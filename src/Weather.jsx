import React, { Component } from "react";
import axios from "axios";

class Weather extends Component {

  state = {
    weatherInfo: {
      city: '',
      temperature: ''
    }
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      // get the position
      navigator.geolocation.getCurrentPosition(resolve, reject)
    });
  };

  async componentDidMount() {
    const position = await this.getPosition();
    const openCageResponse = await axios.get('https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          key: "XXXXXXX",
          q: `${position.coords.latitude}+${position.coords.longitude}`
        }
      }
    );

    const openWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          appid: "XXXX",
          units: "metric"
        }
      });

    this.setState({
      weatherInfo: {
        city: openCageResponse.data.results[0].components.city,
        temperature: openWeatherResponse.data.current.temp
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.weatherInfo && (
            <React.Fragment>
              <h1>You are in {this.state.weatherInfo.city}</h1>
              <h2>Your current temperature is {this.state.weatherInfo.temperature}°C</h2>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  };
};

export default Weather;