import {Component, Output, EventEmitter, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pageSize?: number = 10;
  @Input() totalPage: number = 1;
  @Input() totalRecord: number = 1;
  @Input() page: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  constructor(public translate: TranslateService) {}

  pageSizes: number[] = [10, 20, 50, 100];
  pagesToShow: number = 4; // Số trang hiển thị trên thanh pagination
  get visiblePages(): number[] {
    let pages: number[] = [];
    let startPage: number;
    let endPage: number;

    if (this.totalPage <= this.pagesToShow) {
      // Hiển thị tất cả các trang nếu tổng số trang ít hơn hoặc bằng số trang hiển thị
      pages = this.getPageNumbers();
    } else {
      // Xác định vị trí bắt đầu và kết thúc của trang hiển thị
      const offset = Math.floor(this.pagesToShow / 2);
      if (this.page <= offset) {
        startPage = 1;
        endPage = this.pagesToShow;
      } else if (this.page + offset >= this.totalPage) {
        startPage = this.totalPage - this.pagesToShow + 1;
        endPage = this.totalPage;
      } else {
        startPage = this.page - offset;
        endPage = this.page + offset;
      }

      // Hiển thị dấu ba chấm nếu trang không ở đầu hoặc cuối
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push(-1);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < this.totalPage) {
        if (endPage < this.totalPage - 1) {
          pages.push(-1);
        }
        pages.push(this.totalPage);
      }
    }
    return pages;
  }

  decreasePage(): void {
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page);
    }
  }

  increasePage(): void {
    if (this.page < this.totalPage) {
      this.page++;
      this.pageChange.emit(this.page);
    }
  }

  getPageNumbers(): number[] {
    return Array.from({length: this.totalPage}, (_, index) => index + 1);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber === -1) return;
    this.page = pageNumber;
    this.pageChange.emit(this.page);
  }

  onInputBlur(event: any) {
    const inputValue = event.target.value;
    if (inputValue >= 1 && inputValue <= this.totalPage) {
      this.page = inputValue;
      this.pageChange.emit(this.page);
    }
  }

  pageSizeChanged(): void {
    this.page = 1;
    if (this.pageSizeChange) {
      this.pageSizeChange.emit(this.pageSize);
    }
  }
}
