import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PuzzleComponent } from './pages/puzzle/puzzle.component';


@NgModule({
  declarations: [
    AppComponent,
    PuzzleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }