$(document).ready(function() {  

    $("#search-btn").on("click", function(event){
        event.preventDefault();
        // Constants
        const apiKey = "9c8404bb3c829b4504d089a4a92aa669";  // openweathermap.org API key
     
      
        // Capture Search Criteria
        let keyword = $("#city-search").val();
        

        // Construct endpoint URL for current day forecast request
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + keyword + "&appid=" + apiKey;
      
        // Construct endpoint URL for UV index request
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?";
        

      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {         
          console.log(response);
          let temperature = ((response.list[0].main.temp - 273.15) * 1.8) + 32;
          let windSpeed = response.list[0].wind.speed * 2.237;
          let today = response.list[0].dt_txt.slice(0, 10);

          console.log(today);
          
          $.ajax({
            url: uvURL + "lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&appid=" + apiKey,
            method: "GET"
            }).then(function(reply){
                // Build Current Day Forecast UI
                let uvIndex = reply;                
                let currentForecast = $("#current-forecast");
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
                let uvEl = $("<p>").text("UV Index: " + uvIndex.value);
                currentForecast.append(uvEl);

                // Build 5 Day Forecast UI

            });   
 
        });

       
    });

});