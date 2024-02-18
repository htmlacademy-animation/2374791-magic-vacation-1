import Swiper from "swiper";
import {currentTheme, changePageTheme} from "./page-theme";
import sceneStory from './3d-animation/3d-scene-story';


export default () => {
  let storySlider;
  const story = new sceneStory();

  const setSlider = function () {
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
              story.setScene(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              story.setScene(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              story.setScene(2);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              story.setScene(3);
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
              story.setScene(0);
              changePageTheme(`theme--purple`);
            } else if (storySlider.activeIndex === 2) {
              story.setScene(1);
              changePageTheme(`theme--blue`);
            } else if (storySlider.activeIndex === 4) {
              story.setScene(2);
              changePageTheme(`theme--light-blue`);
            } else if (storySlider.activeIndex === 6) {
              story.setScene(3);
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
    document.body.addEventListener(`screenChanged`, (e) => {
      if (e.detail.screenName === `story`) {
        story.init();
        story.setScene(0);
      }
    });
  });

  setSlider();
  document.body.addEventListener(`screenChanged`, (e) => {
    if (e.detail.screenName === `story`) {
      story.init();
      story.setScene(0);
    }
  });
};
