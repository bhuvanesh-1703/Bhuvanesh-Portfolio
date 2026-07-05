/**
 * Smoothly scroll to a DOM element by its selector.
 * @param {string} selector - CSS selector (e.g. '#about')
 * @param {number} offset - Pixels to offset from the top (default: 80)
 */
export function scrollToElement(selector, offset = 80) {
  const element = document.querySelector(selector);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: 'smooth',
    });
  }
}
