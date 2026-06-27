import { Injectable } from '@angular/core';
import { Piece } from '../models/piece';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor() { }

  createPieces(image: string): Piece[] {

    const pieces: Piece[] = [];

    const pieceSize = 100;
    let id = 0;

    // Create 16 pieces (4 x 4)
    for (let row = 0; row < 4; row++) {

      for (let col = 0; col < 4; col++) {

        pieces.push({

          id: id,

          image: image,

          correctIndex: id,

          currentIndex: id,

          x: col * pieceSize,

          y: row * pieceSize,

          width: pieceSize,

          height: pieceSize,

          isDragging: false,

          locked: false

        });

        id++;

      }

    }

    // Shuffle puzzle
    this.shuffle(pieces);

    // Update current positions
    pieces.forEach((piece, index) => {
      piece.currentIndex = index;
    });

    return pieces;

  }

  shuffle(array: Piece[]): void {

    for (let i = array.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];

    }

  }

  swapPieces(pieces: Piece[], first: number, second: number): void {

    const temp = pieces[first];

    pieces[first] = pieces[second];

    pieces[second] = temp;

    pieces[first].currentIndex = first;
    pieces[second].currentIndex = second;

  }

  isCompleted(pieces: Piece[]): boolean {

    return pieces.every(piece => piece.correctIndex === piece.currentIndex);

  }

}