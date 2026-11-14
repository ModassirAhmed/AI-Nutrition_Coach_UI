import type { FoodItem } from "../models/FoodItem";
import { APP_CONSTANTS } from "../constants/appConstants";
import { MOCK_FOOD_ITEMS } from "../MockData/mockData";

const VISION_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const VISION_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
};

const parseVisionApiResponse = (data: any): FoodItem[] => {
  try {
    const rawText =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: any) => part.text || "")
        .join("") || "";

    if (!rawText) {
      return [];
    }

    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? jsonMatch[0] : rawText;

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Failed to parse LLM response:", error);
    return [];
  }
};

export const analyzeMeal = async (
  image: File
): Promise<FoodItem[]> => {
  if (APP_CONSTANTS.USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_FOOD_ITEMS), 1000);
    });
  }

  // --------------------------------------------------------
  // REACT VISION API CALL (ONLY ACTIVE WHEN A REAL KEY EXISTS)
  // --------------------------------------------------------
  // This is the direct frontend-only API call for local testing.
  // It is NOT safe to keep in a public GitHub portfolio repo.
  // If you want to use a backend later, comment out this block and
  // uncomment the BACKEND CALL block below instead.
  if (!VISION_API_KEY) {
    throw new Error(
      "Missing VITE_GEMINI_API_KEY. Set it in a local .env file or keep USE_MOCK_API=true."
    );
  }

  const base64Image = await fileToBase64(image);

  const response = await fetch(`${VISION_API_URL}?key=${VISION_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: image.type || "image/jpeg",
                data: base64Image,
              },
            },
            {
              text: "Identify all visible food items in this image. Return a JSON array of objects like [{ name: 'Rice', calories: 180 }] only. Do not include any markdown or explanation.",
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Vision API request failed");
  }

  const result = await response.json();
  return parseVisionApiResponse(result);

  // --------------------------------------------------------
  // BACKEND CALL (STORED FOR LATER)
  // --------------------------------------------------------
  // This is the backend version you already had.
  // To switch back to the backend later, comment out the REACT VISION API block above
  // and uncomment this block below.
  //
  // import axios from "axios";
  // import { API_ENDPOINTS } from "../constants/apiEndPoints";
  //
  // const formData = new FormData();
  // formData.append("image", image);
  //
  // const response = await axios.post<FoodItem[]>(
  //   API_ENDPOINTS.ANALYZE_MEAL,
  //   formData,
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );
  //
  // return response.data;
};