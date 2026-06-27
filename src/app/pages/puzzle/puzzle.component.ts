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
  dragIndex = -1;       // Mobile Drag Source
  selectedPCIndex = -1; // PC Click Source

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

  // --- MOBILE: DRAG AND DROP ---
  dragStart(index: number): void {
    this.dragIndex = index;
  }

  drop(event: CdkDragDrop<Piece[]>): void {
    // Get the exact element where the finger/mouse was released
    const dropElement = document.elementFromPoint(
      event.dropPoint.x,
      event.dropPoint.y
    );

    if (!dropElement) {
      this.dragIndex = -1;
      return;
    }

    // Find the closest puzzle piece element that contains the index
    const pieceElement = dropElement.closest('.piece');
    if (!pieceElement) {
      this.dragIndex = -1;
      return;
    }

    // Find what position index this element holds in the current array
    const allPieces = Array.from(document.querySelectorAll('.piece'));
    const dropIndex = allPieces.indexOf(pieceElement);

    if (this.dragIndex !== -1 && dropIndex !== -1 && this.dragIndex !== dropIndex) {
      // Direct 2-piece swap using your Service
      this.puzzleService.swap(this.pieces, this.dragIndex, dropIndex);
      this.checkWin();
    }

    this.dragIndex = -1;
  }

  // --- PC: CLICK TO SWAP ---
  pieceClicked(index: number): void {
    // If a mobile drag happened, ignore clicks
    if (this.dragIndex !== -1) return;

    if (this.selectedPCIndex === -1) {
      this.selectedPCIndex = index; // Select first piece
    } else {
      if (this.selectedPCIndex !== index) {
        // Direct 2-piece swap using your Service
        this.puzzleService.swap(this.pieces, this.selectedPCIndex, index);
        this.checkWin();
      }
      this.selectedPCIndex = -1; // Reset selection
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