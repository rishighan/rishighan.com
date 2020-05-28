import Colorthief from "color-thief";
import invert from "invert-color";

const colorThief = new Colorthief();

export const getDominantColor = img => {
    if (img.complete) {
        return colorThief.getColor(img);
      } else {
        image.addEventListener('load', function() {
          return colorThief.getColor(img);
        });
      }
};

export const calculateOppositeColor = rgb => {
    return invert(rgb);
}