import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public sendMessage(message: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition : 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-style']
    });
  }
}
