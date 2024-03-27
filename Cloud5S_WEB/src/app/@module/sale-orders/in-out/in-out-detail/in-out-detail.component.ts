import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FeatureInOutFilter} from 'src/app/@filter/SO/feature-in-out.filter';
import {CheckInOut, CheckInOutImages} from 'src/app/models/MD/checkInOut.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {envAttachment} from 'src/environments/env-attachment';
import {FeatureInOutService} from 'src/app/services/SO/feature-in-out.service';
import {environment} from 'src/environments/environment';
@Component({
  selector: 'app-in-out-detail',
  templateUrl: './in-out-detail.component.html',
  styleUrls: ['./in-out-detail.component.scss'],
})
export class InOutDetailComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '1344px';
  itemDetail: CheckInOut | null = null;
  imagesCheckIn: any  = [];
  imagesCheckOut: any = [];
  filter = new FeatureInOutFilter();

  listImageAll : any = [];
  apiUrl: string = environment.baseApiUrl;
  imageUrl: string = `${this.apiUrl}Attachment/Download?attachmentId=`;

  constructor(private drawerService: DrawerService, private router: Router, private route: ActivatedRoute,private _service: FeatureInOutService,) {
    console.log(window.innerWidth);
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }
  ngOnInit(): void {
    this.imagesCheckIn = this.itemDetail?.images?.filter((image: any) => image.type == 'CheckIn') || [];
    this.imagesCheckOut = this.itemDetail?.images?.filter((image: any) => image.type == 'CheckOut') || [];
    
    console.log('itemDetails',this.itemDetail);
    this.GetByReferenceId();
  }
  
  GetByReferenceId(){
    this._service
    .getByReferenceId(this.itemDetail?.referenceId || '')
    .subscribe(
      ({data}) => {
        this.listImageAll = data;
        this.imagesCheckIn = this.listImageAll.filter((item : any) =>{
           return (item.moduleType).toLowerCase() == 'checkin'
        })
        this.imagesCheckOut = this.listImageAll.filter((item : any) =>{
           return (item.moduleType).toLowerCase() == 'checkout'
        })
        
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }


  close() {
    this.filter = {
      ...this.filter,
      id: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }
}
