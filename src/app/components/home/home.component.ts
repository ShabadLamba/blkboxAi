import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IFrames } from 'src/app/interfaces/iframes';
import { ServerServiceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Output() frameSelected = new EventEmitter();
  @Output() switchToVideos = new EventEmitter();
  @ViewChild('video') videos: ElementRef;

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

  ngOnDestroy(): void {
    for (const divs of this.videos.nativeElement.children) {
      const e = divs.children[0];
      e.src = '';
      e.remove();
      e.srcObject = null;
    }
  }
}
