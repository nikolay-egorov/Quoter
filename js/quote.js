
var canvas = document.getElementById("title_canvas"), 
context = canvas.getContext("2d");


const newQuoteButton = document.querySelector('.new-quote');
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
newQuoteButton.addEventListener('click', getQuote);


function getQuote() {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.message);
    })
    .catch(function () {
      console.log("An error occurred");
    });
}

function inputtextgo() {
    //Retrieving the text entered by the user
    var inputtext = document.getElementById("inputtextuser").value;
    //Calling the function to calculate the height on the text entered by the user
    var textheight = fontheight(inputtext);
    //retrieving the baseline selected by the user
    var baseline = document.getElementById("inputtextbaseline").value;
    //calculating the new y needed to center the text based on the height of the text
    var y = 100 + textheight/2;

    //Updating the canvas for the new text entered by the user
    context1.clearRect(0, 0, 300, 200);
    context1.font = "36px arial";
    context1.textBaseline = baseline;
    context1.fillText (inputtext, 0, y);   

    //Drawing a line across the middle of the canvas for reference
    context1.strokeStyle="red";
    context1.moveTo(5,100);
    context1.lineTo(290,100);
    context1.stroke();
    $("#textheightentered").text("Text Height: " + textheight);
}






// context.font = "30px Verdana";
// context.strokeStyle = "black";
// context.strokeText("I'm canvas!", 20, 50);