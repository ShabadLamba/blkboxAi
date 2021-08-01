import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() home = new EventEmitter();
  @Output() videos = new EventEmitter();
  activeTab = 'home';
  @Input() set _activeTab(value) {
    this.activeTab = value;
  }

  constructor() {}

  ngOnInit(): void {}

  goToHome(e) {
    this.home.emit(e);
  }

  goToVideos(e) {
    this.videos.emit(e);
  }
}
