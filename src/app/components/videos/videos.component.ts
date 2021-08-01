import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  selectedFrameName = null;
  @Input() set _selectedFrameName(value) {
    this.selectedFrameName = value;
  }

  listOfVideos = [];
  @Input() set _listOfVideos(value) {
    if (value) {
      this.listOfVideos = value;
    }
  }
  currentVideo = {};
  currentIndex = 0;
  activeIndex = 0;
  isPlaying = false;
  playIconDiv: any;
  duration = '';
  currentTotalDurationLeft = 0;
  videoPreviousTime = 0;
  totalDuration = 0;

  toolTipTextForPlayerOptions = {
    add: 'Add frame',
    swap: 'Replace frames',
    next: 'Play next',
    previous: 'Play previous',
    delete: 'Delete frame',
  };

  constructor() {}

  ngOnInit(): void {
    this.playIconDiv = document.getElementById('play') as HTMLElement;
    const video = document.getElementById('video') as HTMLVideoElement;
    this.playNext(window.Event, video);
  }

  showListOfVideos() {
    this.currentVideo = this.listOfVideos[this.currentIndex];
    this.currentIndex += 1;
  }

  playNext(e, video?) {
    console.log(e);
    if (this.listOfVideos.length > 0) {
      if (
        this.currentIndex > 0 &&
        this.currentIndex < this.listOfVideos.length
      ) {
        this.activeIndex = this.currentIndex;
        this.currentVideo = this.listOfVideos[this.currentIndex];
        this.currentIndex += 1;
        this.playVideo(video);
      } else if (this.currentIndex >= this.listOfVideos.length) {
        this.resetVideo(video);
      }

      if (this.currentIndex === 0 && video.paused) {
        this.currentVideo = this.listOfVideos[this.currentIndex];
        this.currentIndex += 1;
        this.activeIndex = 0;
      } else if (this.currentIndex === 0 && !video.paused) {
        // debugger;
        this.currentIndex += 1;
        this.activeIndex = 1;
        this.currentVideo = this.listOfVideos[this.currentIndex];
        this.playVideo(video);
        this.currentIndex += 1;
      }
    }
  }

  playPrevious(e, video?) {
    if (this.listOfVideos.length > 0) {
      if (
        this.currentIndex > 0 &&
        this.currentIndex < this.listOfVideos.length
      ) {
        this.currentIndex = this.activeIndex;
        this.currentIndex -= 1;
        this.currentVideo = this.listOfVideos[this.currentIndex];
        this.playVideo(video);
        this.activeIndex = this.currentIndex;
      } else if (this.currentIndex < 0) {
        this.resetVideo(video);
        this.currentIndex += 1;
        this.activeIndex = 0;
      } else if (this.currentIndex >= this.listOfVideos.length) {
        this.currentIndex = this.listOfVideos.length - 1;
        this.activeIndex = this.currentIndex;
        this.currentVideo = this.listOfVideos[this.currentIndex];
        this.playVideo(video);
      }

      // if (this.currentIndex === 0) {
      //   this.currentIndex = 1;
      // }
    }
  }

  playVideo(video) {
    this.playIconDiv.style.display = 'none';
    video.autoplay = true;
    video.play();
    this.isPlaying = true;
  }

  onMetadata(e, video) {
    console.log('metadata: ', e);
    console.log('duration: ', (this.totalDuration += video.duration));
    this.currentTotalDurationLeft = this.totalDuration;
    this.updateDuration(video);
  }

  updateDuration(video?) {
    if (video) {
      this.currentTotalDurationLeft -=
        video.currentTime - this.videoPreviousTime;
      this.videoPreviousTime = video.currentTime;
    }
    console.log('CurrentTime', video.currentTime);
    const hours = Math.floor(this.currentTotalDurationLeft / 3600);
    const minutes = Math.floor(
      (this.currentTotalDurationLeft - hours * 3600) / 60
    );
    const seconds = Math.floor(
      this.currentTotalDurationLeft - hours * 3600 - minutes * 60
    );
    this.duration =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0');
  }

  deleteFrame(video) {
    this.listOfVideos.splice(this.currentIndex - 1, 1);
    this.resetVideo(video);
    this.currentIndex = 1;
    this.activeIndex = 0;
  }

  resetVideo(video) {
    video.autoplay = false;
    video.pause();
    video.currentTime = 0;
    this.currentIndex = 0;
    this.currentVideo = this.listOfVideos[this.currentIndex];
    video.load();
    this.isPlaying = false;
    this.playIconDiv.style.display = 'block';
  }
}
