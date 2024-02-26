import Swiper from "swiper";
import {currentTheme, changePageTheme} from "./page-theme";
import {plainMeshController} from './3d-animation/plainMeshController';


export default () => {
  let storySlider;

  const setSlider = function () {
    plainMeshController.setStoryActiveMesh();
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              plainMeshController.setStoryActiveMesh(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              plainMeshController.setStoryActiveMesh(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              plainMeshController.setStoryActiveMesh(2);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              plainMeshController.setStoryActiveMesh(3);
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              plainMeshController.setStoryActiveMesh(0);
              changePageTheme(`theme--purple`);
            } else if (storySlider.activeIndex === 2) {
              plainMeshController.setStoryActiveMesh(1);
              changePageTheme(`theme--blue`);
            } else if (storySlider.activeIndex === 4) {
              plainMeshController.setStoryActiveMesh(2);
              changePageTheme(`theme--light-blue`);
            } else if (storySlider.activeIndex === 6) {
              plainMeshController.setStoryActiveMesh(3);
              changePageTheme(`theme--main`);
            }

            if (storySlider.activeIndex === 0) {
              document.querySelector(`.js-control-prev`).classList.add(`swiper-button-disabled`);
            } else if (storySlider.activeIndex === 6) {
              document.querySelector(`.js-control-next`).classList.add(`swiper-button-disabled`);
            } else {
              document.querySelectorAll(`.js-control`).forEach((control) => control.classList.remove(`swiper-button-disabled`));
            }

          },
          resize: () => {
            // storySlider.update();
          },
          slideChangeTransitionStart: () => {
            storySlider.$el[0].classList.add(`is-fade`);
          },
          slideChangeTransitionEnd: () => {
            storySlider.$el[0].classList.remove(`is-fade`);
          },
        },
        observer: true,
        observeParents: true,
        allowTouchMove: false
      });
    }
  };

  document.querySelectorAll(`.js-control`).forEach((button) => {
    button.addEventListener(`click`, () => {

      storySlider.$el[0].classList.add(`is-start`);
      storySlider.$el[0].classList.remove(`is-end`);

      setTimeout(() => {
        if (button.classList.contains(`js-control-prev`)) {
          storySlider.slidePrev();
        }

        if (button.classList.contains(`js-control-next`)) {
          storySlider.slideNext();
        }

        storySlider.$el[0].classList.remove(`is-start`);
        storySlider.$el[0].classList.add(`is-end`);
      }, 600);

    });
  });


  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
