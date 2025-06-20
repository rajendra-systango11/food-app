import MealItem from "@/libs/components/meals/meal-item";
import { getMeals } from "@/libs/components/meals/meals";
import classes from './page.module.css';
 export default async function MealPage() {
    const  meals= await getMeals()
    return (
        <div >
            <div className={classes.container}>

             <h1>Meals</h1>
            <p>Welcome to the Meals page!</p>
            <p>Here you can explore a variety of meals shared by our community.</p>
            <p>Discover new recipes, learn cooking tips, and get inspired by food enthusiasts from around the world.</p>
            </div>
            <div className={classes.meals}>
            {
                meals.map((meal) => (
                    <MealItem
                        key={meal.slug}
                        title={meal.title}
                        slug={meal.slug}
                        image={meal.image}
                        summary={meal.summary}
                        creator={meal.creator}
                    />
            
                ))
            }
            </div> 
        </div>
    );
}