import {Component, Input, OnInit} from '@angular/core';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {AttachmentService} from 'src/app/services/Business/attachment.service';
import Swal from 'sweetalert2';
import {envAttachment} from 'src/environments/env-attachment';
import {AttachmentDtoModel} from 'src/app/models/Business/attachment.model';

@Component({
  selector: 'app-list-file',
  templateUrl: './list-file.component.html',
  styleUrls: ['./list-file.component.scss'],
})
export class ListFileComponent implements OnInit {
  @Input() refrenceId: string = '';
  @Input() modueType: string = '';
  @Input() isEdit: boolean = false;
  @Input() rightEdit: string = '';
  @Input() rightDelete: string = '';
  @Input() rightView: string = '';
  data: any;
  filter = new BaseFilter();
  maxTagCount = 1;
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  fileUpload: any = null;

  constructor(private router: Router, private route: ActivatedRoute, private attmentService: AttachmentService) {}

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.attmentService.GetByRefrenceId(this.refrenceId).subscribe(({data}) => {
      console.log(data, 'attachment');
      this.data = data;
    });
  }

  handleValueChange(e: any) {}

  viewFile(id: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/view-file/${id}`]));
    window.open(url, '_blank');
  }

  downloadFile(item: AttachmentDtoModel) {
    this.attmentService.Download(item.attachmentId).subscribe((blob: any) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `${item.attachment.title}${item.attachment.extension}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  deleteFile(id: string) {
    Swal.fire({
        showCloseButton: true,
      title: 'Xóa file ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.attmentService.Delete(id).subscribe(
          (data) => {
            this.loadInit();
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  handleChange(info: NzUploadChangeParam): void {
    this.fileUpload = info.file;
  }

  customUploadReq = (item: any) => {
    return this.attmentService
      .Upload(item.file, {
        moduleType: this.modueType,
        fileType: 'WORD',
        referenceId: this.refrenceId.toUpperCase(),
      })
      .subscribe((res) => {
        if (res.status) {
          this.loadInit();
        }
      });
  };

  showTypeFile(extension: string) {
    const filePdf = ['.pdf'];
    const fileWord = ['.docx', 'doc'];
    const fileImage = ['.jpg', 'jpeg', '.png', '.gif'];
    if (filePdf.includes(extension)) {
      return '<i class="bi bi-filetype-pdf"></i>';
    }
    if (fileWord.includes(extension)) {
      return '<i class="bi bi-file-earmark-word"></i>';
    }
    if (fileImage.includes(extension)) {
      return '<i class="bi bi-file-earmark-image"></i>';
    }
    return '<i class="bi bi-file"></i>';
  }
}
