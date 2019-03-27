
// var canvas = document.getElementById("title_canvas"), 
// context = canvas.getContext("2d");


// const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
 
 
// function displayQuote(quote) {
//   const quoteText = document.querySelector('.title_canvas');
//   // quoteText.textContent = quote;
//   	document.write(quoteText.textContent)
//   	context.strokeText(quoteText.textContent, 20, 50);
// }

// const newQuoteButton = document.querySelector('.new-quote  ');
// // newQuoteButton.addEventListener('click', getQuote);
// getQuote();

const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

function getQuote() {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayQuote(data.message);
    })
    .catch(function () {
      console.log("An error occurred");
    });
}

function displayQuote(quote) {
  const quoteText = document.querySelector('.title_canvas');
  quoteText.textContent = quote;
 
}

// const newQuoteButton = document.querySelector('.new-quote');
// newQuoteButton.addEventListener('click', getQuote);

 
 
 
// function  wrapWords(context,obj) {
// 	var words = obj.text.split(/ /);
//     var rowWords = [];
//     var rows = [];
//     words.forEach(function(word) {
//       var rowWidth = calcRowWidth(context, obj, rowWords.concat(word).join(' '));
//       if (rowWidth >= context.canvas.width && rowWords.length > 0) {
//         rows.push(rowWords.join(' '));
//         rowWords = [];
//       }
//       rowWords.push(word);
//     });
//     if (rowWords.length > 0) {
//       rows.push(rowWords.join(' '));
//     }
//     return rows;
//   }
 
 function getLines(context, text, x, y, maxWidth,lineHeight) {
    var line = '',lineCount = 0;
    for (i = 0; i < text.length; i++) {
        test = text[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
            // Determine how much of the word will fit
            test = test.substring(0, test.length - 1);
            metrics = context.measureText(test);
        }
        if (text[i] != test) {
            text.splice(i + 1, 0,  text[i].substr(test.length))
            text[i] = test;
        }  

        test = line + text[i] + ' ';  
        metrics = context.measureText(test);
        
        if (metrics.width > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = text[i] + ' ';
            y += lineHeight;
            lineCount++;
        }
        else {
            line = test;
        }
    }
    
    
}
text = 'Antidisestablishmentarianism dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut antidisestablishmentarianism odio. Proin quis tortor orci. Etiam at risus et  justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum  laoreet. Nunc eu antidisestablishmentarianism orci. Quisque eget odio ac lectus vestibulum faucibus  eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus  tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate.';
var quoteText = document.getElementById('title_canvas');
context = quoteText.getContext("2d");
getLines(context,text,0,0, 700,20);
 
function calcRowWidth(context, obj, text) {
	 
}
// context.font = "30px Verdana";
// context.strokeStyle = "black";
// context.strokeText("I'm canvas!", 20, 50);