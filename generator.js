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
//generate and show the download button
    generateBtn.addEventListener('click', function() {
      generateMeme(defaultImg, timeLeft, topText.value, bottomText.value);
      downloadButton.style.display = "block";
    });
}

function timeCalculation () {
  date1 = new Date ("June 7, 2018");
  dateNow = Date.now();
  timeLeft = parseInt((date1 - dateNow)/(1000*60*60*24));
  let displayTime = document.getElementById("time-left");
  displayTime.innerHTML = timeLeft;
}

function generateMeme (img = defaultImg, topDes = timeLeft, middleDes="的兄弟学校最喜欢的" + "\n" + "UWC" + "\n" + "的名字很像的", bottomDes="野鸡大学WCU") {
  canvas.width =  mirror.width = img.width;
  canvas.height = mirror.width = img.height;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(img,0,0);
  //countdown
  ctx.font =  '44pt "mainFont"';
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.fillText(topDes, 472, 72, 300);
  //middle description of the school
  let textarray = middleDes.split("\n");



  let y = 495;
  let x = 200;
  let fontSize1 = 10;
  if (textarray.length <= 3) {
      x = 80 + textarray.length * 33;
      fontSize1 = 35 - textarray.length * 6;
  }
  ctx.font = "italic " + fontSize1 + "pt 'mainFont'";
  for (var i = 0; i < textarray.length; i++) {
    ctx.fillText(textarray[i], x, y, 600);
    y += fontSize1 * 1.35;
  }

  //bottom text of the school name
  let fontSize2 = 120/ bottomDes.length;
  ctx.font =  fontSize2 + 'pt Calibri';
  ctx.fillText(bottomDes, 85, 620, 400);
}

timeCalculation();
init();
