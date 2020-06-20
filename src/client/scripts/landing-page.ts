const buttonJoin = document.querySelector("button[data-type='join']")!;
const buttonCreate = document.querySelector("button[data-type='create']")!;
const promptCreate = document.querySelector(".prompt--create")!;
const promptJoin = document.querySelector(".prompt--join")!;
const promptJoinBtn = promptJoin.querySelector(".prompt__button--join")!;
const promptCreateBtn = promptCreate.querySelector(".prompt__button--create")!;
const promptInputJoin = <HTMLInputElement>promptJoin.querySelector(".prompt__input--join")!;
const promptInputCreate = <HTMLInputElement>promptCreate.querySelector(".prompt__input--create")!;

buttonJoin.addEventListener("click", () => { promptJoin.classList.toggle("prompt--show") })

buttonCreate.addEventListener("click", () => { promptCreate.classList.toggle("prompt--show") })

promptJoinBtn.addEventListener("click", () => {
    window.location.href = `/room/${promptInputJoin.value}`
})

promptCreateBtn.addEventListener("click", () => {
    window.location.href = `/room/${promptInputCreate.value}`
})