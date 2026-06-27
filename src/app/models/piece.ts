export interface Piece {
  id: number;
  image: string;
  correctIndex: number;
  currentIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  pctX?: number; // මේක අනිවාර්යයෙන්ම එකතු කරන්න
  pctY?: number; // මේකත් එකතු කරන්න
}