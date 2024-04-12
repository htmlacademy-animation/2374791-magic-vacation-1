// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import textAnimated from './modules/text-animation';
import {SceneController} from './modules/3d-animation/sceneController';


// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

export const sceneController = new SceneController();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, function () {
  document.querySelector(`body`).classList.add(`is-loaded`);

  const titleAnimate = textAnimated({
    selector: `.intro__title`,
  });

  const sliderTtitleAnimated = textAnimated({
    selector: `.slider__item-title`
  });

  const prizesTitleAnimated = textAnimated({
    selector: `.prizes__title`
  });

  const rulesTitleAnimated = textAnimated({
    selector: `.rules__title`
  });

  const gameTitleAnimated = textAnimated({
    selector: `.game__title`
  });

  const introTitleAnimated = textAnimated({
    selector: `.intro__date`,
    delay: true
  });

  setTimeout(() => {
    introTitleAnimated.start();
  }, 1000);

  setTimeout(()=>{
    document.body.classList.add(`loaded`);
  }, 2000);

});
