import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";

const requestConfig = {}
export default function Meals() {
 


  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals",requestConfig,[]);



  if(isLoading){
    return <p>Fetching meals....</p>
  }

if(error)
{
  return <ErrorPage title="failed to fetch meals" message={error} ></ErrorPage>
}


  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
