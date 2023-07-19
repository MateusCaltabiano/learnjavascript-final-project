// TODO: define AppData class
export default class AppData {
  constructor() {
    this.food = [];
  }

  addFood(carbs, protein, fat) {
    carbs = Number.parseInt(carbs, 10);
    protein = Number.parseInt(protein, 10);
    fat = Number.parseInt(fat, 10);
    const addedFood = { carbs, protein, fat };
    this.food.push(addedFood);
  }

  getTotalCarbs() {
    const totalCarbs = this.food
      .map((food) => food.carbs)
      .reduce((total, current) => {
        return total + current;
      });
    return totalCarbs;
  }

  getTotalProtein() {
    const totalProtein = this.food
      .map((food) => food.protein)
      .reduce((total, current) => {
        return total + current;
      });
    return totalProtein;
  }

  getTotalFat() {
    const totalFat = this.food
      .map((food) => food.fat)
      .reduce((total, current) => {
        return total + current;
      });
    return totalFat;
  }

  getTotalCalories() {
    return (
      this.getTotalCarbs() * 4 +
      this.getTotalProtein() * 4 +
      this.getTotalFat() * 9
    );
  }
}
