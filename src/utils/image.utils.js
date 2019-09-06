export const gcd = (a, b) => (b ? gcd(b, a % b) : a);

export const calculateDimensions = (width, height, options) => {
  const aspectRatio = gcd(width, height);
  const numerator = Math.round(width / aspectRatio);
  const denominator = Math.round(height / aspectRatio);
  if (options.targetWidth) {
    const targetHeight = parseInt(options.targetWidth, 10) / (numerator / denominator);
    return { numerator, denominator, targetHeight };
  }
};
