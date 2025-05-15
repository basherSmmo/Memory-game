let wrongTries = document.querySelector(".wrong-tries");
let blocks = document.querySelector(".blocks");
let onLoad = document.querySelector(".on-load");
let start = document.querySelector(".on-load .start");
let timerDiv = document.querySelector(".timer");

let numberOfImages = 9; // adding the number of images is manual
let time;
let timer;
start.onclick = function () {
  setBlocks();
  onLoad.remove();
  time = new Date(0);
  timer = setInterval(() => {
    time.setSeconds(time.getSeconds() + 1);
    timerDiv.innerHTML = time.toLocaleTimeString().slice(2, 7);
  }, 1000);
};
let triedTimes = 1;
function setBlocks() {
  // create memory cards
  if (blocks.childElementCount !== 0) blocks.innerHTML = "";
  for (let i = 0, count = []; i < 2; ) {
    let random = Math.ceil(Math.random() * numberOfImages);
    if (!count.includes(random)) {
      count.push(random);
      let card = document.createElement("div");
      card.setAttribute("class", "card");
      let front = document.createElement("div");
      front.appendChild(document.createTextNode("?"));
      front.setAttribute("class", "front");
      let imgBack = document.createElement("img");
      imgBack.setAttribute("class", "back");
      imgBack.src = `images/image-${random}.jpeg`;
      card.append(front);
      card.append(imgBack);
      blocks.append(card);
      if (numberOfImages == count.length) {
        count = [];
        i++;
      }
    }
  }
  // Set functionalities on the cards
  let cards = document.querySelectorAll(".card");
  let forCompare = [];
  let complete = numberOfImages;
  let numberOfTries = 0;
  cards.forEach((e) => {
    e.onclick = () => {
      if (forCompare.length < 2) {
        e.style.setProperty("transform", "rotateY(180deg)");
        forCompare.push(e);
        if (forCompare.length == 2) {
          if (
            forCompare[0].lastElementChild.src ===
            forCompare[1].lastElementChild.src
          ) {
            forCompare = [];
            complete--;
          } else {
            setTimeout(() => {
              forCompare.forEach((e) => e.style.removeProperty("transform"));
              forCompare = [];
              numberOfTries++;
              wrongTries.innerHTML = `Wrong Tries ${numberOfTries}`;
            }, 1000);
          }
        }
        if (complete == 0) {
          clearInterval(timer);
          let result = document.createElement("div");
          result.setAttribute("class", "result");
          result.innerHTML = `${triedTimes}. Wrong tries ${numberOfTries} | Time ${time
            .toLocaleTimeString()
            .slice(2, 7)}`;
          triedTimes++;
          onLoad.prepend(result);
          document.body.append(onLoad);
          start.innerHTML = "Restart";
        }
      }
    };
  });
}
setBlocks();
let rezise = new ResizeObserver((ent) => {
  let mu = 3;
  ent[0].contentRect.width < 655 ? (mu = 3.5) : mu;
  blocks.style.setProperty(
    "grid-template-columns",
    `repeat(auto-fit, minmax(${
      Math.sqrt(
        (ent[0].contentRect.height * ent[0].contentRect.width) /
          (numberOfImages * mu)
      ) + "px"
    }, auto))`
  );
});
rezise.observe(blocks);
