import axios from "axios";
import type { FoodItem } from "../models/FoodItem";
import { APP_CONSTANTS } from "../constants/appConstants";
import { MOCK_FOOD_ITEMS } from "../MockData/mockData";
import { API_ENDPOINTS } from "../constants/apiEndPoints";

export const analyzeMeal = async (
  image: File
): Promise<FoodItem[]> => {
  if (APP_CONSTANTS.USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_FOOD_ITEMS), 1000);
    });
  }

  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post<FoodItem[]>(
    API_ENDPOINTS.ANALYZE_MEAL,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};