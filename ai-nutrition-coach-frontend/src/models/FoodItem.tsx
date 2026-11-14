export interface FoodItem {
  id: number;
  name: string;
  amount: number;
  unit: FoodUnit;
}

export type FoodUnit =
  | "Piece"
  | "Bowl"
  | "Cup"
  | "Plate"
  | "Glass"
  | "Spoon"
  | "Serving";