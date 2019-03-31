// function displayQuote(quote) {
//   const quoteText = document.querySelector('.title_canvas');
//   // quoteText.textContent = quote;
//   	document.write(quoteText.textContent)
//   	context.strokeText(quoteText.textContent, 20, 50);
// }

// const newQuoteButton = document.querySelector('.new-quote  ');
// // newQuoteButton.addEventListener('click', getQuote);
// getQuote();
let seed = 3123;
function random() {
    let x = Math.sin(seed++) * 10000;
    seed+=50;
    return x - (x>>0);
}




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
        clickGet();
    });

    button =  document.createElement("button");
    button.innerHTML = "Save";
    body.appendChild(button);

    button.addEventListener ("click", function() {
        let link = document.createElement('a');
        link.download = "collage" + Math.random()* (9) + 1 + ".png" ;
        link.href = saveCanvas();
        document.body.appendChild( link );
        link.click();
        document.body.removeChild( link );
    });
}

function saveCanvas() {
    if (document.getElementById("title_canvas").getContext("2d")) {
        return document.getElementById("title_canvas").toDataURL('image/png').replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
}

async function clickGet() {
   await buildCollage();
    getQuote();
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
    context.clearRect(x, y, this.width * ratio, h_sample);
    context.drawImage(this, x, y,
        this.w_sample, h_sample);
}

function delay() {
    return new Promise(resolve => setTimeout(resolve, 1200));
}
/*
	Collage section setup
*/
async function buildCollage() {
    document.getElementById("title_canvas").getContext("2d").clearRect(0, 0, globalWidth, globalHeigth);
    let numImages = 5;
    // let src = "https://source.unsplash.com/400x300?sig=";
    let src = "https://source.unsplash.com/collection/789734/400x300?sig=";
    let x = 0, y = 0;

    for (let i = 1; i <= numImages; i++) {
        if (x < globalWidth - 4) {
            // fetch(src+ Math.random()*i)
            //     .then(function (response) {
            //        drawImgFromUnsplash(response.url, x, y, 0);
            //     });
            drawImgFromUnsplash(src + random()*12, x, y, 0);
            await delay();
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
                // await delay();
                drawImgFromUnsplash(src+ random()*i, x, y, 1);
                break;
            }
            drawImgFromUnsplash(src+ random()*i, x, y, 0);
            await delay();
            // await delay();
            x += w_sample;
        }
    }

}


function drawImgFromUnsplash(src, x, y, fullwidth) {
    let image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload =  drawImageScaled.bind( image, x, y, fullwidth);
    image.src = src;
}

function setWords(context, text, font, x,y, lineHeight ) {
    context.font =font + 'px serif';
    context.fillStyle = "#FFFFFF";
    let r = wrapWords(context,text,x);
    renderWordWrapRows(document.getElementById("title_canvas").getContext("2d"),r,lineHeight,y,x);
}

function renderWordWrapRows(context,rows,lineHeight,paddingtop ) {
    let rowY = (context.canvas.height - rows.length - paddingtop) /2;
    if(rows.length >7)
        rowY =  paddingtop;
    else if (rows.length >= 11)
        rowY = 60;
    let rowX = globalWidth / 2  ;
    context.textBaseline = 'middle';
    context.textAlign = "center";
    rows.forEach(function(row) {
        if (row.length === 1){
            context.fillText(row, context.canvas.width/2, rowY   );
        }
        else context.fillText(row, rowX , rowY   );
        rowY  += lineHeight;
    });
}


function  wrapWords(context,text,paddingleft) {
	let words = text.split(/ /);
    let rowWords = [];
    let rows = [];
    words.forEach(function(word) {
      let rowWidth = context.measureText(rowWords.concat(word).join(' ')).width  + paddingleft;
      if (rowWidth + paddingleft*2 >= globalWidth/1.1 && rowWords.length > 0) {
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

initHTML();
const w_sample = document.getElementById("title_canvas").width / 2 >> 0;
const h_sample = document.getElementById("title_canvas").height / 3 >> 0;
const globalWidth = document.getElementById("title_canvas").width;
const globalHeigth = document.getElementById("title_canvas").height;

let text = '';

// $.getScript("js/quote.js",function(){
// //    text =getQuote();
// // });


async function getQuote() {
    const endpoint2 = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const response = await  fetch(proxyurl + endpoint2);
    const data = await response.json();
    // getLines(document.getElementById("title_canvas").getContext("2d"),data.quoteText,18,0 + 100,0 + 100,500,20);
    setWords(document.getElementById("title_canvas").getContext("2d"),data.quoteText,50,20,170,40);
    // return data.quoteText;
}


 
 