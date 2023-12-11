import Swiper from "swiper";

export default () => {
  let storySlider;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

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
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
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
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
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
