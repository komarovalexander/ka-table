let maxValue = 1000;
export const generateNewId = () => {
  maxValue++;
  return maxValue;
};