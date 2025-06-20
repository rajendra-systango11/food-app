'use server'

import { saveMeal } from "@/libs/components/meals/meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function shareMeal(formData) {
 console.log(formData, 'formData in shareMeal action');
 
  const meal = {
    name: formData.get('name'),
    email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'), // Assuming image is a File object from an input
  };
   await saveMeal(meal);
   revalidatePath('/meals')
   redirect('/meals');
    }