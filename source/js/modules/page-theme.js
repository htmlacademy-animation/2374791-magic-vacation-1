let currentTheme = `theme--main`;
let body = document.querySelector(`body`);

const changePageTheme = (theme) => {
  body.classList.remove(currentTheme);
  currentTheme = theme;
  body.classList.add(theme);
};

export {changePageTheme, currentTheme};
