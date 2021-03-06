import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedFrameName = null;
  @Input() set _selectedFrameName(value) {
    this.selectedFrameName = value;
  }

  listOfVideos = [];
  @Input() set _listOfVideos(value) {
    if (value) {
      this.listOfVideos = value;
      // this.listOfVideos[0].url += 1;
    }
  }

  @ViewChild('videoList') videoList: ElementRef;
  @ViewChild('video') videoMain: ElementRef;
  @ViewChild('video2') videoFramesList: ElementRef;
  currentVideo = {};
  currentIndex = 0;
  activeIndex = 0;
  isPlaying = false;
  playIconDiv: any;
  duration = '';
  currentTotalDurationLeft = 0;
  videoPreviousTime = 0;
  totalDuration = 0;
  mapOfDurations = {};
  allVideosLoadedSuccessfully = false;

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

  ngAfterViewInit(): void {}

  isVideoLoadedSuccessfully(video) {
    return Object.keys(this.mapOfDurations).includes(video.position);
  }

  showListOfVideos() {
    this.currentVideo = this.listOfVideos[this.currentIndex];
    this.currentIndex += 1;
  }

  playNext(e, video?) {
    console.log(e);
    // if (this.isVideoLoadedSuccessfully(this.listOfVideos[this.activeIndex])) {
    if (e.type === 'click') {
      this.currentTotalDurationLeft -= video.duration - video.currentTime;
    }
    this.videoPreviousTime = 0;
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
      if (e.type === 'click') {
        console.log(this.mapOfDurations);
        console.log(this.activeIndex);
        this.currentTotalDurationLeft +=
          this.mapOfDurations[this.listOfVideos[this.activeIndex].position] +
          video.currentTime +
          1;
      }
      this.videoPreviousTime = 0;
    }
  }

  playVideo(video) {
    this.playIconDiv.style.display = 'none';
    video.autoplay = true;
    video.play();
    this.isPlaying = true;
  }

  onMetadata(e, video, position) {
    console.log('metadata: ', e);
    console.log('duration: ', (this.totalDuration += video.duration));
    this.mapOfDurations[position] = video.duration;
    this.currentTotalDurationLeft = this.totalDuration;
    this.updateDuration(video);
    console.log(this.mapOfDurations);
    if (this.listOfVideos.length === Object.keys(this.mapOfDurations).length) {
      // debugger;
      this.allVideosLoadedSuccessfully = true;
    }

    console.log(
      'allVideosLoadedSuccessfully: ',
      this.allVideosLoadedSuccessfully
    );
  }

  updateDuration(video?) {
    if (video) {
      this.currentTotalDurationLeft -=
        video.currentTime - this.videoPreviousTime;
      this.videoPreviousTime = video.currentTime;
    }
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
    let removedFramesPositon = '';
    if (this.currentIndex === 0) {
      removedFramesPositon = this.listOfVideos[this.currentIndex].position;
    } else {
      removedFramesPositon = this.listOfVideos[this.currentIndex - 1].position;
    }
    this.listOfVideos.splice(this.currentIndex - 1, 1);
    this.resetVideo(video);
    this.currentIndex = 1;
    this.activeIndex = 0;
    this.currentTotalDurationLeft -= this.mapOfDurations[removedFramesPositon];
    this.totalDuration = this.currentTotalDurationLeft;
    this.videoPreviousTime = 0;
    this.updateDuration(video);
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
    this.currentTotalDurationLeft = this.totalDuration;
    this.videoPreviousTime = 0;
    this.updateDuration(video);
  }

  ngOnDestroy(): void {
    for (const divs of this.videoList.nativeElement.children) {
      const e = divs.children[0];
      e.src = '';
      e.remove();
      e.srcObject = null;
    }
  }
}
