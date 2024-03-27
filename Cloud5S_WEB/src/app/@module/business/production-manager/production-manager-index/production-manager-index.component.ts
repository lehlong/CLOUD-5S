import {Component, ViewChild} from '@angular/core';
import {GlobalService} from 'src/app/services/Common/global.service';
import {ListPurchaseOrdersComponent} from '../list-purchase-orders/list-purchase-orders.component';
import {ShiftBasedProductionManagementComponent} from '../shift-based-production-management/shift-based-production-management.component';
import {PRODUCTION_MANAGER} from 'src/app/utils/constant/index';
import {Router, ActivatedRoute} from '@angular/router';
import {ReportInventoryComponent} from '../report-inventory/report-inventory.component';
import { ListStockItemTransferLogComponent } from '../list-stock-item-transfer-log/list-stock-item-transfer-log.component';

@Component({
  selector: 'app-production-manager-index',
  templateUrl: './production-manager-index.component.html',
  styleUrls: ['./production-manager-index.component.scss'],
})
export class ProductionManagerIndexComponent {
  @ViewChild(ListPurchaseOrdersComponent) listPurchaseOrdersComponent!: ListPurchaseOrdersComponent;
  @ViewChild(ShiftBasedProductionManagementComponent)
  shiftBasedProductionManagementComponent!: ShiftBasedProductionManagementComponent;
  @ViewChild(ReportInventoryComponent) reportInventoryComponent!: ReportInventoryComponent;
  @ViewChild(ListStockItemTransferLogComponent) listStockItemTransferLogComponent!: ListStockItemTransferLogComponent;

  tab: number = 0;

  PRODUCTION_MANAGER = PRODUCTION_MANAGER;
  constructor(private globalService: GlobalService, private router: Router, private route: ActivatedRoute) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý sản xuất',
        path: 'business/production-manager',
      },
    ]);
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params?.tab) {
        this.tab = parseInt(params?.tab);
      }
    });
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  changeTab(data: any) {
    this.tab = data.index;
    switch(data.index) {
      case 0:
        this.listPurchaseOrdersComponent.search();
        break;
      case 1:
        this.shiftBasedProductionManagementComponent.search();
        break;
      case 2:
        this.reportInventoryComponent.search();
        break;
    }
  }

  saveInfo() {
    this.listPurchaseOrdersComponent.saveInfo();
  }

  downloadReportExcel() {
    this.reportInventoryComponent.exportExcel();
  }

  enterProductionInfo() {
    this.shiftBasedProductionManagementComponent.enterProductionInfo();
  }
}
