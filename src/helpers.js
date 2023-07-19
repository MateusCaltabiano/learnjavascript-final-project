export const capitalize = (word) =>
  (word = word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase());

export const calculateCalories = (carbs, protein, fat) => {
  return carbs * 4 + protein * 4 + fat * 9;
};
