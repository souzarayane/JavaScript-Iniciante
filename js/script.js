const minutosEl = document.querySelector("#minutos");
const segundosEl = document.querySelector("#segundos");
const milesimosEl = document.querySelector("#milesimos");

const iniciarBtn = document.querySelector("#iniciar");
const pausarBtn = document.querySelector("#pausar");
const continuarBtn = document.querySelector("#continuar");
const zerarBtn = document.querySelector("#zerar");

let minutos = 0;
let segundos = 0;
let milesimos = 0;

let pausado = false;

iniciarBtn.addEventListener("click", startTime);
pausarBtn.addEventListener("click", pauseTimer);
continuarBtn.addEventListener("click", resumeTimer);
zerarBtn.addEventListener("click", resetTimer);

function startTime(){
    interval = setInterval(() => {
        if(!pausado){
            milesimos += 10;

            if(milesimos === 1000){
                segundos ++;
                milesimos = 0;
            }

            if(segundos === 60){
                minutos ++;
                segundos = 0;
            }

            minutosEl.textContent = formatTime(minutos);
            segundosEl.textContent = formatTime(segundos);
            milesimosEl.textContent = formatMilliseconds(milesimos);
        }
    }, 10);

    iniciarBtn.style.display = "none";
    pausarBtn.style.display = "block";
}

function pauseTimer(){
    pausado = true;
    pausarBtn.style.display = "none";
    continuarBtn.style.display = "block";
}

function resumeTimer(){
    pausado = false;
    pausarBtn.style.display = "block";
    continuarBtn.style.display = "none";
}

function resetTimer(){
    clearInterval(interval);
    minutos = 0;
    segundos = 0;
    milesimos = 0;

    minutosEl.textContent = "00";
    segundosEl.textContent = "00";
    milesimosEl.textContent = "00";

    iniciarBtn.style.display = "block";
    pausarBtn.style.display = "none";
    continuarBtn.style.display = "none";

}

function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time){
    return time < 100 ? `${time}`.padStart(2, "0") : time;
}