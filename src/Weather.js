import {GrSun} from 'react-icons/gr';
import {AiOutlineCloud} from 'react-icons/ai';
import {WiDayRain, WiDayRainMix} from 'react-icons/wi';
import {TbCloudRain, TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';
import {BsCloudSun, BsCloudSnow, BsClouds} from 'react-icons/bs';
import {RiMistLine, RiThunderstormsLine} from 'react-icons/ri';


function Weather({weather, unit, time, sunTime, error}) {

    return (
        <div className="foobar">

        {weather !== undefined && !error &&
                    <div className="wApp__weather">
                        <div className="wApp__weather__main">
                            <div className="wApp__inner-container">
                                <h2 className="wApp__temperature"> {Math.round(weather.main.temp)} <span className="wApp__unit"> {unit === 'metric' ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />} </span></h2>
                                <h3 className="wApp__city"> {weather.name} , {weather.sys.country} </h3>
                                <div className="wApp__timeToSun"> {sunTime} </div>
                            </div>
                            <h2 className="wApp__icon">
                                {
                                    (() => {
                                        switch(weather.weather[0].description) {
                                            case 'clear sky':
                                                return < GrSun />
                                            case 'few clouds':
                                                return < BsCloudSun />
                                            case 'scattered clouds':
                                                return < AiOutlineCloud />
                                            case 'overcast clouds':
                                                return < BsClouds />
                                            case 'broken clouds':
                                                return < BsClouds />
                                            case 'shower rain':
                                                return < TbCloudRain />
                                            case 'rain':
                                                return < WiDayRain />
                                            case 'light rain':
                                                return < WiDayRainMix />
                                            case 'thunderstorm':
                                                return < RiThunderstormsLine />
                                            case 'snow':
                                                return < BsCloudSnow />
                                            case 'mist':
                                                return < RiMistLine />
                                            case 'haze':
                                                return < RiMistLine />
                                            default: 
                                                return ''
                                        }
                                    })()
                                }
                                <p>{weather.weather[0].main}</p>
                            </h2>
                        </div>
                        <div className="wApp__secondary">
                            <div className="wApp__secondary__item wApp__humidity"> <span>Humidity</span> {weather.main.humidity} %</div>
                            <div className="wApp__secondary__item wApp__wind"> <span>Wind</span> {(weather.wind.speed).toFixed(1)} m/s</div>
                        </div>
                    </div>   
        }

        {error &&
                <div className="wApp__error">
                    <h2>No weather data found for that location.</h2>
                    <p>Please, make sure your spelling is correct.</p>         
                </div>
                }

                </div>
            ) 
        }
 
export default Weather;