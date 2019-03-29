// var canvas = document.getElementById("title_canvas"),
// context = canvas.getContext("2d");


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
var canvas = document.getElementById("title_canvas"),
    context = canvas.getContext("2d");
canvas.height = 1600;
canvas.width = 2560;
var w_sample = canvas.width / 3 >> 0;
var h_sample = canvas.height/2 >> 0;
var globalWidth = canvas.width;

var globalHeight = canvas.height;

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


function drawImageScaled(context, img, x,y, fullwidth) {
    // use context.height and context.width to draw a fullscreen
    // var w_sample = w_sample;
    // if (fullwidth){
    //     w_sample = globalWidth;
    // }
    var hRatio = w_sample / img.width;
    var vRatio = h_sample / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (w_sample - img.width * ratio) / 2;
    var centerShift_y = (h_sample - img.height * ratio) / 2;
    // context.clearRect(x, y, w_sample, h_sample);
    context.drawImage(img, x, y, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}



function randomUnsplash() {

    img = new Image();
    img.src = "https://source.unsplash.com/random/";
    canvas = document.getElementById('title_canvas');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    img.onload = function () {
        drawImageScaled(canvas.getContext("2d"), img)
    }
}

/*
	Collage section setup
*/
function buildCollage() {

    var images = [];
    var numImages = 6;
    var tempWidth = 0;
    var src = "https://source.unsplash.com/random/300x200?sig=";
    var x=0,y=0;
    for (var i = 0; i < numImages; i++) {
        if (tempWidth < globalWidth-1){
            fetch( src+ Math.random() )
                .then(function(response ) {
                return response.blob();
                })
                .then(function (data) {
                    var base64img= URL.createObjectURL(data);
                    drawImgFromUnsplash(context,images[i], base64img,x,y,1)
                });
            tempWidth += w_sample;
            x += w_sample;
        }
        else {
            tempWidth = 0;
            x = 0;
            y += h_sample;
            if (i === numImages - 1 ) {
                fetch( src+ Math.random()
                ) .then(function(response ) {
                        return response.blob();
                }
                .then(function (data) {
                    var base64img= URL.createObjectURL(data);
                    drawImgFromUnsplash(context,images[i], base64img,x,y,1)
                }));

                // drawImgFromUnsplash(context,images[i],src + Math.random(),x,y,1);
                break;
            }
            fetch(  src+ Math.random()
            ) .then(function(response) {
                drawImgFromUnsplash(context,images[i], response.url,x,y,0) });
            // drawImgFromUnsplash(context,images[i],src + Math.random(),x,y,0);
        }
    }


    // renderCollageRows(setup.rows, setup.rowWidths);

}


function setRows(images) {

    var rows = [];
    var rowWidths = [];
    var tempWidth = 0;
    var rowCount = 0;
    rows[rowCount] = [];

    for (var i = 0; i < images.length; i++) {

        var photo = images[i];
        // keep track of a 'row' by summing the scaled widths until we cross the max width
        // calculate scaled width given target height
        var scaledWidth = scaleWidth(photo);
        tempWidth += scaledWidth;
        if (tempWidth < globalWidth) {
            rows[rowCount].push(photo);
            rowWidths[rowCount] = tempWidth;

        } else {
            rowCount++;
            tempWidth = scaledWidth;
            rows[rowCount] = [];
            rows[rowCount].push(photo);
            rowWidths[rowCount] = tempWidth;
        }
    }

    // we handle special case where we have 1 left in last row
    if (rows[rowCount].length === 1 && rowCount > 0) {
        rows[rowCount - 1].push(photo);
        rowWidths[rowCount - 1] += scaleWidth(photo);
        rows.pop();
        rowWidths.pop();
    }
    return {rows: rows, rowWidths: rowWidths};
}

function scaleWidth(img) {
    return w_sample / img.width;
}

buildCollage();


function drawImgFromUnsplash(context, image, src, x, y, fullwidth) {
    image = new Image();
    image.src=src;
    drawImageScaled(context,image,x,y,fullwidth);
    // image.onload = function () {
    //     drawImageScaled(context,image,x,y,fullwidth);
    // };
    // image.src=src;
    // image.onload = function () {
    //     drawImageScaled(context,image,x,y,fullwidth);
    // };

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

//text drawing tool
function getLines(context, text, x, y, maxWidth, lineHeight) {
    var line = '', lineCount = 0;
    for (i = 0; i < text.length; i++) {
        test = text[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
            // Determine how much of the word will fit
            test = test.substring(0, test.length - 1);
            metrics = context.measureText(test);
        }
        if (text[i] != test) {
            text.splice(i + 1, 0, text[i].substr(test.length))
            text[i] = test;
        }

        test = line + text[i] + ' ';
        metrics = context.measureText(test);

        if (metrics.width > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = text[i] + ' ';
            y += lineHeight;
            lineCount++;
        } else {
            line = test;
        }
    }
}

// randomUnsplash();

// text = 'Antidisestablishmentarianism dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut antidisestablishmentarianism odio. Proin quis tortor orci. Etiam at risus et  justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum  laoreet. Nunc eu antidisestablishmentarianism orci. Quisque eget odio ac lectus vestibulum faucibus  eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus  tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate.';
// var quoteText = document.getElementById('title_canvas');
// context = quoteText.getContext("2d");
// getLines(context,text,0,0, 700,20);
 
 