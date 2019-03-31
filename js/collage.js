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
    let line = '', lineCount = 0;
    for (i = 0; i < text.length; i++) {
        test = text[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
            // Determine how much of the word will fit
            test = test.substring(0, test.length - 1);
            metrics = context.measureText(test);
        }
        if (text[i] != test) {
            text.splice(i + 1, 0, text[i].substr(test.length));
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

initHTML();

let canvas = document.getElementById("title_canvas");
canvas.setAttribute('width', 700);
canvas.setAttribute('height', 700);
let w_sample = canvas.width / 2 >> 0;
let h_sample = canvas.height / 3 >> 0;
let globalWidth = canvas.width;

let text = getQuote();



// $.getScript("js/quote.js",function(){
//    console.log(getQuote());
// });

// var x = 0, y = 0;
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x, y, 0);
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x+w_sample, y, 0);
// x=0;
// y+=h_sample;
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x, y, 0);
// drawImgFromUnsplash("https://source.unsplash.com/400x400?sig=" + Math.random(), x, y+h_sample, 1);
// randomUnsplash();


 
 