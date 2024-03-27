import {Routes} from '@angular/router';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {DashboardComponent} from 'src/app/@module/report/dashboard/dashboard.component';

export const LayoutRoutes: Routes = [
  {
    path: 'system-manage',
    children: [
      {
        path: '',
        loadChildren: () => import('../system-manage/system-manage.module').then((m) => m.SystemManageModule),
      },
    ],
  },
  {
    path: 'sale-orders',
    children: [
      {
        path: '',
        loadChildren: () => import('../sale-orders/sale-orders.module').then((m) => m.SaleOrdersModule),
      },
    ],
  },
  {
    path: 'master-data',
    children: [
      {
        path: '',
        loadChildren: () => import('../master-data/master-data.module').then((m) => m.MasterDataModule),
      },
    ],
  },
  {
    path: 'report',
    children: [
      {
        path: '',
        loadChildren: () => import('../report/report.module').then((m) => m.ReportModule),
      },
    ],
  },
  {
    path: 'business',
    children: [
      {
        path: '',
        loadChildren: () => import('../business/business.module').then((m) => m.BusinessModule),
      },
    ],
  },
  {path: '', component: DashboardComponent},
  {path: '**', component: ResultComponent},
];
