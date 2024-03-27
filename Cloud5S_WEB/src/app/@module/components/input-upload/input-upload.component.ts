import {Component, EventEmitter, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-input-upload',
  templateUrl: './input-upload.component.html',
  styleUrls: ['./input-upload.component.scss'],
  providers: [NzMessageService],
})
export class InputUploadComponent {
  @Output() valueChange = new EventEmitter<any>();
  listFile: NzUploadFile[] = [];
  constructor(private msg: NzMessageService) {}

  handleChange(info: NzUploadChangeParam): void {
    console.log(info, 'info');
    this.valueChange.emit(info);
  }
}
