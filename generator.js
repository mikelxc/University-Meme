//Created by Xinchen Liu in 2018, for more informaiton visit https://github.com/mikelxc/University-Meme
let topText, bottomText, imageInput, generateBtn, changeBtn, canvas, ctx, date1, dateNow, timeLeft, topDes, middleDes, bottomDes, defaultImg;

function init () {
  defaultImg = document.getElementById("working-image");
  topText = document.getElementById("top-text");
  bottomText = document.getElementById("bottom-text");
  imageInput = document.getElementById("image-input");
  generateBtn = document.getElementById("generate");
  changeBtn = document.getElementById("change");
  canvas = document.getElementById("meme-canvas");
  mirror = document.getElementById('mirror');

  ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 0;

  changeBtn.addEventListener('click', function(){
    let reader = new FileReader();
    reader.onload = function () {
      let img = new Image;
      img.src = reader.result;
      generateMeme(img,"","","");
    };
    reader.readAsDataURL(imageInput.files[0]);
    defaultImg.src = reader.result;
  });

  generateBtn.addEventListener('click', function() {
    generateMeme(defaultImg, timeLeft, topText.value, bottomText.value);
  });

    mirror.addEventListener('contextmenu', function (e) {
      var dataURL = canvas.toDataURL('image/png');
      mirror.src = dataURL;
  });
//download the picture
    let downloadButton = document.getElementById('btn-download');
    downloadButton.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        downloadButton.href = dataURL;
    });
}

function timeCalculation () {
  date1 = new Date ("June 7, 2018");
  dateNow = Date.now();
  timeLeft = parseInt((date1 - dateNow)/(1000*60*60*24));
  let displayTime = document.getElementById("time-left");
  displayTime.innerHTML = timeLeft;
}

function generateMeme (img = defaultImg, topDes = timeLeft, middleDes="的兄弟学校也看不起的", bottomDes="野鸡大学WCU") {
  canvas.width =  mirror.width = img.width;
  canvas.height = mirror.width = img.height;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(img,0,0);
  let fontSize1 = 70/ topDes.length;
  let fontSize2 = 120/ bottomDes.length;
  ctx.font =  '44pt "mainFont"';
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.fillText(topDes, 472, 72, 300);
  ctx.font =  fontSize1 + 'pt Calibri';
  ctx.fillText(middleDes, 80, 495, 600);
  ctx.font =  fontSize2 + 'pt Calibri';
  ctx.fillText(bottomDes, 85, 620, 400);
}

timeCalculation();
init();
