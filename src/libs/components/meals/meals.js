import sql from 'better-sqlite3';
const db = sql('meals.db');

export async function getMeals() {
  const meals = db.prepare('SELECT * FROM meals').all();
  return meals.map(meal => ({
    ...meal,
    image: meal.image || '/images/default.jpg', // Fallback image if none provided
  }));
}

export async function getMeal(slug) {
  const meal = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
  if (!meal) {
    return null; // Meal not found
  }
  return {
    ...meal,
    image: meal.image || '/images/default.jpg', // Fallback image if none provided
  };
}