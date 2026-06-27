export interface Piece {

  // Unique piece id (0-15)
  id: number;

  // Image path
  image: string;

  // Correct position (0-15)
  correctIndex: number;

  // Current position after shuffle
  currentIndex: number;

  // Background position inside original image
  x: number;
  y: number;

  // Piece size
  width: number;
  height: number;

  // Drag state
  isDragging: boolean;

  // Lock when correctly placed
  locked: boolean;

}