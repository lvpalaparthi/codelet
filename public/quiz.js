const countdownEl = document.getElementById("countdown");
var myInterval;
function updateTime() {
  let start = 15;
  let time = start * 60;
  myInterval = setInterval(function () {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    time--;
    if (minutes == 0 && seconds == 0) {
      alert("time's up!");
      start = 15;
      clearInterval(myInterval);
      countdownEl.innerHTML = `15:00`;
    }
  }, 1000);
}

function resetCounter() {
  clearInterval(myInterval);
  countdownEl.innerHTML = `15:00`;
}


