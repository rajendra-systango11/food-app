// scripts/init-data.ts
const { createClient } = require('@libsql/client');
require('dotenv').config(); // 👈 loads .env file

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_DB_TOKEN,
});

const dummyMeals = [
  {
    title: 'Juicy Cheese Burger',
    slug: 'juicy-cheese-burger',
    image: '/burger.jpg',
    summary:
      'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
    instructions: `1. Prepare the patty...`, // shortened for clarity
    creator: 'John Doe',
    creator_email: 'johndoe@example.com',
  },
  {
    title: 'Spicy Curry',
    slug: 'spicy-curry',
    image: '/curry.jpg',
    summary: 'A rich and spicy curry...',
    instructions: `1. Chop vegetables...`,
    creator: 'Max Schwarz',
    creator_email: 'max@example.com',
  },
  // 🔁 Add other meals as needed...
];

async function init() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      image TEXT NOT NULL,
      summary TEXT NOT NULL,
      instructions TEXT NOT NULL,
      creator TEXT NOT NULL,
      creator_email TEXT NOT NULL
    )
  `);

  const insertStmt = `
    INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  for (const meal of dummyMeals) {
    try {
      await db.execute({
        sql: insertStmt,
        args: [
          meal.slug,
          meal.title,
          meal.image,
          meal.summary,
          meal.instructions,
          meal.creator,
          meal.creator_email,
        ],
      });
      console.log(`✅ Inserted: ${meal.title}`);
    } catch (err) {
      if (err.message.includes('UNIQUE constraint')) {
        console.log(`⚠️ Already exists: ${meal.title}`);
      } else {
        console.error(`❌ Error inserting ${meal.title}:`, err.message);
      }
    }
  }

  console.log('🌱 Database seeded.');
}
module.exports = { db };

init();
