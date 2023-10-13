const ingredients = [
  {
    id: "1",
    name: "Shrimp",
    quantity: 100,
    unit: "grams",
  },
  {
    id: "2",
    name: "Grits",
    quantity: 2,
    unit: "cups",
  },
  {
    id: "3",
    name: "Water",
    quantity: 4,
    unit: "cups",
  },
  {
    id: "4",
    name: "Salt",
    quantity: 1,
    unit: "teaspoon",
  },
  {
    id: "5",
    name: "Pepper",
    quantity: 1,
    unit: "teaspoon",
  },
  {
    id: "6",
    name: "Butter",
    quantity: 2,
    unit: "tablespoons",
  },
  { id: "7", name: "Flour", quantity: 1, unit: "cup" },
  { id: "8", name: "Egg", quantity: 1, unit: "large" },
  { id: "9", name: "Milk", quantity: 1, unit: "cup" },
  { id: "10", name: "Butter", quantity: 1, unit: "tablespoon" },
  { id: "11", name: "Romaine Lettuce", quantity: 1, unit: "head" },
  { id: "12", name: "Tomato", quantity: 1, unit: "large" },
];

const courses = [
  {
    id: "1",
    type: "Entree",
    name: "Shrimp & Grits d",
    ingredients: [
      ingredients[0],
      ingredients[1],
      ingredients[2],
      ingredients[3],
      ingredients[4],
      ingredients[5],
      ingredients[6],
      ingredients[7],
      ingredients[8],
      ingredients[9],
    ],
  },
  {
    id: "2",
    type: "Side",
    name: "Salad",
    ingredients: [ingredients[10], ingredients[1]],
  },
];

const meals = [
  {
    id: "1",
    name: "Shrimp & Grits + Salad",
    day: 0,
    courses: [courses[0], courses[1]],
  },
];

const mealPlans = [
  {
    id: "1",
    range: ["1696375164738", "1696979964738"],
    meals: [meals[0]],
  },
];

const data = {
  ingredients,
  courses,
  meals,
  mealPlans,
};

export default data;
