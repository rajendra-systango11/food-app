import { getMeal } from "@/libs/components/meals/meals";
import Image from "next/image";
import classes from '../page.module.css';
import BackButton from "./back-button";

export async function generateMetadata({ params }) {
  return {
    title: `Meal Details - ${params.mealSlug}`,
    description: `Details about the meal: ${params.mealSlug}`,
  };
};

export default async function MealDetailsPage({ params }) {
const meal = await getMeal(params.mealSlug);
 

// meal.instructions = meal.replace(/\n/g,'<br/>'); // Remove HTML tags
if (!meal) {
    return <p>Meal not found.</p>;
  } 
return (
    <>
    <header>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} width={500} height={500} />
        </div>
        <div className={classes.headerText}>
          <h2>{meal.title}</h2>
          <p>by {meal.creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{meal.summary}</p>
           <div className={classes.instructions}>
          <p>{meal.instructions}</p>    
          </div>
      </div>
        <BackButton />
    </>
  );
}
