const state = {
    view:{
        squares: document.querySelectorAll(".square"), 
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    }
};

function playSound(audioName){
    let audio = new Audio(`./src/audio/${audioName}.m4a`)
    audio.volume = 0.1
    audio.play()
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime
    if(state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result)
    }
};

function randomsquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomsquare = state.view.squares[randomNumber];
    randomsquare.classList.add("enemy");
    state.values.hitPosition = randomsquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomsquare, state.values.gameVelocity)
}

function addListenerHitbox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
            }
        })
    }); 
};

function init() {
    moveEnemy();
    addListenerHitbox();
};

init();