import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IFrames } from 'src/app/interfaces/iframes';
import { ServerServiceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Output() frameSelected = new EventEmitter();
  @Output() switchToVideos = new EventEmitter();

  constructor(private serverService: ServerServiceService) {}

  listOfVideoFrames: IFrames[];
  selectedVideo: string;

  ngOnInit(): void {
    this.frameSelected.emit(null);
    this.getListOfVideoFrames();
  }

  getListOfVideoFrames() {
    this.serverService.getListOfFrames().subscribe((value) => {
      this.listOfVideoFrames = value.data;
    });
  }

  videoSelected(frame: IFrames) {
    console.log(this.selectedVideo);
    console.log(frame);
    this.selectedVideo = frame.name;
  }

  goToVideos() {
    console.log(this.selectedVideo);
    this.frameSelected.emit(this.selectedVideo);
    this.switchToVideos.emit();
  }
}
