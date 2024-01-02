const getWrappedContent = ({
  elem,
  property,
  offset,
  duration
}) => {
  const text = elem.textContent;
  let timeOffset = 0;

  return text.trim().split(` `).filter((word) => word).reduce((html, word) => `
${html}
<span class="animated-text__word">
  ${word.split(``).reduce((wordHtml, letter, index) => {
    timeOffset += offset;
    index++;
    let currentOffset;
    if (index % 3 === 1) {
      currentOffset = timeOffset;
    } else if (index % 3 === 2) {
      currentOffset = timeOffset + offset;
    } else {
      currentOffset = timeOffset - offset;
    }

    return `
      ${wordHtml}
      <span class="animated-text__letter" style="transition: ${property} ${duration}ms ease-out ${currentOffset}ms">${letter}</span>
    `;
  }, ``)}
</span>
`, ``);
};

const textAnimated = ({
  selector,
  property = `transform`,
  offset = 40,
  duration = 350,
  delay = false
}) => {
  const elem = document.querySelector(selector);
  if (!elem) {
    return null;
  }

  elem.classList.add(`animated-text`);
  if (delay) {
    elem.classList.add(`animated-text--has-delay`);
  }

  elem.innerHTML = getWrappedContent({
    elem,
    property,
    offset,
    duration,
  });

  return {
    start: () => {
      if (elem) {
        elem.classList.add(`is-active`);
      }
    },
  };
};

export default textAnimated;
