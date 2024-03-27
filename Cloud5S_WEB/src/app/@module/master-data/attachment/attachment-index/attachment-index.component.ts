import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AttachmentFilter} from 'src/app/@filter/Business/attachment.filter';
import {AttachmentDtoModel} from 'src/app/models/Business/attachment.model';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {AttachmentService} from 'src/app/services/Business/attachment.service';

@Component({
  selector: 'app-attachment-index',
  templateUrl: './attachment-index.component.html',
  styleUrls: ['./attachment-index.component.scss'],
})
export class AttachmentIndexComponent implements OnInit {
  paginationResult!: PaginationResult;
  filter = new AttachmentFilter();
  constructor(private attachmentService: AttachmentService, private router: Router) {}
  ngOnInit(): void {
    this.search();
  }

  search() {
    this.attachmentService.search(this.filter).subscribe(
      ({data}) => {
        this.paginationResult = data;
      },
      (error) => {
        console.log(error, 'error');
      },
    );
  }

  reload() {
    this.filter = new AttachmentFilter();
    this.search();
  }

  viewFile(id: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/view-file/${id}`]));
    window.open(url, '_blank');
  }

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

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.currentPage = 1;
    this.filter.pageSize = pageSize;
    this.search();
  }
}
