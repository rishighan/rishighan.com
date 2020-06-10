import Colorthief from "color-thief";
import invert from "invert-color";

const colorThief = new Colorthief();

/**
 * Gets the dominant color from an input image
 * @param {HTMLImageElement} - An image node
 * @return {Array} - An array of r, g, b values for the dominant color
 */
export const getDominantColor = (img) => {
  if (img.complete) {
    return colorThief.getColor(img);
  } else {
    img.addEventListener("load", () => {
      return colorThief.getColor(img);
    });
  }
};

/**
 * Checks if an image has completed loading
 * @param {HTMLImageElement} - An image node
 * @return {Promise} - A Promise object that resolves the image load status
 */

export const getImageLoadStatus = img =>
  new Promise(resolve => {
    img.onload = () => resolve({ img, status: 'ok' });
    img.onerror = () => resolve({ img, status: 'error' });

  });

/**
 * Gets the opposite color for a supplied rgb value
 * @param {Array} - Array of r, g, b values
 * @return {String} - A string representing hex value for the opposite color
 */
export const calculateOppositeColor = (rgb) => {
  return invert(rgb);
};
