import {AttachmentService} from './../../../services/Business/attachment.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {envAttachment} from 'src/environments/env-attachment';

@Component({
  selector: 'app-view-docx',
  templateUrl: './view-docx.component.html',
  styleUrls: ['./view-docx.component.scss'],
})
export class ViewDocxComponent implements OnInit {
  urlFile: string = '';

  constructor(private route: ActivatedRoute, private attachmentService: AttachmentService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.GetDetail(params['id']);
    });
  }

  GetDetail(id: string) {
    this.attachmentService.GetDetail(id).subscribe(({data}) => {
      this.urlFile = data.attachment.url;
    });
  }
}
