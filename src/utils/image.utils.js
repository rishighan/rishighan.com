export const gcd = (a, b) => (b ? gcd(b, a % b) : a);

export const calculateAspectRatio = (width, height) => {
  const aspectRatio = gcd(width, height);
  const numerator = Math.round(width / aspectRatio);
  const denominator = Math.round(height / aspectRatio);
  return `${numerator}/${denominator}`;
};

export const inferImageDimensions = (imageUrl) => {
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  return calculateAspectRatio(imageElement.naturalWidth, imageElement.naturalHeight);
};

export const bytesToSize = bytes => {
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i === 0) return bytes + ' ' + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};
