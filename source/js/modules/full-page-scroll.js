import throttle from 'lodash/throttle';
import {currentTheme, changePageTheme} from "./page-theme";
import timerStart from './game-timer';
import NumberUpAnimation from './number-up-animation';
import {plainMeshController} from './3d-animation/plainMeshController';
import {scene} from './3d-animation/initAnimationScreen';
// import {sphere} from './3d-animation/sphere';
import {sceneController} from './3d-animation/sceneController';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const prevIndex = this.activeScreen;
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay(prevIndex);
  }

  changePageDisplay(prevIndex) {
    this.changeVisibilityDisplay(prevIndex);
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay(prevIndex) {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
      screen.classList.remove(`screen--prev`);
    });
    this.screenElements[prevIndex].classList.add(`screen--prev`);
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      if (this.activeScreen === 0 || this.activeScreen === 1) {
        document.querySelector(`.animation-screen`).classList.remove(`hidden`);
      } else {
        document.querySelector(`.animation-screen`).classList.add(`hidden`);
      }
      this.screenElements[this.activeScreen].classList.add(`active`);

      if (document.querySelectorAll(`.screen--show`).length) {
        document.querySelectorAll(`.screen--show`).forEach((screen) => {
          screen.classList.remove(`screen--show`);
          screen.classList.add(`screen--hidden`);
        });
      }
    }, 10);

    if (this.activeScreen === 1) {
      changePageTheme(`theme--purple`);
    } else {
      if (currentTheme !== `theme--main`) {
        changePageTheme(`theme--main`);
      }
    }

    if (this.activeScreen === 2) {
      const animateElement = document.getElementById(`primaryAwardAppear`);
      if (!animateElement.hasAttribute(`shown`)) {
        animateElement.setAttribute(`shown`, ``);
        animateElement.beginElement();
      }

      const journeysAnimation = new NumberUpAnimation(document.querySelector(`.prizes-count-journeys`), 3, 1);
      const casesAnimation = new NumberUpAnimation(document.querySelector(`.prizes-count-cases`), 7, 1);
      const codesAnimation = new NumberUpAnimation(document.querySelector(`.prizes-count-codes`), 900, 180);
      codesAnimation.setCountCurrent(11);


      setTimeout(() => {
        journeysAnimation.animate();
      }, 500);

      setTimeout(() => casesAnimation.animate(), 3000);
      setTimeout(() => codesAnimation.animate(), 5500);

    }

    if (this.activeScreen === 4) {
      timerStart();
    }

    const prevActiveScreen = document.querySelector(`.screen.active`);
    const nextActiveScreen = this.screenElements[this.activeScreen];

    scene.clearScene();

    if (nextActiveScreen.classList.contains(`screen--intro`)) {
      // sceneController.addScreenMesh();
      sceneController.addScene();
    } else if (nextActiveScreen.classList.contains(`screen--story`)) {
      plainMeshController.addScreenMesh(`story`).then(() => {
        plainMeshController.setStoryActiveMesh();
      });
    }

    if (
      prevActiveScreen &&
      prevActiveScreen.classList.contains(`screen--story`)
    ) {
      // bodyTheme.clearBodyTheme();
    }

    if (nextActiveScreen.classList.contains(`screen--story`)) {
      // bodyTheme.applyTheme();
    }

    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    nextActiveScreen.classList.remove(`screen--hidden`);
    setTimeout(() => {
      nextActiveScreen.classList.add(`active`);
    }, 100);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);

      if (activeItem.dataset.href === `story`) {
        document.querySelector(`.js-slider`).classList.remove(`is-end`);
        setTimeout(() => {
          document.querySelector(`.js-slider`).classList.add(`is-end`);
        }, 50);
      }
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
