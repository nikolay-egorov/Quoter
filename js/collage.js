// function displayQuote(quote) {
//   const quoteText = document.querySelector('.title_canvas');
//   // quoteText.textContent = quote;
//   	document.write(quoteText.textContent)
//   	context.strokeText(quoteText.textContent, 20, 50);
// }

// const newQuoteButton = document.querySelector('.new-quote  ');
// // newQuoteButton.addEventListener('click', getQuote);
// getQuote();





function initHTML() {
    // document.body.innerHTML ='<canvas id="title_canvas" >'+
    //     ' \n' +
    //     '</canvas>';
    document.writeln('<canvas id="title_canvas" >'+
        ' \n' +
        '</canvas>');
    let canvas = document.getElementById("title_canvas");
    canvas.setAttribute('width', 700);
    canvas.setAttribute('height', 700);
    let button = document.createElement("button");
    button.innerHTML = "New collage";
    button.setAttribute('align', 'bottom');
    button.setAttribute('style', 'position: relative; bottom: 0;');
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(button);

    button.addEventListener ("click", function() {
        buildCollage();
    });

    button =  document.createElement("button");
    button.innerHTML = "Save";
    body.appendChild(button);

    button.addEventListener ("click", function() {
        let link = document.createElement('a');
        link.download = "collage" + Math.random()%100 + ".png" ;
        link.href = saveCanvas();
        document.body.appendChild( link );
        link.click();
        document.body.removeChild( link );
    });
}

function saveCanvas() {
    if (canvas.getContext("2d")) {
        return canvas.toDataURL('image/png').replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
}


function drawImageScaled(  x, y, fullwidth) {
    // use context.height and context.width to draw a fullscreen
    let vRatio = h_sample / this.height;
    if (fullwidth){
        this.w_sample = globalWidth;
        vRatio = globalWidth * w_sample;
    }
    else this.w_sample=w_sample;
    let context = document.getElementById("title_canvas").getContext("2d");
    let hRatio = this.w_sample / this.width;
    let ratio = Math.min(hRatio, vRatio);
    // var centerShift_x = (this.w_sample - this.width * ratio) / 2;
    // var centerShift_y = (h_sample - this.height * ratio) / 2;
    context.clearRect(x, y, this.width * ratio, this.height * ratio);
    context.drawImage(this, x, y,
        this.w_sample, h_sample);
}


/*
	Collage section setup
*/
function buildCollage() {

    let numImages = 5;
    let src = "https://source.unsplash.com/400x300?sig=";
    let x = 0, y = 0;
    for (let i = 1; i <= numImages; i++) {
        if (x < globalWidth - 4) {
            drawImgFromUnsplash(src+ Math.random()*i, x, y, 0);
            x += w_sample;
        } else {
            x = 0;
            y += h_sample;
            if (i === numImages  ) {
                // fetch(src + Math.random()
                // ).then(function (response) {
                //     return response.blob();
                // }
                //     .then(function (data) {
                //         var base64img = URL.createObjectURL(data);
                //         drawImgFromUnsplash(context, images[i], base64img, x, y, 1)
                //     }));
                drawImgFromUnsplash(src+ Math.random()*i, x, y, 1);
                // drawImgFromUnsplash(context,images[i],src + Math.random(),x,y,1);
                break;
            }
            drawImgFromUnsplash(src+ Math.random()*i, x, y, 0);
            x += w_sample;
            // drawImgFromUnsplash(context,images[i],src + Math.random(),x,y,0);
        }
    }

}


function drawImgFromUnsplash(src, x, y, fullwidth) {
    let image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = drawImageScaled.bind( image, x, y, fullwidth);
    image.src = src;
}

function setWords(context, text, font, x,y, lineHeight ) {
    context.font = font + 'px serif';
    let r = wrapWords(context,text,x);
    renderWordWrapRows(document.getElementById("title_canvas").getContext("2d"),r,lineHeight,y,x);
}

function renderWordWrapRows(context,rows,lineHeight,paddingtop, paddingleft) {
    let rowX = globalWidth / 3 - paddingleft*2;
    let rowY = paddingtop;
    let i=0;
    let prevSize = rows[i].length;
    context.align = 'center';
    let currSize ;
    let diff = 0;
    context.textAlign = "center";
    rows.forEach(function(row) {
        currSize = row.length;
        if (row.length === 1){
            context.fillText(row, context.canvas.width/2, rowY   );
        }
        else {
            // if (prevSize !== currSize && i>0) {
            //     diff = context.measureText(row.split(/ /).slice(0, Math.abs(currSize - prevSize)));
            //     if (currSize > prevSize && diff)
            //         diff *= -1;
            // }
            // else diff =0;
            context.fillText(row, rowX + diff, rowY   );
        }
        rowY  += lineHeight;
        i++;
        prevSize = currSize;
    });
}


function  wrapWords(context,text,paddingleft) {
	var words = text.split(/ /);
    var rowWords = [];
    var rows = [];
    words.forEach(function(word) {
      let rowWidth = context.measureText(rowWords.concat(word).join(' ')).width  + paddingleft;
      if (rowWidth + paddingleft*2 >= globalWidth/2 && rowWords.length > 0) {
        rows.push(rowWords.join(' '));
        rowWords = [];
      }
      rowWords.push(word);
    });
    if (rowWords.length > 0) {
      rows.push(rowWords.join(' '));
    }
    return rows;
  }

//text drawing tool
function getLines(context, text, font, x, y,  maxWidth, lineHeight) {
    context.font = font + 'px serif';
    var words = text.split(" ");
    var countWords = words.length;
    var line = '';
    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + ' ';
        var testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, marginLeft, marginTop);

    // for (i = 0; i < text.length; i++) {
    //     test = text[i];
    //     metrics = context.measureText(test);
    //     while (metrics.width > maxWidth) {
    //         // Determine how much of the word will fit
    //         test = test.substring(0, test.length - 1);
    //         metrics = context.measureText(test);
    //     }
    //     if (text[i] != test) {
    //         text.splice(i + 1, 0, text[i].substr(test.length));
    //         text[i] = test;
    //     }
    //
    //     test = line + text[i] + ' ';
    //     metrics = context.measureText(test);
    //
    //     if (metrics.width > maxWidth && i > 0) {
    //         context.fillText(line, x, y);
    //         line = text[i] + ' ';
    //         y += lineHeight;
    //         lineCount++;
    //     } else {
    //         line = test;
    //     }
    // }
}

initHTML();
const w_sample = document.getElementById("title_canvas").width / 2 >> 0;
const h_sample = document.getElementById("title_canvas").height / 3 >> 0;
const globalWidth = document.getElementById("title_canvas").width;


let text = '';
getQuote();
// (async  => {
//     text = getQuote();
// })();

// getQuote().then(data => {
//    text = data.quoteText;
// });
// $.getScript("js/quote.js",function(){
// //    text =getQuote();
// // });

// let canvas = document.getElementById("title_canvas");
// canvas.setAttribute('width', 700);
// canvas.setAttribute('height', 700);
// let w_sample = canvas.width / 2 >> 0;
// let h_sample = canvas.height / 3 >> 0;
// let globalWidth = canvas.width;


async function getQuote() {
    const endpoint2 = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const response = await  fetch(proxyurl + endpoint2);
    const data = await response.json();
    // getLines(document.getElementById("title_canvas").getContext("2d"),data.quoteText,18,0 + 100,0 + 100,500,20);
    setWords(document.getElementById("title_canvas").getContext("2d"),data.quoteText,30,20,0 +200,40);
    return data.quoteText;
}
// var x = 0, y = 0;
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x, y, 0);
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x+w_sample, y, 0);
// x=0;
// y+=h_sample;
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x, y, 0);
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x, y+h_sample, 1);
// randomUnsplash();


 
 