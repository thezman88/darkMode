const weatherBtn = document.getElementById("weatherButton");
const stockBtn = document.getElementById("stockButton");

const APIKey = "166a433c57516f51dfab1f7edaed8413";
const stockApi = "TK1WYPTW0R3LJ9GP";
const priceArr = [];

weatherBtn.addEventListener("click", function () {
  var zip = document.getElementById("weatherInput").value;
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    zip +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var newLi = document.createElement("li");
    var descriptionLi = document.createElement("li");

    newLi.innerHTML = "Temperature: " + Math.ceil(response.main.temp);
    descriptionLi.innerHTML = "Description: " + response.weather[0].description;

    document.getElementById("weatherInformation").append(newLi);
    document.getElementById("weatherInformation").append(descriptionLi);
  });
});

stockBtn.addEventListener("click", function () {
  var stock = document.getElementById("stockInput").value;
  var queryURL =
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
    stock +
    "&apikey=" +
    stockApi;
  $("#stockInformation").empty();
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // let myres = response['Meta Data']
    console.log(response);

    var newLi = document.createElement("li");
    var stockPrice = document.createElement("li");
    var previousPrice = document.createElement("li");
    var percentage = document.createElement("li");

    let stonks = response["Global Quote"]["05. price"];
    stonks++;
    stonks--;
    console.log(priceArr);

    let stonksPrevious = response["Global Quote"]["08. previous close"];
    stonksPrevious++;
    stonksPrevious--;
    console.log(stonksPrevious);

    newLi.innerHTML = "Symbol: " + response["Global Quote"]["01. symbol"];
    stockPrice.innerHTML = "price: " + "$" + stonks;
    previousPrice.innerHTML = "Previous Close Price: " + "$" + stonksPrevious;
    percentage.innerHTML =
      "Change: " + "$" + response["Global Quote"]["09. change"];

    document.getElementById("stockInformation").append(newLi);
    document.getElementById("stockInformation").append(stockPrice);
    document.getElementById("stockInformation").append(previousPrice);
    document.getElementById("stockInformation").append(percentage);


    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",
    
      // The data for our dataset
      data: {
        labels: ["yesterday", "today"],
        datasets: [
          {
            label: response['Global Quote']['01. symbol'] + ' data set',
            // backgroundColor: "rgb(255, 99, 132)",
            borderColor: "#be79df",
            data: [stonksPrevious, stonks],
          },
        ],
      },
    
      // Configuration options go here
      options: {},
    });




  });
});


