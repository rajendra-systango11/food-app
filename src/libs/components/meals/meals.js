 import { db } from '@/libs/db';
 
// ✅ Get all meals
export async function getMeals() {
  const result = await db.execute('SELECT * FROM meals');
  return result.rows.map((meal) => ({
    ...meal,
    image: meal.image || '/images/default.jpg',
  }));
}

// ✅ Get a single meal by slug
export async function getMeal(slug) {
  const result = await db.execute({
    sql: 'SELECT * FROM meals WHERE slug = ?',
    args: [slug],
  });

  const meal = result.rows[0];
  if (!meal) return null;

  return {
    ...meal,
    image: meal.image || '/images/default.jpg',
  };
}

// ✅ Save a new meal
export async function saveMeal(meal) {
    const buffer = Buffer.from(await meal.image.arrayBuffer());
  const base64 = buffer.toString('base64');

  const imagePath = `data:${meal.image.type};base64,${base64}`;
 
  await db.execute({
    sql: `
      INSERT INTO meals (creator, creator_email, slug, title, summary, instructions, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      meal.name,
      meal.email,
      meal.name,
      meal.title,
      meal.summary,
      meal.instructions,
      imagePath,
    ],
  });

  return { success: true };
}
