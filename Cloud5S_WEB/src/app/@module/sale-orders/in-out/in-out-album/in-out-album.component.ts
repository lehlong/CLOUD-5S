import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InOutImgComponent} from '../in-out-img/in-out-img.component';
import {Router} from '@angular/router';
import {InOutImageService} from 'src/app/services/MD/in-out-image.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {envAttachment} from 'src/environments/env-attachment';

@Component({
  selector: 'app-in-out-album',
  templateUrl: './in-out-album.component.html',
  styleUrls: ['./in-out-album.component.scss'],
})
export class InOutAlbumComponent implements OnInit {
  paginationResult!: PaginationResult;
  filter = new BaseFilter();
  constructor(private dialog: MatDialog, private router: Router, private _service: InOutImageService) {}
  ngOnInit(): void {
    this.search();
  }
  showImage(url: string) {
    const dialogRef = this.dialog.open(InOutImgComponent);
    dialogRef.componentInstance.imgUrl = url;
  }
  listInOut() {
    this.router.navigate(['/sale-orders/in-out']);
  }

  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
    };
    this._service.search(this.filter).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        console.log(data, 'data');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
}
