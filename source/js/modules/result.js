import SeaCalfScene from './2d-animation/seacalf-canvas-animation';
import CrocodileScene from './2d-animation/crocodile-canvas-animation.js';


export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        setTimeout(() => {
          targetEl[0].classList.add(`screen--show`);
          targetEl[0].querySelector(`svg animate`).beginElement();
        }, 100);
        targetEl[0].classList.remove(`screen--hidden`);

        if (target === `result`) {
          let SeaCalfCanvasAnimate = new SeaCalfScene({
            canvas: document.querySelector(`#sea-calf-canvas`)
          });
          SeaCalfCanvasAnimate.startAnimation();
        } else if (target === `result3`) {
          let CrocodileCanvasAnimate = new CrocodileScene({
            canvas: document.querySelector(`#crocodile-canvas`)
          });
          CrocodileCanvasAnimate.startAnimation();
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
