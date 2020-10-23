# Weather-Dashboard Application

## Objective
### Create a weather dashboard application that will enable a user to search for weather
by city name and receive a current day, and a five day forecast.

#### Author - Scott Nelson

#### Technologies Used
- Bootstrap
- FontAwesome
- jQuery

#### APIs Used
- openweathermap.org

### User Story

```
AS A person that wants to know what the weather will be
I WANT an easy to use dashboard to search for forecasts
SO THAT I can plan my activities accordingly
```

### Acceptance Criteria

```
GIVEN I am using a weather dashboard to view the weather
WHEN I open the dashboard
THEN an easy to use search box is displayed
WHEN I enter my city name
THEN I am given the current day's weather as well as a five day forecast
WHEN I view the current day's weather
THEN I want a color coded UV index shown
WHEN I look at five day forecast
THEN I can see easily understandable weather icons for different types of weather
WHEN I search for a city
THEN that city name is saved in a list in local storage
WHEN I refresh the page
THEN the saved cities remain for a quick search
```

### Application Description

User enters a city name in the search box provided and a query is made to openweathermap.org to find the current day's weather forecast and a five day forecast. 
Current day's weather is displayed prominently to the right of the search area, and below the current day's weather a five day forecast is displayed on formatted
cards. 
