let weather = {
    apiKey: "9bccf81d8a364e8b238757191da30290",
    fetchWeather: function (city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey + "&mode=json&units=metric")
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = " " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText =temp + "°C";
        document.querySelector(".humidity").innerText =" " + humidity + "%";
        document.querySelector(".wind").innerText =" " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/500x1000/?nature, " + name +"')";
        
    },
    search: function(){
        let searchValue= document.querySelector(".search-bar").value;
        this.fetchWeather(searchValue);
        localStorage.removeItem("cities")
        localStorage.setItem("cities", searchValue)
    },

};

document.querySelector(".search button").addEventListener("click", function(){
weather.search();
})
document.querySelector(".search-bar").addEventListener("keyup",function (event){
    if (event.key == "Enter"){
        weather.search();
;    }
})
weather.fetchWeather(localStorage.getItem("cities"));