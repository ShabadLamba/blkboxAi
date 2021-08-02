import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IFrames } from '../interfaces/iframes';
import { IVideos } from '../interfaces/ivideos';

export interface IResponse {
  data: any;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServerServiceService {
  constructor(private http: HttpClient) {}

  getFramesUrl = 'https://devserver.blkbox.ai/api/studio/creatives/step2';
  getListOfVideosUrl = 'https://devserver.blkbox.ai/api/studio/creatives/step3';

  getListOfFrames() {
    return this.http.get<IResponse>(this.getFramesUrl);
  }

  getListOfVideos() {
    return this.http.get<IResponse>(this.getListOfVideosUrl);
  }
}
