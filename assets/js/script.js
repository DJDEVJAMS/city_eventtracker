const apiKey = `42eafdedee5b61f0ec122008b3e95a01`;
const numOfDays = 10;
const container = $('#container');
const inputCity = $('#city-input');
const submitBtn = $('#submit-btn');
const eventDiv = $('#event-div');






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
            forcastCard.addClass('card border basis-1/5');
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
        // pass coord to other function
        const lat = weather.city.coord.lat;
        const lon = weather.city.coord.lon;
        getEvents(lat, lon);
    })
    .catch(function (error){
        console.log(error);
    })
}

function getEvents(eLat,eLon){
    console.log(eLat);
    console.log(eLon);
    const urlKey = `AIzaSyAnTBaaKIz-lNvU-Ppy1JejTOO4AIdVyQM`;
    const url = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${eLat}%2C${eLon}&radius=1500&type=restaurant&key=${urlKey}`;
console.log(url);
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        eventDiv.empty(); // Need this here
        console.log(data);
        for (let i = 0; i < 5; i++) {
            // Add a <div> to hold the info
            const evetCard = $('<div>').addClass('card border flex flex-row');
            // Add a <div> to hold an image
            const imgDiv = $('<div>').addClass('border basis-1/5');
            // Add a <div to hold info
            const contentDiv = $('<div>').addClass('border basis-4/5');
            // Add the image for the imgDiv
            // Add elements for the content div
            const eventName = $('<h2>').text(`Name: ${data.results[i].name}`);

            function isItOpen(){
                if (data.results[i].opening_hours.open_now = true) {
                    return "Yes";
                } else {
                    return "No";
                }
            }

            const isOpen = $('<p>').text(`Open: ${isItOpen()}`);
            const address = $('<p>').text(`Address: ${data.results[i].vicinity}`);

            // Append the elements to the page
            contentDiv.append(eventName, isOpen, address);
            evetCard.append(imgDiv, contentDiv);
            eventDiv.append(evetCard);
        }
    })
    .catch(function (error){
        console.log(error);
    })
}

inputCity.on("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector('button').click();
    }
  });
submitBtn.on('click', getWeather);



