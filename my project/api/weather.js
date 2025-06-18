import axios from 'axios';

// פונקציה לשליפת מזג האוויר של עיר
export const getWeather = async (cityName) => {
    const apiKey = "745f6751e79afbe41b8b25aa8e507ea3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${"745f6751e79afbe41b8b25aa8e507ea3"}&units=metric&lang=he`;

    try {
        const response = await axios.get(url);
        const { temp, description } = response.data.main;
        const weatherDescription = response.data.weather[0].description;

        return {
            temperature: temp,
            weatherDescription
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
