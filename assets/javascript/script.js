const weatherBtn = document.getElementById("weatherButton");
const APIKey = "166a433c57516f51dfab1f7edaed8413";

weatherBtn.addEventListener("click", function () {
    var zip = document.getElementById("weatherInput").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
                "q=" + zip + "&units=imperial&appid=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {

      console.log(response);
    var newLi = document.createElement("li");
    var descriptionLi = document.createElement('li');

    newLi.innerHTML = "Temperature: " + Math.ceil(response.main.temp);
    descriptionLi.innerHTML = "Description: " + (response.weather[0].description);

    document.getElementById("weatherInformation").append(newLi);
    document.getElementById("weatherInformation").append(descriptionLi);
 
    });

});

