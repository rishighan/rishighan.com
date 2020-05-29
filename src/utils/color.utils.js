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
    image.addEventListener("load", function () {
      return colorThief.getColor(img);
    });
  }
};

/**
 * Gets the opposite color for a supplied rgb value
 * @param {Array} - Array of r, g, b values
 * @return {String} - A string representing hex value for the opposite color
 */
export const calculateOppositeColor = (rgb) => {
  return invert(rgb);
};
