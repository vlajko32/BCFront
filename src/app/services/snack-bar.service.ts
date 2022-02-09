import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPositionBottom: MatSnackBarVerticalPosition = 'bottom';
  verticalPositionTop: MatSnackBarVerticalPosition = 'bottom';
  constructor( private snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Dismiss', 
    {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPositionBottom,
    });
  }
}
