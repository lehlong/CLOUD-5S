import {NgModule, Injectable} from '@angular/core';
import {PaginationComponent} from './components/pagination/pagination.component';
import {EmptyComponent} from './components/empty/empty.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputCustomComponent} from './components/input-custom/input-custom.component';
import {InputNumberComponent} from './components/input-number/input-number.component';
import {CommaSeparatedDirective} from 'src/app/@module/directive/comma-separated/comma.separated';
import {PermissionDirective} from 'src/app/@module/directive/permission/permission';
import {ScrollToErrorDirective} from 'src/app/@module/directive/scroll-error/scroll.error';
import {AutocompletePositionDirective} from 'src/app/@module/directive/autocomplete-position-directive/autocomplete.position.directive';
import {ImageDirective} from './directive/image-directive/imageDirective';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {GoogleMapsModule} from '@angular/google-maps';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {MatRadioModule} from '@angular/material/radio';
import {NgApexchartsModule} from 'ng-apexcharts';
import {MatTabsModule} from '@angular/material/tabs';
import {ToastrModule} from 'ngx-toastr';
import {DrawerComponent} from 'src/app/@module/components/drawer/drawer.component';
import {OrderScalePrintComponent} from 'src/app/@module/print-templates/order-scale-print/order-scale-print/order-scale-print.component';
import {StockExportPrintComponent} from 'src/app/@module/print-templates/stock-export-print/stock-export-print.component';
import {InputClearComponent} from 'src/app/@module/components/input-clear/input-clear.component';
import {OrderExportPrintComponent} from 'src/app/@module/print-templates/order-export-print/order-export-print.component';
import {PaymentVoucherPrintComponent} from 'src/app/@module/print-templates/payment-voucher-print/payment-voucher-print.component';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {PaymentIncomePrintComponent} from 'src/app/@module/print-templates/payment-income-print/payment-income-print.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzTableModule} from 'ng-zorro-antd/table';
import {OrderImportPrintComponent} from 'src/app/@module/print-templates/order-import-print/order-import-print.component';
import {CommentComponent} from 'src/app/@module/components/comment/comment.component';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {ListFileComponent} from './view/file/list-file/list-file.component';
import {InputUploadComponent} from './components/input-upload/input-upload.component';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzTransferModule} from 'ng-zorro-antd/transfer';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import {ExportPrintComponent} from 'src/app/@module/print-templates/export-print/export-print.component';
import {ManufactureCommandPrintComponent} from 'src/app/@module/print-templates/manufacture-command-print/manufacture-command-print.component';
import {ContractPrintComponent} from 'src/app/@module/print-templates/contract-print/contract-print.component';
import {FolderCreateComponent} from 'src/app/@module/business/file-management/folder/folder-create/folder-create.component';
import {SelectOnFocusDirective} from 'src/app/@module/directive/select-focus/select.focus.directive';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AutofocusDirective } from 'src/app/@module/directive/auto-focus/auto.focus.directive';
@Injectable()
export class MyMissingTranslationHandler implements MissingTranslationHandler {
  containsVietnameseCharactersOrWhitespace(input: string): boolean {
    const vietnamesePattern = /[\u0300-\u036f\u1ef0-\u1ef9]/;
    const whitespacePattern = /\s/;
    return vietnamesePattern.test(input) || whitespacePattern.test(input);
  }

  handle(params: MissingTranslationHandlerParams): string {
    if (this.containsVietnameseCharactersOrWhitespace(params.key)) {
      return params.key;
    }
    return `**MISS KEY**`;
  }
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzUploadModule,
    TranslateModule.forChild({
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
    }),
    NzCommentModule,
    NzAvatarModule,
    NzImageModule,
    NzTransferModule,
    NzSpinModule,
    NzTypographyModule,
    NzButtonModule,
    MatTableModule,
    NzTypographyModule,
    NzTabsModule,
    NzDropDownModule,
    NzBadgeModule,
    NzDividerModule,
    NzPopoverModule,
  ],
  declarations: [
    InputClearComponent,
    OrderScalePrintComponent,
    StockExportPrintComponent,
    PaginationComponent,
    EmptyComponent,
    InputNumberComponent,
    InputCustomComponent,
    CommaSeparatedDirective,
    ScrollToErrorDirective,
    AutocompletePositionDirective,
    PermissionDirective,
    ImageDirective,
    DrawerComponent,
    OrderExportPrintComponent,
    PaymentVoucherPrintComponent,
    PaymentIncomePrintComponent,
    OrderImportPrintComponent,
    CommentComponent,
    ListFileComponent,
    InputUploadComponent,
    ExportPrintComponent,
    ManufactureCommandPrintComponent,
    ContractPrintComponent,
    FolderCreateComponent,
    SelectOnFocusDirective,
    AutofocusDirective
  ],
  exports: [
    AutofocusDirective,
    NzPopoverModule,
    NzDropDownModule,
    NzBadgeModule,
    NzDividerModule,
    PaymentVoucherPrintComponent,
    OrderExportPrintComponent,
    InputClearComponent,
    OrderScalePrintComponent,
    StockExportPrintComponent,
    DrawerComponent,
    NzInputModule,
    NzIconModule,
    PaginationComponent,
    EmptyComponent,
    InputNumberComponent,
    InputCustomComponent,
    CommaSeparatedDirective,
    ScrollToErrorDirective,
    AutocompletePositionDirective,
    PermissionDirective,
    ImageDirective,
    CKEditorModule,
    GoogleMapsModule,
    NzAutocompleteModule,
    NzSelectModule,
    NzProgressModule,
    NzDatePickerModule,
    FontAwesomeModule,
    MatTooltipModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatTreeModule,
    MatTableModule,
    CommonModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    NgApexchartsModule,
    ToastrModule,
    MatTabsModule,
    NzRadioModule,
    NzButtonModule,
    NzAvatarModule,
    NzCommentModule,
    NzTableModule,
    OrderImportPrintComponent,
    CommentComponent,
    NzTimePickerModule,
    ListFileComponent,
    InputUploadComponent,
    NzImageModule,
    NzTransferModule,
    NzSpinModule,
    ExportPrintComponent,
    ManufactureCommandPrintComponent,
    NzTypographyModule,
    NzTabsModule,
    FolderCreateComponent,
    NzUploadModule,
    SelectOnFocusDirective,
  ],
})
export class SharedModule {}
