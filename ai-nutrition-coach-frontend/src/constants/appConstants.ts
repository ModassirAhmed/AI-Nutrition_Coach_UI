export const APP_CONSTANTS = {
  USE_MOCK_API: true, // Keep true in public repos; set to false only for local testing with a real API key.
  MAX_FILE_SIZE_MB: 10,
};

export const FOOD_UNITS = [
  "Piece",
  "Bowl",
  "Cup",
  "Plate",
  "Glass",
  "Spoon",
  "Serving",
] as const;