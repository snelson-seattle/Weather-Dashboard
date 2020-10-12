

$(document).ready(function() {  
    let keyword = "";
    let savedCites = [];    
    loadSavedCities();

    $(".city-btn").on("click", function(){
        $("#city-search").val($(this).text());
        getWeatherData();
    });

    $("#search-btn").on("click", function(event){
        event.preventDefault(); // Prevent default submit action 

        // Save to the city list if not already there
        if(!savedCites.includes($("#city-search").val().toUpperCase()) && $("#city-search").val() != ""){
            let cityList = $("#city-list");
            keyword = $("#city-search").val().toUpperCase();
            let newCity = $("<p>").text(keyword).addClass("city-btn");
            cityList.append(newCity);
            savedCites.push(keyword.toUpperCase());           
            localStorage.setItem("Searched-Cities", JSON.stringify(savedCites));
        } 
        
        getWeatherData();
    });    

    $("#list-toggler").on("click", function(){
        if($(this).attr("data-state") === "hidden"){
            $(this).text($(this).attr("data-hide"));
            $(this).attr("data-state", "visible");
        }else {
            $(this).text($(this).attr("data-view"));
            $(this).attr("data-state", "hidden");
        }
    });
    
    // Function that checks for previously searched city names, and loads them onto the page if found
    function loadSavedCities () {
        if(JSON.parse(localStorage.getItem("Searched-Cities"))){
            savedCites = JSON.parse(localStorage.getItem("Searched-Cities"));            
        }    
        for(let i = 0; i < savedCites.length; i++){
            let savedCityList = $("#city-list");
            let li = $("<li>");
            let savedCity = $("<p>").text(savedCites[i]).addClass("city-btn");
            li.append(savedCity);
            savedCityList.append(li);
        }
       
    }   

    function getWeatherData (){
        // Constants
        const apiKey = "9c8404bb3c829b4504d089a4a92aa669";  // openweathermap.org API key
        
        // Capture Search Criteria
        keyword = $("#city-search").val().toUpperCase();

        // Construct endpoint URL for current day forecast request
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast/?q=" + keyword + "&appid=" + apiKey;
      
        // Construct endpoint URL for UV index request
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {      
            let temperature = ((response.list[0].main.temp - 273.15) * 1.8) + 32;
            let windSpeed = response.list[0].wind.speed * 2.237;
            let today = response.list[0].dt_txt.slice(0, 10);
            
            $.ajax({
              url: uvURL + "lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&appid=" + apiKey,
              method: "GET"
              }).then(function(reply) {
                // Build Current Day Forecast UI                            
                let currentForecast = $("#current-forecast");
                currentForecast.empty(); // Clear the old info
  
                let uvIndex = reply;   
                let cityEl = $("<h1>").text(keyword.toUpperCase());
                currentForecast.append(cityEl);
                let dateEl = $("<h5>").text(today);
                currentForecast.append(dateEl);
                let tempEl = $("<p>").text("Temperature: " + temperature.toFixed(1) + " F");
                currentForecast.append(tempEl);
                let humidityEl = $("<p>").text("Humidity: " + response.list[0].main.humidity + "%");
                currentForecast.append(humidityEl);
                let windEl = $("<p>").text("Wind Speed: " + windSpeed.toFixed(1) + " MPH");
                currentForecast.append(windEl);
                let uvEl = $("<p>").text("UV Index: " + uvIndex.value.toFixed(1));
                if(uvIndex.value < 3){
                    uvEl.addClass("uv-low");
                }else if(uvIndex.value >= 3 && uvIndex.value < 6){
                    uvEl.addClass("uv-moderate");
                }else if(uvIndex.value >= 6 && uvIndex.value < 8){
                    uvEl.addClass("uv-high");
                 }else if(uvIndex.value >= 8 && uvIndex.value < 11){
                    uvEl.addClass("uv-very-high");
                }else {
                    uvEl.addClass("uv-extreme");
                }
                currentForecast.append(uvEl);
  
                // Build 5 Day Forecast UI
                let fiveDayForecast = $("#five-day-forecast");
                fiveDayForecast.empty(); // CLear out the old info
                let fiveDayHeading = $("<h3>").text("5-Day Forecast:");
                fiveDayForecast.append(fiveDayHeading);
                let row = $("<div>").addClass("row");
                fiveDayForecast.append(row);
  
                // Build the Weather Cards for each day
                for(let i = 5; i <= 37; i += 8){
                    let column = $("<div>").addClass("col-xs-12 column");
                    let weatherCard = $("<div>").addClass("card text-white bg-info");
                    let cardBody = $("<div>").addClass("card-body");
                    let cardTitle = $("<h5>").addClass("card-title").text(response.list[i].dt_txt.slice(0,10));
                    let iconEl = $("<img>");
                    let iconURL = "";
                    switch(response.list[i].weather[0].main){
                        case "Ash":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Clear":
                            iconURL = "https://openweathermap.org/img/wn/01d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Clouds":
                            iconURL = "https://openweathermap.org/img/wn/02d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Drizzle":
                            iconURL = "http://openweathermap.org/img/wn/09d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Dust":
                            iconURL = "http://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Fog":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Haze":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Mist":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Rain":
                            iconURL = "https://openweathermap.org/img/wn/10d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Sand":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Smoke":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Snow":
                            iconURL = "https://openweathermap.org/img/wn/13d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Squall":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                        case "Thunderstorm":
                            iconURL = "https://openweathermap.org/img/wn/11d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;  
                        case "Tornado":
                            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
                            iconEl.attr("src", iconURL);
                            break;
                    }
                    let fTemp = ((response.list[i].main.temp - 273.15) * 1.8) + 32;
                    let fiveTempEl = $("<p>").text("Temp: " + fTemp.toFixed(1) + " F");
                    let fiveHumidityEl = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
  
  
                    cardBody.append(cardTitle);
                    cardBody.append(iconEl);
                    cardBody.append(fiveTempEl);
                    cardBody.append(fiveHumidityEl);
                    weatherCard.append(cardBody);    
                    column.append(weatherCard);                
                    row.append(column);
                 }
            });
        });          
    }
});



