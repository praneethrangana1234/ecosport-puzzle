import { Component, HostListener, OnInit } from '@angular/core';
import { PuzzleService } from '../../services/puzzle.service';
import { Piece } from '../../models/piece';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  pieces: Piece[] = [];

  dragPiece: Piece | null = null;

  dragIndex = -1;

  completed = false;

  minutes = '00';
  seconds = '00';

  private totalSeconds = 0;

  private timer: any;

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {

    this.restart();

  }

  restart() {

    this.completed = false;

    this.totalSeconds = 0;

    clearInterval(this.timer);

    this.minutes = '00';
    this.seconds = '00';

    this.pieces = this.puzzleService.createPieces('assets/player.jpg');

    this.startTimer();

  }

  startTimer() {

    this.timer = setInterval(() => {

      this.totalSeconds++;

      const min = Math.floor(this.totalSeconds / 60);

      const sec = this.totalSeconds % 60;

      this.minutes = min.toString().padStart(2, '0');

      this.seconds = sec.toString().padStart(2, '0');

    }, 1000);

  }

  pointerDown(event: PointerEvent, piece: Piece) {

    if (this.completed) return;

    this.dragPiece = piece;

    this.dragPiece.isDragging = true;

    this.dragIndex = this.pieces.indexOf(piece);

  }

  pointerLeave(piece: Piece) {

    // Will be used in Part 2

  }
    @HostListener('window:pointermove', ['$event'])
  pointerMove(event: PointerEvent) {

    if (!this.dragPiece) {
      return;
    }

    // Optional: visual feedback while dragging.
    // We'll improve this animation later.

  }

  pointerUp(piece?: Piece) {

    if (!this.dragPiece) {
      return;
    }

    this.dragPiece.isDragging = false;

    // If released over another piece, swap them.
    if (piece && piece !== this.dragPiece) {

      const from = this.dragIndex;
      const to = this.pieces.indexOf(piece);

      this.puzzleService.swapPieces(this.pieces, from, to);

    }

    this.dragPiece = null;
    this.dragIndex = -1;

    this.checkWin();

  }

  checkWin() {

    if (this.puzzleService.isCompleted(this.pieces)) {

      this.completed = true;

      clearInterval(this.timer);

      setTimeout(() => {

        alert('🏆 Congratulations!\n\nYou earned the Gold Badge!');

      }, 300);

    }

  }

}