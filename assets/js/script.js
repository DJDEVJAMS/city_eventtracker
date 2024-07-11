const apiKey = `42eafdedee5b61f0ec122008b3e95a01`;
const numOfDays = 10;
const container = $('#container');
const inputCity = $('#city-input');
const submitBtn = $('#submit-btn');

function getWeather(){
    let cityName = inputCity.val().trim();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (weather){
    container.empty();
        for (let i = 0; i < 5; i++) {
            // Create a div to hold the elements of the card
            const forcastCard = $('<div>');
            forcastCard.addClass('card');
            // Added a date for the card
            const forcastDate = $('<p>');
            forcastDate.text(dayjs().add(i + 1, 'day').format('M/D/YYYY'));
            // Creating a weather icon
            const weatherIcon = $('<img>');
            console.log(weather); // Undefined
            const icon = weather.list[i].weather[0].icon;
            weatherIcon.attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
            // Create temp
            const temp = weather.list[i].main.temp;
            const tempDiv = $('<p>');
            tempDiv.text('Temp: ' + temp + '°F')
            // Create wind
            const wind = weather.list[i].wind.speed;
            const windDiv = $('<p>');
            windDiv.text('Wind: ' + wind + 'mph');
            // Create humidity
            const humidity = weather.list[i].main.humidity;
            const humidDiv = $('<p>');
            humidDiv.text('Humidity: ' + humidity + '%');
            // Append the elements to the screen
            forcastCard.append(forcastDate, weatherIcon, tempDiv, windDiv, humidDiv);
            container.append(forcastCard);
        };
    })
    .catch(function (error){
        console.log(error);
    })
}

submitBtn.on('click', getWeather);