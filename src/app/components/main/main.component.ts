import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ServerServiceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  activeTab = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedFrame = null;
  listOfVideos = [];

  constructor(
    private snackBar: MatSnackBar,
    private serverService: ServerServiceService
  ) {}

  ngOnInit(): void {
    this.goToHome('init');
  }

  goToHome(e) {
    this.activeTab = 'home';
  }

  goToVideos(e) {
    if (this.selectedFrame) {
      this.activeTab = null;
      this.serverService.getListOfVideos().subscribe(
        (value) => {
          this.activeTab = 'videos';
          this.listOfVideos = value.data;
          // this.playNext('');
        },
        (err) => {
          alert('Error Occurred: ' + err);
        }
      );
    } else {
      this.activeTab = 'home';
      this.openSnackBar('Please select a frame first and click next');
    }
  }

  frameSelected(e) {
    this.selectedFrame = e;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}
