import {Component, HostListener, ViewContainerRef} from '@angular/core';
import {StockExportService} from 'src/app/services/Business/stock-export.service';
import {PrintService} from 'src/app/services/Common/print.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {CompanyService} from 'src/app/services/Common/company.service';
import * as moment from 'moment';
import {Router, ActivatedRoute} from '@angular/router';
import {StockImportFilter} from 'src/app/@filter/Business/stock-import.filter';
import {importDetails} from 'src/app/models/Business/stock.model';
import {MatDialog} from '@angular/material/dialog';
import {StockExportPrintComponent} from 'src/app/@module/print-templates/stock-export-print/stock-export-print.component';
import {formatNumber} from '../../../../utils/func-feature';
@Component({
  selector: 'app-stock-export-edit',
  templateUrl: './stock-export-edit.component.html',
  styleUrls: ['./stock-export-edit.component.scss'],
})
export class StockExportEditComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.65}px`;
  }
  code: string = '';
  listItemDetails: importDetails[] = [];
  filter = new StockImportFilter();
  detailData: any = {};
  title = 'Chi tiết phiếu xuất hàng';
  widthDeault: string = '0px';
  formatNumber = formatNumber;
  companyInfo: any = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private _service: StockExportService,
    private printService: PrintService,
    private drawerService: DrawerService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.65}px`;
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetDetail();
    this.GetDetailCompany();
  }

  GetDetailCompany() {
    this.companyService.GetDetail().subscribe(
      ({data}) => {
        this.companyInfo = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  printWarehouseReceipt() {
    this.printService.printComponent(
      {
        detail: this.detailData,
        company: this.companyInfo,
      },
      StockExportPrintComponent,
      this.viewContainerRef,
      'stock-import.css',
    );
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          console.log('this.detailData', this.detailData);

          this.listItemDetails = data?.importDetails;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }
}
