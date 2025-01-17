const apiKey = "API_KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        // console.log(data);
        document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        //Capitalizing each word capital of weather description
        let weatherDesc = data.weather[0].description;
        var a=weatherDesc.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
        document.querySelector(".weather-desc").innerHTML = a;
        weatherIcon.src = "images/" + data.weather[0].main + ".png";
        //weatherIcon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        // console.log("images/"+ data.weather[0].main + ".png");
        // if(data.weather[0].main == "Clouds"){
        //     weatherIcon.src = images/clouds.png
        // }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } 

}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (e)=>{
const cityName=searchBox.value.trim();
if(e.key =="Enter" && cityName){
    checkWeather(cityName);
}
});

