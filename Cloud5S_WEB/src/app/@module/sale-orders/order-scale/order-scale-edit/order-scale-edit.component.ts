import {Component, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PrintService} from 'src/app/services/Common/print.service';
import {OrderScaleService} from 'src/app/services/SO/order-scale.service';
import {OrderScalePrintComponent} from 'src/app/@module/print-templates/order-scale-print/order-scale-print/order-scale-print.component';
import {orderScaleDetails} from 'src/app/models/MD/orders-cale.model';
import {CompanyService} from 'src/app/services/Common/company.service';
import {STATE_ORDER, SCALE_TYPES, LIST_STATE} from 'src/app/utils/constant/order';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ORDERSCALE_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-order-scale-edit',
  templateUrl: './order-scale-edit.component.html',
  styleUrls: ['./order-scale-edit.component.scss'],
})
export class OrderScaleEditComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  constructor(
    private drawerService: DrawerService,
    private printService: PrintService,
    private _service: OrderScaleService,
    private viewContainerRef: ViewContainerRef,
    private companyService: CompanyService,
    private http: HttpClient,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }

  apiUrl: string = environment.baseApiUrl;
  imageUrl: string = `${this.apiUrl}Attachment/Download?attachmentId=`;

  imageData: any;
  imagesScaleIn: any = [];
  imagesScaleOut: any = [];
  listImageAll: any = [];
  ORDERSCALE_RIGHTS = ORDERSCALE_RIGHTS;
  widthDeault: string = '0px';
  customer: any;
  item: any;
  scale: any;
  screenWidth: any;
  orderReleaseCode: any;

  driverName: any;
  vehicleCode: any;
  itemNumber: any;
  itemCode: any;
  itemProportion: any;
  SCALE_TYPES = SCALE_TYPES;
  itemPrice: any;
  itemMoney: any;
  code: any = '';
  itemName: any;
  id: any = '';
  images: any;
  area: any;
  order: any;
  pourLocation: any;
  createDate: any;

  detailData: any = {};
  companyInfo: any = null;

  loadInit() {
    this.GetDetail();
    this.GetDetailCompany();
  }

  GetByReferenceId(id: string) {
    this.http.get(this.imageUrl, {responseType: 'blob'}).subscribe((data) => {
      this.createImageFromBlob(data);
    });
    this._service.getByReferenceId(id).subscribe(
      ({data}) => {
        this.listImageAll = data;
        this.imagesScaleIn =
          this.listImageAll?.filter((item: any) => {
            return item.moduleType == 'SCALEIN';
          }) || [];

        this.imagesScaleOut =
          this.listImageAll?.filter((item: any) => {
            return item.moduleType == 'SCALEOUT';
          }) || [];
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageData = reader.result;
      },
      false,
    );

    if (image) {
      reader.readAsDataURL(image);
    }
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
  ngOnInit(): void {
    this.loadInit();
  }
  close() {
    this.drawerService.close();
  }

  GetDetail() {
    console.log('123123', this.id);
    this._service
      .GetDetail({
        code: this.code,
        referenceId: this.id,
        images: this.images,
      })
      .subscribe(
        ({data}) => {
          this.detailData = data;
          this.GetByReferenceId(data.referenceId);
          this.imagesScaleIn = data?.images?.filter((image: any) => image.type == 'SCALE_IN') || [];
          this.imagesScaleOut = data?.images?.filter((image: any) => image.type == 'SCALE_OUT') || [];
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
