const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = '';
    const city = document.querySelector('.search-box input').value;
    if (city === '') 
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(responce => responce.json()).then
    (json => {
        if(json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error.style.display = 'block';
            error.classList.add('fadeIn');
            return;
        }
        error.style.display = 'none'
        error.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear': 
                json.weather[0].description = 'Ясно';
                image.src = 'images/clear.png';
                break;
            case 'Rain': 
                json.weather[0].description = 'Дождь';
                image.src = 'images/rain.png';
                break;
            case 'Snow': 
                json.weather[0].description = 'Снег';
                image.src = 'images/snow.png';
                break;
            case 'Clouds': 
                json.weather[0].description = 'Облачно';
                image.src = 'images/clouds.png';
                break;
            case 'Haze': 
                json.weather[0].description = 'Туман';
                image.src = 'images/haze.png';
                break;
            default: 
                image.src = '';
        }
            
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}м/с`;

            // weatherBox.style.display = '';
            // weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '500px';
        
    })
})
