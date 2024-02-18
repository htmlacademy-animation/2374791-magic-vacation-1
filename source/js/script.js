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
import sceneTop from './modules/3d-animation/3d-scene-top';


// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
const top = new sceneTop();

document.body.addEventListener(`screenChanged`, (e) => {
  if (e.detail.screenName === `top`) {
    top.init();
  }
});

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


});
