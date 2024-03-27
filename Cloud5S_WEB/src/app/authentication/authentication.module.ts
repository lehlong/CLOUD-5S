import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SharedModule} from '../@module/share.modules';

@NgModule({
  declarations: [],
  exports: [
    MatTooltipModule,
    MatAutocompleteModule,
    MatDialogModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule,
    NgxDocViewerModule,
    SharedModule,
  ],
})
export class AuthenticationModule {}
