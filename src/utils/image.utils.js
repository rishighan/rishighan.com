export const gcd = (a, b) => (b ? gcd(b, a % b) : a);

export const calculateAspectRatio = (width, height) => {
  const aspectRatio = gcd(width, height);
  const numerator = Math.round(width / aspectRatio);
  const denominator = Math.round(height / aspectRatio);
  return `${numerator}/${denominator}`;
};
