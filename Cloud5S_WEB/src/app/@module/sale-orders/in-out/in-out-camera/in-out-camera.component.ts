import {Component, OnInit} from '@angular/core';
import {envCamera} from 'src/environments/env-camera';
declare let flvjs: any;

@Component({
  selector: 'app-in-out-camera',
  templateUrl: './in-out-camera.component.html',
  styleUrls: ['./in-out-camera.component.scss'],
})
export class InOutCameraComponent implements OnInit {
  ngOnInit(): void {
    this.loadCamera();
    this.loadCamera2();
  }
  loadCamera() {
    var stream_01 = document.getElementById('stream_01') as any;
    stream_01?.play();
    if (flvjs.isSupported()) {
      var config = {
        enableStashBuffer: false,
        autoCleanupSourceBuffer: true,
        stashInitialSize: 0,
        deferLoadAfterSourceOpen: false,
        accurateSeek: true,
      };
      var flvPlayer_01 = flvjs.createPlayer(
        {
          type: 'flv',
          isLive: true,
          url: envCamera.streamCameraUrl,
        },
        config,
      );
      flvPlayer_01?.attachMediaElement(stream_01);
      flvPlayer_01?.load();
    }
  }

  loadCamera2() {
    var stream_02 = document.getElementById('stream_02') as any;
    stream_02?.play();
    if (flvjs.isSupported()) {
      var config = {
        enableStashBuffer: false,
        autoCleanupSourceBuffer: true,
        stashInitialSize: 0,
        deferLoadAfterSourceOpen: false,
        accurateSeek: true,
      };
      var flvPlayer_02 = flvjs.createPlayer(
        {
          type: 'flv',
          isLive: true,
          url: envCamera.streamCameraUrl_2,
        },
        config,
      );
      flvPlayer_02?.attachMediaElement(stream_02);
      flvPlayer_02?.load();
    }
  }
}
