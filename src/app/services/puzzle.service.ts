import { Injectable } from '@angular/core';
import { Piece } from '../models/piece';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  readonly GRID_SIZE = 4;
  readonly PIECE_SIZE = 100;

  constructor() { }

  // Component එකෙන් එවන ඕනෑම Image URL එකක් මෙතනට ලැබෙනවා
  createPieces(image: string): Piece[] {
    const pieces: Piece[] = [];
    let id = 0;

    for (let row = 0; row < this.GRID_SIZE; row++) {
      for (let col = 0; col < this.GRID_SIZE; col++) {
        
        // 4x4 grid එකක කෑලි 16 background position එක percentage වලින් හදන ලොජික් එක
        const percentX = Math.round((col / (this.GRID_SIZE - 1)) * 100 * 100) / 100;
        const percentY = Math.round((row / (this.GRID_SIZE - 1)) * 100 * 100) / 100;

        pieces.push({
          id: id,
          image: image, // 👈 මෙතනට කෙලින්ම එන ලයිව් URL එක ලස්සනට වැටෙනවා
          correctIndex: id,
          currentIndex: id,
          x: col * this.PIECE_SIZE, // PC Pixels
          y: row * this.PIECE_SIZE,
          width: this.PIECE_SIZE,
          height: this.PIECE_SIZE,
          pctX: percentX, // Mobile Percentages
          pctY: percentY
        });
        
        id++;
      }
    }

    this.shuffle(pieces);
    return pieces;
  }

  shuffle(pieces: Piece[]): void {
    // Fisher-Yates shuffle
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Update current indexes
    pieces.forEach((piece, index) => {
      piece.currentIndex = index;
    });
  }

  swap(pieces: Piece[], firstIndex: number, secondIndex: number): void {
    const temp = pieces[firstIndex];
    pieces[firstIndex] = pieces[secondIndex];
    pieces[secondIndex] = temp;

    // Refresh current indexes
    pieces.forEach((piece, index) => {
      piece.currentIndex = index;
    });
  }

  isCompleted(pieces: Piece[]): boolean {
    return pieces.every(piece =>
      piece.correctIndex === piece.currentIndex
    );
  }
}