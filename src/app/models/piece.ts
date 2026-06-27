export interface Piece {
  id: number;
  image: string;
  correctIndex: number;
  currentIndex: number;
  x: number;      // Must be number
  y: number;      // Must be number
  width: number;  // Must be number
  height: number; // Must be number
}