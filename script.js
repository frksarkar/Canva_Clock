const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const windowSize = {
  wx: window.innerWidth,
  wy: window.innerHeight,
  clockHand: 5,
};
ctx.translate(windowSize.wx / 2, windowSize.wy / 2.5);

/* window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  windowSize.wx = window.innerWidth;
  windowSize.wy = window.innerHeight;
  ctx.translate(windowSize.wx / 2, windowSize.wy / 2.5);
});
 */
function drawCircle() {
  let gradient;
  ctx.beginPath();
  ctx.arc(0, 0, windowSize.wx / 6, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  // draw Outer circle
  ctx.beginPath();
  gradient = ctx.createLinearGradient(5, 190, 150, 0);
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.5, "aqua");
  gradient.addColorStop(1, "red");
  ctx.arc(0, 0, windowSize.wx / 5.7, 0, Math.PI * 2);
  ctx.strokeStyle = gradient;
  ctx.stroke();

  // middle circle
  ctx.beginPath();
  ctx.arc(0, 0, windowSize.wx / 50, 0, Math.PI * 2);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumber() {
  let ang;
  let num;
  ctx.font = windowSize.wx / 35 + "px arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.fillStyle = "Brown";
    ctx.translate(0, -(windowSize.wx / 7.2));
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, windowSize.wx / 7.2);
    ctx.rotate(-ang);
  }
}

function drawHand(pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = "#333";
  ctx.stroke();
  ctx.rotate(-pos);
}

function drawTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  // Hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(hour, 80, 15);
  // Minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(minute, 100, 10);
  // Second
  second = (second * Math.PI) / 30;
  drawHand(second, 140, 5);
}

function drawClock() {
  drawCircle();
  drawNumber();
  drawTime();
}

setInterval(drawClock, 1000);
