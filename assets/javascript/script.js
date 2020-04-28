const weatherBtn = document.getElementById("weatherButton");
const stockBtn = document.getElementById('stockButton')

const APIKey = "166a433c57516f51dfab1f7edaed8413";
const stockApi= "TK1WYPTW0R3LJ9GP";

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

stockBtn.addEventListener('click', function(){
    var stock = document.getElementById("stockInput").value;
    var queryURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stock+"&apikey="+ stockApi
    $('#stockInformation').empty()
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
    // let myres = response['Meta Data']
      console.log(response);
     
    var newLi = document.createElement("li");
    var stockPrice = document.createElement('li');
    var previousPrice = document.createElement('li');
    var percentage = document.createElement('li');


    newLi.innerHTML = ('Symbol: '+response['Global Quote']['01. symbol']);
    stockPrice.innerHTML = ('price: ' +'$'+response['Global Quote']['05. price']);
    previousPrice.innerHTML= ('Previous Close Price: '+ '$'+ response['Global Quote']['08. previous close'])
    percentage.innerHTML = ('Change: ' + '$' + response['Global Quote']['09. change'])

    document.getElementById("stockInformation").append(newLi);
    document.getElementById("stockInformation").append(stockPrice);
    document.getElementById('stockInformation').append(previousPrice);
    document.getElementById('stockInformation').append(percentage);

    // document.getElementById("weatherInformation").append(descriptionLi);
 
    });

    
})

