var width  = document.body.clientWidth;
var height = document.body.clientHeight;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fps = 60;
var frameTime = 1000 / fps;
var g = 0.01 / fps;
var objArr = [];
var lastTimeRender = +new Date();
var lastTimePushObj = +new Date();


var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var motionObj = function(x, y) {
  this.r = getRandomInt(2, 5);
  this.t = 0;
  this.k = getRandomInt(1, 5) / 1000;
  this.x = x;
  this.px = x;
  this.ax = 0;
  this.vx = 0.5;
  this.y = y;
};

motionObj.prototype.move = function () {
  this.t += frameTime;
  this.ax = (this.px - this.x) * this.k;
  this.vx += this.ax;
  this.x += this.vx;
  this.y = 1 / 2 * g * this.t * this.t - this.r * 10;
};

motionObj.prototype.render = function (){
    ctx.font="30px Comic Sans MS" ;
    ctx.strokeStyle = "black";
    ctx.strokeText("Shakeh իմ սիրելի",
     canvas.width/2.5, canvas.height/2.2);
     ctx.strokeText("From Yuri with   💗",
     canvas.width/1.9, canvas.height/1.9);
    ctx.textAlign = "center";
  ctx.beginPath();
  ctx.shadowBlur = this.r * 0.9;
  ctx.shadowColor = 'pink';
  ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI/180, false);
  ctx.fill();
  ctx.closePath();
};

motionObj.prototype.isLast = function (){
  if (this.y > height + this.r) {
    return true;
  } else {
    return false;
  }
};

var render = function() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  for (var i = 0; i < objArr.length; i++) {
    if(objArr[i]) {
      objArr[i].move();
      objArr[i].render();
      if (objArr[i].isLast()) {
        delete objArr[i];
      }
    }
  }
};

var renderloop = function() {
  var now = +new Date();
  requestAnimationFrame(renderloop);
  if (now - lastTimeRender < frameTime) {
    return;
  }
  render();
  lastTimeRender = +new Date();
  
  if (now - lastTimePushObj < 10) {
    return;
  }
  objArr.push(new motionObj(Math.random() * width, 0));
  lastTimePushObj = +new Date();
};
renderloop();

var canvasResize = function() {
  ctx.clearRect(0, 0, width, height);
  width  = document.body.clientWidth;
  height = document.body.clientHeight;
  canvas.width = width;
  canvas.height = height;
};
canvasResize();

var debounce = function(object, eventType, callback){
  var timer;

  object.addEventListener(eventType, function() {
    clearTimeout(timer);
    timer = setTimeout(function(){
      callback();
    }, 500);
  }, false);
};

debounce(window, 'resize', function(){
  canvasResize();
});
