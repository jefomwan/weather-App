const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');

function displayWeather(weatherInfo){
    
    const {location:{name:city}, current:{temp_c, humidity, condition:{text}}} = weatherInfo;

    document.getElementById('cityName').innerHTML= city;
    document.getElementById('climateState').innerHTML= text;
    document.getElementById('humidity').innerHTML= 'Humidity ' +humidity+ '%';
    document.getElementById('temp').innerHTML= 'Temperature ' + temp_c+ '';
     

    console.log(weatherInfo)

}

async function getWeatherData(city){
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=9c4c1b8400c44b9184270359240806&q=${city}&aqi=no`;
    const response = await fetch(apiURL);
    
    if(!response.ok){
        document.getElementById('data').innerHTML = 'could not fetch city data';
    }
    else{
    return await response.json();
    }
}

submitButton.onclick = async function submit(){
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
            
        }
        catch(error){
            document.getElementById('data').innerHTML = 'could not fetch city data becasue '+ error
        }

    }
    else{
        document.getElementById('data').innerHTML = 'Please type in a city'
    }
}