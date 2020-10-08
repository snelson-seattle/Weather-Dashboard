

$(document).ready(function() {  
    let savedCites = [];    
    loadSavedCities();

    $(".city-btn").on("click", function(){
        $("#city-search").val($(this).text());
    });

    $("#search-btn").on("click", function(event){
        event.preventDefault(); // Prevent default submit action
        
        // Constants
        const apiKey = "9c8404bb3c829b4504d089a4a92aa669";  // openweathermap.org API key
     
      
        // Capture Search Criteria
        let keyword = $("#city-search").val().toUpperCase();

        // Save to the city list if not already there
        if(!savedCites.includes(keyword)){
            let cityList = $("#city-list");
            let newCity = $("<p>").text(keyword).addClass("city-btn");
            cityList.append(newCity);
            savedCites.push(keyword.toUpperCase());
            console.log(savedCites);
            localStorage.setItem("Searched-Cities", JSON.stringify(savedCites));
        }
        
        

        

        // Construct endpoint URL for current day forecast request
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + keyword + "&appid=" + apiKey;
      
        // Construct endpoint URL for UV index request
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?";
        

      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {         
          let temperature = ((response.list[0].main.temp - 273.15) * 1.8) + 32;
          let windSpeed = response.list[0].wind.speed * 2.237;
          let today = response.list[0].dt_txt.slice(0, 10);

          console.log(today);
          
          $.ajax({
            url: uvURL + "lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&appid=" + apiKey,
            method: "GET"
            }).then(function(reply){
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
                let uvEl = $("<p>").text("UV Index: " + uvIndex.value);
                currentForecast.append(uvEl);

                // Build 5 Day Forecast UI
                let fiveDayForecasst = $("#five-day-forecast");
                fiveDayForecasst.empty(); // CLear out the old info
                let fiveDayHeading = $("<h3>").text("5-Day Forecast:");
                fiveDayForecasst.append(fiveDayHeading);

                for(let i = 5; i <= 37; i += 8){
                    let weatherCard = $("<div>").addClass("card text-white bg-info");
                    let cardBody = $("<div>").addClass("card-body");
                    let cardTitle = $("<h5>").addClass("card-title").text(response.list[i].dt_txt.slice(0,10));
                    let fTemp = ((response.list[i].main.temp - 273.15) * 1.8) + 32;
                    let fiveTempEl = $("<p>").text("Temperature: " + fTemp.toFixed(1) + " F");
                    let fiveHumidityEl = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");


                    cardBody.append(cardTitle);
                    cardBody.append(fiveTempEl);
                    cardBody.append(fiveHumidityEl);
                    weatherCard.append(cardBody);                    
                    fiveDayForecasst.append(weatherCard);
                }
            });   
 
        });

       
    });

    function loadSavedCities () {
        if(JSON.parse(localStorage.getItem("Searched-Cities"))){
            savedCites = JSON.parse(localStorage.getItem("Searched-Cities"));
            console.log(savedCites);
        }    
        for(let i = 0; i < savedCites.length; i++){
            let savedCityList = $("#city-list");
            let savedCity = $("<p>").text(savedCites[i]).addClass("city-btn");
            savedCityList.append(savedCity);
        }
       
    }

});



/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul> 
</div> */