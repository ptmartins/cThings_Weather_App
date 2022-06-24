import React, {useState, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import Weather from './Weather';

/**
 * Config Object
 */
const config = {
  api_url: 'https://api.openweathermap.org/data/2.5/weather',
  api_key: 'de26f4ecfa327f4f9014facf6489fe63'
}

function App() {

  const [location, setLocation] = useState(''),
        [weather, setWeather] = useState(undefined),
        [error, setError] = useState(false),
        [time, setTime] = useState('Day'),
        [sunTime, setSunTime] = useState(''),
        unit = 'metric',

        /**
         * Get time to Sunrise or Sunset
         */
        getSunTime = () => {
            if(weather){
              if(time === 'Day') {
                  setSunTime('Sunset in ' + new Date((weather.sys.sunset - weather.dt) * 1000).getHours() + ' hours.');
              } else {
                  setSunTime('Sunrise in ' + new Date((weather.sys.sunrise - weather.dt) * 1000).getHours() + ' hours.');
              }
            }
        },

        /**
         * Get time of day
         */
        getTimeOfDay = (weather) => {
          (weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset) ? setTime('Day') : setTime('Night');
        },

        /**
         * Get Weather
         * @param {*} query 
         */
        getWeather = (query) => {
          fetch(`${config.api_url}?q=${location}&appid=${config.api_key}&units=${unit}`)
            .then(response => {
              if(!response.ok) {
                setError(true);
              } else {
                setError(false)
                return response.json();
              }
            })
            .then(data => {
              // Check if we have data before anything else
              if(data) {
                setWeather(data);
                setLocation('');
                getTimeOfDay(data);
              }
            })
            .catch(error => console.log(error));
        };

        useEffect(() => getSunTime(), [weather]);

  return (
    <div className={time === 'Day' ? 'wApp wApp--day' : 'wApp wApp--night'}>
      <div className="wApp__container">
        <div className="wApp__units">
          <label htmlFor="">Unit</label>
          <input type="checkbox" name="" id="" />
        </div>
        <div className="wApp__searchInput">
          <input type="text" name="" id="" className='u__input' placeholder='Type location' value={location} onChange={ev => setLocation(ev.target.value)} onKeyUp={ev => {
            if(ev.key === 'Enter') {
              getWeather(location);
            }
          }}/>
          <button className={"btn btn--search " + (location === '' ? 'btn--disabled' : '')} onClick={getWeather}> <span className="search__icon"> <FaSearch/> </span> <span className="search__txt">Search</span> </button>
        </div>
          <Weather weather={weather} unit={unit} time={time} sunTime={sunTime} error={error}/> 
      </div>
    </div>
  );
}

export default App;
