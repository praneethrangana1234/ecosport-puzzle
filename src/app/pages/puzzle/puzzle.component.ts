import { Component, OnInit, OnDestroy } from '@angular/core';
import { PuzzleService } from '../../services/puzzle.service';
import { Piece } from '../../models/piece';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit, OnDestroy {

  pieces: Piece[] = [];

  // Timer
  minutes = '00';
  seconds = '00';
  private timer: any;
  private totalSeconds = 0;

  completed = false;

  // Trackers
  dragIndex = -1;       // Dedicated for Mobile Drag
  selectedPCIndex = -1; // Dedicated for PC Clicks

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {
    this.restart();
  }

  restart(): void {
    clearInterval(this.timer);
    this.completed = false;
    this.totalSeconds = 0;
    this.minutes = '00';
    this.seconds = '00';
    this.dragIndex = -1;
    this.selectedPCIndex = -1;

    this.pieces = this.puzzleService.createPieces('assets/player.jpg');
    this.startTimer();
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      this.totalSeconds++;
      const min = Math.floor(this.totalSeconds / 60);
      const sec = this.totalSeconds % 60;
      this.minutes = min.toString().padStart(2, '0');
      this.seconds = sec.toString().padStart(2, '0');
    }, 1000);
  }

  // --- MOBILE ONLY: DRAG AND DROP ---
  dragStart(index: number): void {
    this.dragIndex = index;
  }

  drop(event: CdkDragDrop<Piece[]>): void {
    const dropIndex = event.currentIndex;

    if (this.dragIndex === -1 || this.dragIndex === dropIndex) {
      this.dragIndex = -1;
      return;
    }

    // Swap the dragged piece and dropped target piece
    this.puzzleService.swap(this.pieces, this.dragIndex, dropIndex);

    // Reset drag tracker & verify state
    this.dragIndex = -1;
    this.checkWin();
  }

  // --- PC ONLY: CLICK PROCESS TO SWAP ---
  pieceClicked(index: number): void {
    // If a mobile drag event just occurred, reset and skip click execution
    if (this.dragIndex !== -1) {
      return;
    }

    if (this.selectedPCIndex === -1) {
      // First click: Highlight selected piece
      this.selectedPCIndex = index;
    } else {
      // Second click: Swap them if they are different items
      if (this.selectedPCIndex !== index) {
        this.puzzleService.swap(this.pieces, this.selectedPCIndex, index);
        this.checkWin();
      }
      this.selectedPCIndex = -1; // Clear selection highlight
    }
  }

  private checkWin(): void {
    this.completed = this.puzzleService.isCompleted(this.pieces);

    if (this.completed) {
      clearInterval(this.timer);
      setTimeout(() => {
        alert('🏆 Congratulations!\n\n🥇 Gold Badge Achieved!');
      }, 300);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}