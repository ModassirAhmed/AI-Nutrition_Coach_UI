import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FOOD_UNITS } from "../constants/appConstants";
import { MOCK_FOOD_ITEMS } from "../MockData/mockData";
import type { FoodItem } from "../models/FoodItem";

const ReviewMeal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFoods =
    (location.state?.foods as FoodItem[]) ?? MOCK_FOOD_ITEMS;
    //TODO For production, I'd change it to below to stop using Mocks
//     const initialFoods =
//   (location.state?.foods as FoodItem[]) ?? [];

  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);

  const updateFood = (
    id: number,
    field: keyof FoodItem,
    value: string | number
  ) => {
    setFoods((prev) =>
      prev.map((food) =>
        food.id === id
          ? { ...food, [field]: value }
          : food
      )
    );
  };

  const addFood = () => {
    setFoods((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        amount: 1,
        unit: "Serving",
      },
    ]);
  };

  const removeFood = (id: number) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  const handleCalculateNutrition = () => {
    console.log("Foods to send:", foods);

    // TODO:
    // POST /api/v1/nutrition/calculate
    // body = foods
  };

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-2 text-4xl font-bold">
        Review Detected Foods
      </h1>

      <p className="mb-8 text-slate-400">
        Review and correct the detected foods before calculating nutrition.
      </p>

      <div className="space-y-5">
        {foods.map((food) => (
          <div
            key={food.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="grid grid-cols-12 gap-4">

              {/* Food Name */}
              <input
                type="text"
                value={food.name}
                placeholder="Food Name"
                onChange={(e) =>
                  updateFood(food.id, "name", e.target.value)
                }
                className="col-span-5 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-green-500"
              />

              {/* Amount */}
              <input
                type="number"
                min={0}
                step={0.5}
                value={food.amount}
                onChange={(e) =>
                  updateFood(
                    food.id,
                    "amount",
                    Number(e.target.value)
                  )
                }
                className="col-span-2 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-green-500"
              />

              {/* Unit */}
              <select
                value={food.unit}
                onChange={(e) =>
                  updateFood(food.id, "unit", e.target.value)
                }
                className="col-span-3 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-green-500"
              >
                {FOOD_UNITS.map((unit) => (
                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>
                ))}
              </select>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeFood(food.id)}
                className="col-span-2 rounded-lg bg-red-600 px-4 py-3 text-white transition hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-700 px-6 py-3 text-white transition hover:bg-slate-800"
        >
            ← Back
        </button>

        <button
          type="button"
          onClick={addFood}
          className="rounded-lg bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600"
        >
          + Add Food
        </button>

        <button
          type="button"
          onClick={handleCalculateNutrition}
          className="rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Calculate Nutrition
        </button>

      </div>
    </div>
  );
};

export default ReviewMeal;