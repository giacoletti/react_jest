import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {

  const [weatherInfo, setWeatherInfo] = useState({});

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    });
  };

  useEffect(() => {
    getPosition().then(async position => {
      //query the API
      const openCageResponse = await axios.get('https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            key: process.env.REACT_APP_OPEN_CAGE_API_KEY,
            q: `${position.coords.latitude}+${position.coords.longitude}`
          }
        }
      );

      const openWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/onecall',
        {
          params: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
            exclude: "minutely",
            units: "metric"
          }
        });

      const data = {
        city: openCageResponse.data.results[0].components.city,
        temperature: openWeatherResponse.data.current.temp
      };

      setWeatherInfo(data);

    });

  }, []);

  return (
    <React.Fragment>
      {
        weatherInfo && (
          <React.Fragment>
            <h1>You are in {weatherInfo.city}</h1>
            <h2>Your current temperature is {weatherInfo.temperature}°C</h2>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
};

export default Weather;


// import React, { Component } from "react";
// import axios from "axios";

// class Weather extends Component {

//   state = {
//     weatherInfo: {
//       city: '',
//       temperature: ''
//     }
//   }

//   getPosition() {
//     return new Promise((resolve, reject) => {
//       // get the position
//       navigator.geolocation.getCurrentPosition(resolve, reject)
//     });
//   };

//   async componentDidMount() {
//     const position = await this.getPosition();
//     const openCageResponse = await axios.get('https://api.opencagedata.com/geocode/v1/json',
//       {
//         params: {
//           key: "XXXXXXX",
//           q: `${position.coords.latitude}+${position.coords.longitude}`
//         }
//       }
//     );

//     const openWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/onecall',
//       {
//         params: {
//           lat: position.coords.latitude,
//           lon: position.coords.longitude,
//           appid: "XXXX",
//           units: "metric"
//         }
//       });

//     this.setState({
//       weatherInfo: {
//         city: openCageResponse.data.results[0].components.city,
//         temperature: openWeatherResponse.data.current.temp
//       }
//     });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         {
//           this.state.weatherInfo && (
//             <React.Fragment>
//               <h1>You are in {this.state.weatherInfo.city}</h1>
//               <h2>Your current temperature is {this.state.weatherInfo.temperature}°C</h2>
//               <h1>{process.env.REACT_APP_FOO}</h1>
//               <h1>{process.env.REACT_APP_BAR}</h1>
//               <h1>{process.env.REACT_APP_OPEN_WEATHER_API_KEY}</h1>
//             </React.Fragment>
//           )
//         }
//       </React.Fragment>
//     );
//   };
// };

// export default Weather;