import {Component} from '@angular/core';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {ProductionManagerService} from 'src/app/services/Business/production-manager.service';
import {DebounceService} from 'src/app/services/Common/debounce.service';
import {MatDialogRef} from '@angular/material/dialog';
import {utils} from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-section-line',
  templateUrl: './change-section-line.component.html',
  styleUrls: ['./change-section-line.component.scss'],
})
export class ChangeSectionLineComponent {
  data: any = [];
  listPourSection: any = [];
  listPourLine: any = [];
  dataTableMove: any = [];
  submitted: boolean = false;
  amountError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ChangeSectionLineComponent>,
    private debounceService: DebounceService,
    private _service: ProductionManagerService,
    private dropdownService: DropdownService,
    public utils: utils,
  ) {}

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllPourSection();
    this.GetAllPourLine();
    this.dataTableMove = [
      {
        ...this.data[0],
        amountMove: 0,
        listPourLine: this.listPourLine,
        disablePourLineCode: true,
        pourSectionCode: null,
        pourLineCode: null,
      },
    ];
  }

  removeRows(indexToDelete: number = 0) {
    this.dataTableMove = [...this.dataTableMove.filter((item: any, index: number) => index !== indexToDelete)];
  }

  addRows() {
    this.dataTableMove = [
      ...this.dataTableMove,
      {
        ...this.data[0],
        amountMove: 0,
        listPourLine: this.listPourLine,
        disablePourLineCode: true,
        pourSectionCode: null,
        pourLineCode: null,
      },
    ];
  }

  changePourSection(value: string = '', indexChange: number = 0) {
    this.dataTableMove = [
      ...this.dataTableMove.map((element: any, index: number) => {
        if (indexChange === index) {
          return {
            ...element,
            disablePourLineCode: !value,
            pourSectionCode: value,
            listPourLine: !value
              ? this.listPourLine
              : this.listPourLine.filter((pourLine: any) => pourLine?.sectionCode === value),
            pourLineCode: null,
          };
        }
        return element;
      }),
    ];
  }

  onSave() {
    this.submitted = true;
    const totalMove = this.dataTableMove.reduce((total: number, item: any) => {
      return total + item?.amountMove;
    }, 0);
    if (totalMove > this.data[0]?.amount) {
      this.amountError = true;
      Swal.fire({
        showCloseButton: true,
        title: 'Khối lượng chuyển phải bé hơn hoặc bằng khối lượng tồn !',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      return;
    } else {
      this.amountError = false;
    }

    if (
      this.dataTableMove.some((item: any) => {
        return !item?.amountMove || !item?.pourSectionCode || !item?.pourLineCode;
      })
    ) {
      Swal.fire({
        showCloseButton: true,
        title: 'Lô, dãy không được để trống, khối lượng chuyển phải lớn hơn 0 !',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      return;
    }

    const parameters = {
      companyCode: this.data[0]?.companyCode,
      areaCode: this.data[0]?.areaCode,
      pourSectionCode: this.data[0]?.pourSectionCode,
      pourLineCode: this.data[0]?.pourLineCode,
      itemCode: this.data[0]?.itemCode,
      unitCode: this.data[0]?.unitCode,
      toStocks: this.dataTableMove.map((element: any) => {
        return {
          pourSectionCode: element?.pourSectionCode,
          pourLineCode: element?.pourLineCode,
          amount: element?.amountMove,
        };
      }),
    };

    this._service.transferSectionLine(parameters).subscribe(
      ({data}) => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  close() {
    this.dialogRef.close();
  }

  GetAllPourSection() {
    this.dropdownService.GetAllPourSection().subscribe(
      ({data}) => {
        this.listPourSection = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllPourLine() {
    this.dropdownService.GetAllPourLine().subscribe(
      ({data}) => {
        this.listPourLine = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
