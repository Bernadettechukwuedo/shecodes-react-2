import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

import { RevolvingDot } from 'react-loader-spinner'

export default function Weather() {
    const [weatherData, setData] = useState({});
    const [country, setCountry] = useState("Nigeria");
    const [ready, setReady] = useState(false);
    const [Temperature, setTemperature] = useState(weatherData.temperature);
    const [error, setError] = useState(null);

    const newdate = new Date(weatherData.date * 1000);
    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let minute = newdate.getMinutes();
    let hours = newdate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minute < - 10) {
        minute = `0${minute}`
    }
    function showweather(response) {

        setData({
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            name: response.data.name,
            wind: response.data.wind.speed,
            description: response.data.weather[0].description,
            iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            date: response.data.dt,

        });

        setTemperature(Math.round(response.data.main.temp));
        setReady(true);
    }
    function search() {
        const apiKey = "bd3bb6534458ba51b48c49f5155745b6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;
        axios.get(url).then(showweather)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // handling error
        try {
            // Your API call with Axios
            const apiKey = "bd3bb6534458ba51b48c49f5155745b6";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;
            await axios.get(url);



        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError(`'${country}' is an invalid Country`);
            } else {
                setError('An error occurred while fetching data.');
            }
        }
        search();
    };




    function handlechangeCity(event) {
        setCountry(event.target.value);
        setError(null);

    }

    function showtemperature(event) {
        event.preventDefault();
        setTemperature(Math.round(weatherData.temperature * (9 / 5) + 32));

    }
    function showcelsius(event) {
        event.preventDefault();
        setTemperature(Math.round(weatherData.temperature));

    }

    /* html structure */
    if (ready) {
        return (<div className="weather"> <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-9">
                    <input type="search" placeholder="Enter a city .." className="form-control" id="search" autoFocus="on" value={country} onChange={handlechangeCity} required />
                </div> <div className="col-3 fw-bold"><button type="submit" value="Search" className="btn" id="submit" > Search </button>
                </div>
            </div></form>
            {error && <div className="error-message">{error}</div>}
            <div className="container">
                <div className="row">
                    <div className="col-md-7" ><h1 className="country">{weatherData.name} </h1></div>
                    <div className="col-md-5" id="temperature"><div className="temperature-value"><img className="emoji" src={weatherData.iconUrl} alt="weatherimage" />{Temperature}</div> <div className="unit"><a href="/" onClick={showcelsius}>°C</a> | <a href="/" onClick={showtemperature}>°F</a> </div></div>
                </div></div>
            <div className="d-flex justify-content-around" id="weather-content" >
                <div id="weather-content-1"><p>Humidity: {weatherData.humidity}% </p>
                    <p>Wind: {weatherData.wind}km/h </p>
                </div>

                <div id="weather-content-2"> <p>{day[newdate.getDay()]} {hours}:{minute}</p>
                    <p className="text-capitalize">Description: {weatherData.description} </p></div>
            </div>

            <footer className="text-center " id="project-footer">This project was coded by Bernadette Chukwuedo and is open-sourced on <a href="https://github.com/Bernadettechukwuedo/shecodes-react-2" target="blank" rel="noreferrer" >GitHub</a> and hosted on <a href="https://bernadette-weather-website.netlify.app/" target="blank" rel="noreferrer" >Netlify</a></footer></div >)

    } else {

        search();
        return (<div><div className="Loader"><RevolvingDot
            visible={true}
            height="80"
            width="80"
            color=" #0f5a9c"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
        /> </div><div className="text-center fs-5 fw-bold " id="loader-text">Please Wait ...</div></div>)

    }


}