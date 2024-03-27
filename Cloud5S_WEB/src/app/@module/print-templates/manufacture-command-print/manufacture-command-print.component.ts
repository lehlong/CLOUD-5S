import { Component } from '@angular/core';

@Component({
  selector: 'app-manufacture-command-print',
  templateUrl: './manufacture-command-print.component.html',
  styleUrls: ['./manufacture-command-print.component.scss']
})
export class ManufactureCommandPrintComponent {
  data: any = null;
  listData: any = null;
  ngOnInit(): void {
    this.listData = this.data?.data;
    console.log('this.listData',this.listData); 
  }
}
