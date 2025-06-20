import sql from 'better-sqlite3';
const db = sql('meals.db');
import fs from 'fs';
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
export async function saveMeal(meal) {
console.log('module shareMeal called with meal:', meal);

  const extensions = meal.image.name.split('.').pop()
  const fileName = `${meal.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${extensions}`;
  const filePath = `public/images/${fileName}`;

  const stream=fs.createWriteStream(filePath);
  const bufferImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferImage),(err) => {
    if (err) {
      console.error('Error writing image file:', err);
      throw new Error('Failed to save image');
    }
  });
  meal.image = `/images/${fileName}`; // Update the meal object with the new image path

  stream.end(); 
 
  // Insert the meal into the database
  const stmt = db.prepare(
    'INSERT INTO meals (creator, creator_email,slug, title, summary, instructions, image) VALUES (?,?, ?, ?, ?, ?, ?)'
  );
  stmt.run(meal.name, meal.email,meal.name, meal.title, meal.summary, meal.instructions, meal.image);

  return { success: true };
}