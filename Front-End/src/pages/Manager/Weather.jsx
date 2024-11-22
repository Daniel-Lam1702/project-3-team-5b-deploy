import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useFetchWeatherData } from "../../api/useFetchWeatherData";
import './Weather.css';

const capitalizeWords = (sentence) => {
    return sentence
        .split(" ") // Split the sentence into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(" "); // Join words back into a sentence
};


export const Weather = ({ location }) => {
    const { data: weatherData, loading, error } = useFetchWeatherData(location.latitude, location.longitude);

    if (loading && !weatherData) {
        return <div className="weather-panel flex justify-center align-middle p-4">Loading Weather Data</div>;
    }
    if (error) {
        return <div className="weather-panel flex justify-center align-middle p-4">Error Loading Weather Data</div>;
    }
    console.log(weatherData);
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    return (
        <div className="weather-panel flex justify-center align-middle p-4 ">
            <img src={weatherIconUrl} alt={weatherData.weather[0].description} />
            <div className="flex flex-col justify-center align-middle">
                <p>Temperature: {weatherData.main.temp}° F</p>
                <p>Weather: {capitalizeWords(weatherData.weather[0].description)}</p>
            </div>
        </div>
    );
};

// Add PropTypes validation
Weather.propTypes = {
    location: PropTypes.shape({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
    }).isRequired,
};
